export type CustomerRole = "customer";
import { constantTimeHexEqual, derivePasswordHash, randomSalt } from "./crypto.ts";
interface User { id: string; email: string; passwordHash: string; passwordSalt: string; verified: boolean }
interface Token { kind: "verify" | "recover"; userId: string; expiresAt: number; used: boolean }
export interface Session { id: string; userId: string; role: CustomerRole; expiresAt: number; revoked: boolean }
export interface IdentitySnapshot { users: Array<[string, User]>; tokens: Array<[string, Token]>; sessions: Array<[string, Session]>; failedSignIns: Array<[string, { count: number; windowStartedAt: number }]> }


export class IdentityService {
  readonly #users = new Map<string, User>();
  readonly #tokens = new Map<string, Token>();
  readonly #sessions = new Map<string, Session>();
  readonly #failedSignIns = new Map<string, { count: number; windowStartedAt: number }>();
  readonly #now: () => number;

  constructor(options: { now?: () => number; snapshot?: IdentitySnapshot } = {}) {
    this.#now = options.now ?? Date.now;
    if (options.snapshot) { for (const entry of options.snapshot.users) this.#users.set(...entry); for (const entry of options.snapshot.tokens) this.#tokens.set(...entry); for (const entry of options.snapshot.sessions) this.#sessions.set(...entry); for (const entry of options.snapshot.failedSignIns) this.#failedSignIns.set(...entry); }
  }

  #id(prefix: string): string { return `${prefix}_${crypto.randomUUID()}`; }
  snapshot(): IdentitySnapshot { return { users: structuredClone(Array.from(this.#users.entries())), tokens: structuredClone(Array.from(this.#tokens.entries())), sessions: structuredClone(Array.from(this.#sessions.entries())), failedSignIns: structuredClone(Array.from(this.#failedSignIns.entries())) }; }

  async register(emailInput: string, password: string, _requestedRole?: string): Promise<{ publicMessage: string; secretToken: string }> {
    const email = emailInput.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 12) throw new Error("invalid_registration");
    const existing = this.#users.get(email);
    if (existing?.verified) return { publicMessage: "如果该邮箱可以注册，我们已发送验证说明。", secretToken: "opaque" };
    if (existing) { const secretToken = this.#id("verify"); this.#tokens.set(secretToken, { kind: "verify", userId: existing.id, expiresAt: this.#now() + 15 * 60_000, used: false }); return { publicMessage: "如果该邮箱可以注册，我们已发送验证说明。", secretToken }; }
    const passwordSalt = randomSalt();
    const user: User = { id: this.#id("usr"), email, passwordHash: await derivePasswordHash(password, passwordSalt), passwordSalt, verified: false };
    this.#users.set(email, user);
    const secretToken = this.#id("verify");
    this.#tokens.set(secretToken, { kind: "verify", userId: user.id, expiresAt: this.#now() + 15 * 60_000, used: false });
    return { publicMessage: "如果该邮箱可以注册，我们已发送验证说明。", secretToken };
  }

  async verify(tokenValue: string): Promise<Session> {
    const token = this.#consume(tokenValue, "verify");
    const user = Array.from(this.#users.values()).find((candidate) => candidate.id === token.userId);
    if (!user) throw new Error("invalid_or_expired");
    user.verified = true;
    return this.#createSession(user.id);
  }

  async signIn(emailInput: string, password: string): Promise<Session> {
    const email = emailInput.trim().toLowerCase();
    const attempts = this.#failedSignIns.get(email); if (attempts && this.#now() - attempts.windowStartedAt >= 15 * 60_000) this.#failedSignIns.delete(email);
    if ((this.#failedSignIns.get(email)?.count ?? 0) >= 5) throw new Error("rate_limited");
    const user = this.#users.get(email);
    const candidate = user ? await derivePasswordHash(password, user.passwordSalt) : await derivePasswordHash(password, "00000000000000000000000000000000");
    if (!user || !user.verified || !constantTimeHexEqual(user.passwordHash, candidate)) { const current = this.#failedSignIns.get(email); this.#failedSignIns.set(email, { count: (current?.count ?? 0) + 1, windowStartedAt: current?.windowStartedAt ?? this.#now() }); throw new Error("invalid_credentials"); }
    this.#failedSignIns.delete(email);
    return this.#createSession(user.id);
  }

  signOut(sessionId: string): void { const session = this.#sessions.get(sessionId); if (session) session.revoked = true; }
  requireSession(sessionId: string): Session {
    const session = this.#sessions.get(sessionId);
    if (!session || session.revoked || session.expiresAt < this.#now()) throw new Error("revoked");
    return { ...session };
  }
  requestRecovery(emailInput: string): { publicMessage: string; secretToken: string } {
    const user = this.#users.get(emailInput.trim().toLowerCase());
    const secretToken = this.#id("recover");
    if (user) this.#tokens.set(secretToken, { kind: "recover", userId: user.id, expiresAt: this.#now() + 15 * 60_000, used: false });
    return { publicMessage: "如果该邮箱存在，我们已发送恢复说明。", secretToken };
  }
  async completeRecovery(tokenValue: string, password: string): Promise<void> {
    if (password.length < 12) throw new Error("invalid_password");
    const token = this.#consume(tokenValue, "recover");
    const user = Array.from(this.#users.values()).find((candidate) => candidate.id === token.userId);
    if (!user) throw new Error("invalid_or_expired");
    user.passwordSalt = randomSalt(); user.passwordHash = await derivePasswordHash(password, user.passwordSalt); this.#failedSignIns.delete(user.email);
    for (const session of this.#sessions.values()) if (session.userId === user.id) session.revoked = true;
  }
  #consume(tokenValue: string, kind: Token["kind"]): Token {
    const token = this.#tokens.get(tokenValue);
    if (!token || token.kind !== kind || token.used || token.expiresAt < this.#now()) throw new Error("invalid_or_expired");
    token.used = true;
    return token;
  }
  #createSession(userId: string): Session {
    const session: Session = { id: this.#id("ses"), userId, role: "customer", expiresAt: this.#now() + 8 * 60 * 60_000, revoked: false };
    this.#sessions.set(session.id, session);
    return { ...session };
  }
}
