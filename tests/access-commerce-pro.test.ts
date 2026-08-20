import assert from "node:assert/strict";
import test from "node:test";

import { UsageAccount } from "../src/credits.ts";
import { ArtifactStore, GenerationCoordinator, preflightAccess } from "../src/generation.ts";
import { BillingService, activeCatalog } from "../src/billing.ts";
import { projectArtifact, runBrooksBeta, runWyckoffBeta, synthesizeDecisionMap } from "../src/pro.ts";
import { compareArtifacts, ExportStore } from "../src/delivery.ts";
import { AlertOutbox } from "../src/alerts.ts";

const usageOptions = { now: () => Date.parse("2026-08-20T00:00:00Z") };
const authority = (plans: Record<string, "FREE" | "LITE" | "PRO"> = {}) => ({ resolvePlan: (customerId: string) => plans[customerId] ?? "PRO" as const, supportsInstrument: (instrumentId: string) => instrumentId === "HK-00700", rateFor: (packageName: "SNAPSHOT_FREE" | "CORE_LITE" | "COMPLETE_PRO") => activeCatalog.packageRates[packageName] });

test("preflight re-resolves server authority and never trusts manipulated price", () => {
  assert.deepEqual(preflightAccess({ customerId: "c1", instrumentId: "HK-00700", requestedPackage: "CORE_LITE", clientPrice: 0 }, { plan: "LITE", catalog: activeCatalog, supportedInstruments: ["HK-00700"], existingAccess: [] }), { outcome: "requires_credit", rate: 1, package: "CORE_LITE" });
  assert.equal(preflightAccess({ customerId: "c1", instrumentId: "BAD", requestedPackage: "CORE_LITE" }, { plan: "LITE", catalog: activeCatalog, supportedInstruments: ["HK-00700"], existingAccess: [] }).outcome, "unsupported");
  assert.equal(preflightAccess({ customerId: "c1", instrumentId: "HK-00700", requestedPackage: "COMPLETE_PRO", analysisFamilyKey: "family-v1" }, { plan: "PRO", catalog: activeCatalog, supportedInstruments: ["HK-00700"], existingAccess: [{ customerId: "c1", instrumentId: "HK-00700", package: "CORE_LITE", analysisFamilyKey: "family-v1" }] }).rate, 1);
});

test("generation single-flights canonical work but settles every access independently", async () => {
  const credits = new UsageAccount(usageOptions);
  credits.grant({ lotId: "included-a", customerId: "a", origin: "included", amount: 2, expiresAt: "2026-09-01T00:00:00Z" });
  credits.grant({ lotId: "purchased-b", customerId: "b", origin: "purchased", amount: 2, expiresAt: "2027-01-01T00:00:00Z" });
  const artifacts = new ArtifactStore();
  const coordinator = new GenerationCoordinator(credits, artifacts, authority({ a: "LITE", b: "LITE" }));
  const first = coordinator.request({ customerId: "a", instrumentId: "HK-00700", package: "CORE_LITE", minute: "2026-08-20T08:00Z", analysisFamilyKey: "family-v1" });
  const retry = coordinator.request({ customerId: "a", instrumentId: "HK-00700", package: "CORE_LITE", minute: "2026-08-20T08:01Z", analysisFamilyKey: "family-v1" });
  const joined = coordinator.request({ customerId: "b", instrumentId: "HK-00700", package: "CORE_LITE", minute: "2026-08-20T08:01Z", analysisFamilyKey: "family-v1" });
  assert.equal(first.generationEventId, joined.generationEventId);
  assert.equal(first.analysisAccessId, retry.analysisAccessId);
  assert.notEqual(first.analysisAccessId, joined.analysisAccessId);
  const artifact = await coordinator.publishValidated(first.generationEventId, { core: { posture: "证据分歧" }, pro: { secret: "not-for-lite" } });
  assert.match(artifact.key, /^artifacts\/sha256:/);
  assert.equal(credits.balance("a").settled, 1);
  assert.equal(credits.balance("b").settled, 1);
  assert.equal(coordinator.reopen(first.analysisAccessId).cost, 0);
  assert.equal("pro" in (coordinator.reopen(joined.analysisAccessId).artifact.payload as Record<string, unknown>), false);
  assert.equal(coordinator.request({ customerId: "a", instrumentId: "HK-00700", package: "CORE_LITE", minute: "2026-08-20T09:00Z", analysisFamilyKey: "family-v1" }).analysisAccessId, first.analysisAccessId);
});

test("failed and partial generation release or settle credits truthfully", () => {
  const credits = new UsageAccount(usageOptions);
  credits.grant({ lotId: "lot", customerId: "c", origin: "promotional", amount: 2, expiresAt: "2026-09-01T00:00:00Z" });
  const coordinator = new GenerationCoordinator(credits, new ArtifactStore(), authority());
  const request = coordinator.request({ customerId: "c", instrumentId: "HK-00700", package: "COMPLETE_PRO", minute: "2026-08-20T08:01Z", analysisFamilyKey: "family-fail" });
  coordinator.fail(request.generationEventId, "quality_failure");
  assert.equal(credits.balance("c").available, 2);
  assert.equal(coordinator.status(request.generationEventId).state, "failed");
});

