import { qualifiedInstrument } from "./fixtures.ts";
import { renderInstrumentPage } from "./html.ts";
import { InstrumentCatalog } from "./instruments.ts";
import { calculateBusinessMeasures, calculateValuation, orderEvents } from "./analysis.ts";
import { EvidenceLedger, createOverview } from "./research.ts";
import { createAccessibleChart } from "./chart.ts";
import { activeCatalog } from "./billing.ts";
import { qualifyCloudflare, ratifyReleaseCandidate } from "./release.ts";
import { IdentityService } from "./identity.ts";
import { isRecord } from "./contracts.ts";

interface NotificationSink { send(message: { kind: "verify" | "recover"; recipient: string; token: string }): Promise<void> }
interface AuthDependencies { NOTIFICATIONS?: NotificationSink }

function json(value: unknown, status = 200): Response {
  return Response.json(value, { status, headers: securityHeaders({ "cache-control": "no-store" }) });
}

function securityHeaders(additional: Record<string, string> = {}): Headers {
  return new Headers({ "x-content-type-options": "nosniff", "referrer-policy": "strict-origin-when-cross-origin", "permissions-policy": "camera=(), microphone=(), geolocation=()", "x-frame-options": "DENY", ...additional });
}

const catalog = new InstrumentCatalog();
const evidence = new EvidenceLedger();
evidence.add({ id: "ev-hkex-20260819", source: "香港交易所公告", sourceLanguage: "zh-HK", chineseSummary: "季度收入增长，数据仍需结合完整财务报表判断。", observedAt: "2026-08-20T07:00:00Z", eventAt: "2026-08-19T08:00:00Z", rawHash: "sha256:fixture-only", transformLineage: ["fixture-normalize-v1"], rights: "licensed", correction: "current" });
const localCloudflareQualification = qualifyCloudflare({ inventory: true, authoritativeUsageAccount: true, replayTests: true, outboxTests: true, immutableStorage: true, containerEgress: true, observability: true, costAndRegionalReadiness: false, deployedStaging: false });

async function fetch(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  if (url.pathname === "/health/live") return json({ status: "ok" });
  if (url.pathname === "/health/ready") return json({ status: "blocked", reason: "外部与部署资格门尚未满足", qualification: localCloudflareQualification }, 503);
  if (url.pathname === "/api/instruments/HK-00700") return json(qualifiedInstrument);
  if (url.pathname === "/api/instruments" && request.method === "GET") return json({ query: url.searchParams.get("q") ?? "", results: catalog.search(url.searchParams.get("q") ?? "") });
  if (url.pathname === "/api/instruments/HK-00700/overview") return json(createOverview("HK-00700", evidence));
  if (url.pathname === "/api/instruments/HK-00700/fundamentals") return json({ measures: calculateBusinessMeasures({ revenue: [609_015, 660_257], operatingIncome: 197_337, freeCashFlow: 168_900, investedCapital: 730_000, currency: "CNY", period: "FY2025" }), state: "fixture" });
  if (url.pathname === "/api/instruments/HK-00700/valuation") return json(calculateValuation({ currentPrice: qualifiedInstrument.price, currency: "HKD", freeCashFlow: 168_900, growth: .06, discountRate: .1, terminalGrowth: .025, shares: 9_400 }));
  if (url.pathname === "/api/instruments/HK-00700/events") return json({ events: orderEvents([{ id: "event-1", label: "季度业绩公告", materiality: 4, authority: 5, eventAt: "2026-08-19T08:00:00Z", observedAt: "2026-08-20T07:00:00Z", state: "official" }]) });
  if (url.pathname === "/api/instruments/HK-00700/evidence") return json(evidence.explain("ev-hkex-20260819"));
  if (url.pathname === "/api/instruments/HK-00700/chart") return json(createAccessibleChart([{ time: "2026-08-20", price: 559.5, valuation: 530, event: "季度业绩公告" }]));
  if (url.pathname === "/api/catalog") return json(activeCatalog);
  if (url.pathname === "/api/release") return json(ratifyReleaseCandidate({ repositoryCi: true, stagingQualification: localCloudflareQualification, regulatoryPerimeter: false, airwallexApproval: false, fieldDataRights: false, taxApproval: false, privacyApproval: false, consumerTerms: false, researchBetaGate: true }));
  if (url.pathname.startsWith("/api/auth/")) return env?.IDENTITY ? env.IDENTITY.getByName("global-identity-authority").fetch(request) : json({ code: "identity_unavailable", message: "身份服务暂时不可用" }, 503);
  if (url.pathname === "/instruments/HK-00700") {
    return new Response(renderInstrumentPage(qualifiedInstrument), {
      headers: securityHeaders({ "content-type": "text/html; charset=utf-8", "content-security-policy": "default-src 'self'; connect-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'" })
    });
  }
  if (url.pathname.startsWith("/api/")) return json({ code: "not_found", message: "未找到请求的资源" }, 404);
  if (env?.ASSETS) return env.ASSETS.fetch(request);
  return Response.redirect(new URL("/instruments/HK-00700", url), 302);
}

