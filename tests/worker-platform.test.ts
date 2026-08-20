import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import worker from "../src/app.ts";
import { handleAuthRequest } from "../src/app.ts";
import { IdentityService } from "../src/identity.ts";

test("research APIs expose governed fixture projections end to end", async () => {
  for (const path of ["overview", "fundamentals", "valuation", "events", "evidence", "chart"]) {
    const response = await worker.fetch(new Request(`https://richtide.test/api/instruments/HK-00700/${path}`));
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/);
    assert.doesNotMatch(await response.text(), /undefined|NaN/);
  }
});

test("response security policy blocks embedding, ambient capabilities, and external scripts", async () => {
  const response = await worker.fetch(new Request("https://richtide.test/instruments/HK-00700"));
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy") ?? "", /script-src 'self'/);
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/);
});

test("PWA cache explicitly excludes protected and authority-dependent paths", async () => {
  const source = await readFile(new URL("../public/service-worker.js", import.meta.url), "utf8");
  assert.match(source, /\/api\//);
  assert.match(source, /\/exports\//);
  assert.match(source, /\/admin\//);
  assert.doesNotMatch(source, /cache\.put/);
});

test("readiness and release stay fail closed without staging and approvals", async () => {
  const ready = await worker.fetch(new Request("https://richtide.test/health/ready"));
  assert.equal(ready.status, 503);
  const release = await (await worker.fetch(new Request("https://richtide.test/api/release"))).json() as { decision: string; activationPermitted: boolean; blockers: string[] };
  assert.equal(release.decision, "blocked");
  assert.equal(release.activationPermitted, false);
  assert.ok(release.blockers.length >= 7);
});

test("customer registration, verification, session, and sign-out work through HTTP without role assertion", async () => {
  const sent: Array<{ kind: "verify" | "recover"; recipient: string; token: string }> = [];
  const identities = new IdentityService();
  const notifications = { send: async (message: { kind: "verify" | "recover"; recipient: string; token: string }) => { sent.push(message); } };
  const env = { NOTIFICATIONS: notifications, IDENTITY: { getByName: () => ({ fetch: (request: Request) => handleAuthRequest(request, { NOTIFICATIONS: notifications }, identities) }) } };
  const registration = await worker.fetch(new Request("https://richtide.test/api/auth/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "http@example.com", password: "a very secure customer passphrase", role: "platform_operator" }) }), env);
  assert.equal(registration.status, 202);
  assert.equal((await registration.text()).includes("token"), false);
  assert.equal(sent.length, 1);
  const verification = await worker.fetch(new Request("https://richtide.test/api/auth/verify", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token: sent[0]?.token }) }), env);
  assert.equal(verification.status, 200);
  assert.deepEqual(await verification.json(), { role: "customer" });
  const cookie = verification.headers.get("set-cookie") ?? "";
  assert.match(cookie, /HttpOnly; Secure; SameSite=Lax/);
  const signOut = await worker.fetch(new Request("https://richtide.test/api/auth/sign-out", { method: "POST", headers: { cookie }, body: "{}" }), env);
  assert.equal(signOut.status, 204);
});

test("interrupted verification delivery can be retried without stranding the account", async () => {
  const identities = new IdentityService(); let attempts = 0; const sent: string[] = [];
  const notifications = { send: async (message: { token: string }) => { attempts += 1; if (attempts === 1) throw new Error("delivery_interrupted"); sent.push(message.token); } };
  const identityBinding = { getByName: () => ({ fetch: (request: Request) => handleAuthRequest(request, { NOTIFICATIONS: notifications }, identities) }) };
  const request = () => new Request("https://richtide.test/api/auth/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: "retry@example.com", password: "a very secure customer passphrase" }) });
  assert.equal((await worker.fetch(request(), { IDENTITY: identityBinding } as never)).status, 400);
  assert.equal((await worker.fetch(request(), { IDENTITY: identityBinding } as never)).status, 202);
  assert.equal(sent.length, 1);
});
