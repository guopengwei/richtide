interface BusinessInput { revenue: [number, number]; operatingIncome: number; freeCashFlow: number; investedCapital: number; currency: string; period: string }
interface Measure { code: string; value: number; unit: string; currency?: string; period: string; lineage: string[]; state: "calculated" }

export function calculateBusinessMeasures(input: BusinessInput): Measure[] {
  const [priorRevenue, currentRevenue] = input.revenue;
  if (priorRevenue <= 0 || currentRevenue <= 0 || input.investedCapital <= 0) throw new Error("insufficient_inputs");
  return [
    { code: "revenue_growth", value: currentRevenue / priorRevenue - 1, unit: "ratio", period: input.period, lineage: ["current_revenue / prior_revenue - 1"], state: "calculated" },
    { code: "operating_margin", value: input.operatingIncome / currentRevenue, unit: "ratio", period: input.period, lineage: ["operating_income / revenue"], state: "calculated" },
    { code: "fcf_margin", value: input.freeCashFlow / currentRevenue, unit: "ratio", period: input.period, lineage: ["free_cash_flow / revenue"], state: "calculated" },
    { code: "roic", value: input.operatingIncome * .835 / input.investedCapital, unit: "ratio", period: input.period, lineage: ["nopat / invested_capital"], state: "calculated" }
  ];
}

interface ValuationInput { currentPrice: number; currency: string; freeCashFlow: number; growth: number; discountRate: number; terminalGrowth: number; shares: number }
export function calculateValuation(input: ValuationInput) {
  if (input.freeCashFlow <= 0 || input.shares <= 0 || input.discountRate <= input.terminalGrowth) throw new Error("model_refused");
  const dcf = (growth: number, discountRate: number): number => {
    let present = 0; let cash = input.freeCashFlow;
    for (let year = 1; year <= 5; year += 1) { cash *= 1 + growth; present += cash / (1 + discountRate) ** year; }
    return (present + cash * (1 + input.terminalGrowth) / (discountRate - input.terminalGrowth) / (1 + discountRate) ** 5) / input.shares;
  };
  return { currentPrice: input.currentPrice, currency: input.currency, bear: dcf(input.growth - .02, input.discountRate + .02), base: dcf(input.growth, input.discountRate), bull: dcf(input.growth + .02, input.discountRate - .015), lineage: "dcf-v1", terminalValueConcentration: true };
}

export type EventState = "official" | "secondary" | "rumor" | "correction" | "conflict";
export interface ResearchEvent { id: string; label: string; materiality: number; authority: number; eventAt: string; observedAt: string; state: EventState }
export function orderEvents(events: ResearchEvent[]): ResearchEvent[] {
  for (const event of events) {
    if (!Number.isFinite(Date.parse(event.eventAt)) || !Number.isFinite(Date.parse(event.observedAt)) || event.materiality < 0 || event.materiality > 5 || /买入|卖出|必涨|必跌/.test(event.label)) throw new Error("invalid_event");
  }
  return structuredClone(events).sort((left, right) => right.materiality - left.materiality || right.authority - left.authority || Date.parse(right.eventAt) - Date.parse(left.eventAt) || Date.parse(right.observedAt) - Date.parse(left.observedAt));
}
