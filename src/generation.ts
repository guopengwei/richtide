import type { UsageAccount } from "./credits.ts";
import type { Plan } from "./billing.ts";
import { projectArtifact } from "./pro.ts";
import { sha256Hex } from "./crypto.ts";

export type AnalysisPackage = "SNAPSHOT_FREE" | "CORE_LITE" | "COMPLETE_PRO";
interface AccessRequest { customerId: string; instrumentId: string; requestedPackage: AnalysisPackage; analysisFamilyKey?: string; clientPrice?: number }
interface Authority { plan: Plan; catalog: { packageRates: Record<AnalysisPackage, number> }; supportedInstruments: string[]; existingAccess: Array<{ customerId: string; instrumentId: string; package: AnalysisPackage; analysisFamilyKey?: string }> }

export function preflightAccess(request: AccessRequest, authority: Authority): { outcome: string; rate?: number; package?: AnalysisPackage } {
  if (!authority.supportedInstruments.includes(request.instrumentId)) return { outcome: "unsupported" };
  if (authority.existingAccess.some((access) => access.customerId === request.customerId && access.instrumentId === request.instrumentId && access.package === request.requestedPackage && (!request.analysisFamilyKey || access.analysisFamilyKey === request.analysisFamilyKey))) return { outcome: "already_unlocked", rate: 0, package: request.requestedPackage };
  if (request.requestedPackage === "COMPLETE_PRO" && authority.plan !== "PRO") return { outcome: "plan_required" };
  const hasCore = request.requestedPackage === "COMPLETE_PRO" && authority.existingAccess.some((access) => access.customerId === request.customerId && access.instrumentId === request.instrumentId && access.package === "CORE_LITE" && (!request.analysisFamilyKey || access.analysisFamilyKey === request.analysisFamilyKey));
  const rate = authority.catalog.packageRates[request.requestedPackage] - (hasCore ? authority.catalog.packageRates.CORE_LITE : 0);
  return rate === 0 ? { outcome: "free", rate, package: request.requestedPackage } : { outcome: "requires_credit", rate, package: request.requestedPackage };
}

