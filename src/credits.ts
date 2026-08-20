export type CreditOrigin = "included" | "purchased" | "promotional";
export interface CreditLotInput { lotId: string; customerId: string; origin: CreditOrigin; amount: number; expiresAt: string }
interface CreditLot extends CreditLotInput { available: number; reserved: number; settled: number; refunded: number; status: "active" | "frozen" | "expired" }
interface Allocation { lotId: string; amount: number }
interface Reservation { id: string; customerId: string; requestId: string; amount: number; allocations: Allocation[]; status: "reserved" | "settled" | "partial" | "released" }
interface Activity { type: "grant" | "reserve" | "settle" | "release" | "refund" | "expire"; amount: number; reference: string; at: string }
export interface AnalysisAccessRecord { key: string; accessId: string; customerId: string; artifactId: string; state: "free_granted" | "core_granted" | "pro_granted" }

export class UsageAccount {
  readonly #lots = new Map<string, CreditLot>();
  readonly #reservations = new Map<string, Reservation>();
  readonly #activity = new Map<string, Activity[]>();
  readonly #analysisAccess = new Map<string, AnalysisAccessRecord>();
  #sequence = 0;
  readonly #now: () => number;

  constructor(options: { now?: () => number } = {}) { this.#now = options.now ?? Date.now; }

  grant(input: CreditLotInput): void {
    if (this.#lots.has(input.lotId)) return;
    if (!Number.isInteger(input.amount) || input.amount <= 0 || !Number.isFinite(Date.parse(input.expiresAt))) throw new Error("invalid_credit_lot");
    this.#lots.set(input.lotId, { ...input, available: input.amount, reserved: 0, settled: 0, refunded: 0, status: "active" });
    this.#record(input.customerId, { type: "grant", amount: input.amount, reference: input.lotId, at: new Date(this.#now()).toISOString() });
  }

  reserve(customerId: string, amount: number, requestId: string): Reservation {
    const prior = Array.from(this.#reservations.values()).find((entry) => entry.customerId === customerId && entry.requestId === requestId);
    if (prior) return structuredClone(prior);
    const eligible = Array.from(this.#lots.values()).filter((lot) => lot.customerId === customerId && lot.status === "active" && lot.available > 0 && Date.parse(lot.expiresAt) > this.#now()).sort((a, b) => Date.parse(a.expiresAt) - Date.parse(b.expiresAt) || a.origin.localeCompare(b.origin) || a.lotId.localeCompare(b.lotId));
    if (eligible.reduce((sum, lot) => sum + lot.available, 0) < amount) throw new Error("insufficient_credits");
    let remaining = amount; const allocations: Allocation[] = [];
    for (const lot of eligible) {
      if (remaining === 0) break;
      const take = Math.min(lot.available, remaining); lot.available -= take; lot.reserved += take; remaining -= take;
      allocations.push({ lotId: lot.lotId, amount: take });
    }
    const reservation: Reservation = { id: `res_${++this.#sequence}`, customerId, requestId, amount, allocations, status: "reserved" };
    this.#reservations.set(reservation.id, reservation);
    this.#record(customerId, { type: "reserve", amount, reference: reservation.id, at: new Date(this.#now()).toISOString() });
    return structuredClone(reservation);
  }

  settle(reservationId: string): void { this.#transition(reservationId, "settled"); }
  release(reservationId: string): void { this.#transition(reservationId, "released"); }
  closeWithAnalysisAccess(reservationId: string, access: AnalysisAccessRecord, partialAmount?: number): void {
    if (this.#analysisAccess.has(access.key)) return;
    this.#analysisAccess.set(access.key, structuredClone(access));
    try { if (reservationId !== "free") { if (partialAmount === undefined) this.settle(reservationId); else this.settlePartial(reservationId, partialAmount); } } catch (error) { this.#analysisAccess.delete(access.key); throw error; }
  }
  findAnalysisAccess(key: string): AnalysisAccessRecord | undefined { const access = this.#analysisAccess.get(key); return access ? structuredClone(access) : undefined; }
  findAnalysisAccessById(accessId: string): AnalysisAccessRecord | undefined { const access = Array.from(this.#analysisAccess.values()).find((candidate) => candidate.accessId === accessId); return access ? structuredClone(access) : undefined; }
  settlePartial(reservationId: string, amount: number): void {
    const reservation = this.#reservations.get(reservationId);
    if (!reservation || reservation.status !== "reserved" || amount <= 0 || amount >= reservation.amount) throw new Error("invalid_partial_settlement");
    let toSettle = amount;
    for (const allocation of reservation.allocations) {
      const lot = this.#lots.get(allocation.lotId); if (!lot) throw new Error("credit_lot_not_found");
      lot.reserved -= allocation.amount;
      const settled = Math.min(allocation.amount, toSettle); lot.settled += settled; lot.available += allocation.amount - settled; toSettle -= settled;
    }
    reservation.status = "partial";
    this.#record(reservation.customerId, { type: "settle", amount, reference: reservation.id, at: new Date(this.#now()).toISOString() });
    this.#record(reservation.customerId, { type: "release", amount: reservation.amount - amount, reference: reservation.id, at: new Date(this.#now()).toISOString() });
  }
  #transition(reservationId: string, target: "settled" | "released"): void {
    const reservation = this.#reservations.get(reservationId);
    if (!reservation) throw new Error("reservation_not_found");
    if (reservation.status === target) return;
    if (reservation.status !== "reserved") throw new Error("invalid_reservation_transition");
    for (const allocation of reservation.allocations) {
      const lot = this.#lots.get(allocation.lotId); if (!lot) throw new Error("credit_lot_not_found");
      lot.reserved -= allocation.amount;
      if (target === "settled") lot.settled += allocation.amount; else lot.available += allocation.amount;
    }
    reservation.status = target;
    this.#record(reservation.customerId, { type: target === "settled" ? "settle" : "release", amount: reservation.amount, reference: reservation.id, at: new Date(this.#now()).toISOString() });
  }
  balance(customerId: string) {
    const lots = Array.from(this.#lots.values()).filter((lot) => lot.customerId === customerId);
    for (const lot of lots) if (lot.status === "active" && Date.parse(lot.expiresAt) <= this.#now()) { const expiredAmount = lot.available; lot.available = 0; lot.status = "expired"; this.#record(customerId, { type: "expire", amount: expiredAmount, reference: lot.lotId, at: new Date(this.#now()).toISOString() }); }
    return { available: lots.reduce((sum, lot) => sum + (lot.status === "active" ? lot.available : 0), 0), reserved: lots.reduce((sum, lot) => sum + lot.reserved, 0), settled: lots.reduce((sum, lot) => sum + lot.settled, 0), refunded: lots.reduce((sum, lot) => sum + lot.refunded, 0) };
  }
  activity(customerId: string): Activity[] { return structuredClone(this.#activity.get(customerId) ?? []); }
  revokeAvailable(customerId: string, origin: CreditOrigin, amount = Number.POSITIVE_INFINITY, reference = "policy"): number {
    let remaining = amount; let revoked = 0;
    const lots = Array.from(this.#lots.values()).filter((lot) => lot.customerId === customerId && lot.origin === origin && lot.available > 0).sort((a, b) => Date.parse(a.expiresAt) - Date.parse(b.expiresAt));
    for (const lot of lots) {
      if (remaining <= 0) break;
      const take = Math.min(lot.available, remaining); lot.available -= take; lot.refunded += take; revoked += take; remaining -= take;
      if (lot.available === 0 && lot.reserved === 0) lot.status = "frozen";
    }
    if (revoked > 0) this.#record(customerId, { type: "refund", amount: revoked, reference, at: new Date(this.#now()).toISOString() });
    return revoked;
  }
  revokeLotAvailable(customerId: string, lotId: string, amount: number, reference: string): number {
    const lot = this.#lots.get(lotId); if (!lot || lot.customerId !== customerId || lot.origin !== "purchased") throw new Error("purchase_lot_not_found");
    if (lot.available !== amount || lot.reserved !== 0 || lot.settled !== 0) throw new Error("purchase_lot_not_wholly_unused");
    const revoked = Math.min(lot.available, amount); lot.available -= revoked; lot.refunded += revoked; if (lot.available === 0 && lot.reserved === 0) lot.status = "frozen";
    if (revoked > 0) this.#record(customerId, { type: "refund", amount: revoked, reference, at: new Date(this.#now()).toISOString() }); return revoked;
  }
  isWhollyUnusedPurchaseLot(customerId: string, lotId: string): boolean { const lot = this.#lots.get(lotId); return Boolean(lot && lot.customerId === customerId && lot.origin === "purchased" && lot.status === "active" && lot.available === lot.amount && lot.reserved === 0 && lot.settled === 0); }
  freezeLot(customerId: string, lotId: string): void { const lot = this.#lots.get(lotId); if (!lot || lot.customerId !== customerId || lot.origin !== "purchased") throw new Error("purchase_lot_not_found"); lot.status = "frozen"; }
  #record(customerId: string, activity: Activity): void { this.#activity.set(customerId, [...(this.#activity.get(customerId) ?? []), activity]); }
}
