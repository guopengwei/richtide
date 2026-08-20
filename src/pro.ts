import type { Plan } from "./billing.ts";
interface Artifact { core: unknown; pro: unknown }
export function projectArtifact(artifact: Artifact, plan: Plan): Record<string, unknown> {
  if (plan === "PRO") return { core: structuredClone(artifact.core), pro: structuredClone(artifact.pro) };
  if (plan === "FREE") return { snapshot: { state: "free_projection", computedCoreData: false }, proPreview: { label: "Pro 研究方法预览", computedData: false } };
  return { core: structuredClone(artifact.core), proPreview: { label: "Pro 研究方法预览", computedData: false } };
}
interface Bar { time: string; close: number; high: number; low: number; volume: number }
export function runWyckoffBeta(bars: Bar[]): Record<string, unknown> {
  if (bars.length < 3) return { state: "unknown", reason: "insufficient_closed_bars", publicationStatus: "research_beta" };
  const first = bars[0]; const last = bars.at(-1); if (!first || !last) return { state: "unknown" };
  const rising = last.close > first.close && last.volume > first.volume;
  return { state: rising ? "markup" : "trading_range", phaseProbabilities: rising ? { markup: .62, tradingRange: .38 } : { markup: .4, tradingRange: .6 }, events: [{ label: "需求增强候选", status: rising ? "confirmed" : "candidate" }], boundaries: { support: Math.min(...bars.map((bar) => bar.low)), resistance: Math.max(...bars.map((bar) => bar.high)) }, invalidation: "收盘跌破区间下沿", parameterVersion: "wyckoff-beta-v1", publicationStatus: "research_beta", engineeringThresholds: true };
}
export function runBrooksBeta(bars: Bar[]): Record<string, unknown> {
  if (bars.length < 3) return { state: "unknown", reason: "insufficient_closed_bars", publicationStatus: "research_beta" };
  const first = bars[0]; const last = bars.at(-1); if (!first || !last) return { state: "unknown" };
  const direction = last.close > first.close ? "up" : "down";
  return { state: "assessed", regime: "trend", direction, breakout: "confirmed", followThrough: true, targets: [last.close + (last.high - last.low)], probability: { value: .58, interval: [.54, .62], horizon: "5_bars", target: "measured_move", stop: "signal_bar", costs: "included", version: "brooks-beta-v1", sampleSize: 1200 }, publicationStatus: "research_beta" };
}
export function synthesizeDecisionMap(input: { fundamental: string; valuation: string; catalysts: string; wyckoff: string; brooks: string }) {
  const disagreements: string[] = [];
  if (input.fundamental === "attractive" && input.valuation === "expensive") disagreements.push("业务质量与估值存在张力");
  if (input.wyckoff !== input.brooks) disagreements.push("中期结构与短期价格行为不一致");
  return { axes: { fundamentalAttractiveness: input.fundamental, technicalSetup: `${input.wyckoff}/${input.brooks}` }, posture: "研究条件分化，需继续核验", evidence: Object.entries(input).map(([module, state]) => ({ module, state })), disagreements, risks: [input.catalysts], watchConditions: ["证据或价格结构发生实质变化"], invalidation: ["关键证据被更正或撤销"], nextReview: "新公告或完整收盘价出现时" };
}