export interface PublishedArtifact { id: string; key: string; digest: string; manifestVersion: 1; payload: unknown }
export class ArtifactStore {
  readonly #artifacts = new Map<string, PublishedArtifact>();
  async publish(payload: unknown): Promise<PublishedArtifact> {
    const serialized = JSON.stringify(payload); const hash = await sha256Hex(serialized); const id = `artifact_${hash.slice(0, 16)}`;
    const artifact: PublishedArtifact = { id, key: `artifacts/sha256:${hash}`, digest: `sha256:${hash}`, manifestVersion: 1, payload: structuredClone(payload) };
    this.#artifacts.set(id, artifact); return structuredClone(artifact);
  }
  get(id: string): PublishedArtifact { const value = this.#artifacts.get(id); if (!value) throw new Error("artifact_not_found"); return structuredClone(value); }
}

interface RequestInput { customerId: string; instrumentId: string; package: AnalysisPackage; minute: string; analysisFamilyKey: string }
interface Access { id: string; customerId: string; reservationId: string; analysisAccessKey: string; coreAccessKey: string; artifactId?: string }
interface Generation { id: string; key: string; package: AnalysisPackage; state: "queued" | "running" | "partial" | "published" | "failed"; accessIds: string[]; failure?: string }
export interface GenerationAuthority { resolvePlan(customerId: string): Plan; supportsInstrument(instrumentId: string): boolean; rateFor(packageName: AnalysisPackage): number }
export class GenerationCoordinator {
  readonly #events = new Map<string, Generation>(); readonly #active = new Map<string, string>(); readonly #access = new Map<string, Access>(); #sequence = 0;
  readonly credits: UsageAccount;
  readonly artifacts: ArtifactStore;
  readonly authority: GenerationAuthority;
  constructor(credits: UsageAccount, artifacts: ArtifactStore, authority: GenerationAuthority) { this.credits = credits; this.artifacts = artifacts; this.authority = authority; }
  request(input: RequestInput) {
    const plan = this.authority.resolvePlan(input.customerId);
    if (!this.authority.supportsInstrument(input.instrumentId)) throw new Error("unsupported_instrument");
    if (input.package === "COMPLETE_PRO" && plan !== "PRO") throw new Error("plan_required");
    if (input.package === "CORE_LITE" && plan === "FREE") throw new Error("plan_required");
    const coreAccessKey = `${input.customerId}:${input.analysisFamilyKey}:CORE_LITE`;
    const durableAccessKey = `${input.customerId}:${input.analysisFamilyKey}:${input.package}`;
    const publishedAccess = this.credits.findAnalysisAccess(durableAccessKey);
    if (publishedAccess) return { generationEventId: "already_published", analysisAccessId: publishedAccess.accessId };
    const key = `${input.instrumentId}:${input.package}:${input.analysisFamilyKey}`;
    const eventId = this.#active.get(key) ?? `gen_${++this.#sequence}`;
    if (!this.#events.has(eventId)) { this.#events.set(eventId, { id: eventId, key, package: input.package, state: "queued", accessIds: [] }); this.#active.set(key, eventId); }
    const existingAccess = this.#events.get(eventId)?.accessIds.map((id) => this.#access.get(id)).find((access) => access?.customerId === input.customerId);
    if (existingAccess) return { generationEventId: eventId, analysisAccessId: existingAccess.id };
    const priorCore = input.package === "COMPLETE_PRO" ? this.credits.findAnalysisAccess(coreAccessKey) : undefined;
    const cost = Math.max(0, this.authority.rateFor(input.package) - (priorCore ? this.authority.rateFor("CORE_LITE") : 0));
    const accessId = `access_${++this.#sequence}`;
    const reservation = cost > 0 ? this.credits.reserve(input.customerId, cost, accessId) : { id: "free" };
    this.#access.set(accessId, { id: accessId, customerId: input.customerId, reservationId: reservation.id, analysisAccessKey: durableAccessKey, coreAccessKey });
    this.#events.get(eventId)?.accessIds.push(accessId);
    return { generationEventId: eventId, analysisAccessId: accessId };
  }
  async publishValidated(eventId: string, payload: unknown): Promise<PublishedArtifact> {
    const event = this.#events.get(eventId); if (!event || event.state === "failed") throw new Error("generation_not_publishable");
    const artifact = await this.artifacts.publish(payload);
    for (const accessId of event.accessIds) { const access = this.#access.get(accessId); if (!access) continue; const state = event.package === "COMPLETE_PRO" ? "pro_granted" : event.package === "CORE_LITE" ? "core_granted" : "free_granted"; this.credits.closeWithAnalysisAccess(access.reservationId, { key: access.analysisAccessKey, accessId: access.id, customerId: access.customerId, artifactId: artifact.id, state }); access.artifactId = artifact.id; }
    event.state = "published"; this.#active.delete(event.key); return artifact;
  }
  async publishCoreOnly(eventId: string, core: unknown): Promise<PublishedArtifact> {
    const event = this.#events.get(eventId); if (!event || event.state === "failed") throw new Error("generation_not_publishable");
    const artifact = await this.artifacts.publish({ publication: "core_only", core });
    for (const accessId of event.accessIds) { const access = this.#access.get(accessId); if (!access) continue; const priorCore = this.credits.findAnalysisAccess(access.coreAccessKey); if (priorCore) { if (access.reservationId !== "free") this.credits.release(access.reservationId); access.artifactId = priorCore.artifactId; } else { this.credits.closeWithAnalysisAccess(access.reservationId, { key: access.coreAccessKey, accessId: access.id, customerId: access.customerId, artifactId: artifact.id, state: "core_granted" }, 1); access.artifactId = artifact.id; } }
    event.state = "partial"; this.#active.delete(event.key); return artifact;
  }
  fail(eventId: string, reason: string): void {
    const event = this.#events.get(eventId); if (!event) throw new Error("generation_not_found");
    for (const accessId of event.accessIds) { const access = this.#access.get(accessId); if (access?.reservationId && access.reservationId !== "free") this.credits.release(access.reservationId); }
    event.state = "failed"; event.failure = reason; this.#active.delete(event.key);
  }
  status(eventId: string): Generation { const event = this.#events.get(eventId); if (!event) throw new Error("generation_not_found"); return structuredClone(event); }
  reopen(accessId: string): { artifact: PublishedArtifact; cost: 0 } {
    const durableAccess = this.credits.findAnalysisAccessById(accessId); if (!durableAccess) throw new Error("access_not_published"); const artifact = this.artifacts.get(durableAccess.artifactId);
    const currentPlan = this.authority.resolvePlan(durableAccess.customerId);
    const payload = isCoreAndPro(artifact.payload) ? projectArtifact(artifact.payload, currentPlan) : artifact.payload;
    return { artifact: { ...artifact, payload }, cost: 0 };
  }
}

function isCoreAndPro(value: unknown): value is { core: unknown; pro: unknown } { return typeof value === "object" && value !== null && "core" in value && "pro" in value; }
