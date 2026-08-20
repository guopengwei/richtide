export type EvidenceRights = "licensed" | "unsupported" | "expired";
export interface EvidenceRecord {
  id: string; source: string; sourceLanguage: string; chineseSummary: string;
  observedAt: string; eventAt: string; rawHash: string; transformLineage: string[];
  rights: EvidenceRights; correction: "current" | "corrected" | "revoked";
}

export class EvidenceLedger {
  readonly #records = new Map<string, EvidenceRecord>();
  add(record: EvidenceRecord): void {
    if (!record.rawHash.startsWith("sha256:") || !Number.isFinite(Date.parse(record.observedAt)) || !Number.isFinite(Date.parse(record.eventAt))) throw new Error("invalid_evidence");
    this.#records.set(record.id, structuredClone(record));
  }
  get(id: string): EvidenceRecord { const record = this.#records.get(id); if (!record) throw new Error("evidence_not_found"); return structuredClone(record); }
  publishable(id: string): boolean { const record = this.get(id); return record.rights === "licensed" && record.correction !== "revoked"; }
  explain(id: string): EvidenceRecord & { limitation: string; methodVersion: string } {
    return { ...this.get(id), limitation: "仅反映已取得许可并在所示时间观察到的材料。", methodVersion: "overview-v1" };
  }
  firstPublishable(): EvidenceRecord | undefined { return Array.from(this.#records.values()).find((record) => this.publishable(record.id)); }
}

export function createOverview(canonicalId: string, ledger: EvidenceLedger) {
  const evidence = ledger.firstPublishable();
  return {
    canonicalId,
    asOf: "2026-08-20T08:00:00.000Z",
    posture: "证据尚未形成一致结论",
    businessQuality: { state: "calculation", label: "待完整评估" },
    valuationRange: { state: "unavailable", label: "暂无可靠区间" },
    topCatalyst: evidence?.chineseSummary ?? "暂无可用证据",
    topRisk: "数据覆盖仍有限",
    coverage: "fixture",
    freshness: "as_of",
    materialFindings: evidence ? [{ evidenceId: evidence.id, state: "observation", conclusion: evidence.chineseSummary }] : []
  };
}
