interface ActivationEvidence { economic: boolean; payment: boolean; tax: boolean; legal: boolean; product: boolean; operations: boolean }
interface CatalogDraft { id: string; version: string; evidence: ActivationEvidence; authorId: string; approverId?: string; activatorId?: string; state: "draft" | "approved" | "active" }
export class CatalogGovernance {
  readonly #drafts = new Map<string, CatalogDraft>(); #sequence = 0;
  draft(version: string, evidence: ActivationEvidence, authorId: string): CatalogDraft {
    if (!Object.values(evidence).every(Boolean)) throw new Error("missing_activation_evidence");
    const draft: CatalogDraft = { id: `catalog_${++this.#sequence}`, version, evidence: { ...evidence }, authorId, state: "draft" }; this.#drafts.set(draft.id, draft); return structuredClone(draft);
  }
  approve(id: string, approverId: string): CatalogDraft { const draft = this.#get(id); if (draft.authorId === approverId) throw new Error("separation_of_duties"); draft.approverId = approverId; draft.state = "approved"; return structuredClone(draft); }
  activate(id: string, activatorId: string): CatalogDraft { const draft = this.#get(id); if (draft.state !== "approved" || draft.authorId === activatorId || draft.approverId === activatorId) throw new Error("separation_of_duties"); draft.activatorId = activatorId; draft.state = "active"; return structuredClone(draft); }
  #get(id: string): CatalogDraft { const draft = this.#drafts.get(id); if (!draft) throw new Error("catalog_not_found"); return draft; }
}

const allowedRecoveryActions = ["workflow_retry", "outbox_replay", "projection_rebuild", "orphan_cleanup"] as const;
export class OperationsConsole {
  readonly #recoveries = new Set<string>();
  recover(generationId: string, action: string, _operatorId: string): { accepted: true; correlationId: string; duplicate?: boolean } {
    if (!(allowedRecoveryActions as readonly string[]).includes(action)) throw new Error("forbidden_recovery_action");
    const correlationId = `recovery:${generationId}:${action}`; if (this.#recoveries.has(correlationId)) return { accepted: true, correlationId, duplicate: true };
    this.#recoveries.add(correlationId); return { accepted: true, correlationId };
  }
  inspect(generationId: string) { return { generationId, workflow: "observable", container: "observable", outbox: "observable", storage: "observable", projections: "observable", spend: "observable" }; }
}
