import { DurableObject } from "cloudflare:workers";

import app, { handleAuthRequest } from "./app.ts";
import { IdentityService, type IdentitySnapshot } from "./identity.ts";

export default app;

export class IdentityDurableObject extends DurableObject<Env> {
  #identities = new IdentityService(); readonly #ready: Promise<void>;
  constructor(state: DurableObjectState, env: Env) { super(state, env); this.#ready = state.blockConcurrencyWhile(async () => { const snapshot = await state.storage.get<IdentitySnapshot>("identity"); if (snapshot) this.#identities = new IdentityService({ snapshot }); }); }
  async fetch(request: Request): Promise<Response> { await this.#ready; const response = await handleAuthRequest(request, { NOTIFICATIONS: emailNotificationSink(this.env.EMAIL) }, this.#identities); await this.ctx.storage.put("identity", this.#identities.snapshot()); return response; }
}

function emailNotificationSink(email: SendEmail) {
  return { send: async ({ kind, recipient, token }: { kind: "verify" | "recover"; recipient: string; token: string }) => { const action = kind === "verify" ? "验证邮箱" : "恢复密码"; const path = kind === "verify" ? "verify" : "recover"; const link = `https://rich-tide.com/${path}?token=${encodeURIComponent(token)}`; await email.send({ to: recipient, from: { email: "account@rich-tide.com", name: "RichTide" }, subject: `RichTide ${action}`, text: `${action}：${link}\n此链接将在 15 分钟后失效。`, html: `<p>${action}：</p><p><a href="${link}">${link}</a></p><p>此链接将在 15 分钟后失效。</p>` }); } };
}