test("Core-only partial publication settles Core and releases Pro reservation", async () => {
  const credits = new UsageAccount(usageOptions);
  credits.grant({ lotId: "partial-lot", customerId: "c", origin: "purchased", amount: 3, expiresAt: "2027-01-01T00:00:00Z" });
  const coordinator = new GenerationCoordinator(credits, new ArtifactStore(), authority());
  const request = coordinator.request({ customerId: "c", instrumentId: "HK-00700", package: "COMPLETE_PRO", minute: "2026-08-20T08:02Z", analysisFamilyKey: "family-partial" });
  const artifact = await coordinator.publishCoreOnly(request.generationEventId, { posture: "核心分析已通过" });
  assert.equal((artifact.payload as { publication: string }).publication, "core_only");
  assert.deepEqual(credits.balance("c"), { available: 2, reserved: 0, settled: 1, refunded: 0 });
  assert.equal(coordinator.status(request.generationEventId).state, "partial");
  const upgrade = coordinator.request({ customerId: "c", instrumentId: "HK-00700", package: "COMPLETE_PRO", minute: "2026-08-20T08:03Z", analysisFamilyKey: "family-partial" });
  await coordinator.publishValidated(upgrade.generationEventId, { core: { posture: "核心" }, pro: { posture: "专业" } });
  assert.deepEqual(credits.balance("c"), { available: 1, reserved: 0, settled: 2, refunded: 0 });
  assert.equal("pro" in (coordinator.reopen(upgrade.analysisAccessId).artifact.payload as Record<string, unknown>), true);
});

test("credit lots allocate deterministically without going negative", () => {
  const credits = new UsageAccount(usageOptions);
  credits.grant({ lotId: "later", customerId: "c", origin: "purchased", amount: 1, expiresAt: "2027-01-01T00:00:00Z" });
  credits.grant({ lotId: "soon", customerId: "c", origin: "included", amount: 1, expiresAt: "2026-09-01T00:00:00Z" });
  const reservation = credits.reserve("c", 1, "req-1");
  assert.equal(reservation.allocations[0]?.lotId, "soon");
  credits.settle(reservation.id);
  assert.throws(() => credits.reserve("c", 2, "req-2"), /insufficient_credits/);
  assert.equal(credits.activity("c").every((entry) => !JSON.stringify(entry).includes("token")), true);
});

test("billing activates only from verified idempotent provider evidence", () => {
  const credits = new UsageAccount(usageOptions);
  const billing = new BillingService(credits, { verify: (event) => event.signature === "verified" });
  const checkout = billing.createSubscriptionCheckout("c", "LITE", "HKD");
  assert.equal(billing.browserReturn(checkout.id).state, "pending");
  assert.equal(billing.acceptProviderEvent({ id: "evt-1", signature: "bad", kind: "subscription_paid", customerId: "c", referenceId: checkout.id }).accepted, false);
  assert.equal(billing.acceptProviderEvent({ id: "evt-1", signature: "verified", kind: "subscription_paid", customerId: "c", referenceId: checkout.id }).accepted, true);
  assert.equal(billing.acceptProviderEvent({ id: "evt-1", signature: "verified", kind: "subscription_paid", customerId: "c", referenceId: checkout.id }).duplicate, true);
  assert.equal(billing.plan("c"), "LITE");
});

test("usage packs extend quantity only and cancellation/refunds stay reconciled", () => {
  const credits = new UsageAccount(usageOptions);
  const billing = new BillingService(credits, { verify: (event) => event.signature === "verified" });
  const subscription = billing.createSubscriptionCheckout("c", "LITE", "HKD");
  billing.acceptProviderEvent({ id: "sub-paid", signature: "verified", kind: "subscription_paid", customerId: "c", referenceId: subscription.id });
  const pack = billing.createUsagePackCheckout("c", 3, "HKD");
  billing.acceptProviderEvent({ id: "pack-paid", signature: "verified", kind: "usage_pack_paid", customerId: "c", referenceId: pack.id });
  const unrelatedPack = billing.createUsagePackCheckout("c", 5, "HKD");
  billing.acceptProviderEvent({ id: "pack-unrelated", signature: "verified", kind: "usage_pack_paid", customerId: "c", referenceId: unrelatedPack.id });
  assert.equal(credits.balance("c").available, activeCatalog.plans.LITE.monthlyCredits + 8);
  assert.equal(billing.plan("c"), "LITE");
  const cancellation = billing.scheduleCancellation("c", "2026-09-20T00:00:00Z");
  assert.equal(cancellation.state, "scheduled");
  assert.equal(billing.plan("c"), "LITE");
  billing.applyCancellation("c", "2026-09-20T00:00:00Z");
  assert.equal(billing.plan("c"), "FREE");
  assert.equal(credits.balance("c").available, 8);
  assert.equal(billing.acceptProviderEvent({ id: "refund-1", signature: "verified", kind: "refund", customerId: "c", referenceId: pack.id }).accepted, true);
  assert.equal(credits.balance("c").available, 5);
  assert.equal(billing.acceptProviderEvent({ id: "dispute-1", signature: "verified", kind: "dispute", customerId: "c", referenceId: unrelatedPack.id }).accepted, true);
  assert.equal(credits.balance("c").available, 0);
});

