import assert from "node:assert/strict";
import test from "node:test";

import { copy, destinations } from "../src/copy.ts";
import { IdentityService } from "../src/identity.ts";
import { EvidenceLedger, createOverview } from "../src/research.ts";
import { InstrumentCatalog, WatchlistStore } from "../src/instruments.ts";
import { calculateBusinessMeasures, calculateValuation, orderEvents } from "../src/analysis.ts";
import { createAccessibleChart } from "../src/chart.ts";

test("editorial shell copy is complete Chinese and uses approved destinations", () => {
  assert.deepEqual(destinations.map((entry) => entry.label), ["概览", "基本面与企业质量", "估值与情景", "催化剂与风险", "专业技术分析", "来源与方法"]);
  assert.equal(copy("shell.fixtureNotice"), "演示数据，不用于投资决策");
  assert.throws(() => copy("unknown.key"), /Missing copy/);
});

test("customer lifecycle ignores client role assertions and prevents replay", async () => {
  const identity = new IdentityService({ now: () => 1_700_000_000_000 });
  const registration = await identity.register("reader@example.com", "correct horse battery staple", "platform_operator");
  assert.equal(registration.publicMessage, "如果该邮箱可以注册，我们已发送验证说明。");
  const session = await identity.verify(registration.secretToken);
  assert.equal(session.role, "customer");
  await assert.rejects(() => identity.verify(registration.secretToken), /invalid_or_expired/);
  identity.signOut(session.id);
  assert.throws(() => identity.requireSession(session.id), /revoked/);
  const reset = identity.requestRecovery("reader@example.com");
  await identity.completeRecovery(reset.secretToken, "new correct horse battery staple");
  assert.equal((await identity.signIn("reader@example.com", "new correct horse battery staple")).role, "customer");
  for (let attempt = 0; attempt < 5; attempt += 1) await assert.rejects(() => identity.signIn("reader@example.com", "wrong password"), /invalid_credentials/);
  await assert.rejects(() => identity.signIn("reader@example.com", "wrong password"), /rate_limited/);
});

test("sign-in throttling expires and cannot permanently deny an account", async () => {
  let now = 1_700_000_000_000; const identity = new IdentityService({ now: () => now });
  const registration = await identity.register("window@example.com", "correct horse battery staple", "platform_operator"); await identity.verify(registration.secretToken);
  for (let attempt = 0; attempt < 5; attempt += 1) await assert.rejects(() => identity.signIn("window@example.com", "wrong password"), /invalid_credentials/);
  await assert.rejects(() => identity.signIn("window@example.com", "correct horse battery staple"), /rate_limited/);
  now += 15 * 60_000;
  assert.equal((await identity.signIn("window@example.com", "correct horse battery staple")).role, "customer");
});

test("instrument search disambiguates duplicate symbols and fails closed", () => {
  const catalog = new InstrumentCatalog();
  const matches = catalog.search("700");
  assert.equal(matches.length, 2);
  assert.deepEqual(Object.keys(matches[0] ?? {}), ["canonicalId", "symbol", "legalName", "exchange", "currency", "instrumentType", "status"]);
  assert.equal(catalog.resolve("HK-00700").legalName, "腾讯控股有限公司");
  assert.throws(() => catalog.resolve("US-FAKE"), /不在当前许可范围/);
});

test("overview and evidence preserve state, source, limitation, and method", () => {
  const evidence = new EvidenceLedger();
  evidence.add({ id: "ev-1", source: "香港交易所公告", sourceLanguage: "zh-HK", chineseSummary: "季度收入增长。", observedAt: "2026-08-20T07:00:00Z", eventAt: "2026-08-19T08:00:00Z", rawHash: "sha256:abc", transformLineage: ["normalize-v1"], rights: "licensed", correction: "current" });
  const overview = createOverview("HK-00700", evidence);
  assert.equal(overview.asOf, "2026-08-20T08:00:00.000Z");
  assert.equal(overview.materialFindings[0]?.evidenceId, "ev-1");
  assert.equal(evidence.publishable("ev-1"), true);
  assert.equal(evidence.explain("ev-1").methodVersion, "overview-v1");
});

test("watchlists store identity only and isolate customers", () => {
  const store = new WatchlistStore();
  store.add("customer-a", "HK-00700");
  store.add("customer-a", "HK-00700");
  store.add("customer-b", "US-TSLA");
  assert.deepEqual(store.list("customer-a"), [{ canonicalId: "HK-00700" }]);
  assert.deepEqual(store.list("customer-b"), [{ canonicalId: "US-TSLA" }]);
});

test("business measures and valuation retain governed inputs and refuse invalid models", () => {
  const measures = calculateBusinessMeasures({ revenue: [100, 120], operatingIncome: 24, freeCashFlow: 18, investedCapital: 160, currency: "HKD", period: "FY2025" });
  assert.deepEqual(measures.map((measure) => measure.code), ["revenue_growth", "operating_margin", "fcf_margin", "roic"]);
  assert.ok(measures.every((measure) => measure.lineage.length > 0 && measure.period === "FY2025"));
  const valuation = calculateValuation({ currentPrice: 100, currency: "HKD", freeCashFlow: 12, growth: .04, discountRate: .1, terminalGrowth: .025, shares: 2 });
  assert.ok(valuation.bear < valuation.base && valuation.base < valuation.bull);
  assert.equal(valuation.currentPrice, 100);
  assert.throws(() => calculateValuation({ currentPrice: 100, currency: "HKD", freeCashFlow: -1, growth: .04, discountRate: .1, terminalGrowth: .025, shares: 2 }), /model_refused/);
});

test("events are evidence ordered and reject guessed dates and advice labels", () => {
  const ordered = orderEvents([
    { id: "a", label: "监管咨询", materiality: 2, authority: 3, eventAt: "2026-08-18T00:00:00Z", observedAt: "2026-08-19T00:00:00Z", state: "official" },
    { id: "b", label: "业绩公告", materiality: 4, authority: 5, eventAt: "2026-08-17T00:00:00Z", observedAt: "2026-08-18T00:00:00Z", state: "official" }
  ]);
  assert.equal(ordered[0]?.id, "b");
  assert.throws(() => orderEvents([{ id: "x", label: "立即买入", materiality: 5, authority: 1, eventAt: "", observedAt: "2026-08-18T00:00:00Z", state: "rumor" }]), /invalid_event/);
});

test("chart provides independent overlays and a semantic text equivalent", () => {
  const chart = createAccessibleChart([{ time: "2026-08-20", price: 100, valuation: 95, event: "业绩公告" }]);
  assert.deepEqual(chart.overlays, ["价格", "事件", "估值", "技术", "目标", "失效条件", "高周期"]);
  assert.match(chart.tableText, /2026-08-20.*100 HKD.*业绩公告/);
  assert.equal(chart.animation, "optional");
});
