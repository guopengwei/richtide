interface SearchResult { canonicalId: string; symbol: string; legalName: string; exchange: string; currency: string; instrumentType: string; status: "supported" | "stale" }

const instruments: readonly SearchResult[] = [
  { canonicalId: "HK-00700", symbol: "00700", legalName: "腾讯控股有限公司", exchange: "香港交易所", currency: "HKD", instrumentType: "普通股", status: "supported" },
  { canonicalId: "SZ-00700", symbol: "00700", legalName: "模糊代码测试股份有限公司", exchange: "深圳证券交易所", currency: "CNY", instrumentType: "普通股", status: "stale" },
  { canonicalId: "US-TSLA", symbol: "TSLA", legalName: "特斯拉公司", exchange: "纳斯达克", currency: "USD", instrumentType: "普通股", status: "supported" }
];

export class InstrumentCatalog {
  search(queryInput: string): SearchResult[] {
    const query = queryInput.trim().toLocaleUpperCase("zh-CN").replace(/^0+/, "");
    if (!query) return [];
    return instruments.filter((item) => [item.symbol.replace(/^0+/, ""), item.legalName.toLocaleUpperCase("zh-CN"), item.exchange.toLocaleUpperCase("zh-CN"), item.canonicalId].some((value) => value.includes(query))).map((item) => ({ ...item }));
  }
  resolve(canonicalId: string): SearchResult {
    const result = instruments.find((item) => item.canonicalId === canonicalId);
    if (!result || result.status !== "supported") throw new Error("该证券不在当前许可范围");
    return { ...result };
  }
}

export class WatchlistStore {
  readonly #records = new Map<string, Set<string>>();
  add(customerId: string, canonicalId: string): void {
    const list = this.#records.get(customerId) ?? new Set<string>();
    list.add(canonicalId);
    this.#records.set(customerId, list);
  }
  remove(customerId: string, canonicalId: string): void { this.#records.get(customerId)?.delete(canonicalId); }
  list(customerId: string): Array<{ canonicalId: string }> { return Array.from(this.#records.get(customerId) ?? []).map((canonicalId) => ({ canonicalId })); }
}
