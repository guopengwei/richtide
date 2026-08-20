interface ComparableArtifact { id: string; version: number; findings: Record<string, string> }
export function compareArtifacts(before: ComparableArtifact, after: ComparableArtifact) {
  const materialChanges: Array<{ key: string; before?: string; after?: string }> = []; const unchanged: string[] = [];
  for (const key of new Set([...Object.keys(before.findings), ...Object.keys(after.findings)])) {
    const previous = before.findings[key]; const current = after.findings[key];
    if (previous === current) unchanged.push(key); else materialChanges.push({ key, ...(previous === undefined ? {} : { before: previous }), ...(current === undefined ? {} : { after: current }) });
  }
  return { before: { id: before.id, version: before.version }, after: { id: after.id, version: after.version }, materialChanges, unchanged };
}
interface ExportInput { artifactId: string; accessId: string; locale: "zh-CN"; copyVersion: string; methodVersion: string; evidenceVersion: string; qualityVersion: string; format: "html" | "pdf" | "json"; bytes: string }
interface ExportRecord extends ExportInput { id: string; createdAt: string }
interface ExportGrant { accessId: string; customerId: string; artifactId: string; requiredPlan: "LITE" | "PRO"; formats: ReadonlyArray<ExportInput["format"]> }
export class ExportStore {
  readonly #records = new Map<string, ExportRecord>(); #sequence = 0;
  readonly #grants: ReadonlyMap<string, ExportGrant>;
  readonly #resolvePlan: (customerId: string) => "FREE" | "LITE" | "PRO";
  constructor(grants: ReadonlyMap<string, ExportGrant>, resolvePlan: (customerId: string) => "FREE" | "LITE" | "PRO") { this.#grants = grants; this.#resolvePlan = resolvePlan; }
  publish(input: ExportInput, authenticatedCustomerId: string): ExportRecord {
    const grant = this.#grants.get(input.accessId); if (!this.#authorized(grant, authenticatedCustomerId) || grant?.artifactId !== input.artifactId || !grant.formats.includes(input.format)) throw new Error("export_not_authorized");
    if (/javascript:|<script|onerror\s*=/i.test(input.bytes)) throw new Error("unsafe_export");
    const record: ExportRecord = { ...input, id: `export_${++this.#sequence}`, createdAt: "2026-08-20T08:00:00Z" }; this.#records.set(record.id, structuredClone(record)); return structuredClone(record);
  }
  get(id: string, authenticatedCustomerId: string): ExportRecord { const record = this.#records.get(id); const grant = record ? this.#grants.get(record.accessId) : undefined; if (!record || !this.#authorized(grant, authenticatedCustomerId)) throw new Error("export_not_found"); return structuredClone(record); }
  #authorized(grant: ExportGrant | undefined, customerId: string): grant is ExportGrant { if (!grant || grant.customerId !== customerId) return false; const plan = this.#resolvePlan(customerId); return grant.requiredPlan === "LITE" ? plan === "LITE" || plan === "PRO" : plan === "PRO"; }
}