export async function handleAuthRequest(request: Request, env: AuthDependencies, identities: IdentityService): Promise<Response> {
  const path = new URL(request.url).pathname;
  if (request.method !== "POST") return json({ code: "method_not_allowed", message: "请求方式不受支持" }, 405);
  const body: unknown = await request.json().catch(() => null); if (!isRecord(body)) return json({ code: "invalid_request", message: "请求内容无效" }, 400);
  try {
    if (path === "/api/auth/register") {
      if (typeof body.email !== "string" || typeof body.password !== "string") throw new Error("invalid_registration");
      if (!env.NOTIFICATIONS) throw new Error("notification_unavailable");
      const result = await identities.register(body.email, body.password, typeof body.role === "string" ? body.role : undefined);
      if (result.secretToken !== "opaque") await env.NOTIFICATIONS.send({ kind: "verify", recipient: body.email, token: result.secretToken });
      return json({ message: result.publicMessage }, 202);
    }
    if (path === "/api/auth/verify") { if (typeof body.token !== "string") throw new Error("invalid_or_expired"); return sessionResponse(await identities.verify(body.token)); }
    if (path === "/api/auth/sign-in") { if (typeof body.email !== "string" || typeof body.password !== "string") throw new Error("invalid_credentials"); return sessionResponse(await identities.signIn(body.email, body.password)); }
    if (path === "/api/auth/sign-out") { const sessionId = readSessionCookie(request); if (sessionId) identities.signOut(sessionId); return new Response(null, { status: 204, headers: securityHeaders({ "set-cookie": expiredSessionCookie() }) }); }
    if (path === "/api/auth/recover") {
      if (typeof body.email !== "string") throw new Error("invalid_request"); if (!env.NOTIFICATIONS) throw new Error("notification_unavailable"); const result = identities.requestRecovery(body.email);
      if (result.secretToken !== "opaque") await env.NOTIFICATIONS.send({ kind: "recover", recipient: body.email, token: result.secretToken });
      return json({ message: result.publicMessage }, 202);
    }
    if (path === "/api/auth/complete-recovery") { if (typeof body.token !== "string" || typeof body.password !== "string") throw new Error("invalid_request"); await identities.completeRecovery(body.token, body.password); return json({ message: "密码已更新，请重新登录。" }); }
    return json({ code: "not_found", message: "未找到请求的资源" }, 404);
  } catch (error) {
    const code = error instanceof Error ? error.message : "invalid_request"; const status = code === "rate_limited" ? 429 : 400;
    return json({ code, message: status === 429 ? "尝试次数过多，请稍后再试。" : "无法完成请求，请检查信息后重试。" }, status);
  }
}

function sessionResponse(session: { id: string; role: "customer" }): Response { return new Response(JSON.stringify({ role: session.role }), { headers: securityHeaders({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "set-cookie": `richtide_session=${session.id}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800` }) }); }
function readSessionCookie(request: Request): string | undefined { return request.headers.get("cookie")?.split(";").map((part) => part.trim()).find((part) => part.startsWith("richtide_session="))?.slice("richtide_session=".length); }
function expiredSessionCookie(): string { return "richtide_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"; }


export default { fetch };
