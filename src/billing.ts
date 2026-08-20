import type { AnalysisPackage } from "./generation.ts";
import type { UsageAccount } from "./credits.ts";

export type Plan = "FREE" | "LITE" | "PRO";
export const activeCatalog = {
  version: "hk-conditional-2026-08-20",
  currency: "HKD",
  packageRates: { SNAPSHOT_FREE: 0, CORE_LITE: 1, COMPLETE_PRO: 2 } satisfies Record<AnalysisPackage, number>,
  plans: { FREE: { monthlyCredits: 0 }, LITE: { monthlyCredits: 5 }, PRO: { monthlyCredits: 12 } }
};
interface ProviderEvent { id: string; signature: string; kind: "subscription_paid" | "usage_pack_paid" | "refund" | "dispute"; customerId: string; referenceId: string }
interface Checkout { id: string; customerId: string; kind: "subscription" | "usage_pack"; plan?: Plan; creditAmount?: number; currency: string; state: "pending" | "active" | "refunded" | "disputed" }
export class BillingService {
  readonly #checkouts = new Map<string, Checkout>(); readonly #events = new Set<string>(); readonly #plans = new Map<string, Plan>(); readonly #cancellations = new Map<string, { state: "scheduled"; effectiveAt: string }>(); readonly #purchaseLots = new Map<string, string>(); #sequence = 0;
  readonly credits: UsageAccount;
  readonly provider: { verify(event: ProviderEvent): boolean };
  constructor(credits: UsageAccount, provider: { verify(event: ProviderEvent): boolean }) { this.credits = credits; this.provider = provider; }
  createSubscriptionCheckout(customerId: string, plan: Exclude<Plan, "FREE">, currency: string): Checkout {
    if (currency !== activeCatalog.currency || !activeCatalog.plans[plan]) throw new Error("catalog_mismatch");
    const checkout: Checkout = { id: `checkout_${++this.#sequence}`, customerId, kind: "subscription", plan, currency, state: "pending" }; this.#checkouts.set(checkout.id, checkout); return structuredClone(checkout);
  }
  createUsagePackCheckout(customerId: string, creditAmount: number, currency: string): Checkout {
    if (this.plan(customerId) === "FREE" || currency !== activeCatalog.currency || ![3, 5, 10].includes(creditAmount)) throw new Error("usage_pack_not_eligible");
    const checkout: Checkout = { id: `checkout_${++this.#sequence}`, customerId, kind: "usage_pack", creditAmount, currency, state: "pending" }; this.#checkouts.set(checkout.id, checkout); return structuredClone(checkout);
  }
  browserReturn(id: string): Checkout { const checkout = this.#checkouts.get(id); if (!checkout) throw new Error("checkout_not_found"); return structuredClone(checkout); }
  acceptProviderEvent(event: ProviderEvent): { accepted: boolean; duplicate?: boolean } {
    if (this.#events.has(event.id)) return { accepted: true, duplicate: true };
    if (!this.provider.verify(event)) return { accepted: false };
    const checkout = this.#checkouts.get(event.referenceId); if (!checkout || checkout.customerId !== event.customerId) return { accepted: false };
    const purchaseLotId = this.#purchaseLots.get(checkout.id);
    const allowed = (event.kind === "subscription_paid" && checkout.kind === "subscription" && checkout.state === "pending") || (event.kind === "usage_pack_paid" && checkout.kind === "usage_pack" && checkout.state === "pending") || (event.kind === "refund" && checkout.kind === "usage_pack" && checkout.state === "active" && Boolean(purchaseLotId) && this.credits.isWhollyUnusedPurchaseLot(event.customerId, purchaseLotId ?? "")) || (event.kind === "dispute" && checkout.kind === "usage_pack" && checkout.state === "active" && Boolean(purchaseLotId));
    if (!allowed) return { accepted: false };
    this.#events.add(event.id);
    if (event.kind === "subscription_paid" && checkout.plan) { checkout.state = "active"; this.#plans.set(event.customerId, checkout.plan); this.credits.grant({ lotId: `included_${event.id}`, customerId: event.customerId, origin: "included", amount: activeCatalog.plans[checkout.plan].monthlyCredits, expiresAt: "2026-09-20T00:00:00Z" }); }
    if (event.kind === "usage_pack_paid" && checkout.creditAmount) { checkout.state = "active"; const lotId = `purchased_${event.id}`; this.credits.grant({ lotId, customerId: event.customerId, origin: "purchased", amount: checkout.creditAmount, expiresAt: "2027-08-20T00:00:00Z" }); this.#purchaseLots.set(checkout.id, lotId); }
    if (event.kind === "refund" && checkout.kind === "usage_pack") { const lotId = this.#purchaseLots.get(checkout.id); if (!lotId || !checkout.creditAmount) return { accepted: false }; this.credits.revokeLotAvailable(event.customerId, lotId, checkout.creditAmount, event.id); checkout.state = "refunded"; }
    if (event.kind === "dispute" && checkout.kind === "usage_pack") { const lotId = this.#purchaseLots.get(checkout.id); if (!lotId) return { accepted: false }; this.credits.freezeLot(event.customerId, lotId); checkout.state = "disputed"; }
    return { accepted: true };
  }
  plan(customerId: string): Plan { return this.#plans.get(customerId) ?? "FREE"; }
  scheduleCancellation(customerId: string, effectiveAt: string): { state: "scheduled"; effectiveAt: string } {
    if (this.plan(customerId) === "FREE" || !Number.isFinite(Date.parse(effectiveAt))) throw new Error("cancellation_not_allowed");
    const cancellation = { state: "scheduled" as const, effectiveAt }; this.#cancellations.set(customerId, cancellation); return { ...cancellation };
  }
  applyCancellation(customerId: string, now: string): void {
    const cancellation = this.#cancellations.get(customerId); if (!cancellation || Date.parse(now) < Date.parse(cancellation.effectiveAt)) throw new Error("cancellation_not_effective");
    this.#plans.set(customerId, "FREE"); this.credits.revokeAvailable(customerId, "included", Number.POSITIVE_INFINITY, `cancel:${cancellation.effectiveAt}`); this.#cancellations.delete(customerId);
  }
}
