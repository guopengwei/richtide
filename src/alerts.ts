import type { Plan } from "./billing.ts";
interface AlertInput { customerId: string; plan: Plan; requiredPlan: "LITE" | "PRO"; instrumentId: string; evidenceId: string; methodVersion: string; observedAt: string; eventAt: string }
export class AlertOutbox {
  readonly #dedupe = new Set<string>();
  enqueue(input: AlertInput): { accepted: boolean; duplicate?: boolean; reason?: string } {
    if (input.requiredPlan === "PRO" && input.plan !== "PRO") return { accepted: false, reason: "not_entitled" };
    if (input.requiredPlan === "LITE" && input.plan === "FREE") return { accepted: false, reason: "not_entitled" };
    const key = `${input.customerId}:${input.instrumentId}:${input.evidenceId}:${input.methodVersion}:${input.eventAt}`;
    if (this.#dedupe.has(key)) return { accepted: true, duplicate: true };
    this.#dedupe.add(key); return { accepted: true };
  }
}