test("entitlement projections never leak computed Pro data", () => {
  const artifact = { core: { posture: "证据一致" }, pro: { wyckoff: { phase: "markup" }, brooks: { regime: "trend" } } };
  assert.deepEqual(projectArtifact(artifact, "LITE"), { core: { posture: "证据一致" }, proPreview: { label: "Pro 研究方法预览", computedData: false } });
  assert.equal("pro" in projectArtifact(artifact, "PRO"), true);
  assert.equal("core" in projectArtifact(artifact, "FREE"), false);
});

test("Research Beta methods expose calibrated context and fail unknown inputs closed", () => {
  const bars = [
    { time: "2026-08-18", close: 100, high: 102, low: 98, volume: 1000 },
    { time: "2026-08-19", close: 104, high: 105, low: 99, volume: 1400 },
    { time: "2026-08-20", close: 108, high: 109, low: 103, volume: 1800 }
  ];
  const wyckoff = runWyckoffBeta(bars);
  assert.equal(wyckoff.publicationStatus, "research_beta");
  assert.equal(wyckoff.events.every((event) => ["candidate", "confirmed", "invalidated", "hindsight_confirmed"].includes(event.status)), true);
  const brooks = runBrooksBeta(bars);
  assert.equal(brooks.probability?.horizon, "5_bars");
  assert.equal(brooks.probability?.sampleSize, 1200);
  assert.equal(runWyckoffBeta([]).state, "unknown");
});

test("Decision Map preserves disagreements and refuses advice language", () => {
  const map = synthesizeDecisionMap({ fundamental: "attractive", valuation: "expensive", catalysts: "mixed", wyckoff: "markup", brooks: "trading_range" });
  assert.equal(map.disagreements.length, 2);
  assert.match(map.posture, /研究/);
  assert.doesNotMatch(JSON.stringify(map), /买入|卖出/);
});

test("comparison and exports pin immutable versions and authorized bytes", () => {
  const comparison = compareArtifacts({ id: "a1", version: 1, findings: { margin: "改善", risk: "低" } }, { id: "a2", version: 2, findings: { margin: "改善", risk: "中" } });
  assert.deepEqual(comparison.materialChanges, [{ key: "risk", before: "低", after: "中" }]);
  assert.deepEqual(comparison.unchanged, ["margin"]);
  const exports = new ExportStore(new Map([["access-1", { accessId: "access-1", customerId: "customer-1", artifactId: "a2", requiredPlan: "LITE" as const, formats: ["html" as const] }]]), () => "LITE");
  const first = exports.publish({ artifactId: "a2", accessId: "access-1", locale: "zh-CN", copyVersion: "copy-v1", methodVersion: "method-v2", evidenceVersion: "evidence-v2", qualityVersion: "quality-v1", format: "html", bytes: "<h1>证据</h1>" }, "customer-1");
  assert.equal(exports.get(first.id, "customer-1").bytes, "<h1>证据</h1>");
  assert.throws(() => exports.publish({ artifactId: "a2", accessId: "access-2", locale: "zh-CN", copyVersion: "copy-v1", methodVersion: "method-v2", evidenceVersion: "evidence-v2", qualityVersion: "quality-v1", format: "html", bytes: "<h1>证据</h1>" }, "customer-1"), /export_not_authorized/);
  assert.throws(() => exports.publish({ artifactId: "a2", accessId: "access-1", locale: "zh-CN", copyVersion: "copy-v1", methodVersion: "method-v2", evidenceVersion: "evidence-v2", qualityVersion: "quality-v1", format: "html", bytes: "javascript:alert(1)" }, "customer-1"), /unsafe_export/);
});

test("alerts deduplicate evidence events and enforce package entitlement", () => {
  const outbox = new AlertOutbox();
  assert.equal(outbox.enqueue({ customerId: "lite", plan: "LITE", requiredPlan: "PRO", instrumentId: "HK-00700", evidenceId: "ev-1", methodVersion: "wyckoff-v1", observedAt: "2026-08-20T08:00:00Z", eventAt: "2026-08-20T07:00:00Z" }).accepted, false);
  const alert = { customerId: "pro", plan: "PRO" as const, requiredPlan: "PRO" as const, instrumentId: "HK-00700", evidenceId: "ev-1", methodVersion: "wyckoff-v1", observedAt: "2026-08-20T08:00:00Z", eventAt: "2026-08-20T07:00:00Z" };
  assert.equal(outbox.enqueue(alert).accepted, true);
  assert.equal(outbox.enqueue(alert).duplicate, true);
});
