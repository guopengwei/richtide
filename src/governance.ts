export type PrivilegedRole = "customer_support" | "commercial_administrator" | "platform_operator";
import { constantTimeHexEqual, derivePasswordHash, randomSalt } from "./crypto.ts";
export interface PrivilegedSession { userId: string; role: PrivilegedRole; mfaVerified: true; stepUpAt: number }
interface Invitation { token: string; email: string; role: PrivilegedRole; inviterId: string; used: boolean }
interface PrivilegedUser { userId: string; email: string; role: PrivilegedRole; passwordSalt: string; passwordHash: string }
interface MfaVerifier { verify(email: string, otp: string): boolean | Promise<boolean> }

export class PrivilegedIdentity {
  readonly #invitations = new Map<string, Invitation>(); readonly #users = new Map<string, PrivilegedUser>(); readonly #mfa: MfaVerifier;
  constructor(mfa: MfaVerifier) { this.#mfa = mfa; }
  invite(email: string, role: PrivilegedRole, inviterId: string): Invitation {
    const invitation: Invitation = { token: `pinvite_${crypto.randomUUID()}`, email: email.toLowerCase(), role, inviterId, used: false }; this.#invitations.set(invitation.token, invitation); return { ...invitation };
  }
  async accept(tokenValue: string, password: string, otp: string): Promise<PrivilegedSession> {
    const invitation = this.#invitations.get(tokenValue);
    if (!invitation || invitation.used || password.length < 16 || !await this.#mfa.verify(invitation.email, otp)) throw new Error("invalid_privileged_invitation");
    const passwordSalt = randomSalt(); const user: PrivilegedUser = { userId: `priv_${crypto.randomUUID()}`, email: invitation.email, role: invitation.role, passwordSalt, passwordHash: await derivePasswordHash(password, passwordSalt) };
    invitation.used = true; this.#users.set(user.email, user); return { userId: user.userId, role: user.role, mfaVerified: true, stepUpAt: Date.now() };
  }
  async signIn(emailInput: string, password: string, otp: string): Promise<PrivilegedSession> {
    const email = emailInput.toLowerCase(); const user = this.#users.get(email); const candidate = await derivePasswordHash(password, user?.passwordSalt ?? "00000000000000000000000000000000");
    if (!user || !constantTimeHexEqual(user.passwordHash, candidate) || !await this.#mfa.verify(email, otp)) throw new Error("invalid_privileged_credentials");
    return { userId: user.userId, role: user.role, mfaVerified: true, stepUpAt: Date.now() };
  }
  async stepUp(session: PrivilegedSession, otp: string): Promise<PrivilegedSession> {
    const user = Array.from(this.#users.values()).find((candidate) => candidate.userId === session.userId); if (!user || !await this.#mfa.verify(user.email, otp)) throw new Error("step_up_failed"); return { ...session, mfaVerified: true, stepUpAt: Date.now() };
  }
}

export interface AuditEntry { actorId: string; role: string; purpose: string; subjectId: string; action: string; result: "allowed" | "denied" }
export class AuditLog { readonly #entries: AuditEntry[] = []; append(entry: AuditEntry): void { this.#entries.push(structuredClone(entry)); } entries(): AuditEntry[] { return structuredClone(this.#entries); } }

export class SupportConsole {
  constructor(privateAudit: AuditLog) { this.audit = privateAudit; }
  readonly audit: AuditLog;
  readTimeline(session: PrivilegedSession, customerId: string, purpose: string): { accountState: string; entitlementState: string; billingState: string; customerContent?: never } {
    if (session.role !== "customer_support" || !purpose) throw new Error("forbidden");
    this.audit.append({ actorId: session.userId, role: session.role, purpose, subjectId: customerId, action: "timeline.read", result: "allowed" });
    return { accountState: "verified", entitlementState: "active", billingState: "reconciled" };
  }
  changeCatalog(_session: PrivilegedSession): never { throw new Error("forbidden"); }
}

interface ExceptionalAccess { id: string; actorId: string; actorRole: PrivilegedRole; subjectId: string; purpose: string; capabilities: string[]; customerPolicyState: "permitted" | "restricted"; requestedAt: number; expiresAt: number; approverId?: string; revoked: boolean }
export class PrivilegedAccessController {
  readonly #requests = new Map<string, ExceptionalAccess>(); #sequence = 0; #now: () => number;
  readonly audit: AuditLog;
  constructor(audit: AuditLog, options: { now?: () => number } = {}) { this.audit = audit; this.#now = options.now ?? Date.now; }
  setNow(now: () => number): void { this.#now = now; }
  request(session: PrivilegedSession, subjectId: string, purpose: string, capabilities: string[], durationMs: number, customerPolicyState: "permitted" | "restricted" = "permitted"): ExceptionalAccess {
    if (!purpose || durationMs <= 0 || durationMs > 60 * 60_000) throw new Error("invalid_access_request");
    if (!session.mfaVerified || this.#now() - session.stepUpAt > 5 * 60_000) throw new Error("step_up_required");
    const requestedAt = this.#now(); const request: ExceptionalAccess = { id: `pa_${++this.#sequence}`, actorId: session.userId, actorRole: session.role, subjectId, purpose, capabilities: [...capabilities], customerPolicyState, requestedAt, expiresAt: requestedAt + durationMs, revoked: false };
    this.#requests.set(request.id, request); this.audit.append({ actorId: session.userId, role: session.role, purpose, subjectId, action: `access.request:${capabilities.join(",")}:${customerPolicyState}`, result: "allowed" }); return structuredClone(request);
  }
  approve(id: string, approverId: string): void { const request = this.#get(id); if (request.actorId === approverId) throw new Error("self_approval_forbidden"); request.approverId = approverId; this.audit.append({ actorId: approverId, role: "approver", purpose: request.purpose, subjectId: request.subjectId, action: "access.approve", result: "allowed" }); }
  revoke(id: string, revokerId = "system"): void { const request = this.#get(id); request.revoked = true; this.audit.append({ actorId: revokerId, role: "revoker", purpose: request.purpose, subjectId: request.subjectId, action: "access.revoke", result: "allowed" }); }
  authorize(id: string, actorId: string, capability: string): true {
    const request = this.#get(id);
    if (request.actorId !== actorId || !request.approverId || request.revoked) throw new Error("access_denied");
    if (this.#now() > request.expiresAt) throw new Error("access_expired");
    if (!request.capabilities.includes(capability)) throw new Error("scope_denied");
    this.audit.append({ actorId, role: "exceptional", purpose: request.purpose, subjectId: request.subjectId, action: capability, result: "allowed" }); return true;
  }
  #get(id: string): ExceptionalAccess { const request = this.#requests.get(id); if (!request) throw new Error("access_not_found"); return request; }
}
