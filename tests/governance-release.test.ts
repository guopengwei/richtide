import assert from "node:assert/strict";
import test from "node:test";

import { AuditLog, PrivilegedAccessController, PrivilegedIdentity, SupportConsole } from "../src/governance.ts";
import { CatalogGovernance, OperationsConsole } from "../src/operations.ts";
import { RenditionCorrections } from "../src/corrections.ts";
import { gatewayProfile, SecurityBoundary, verifySignedDelivery } from "../src/security.ts";
import { qualifyCloudflare, ratifyReleaseCandidate } from "../src/release.ts";

test("support actions are purpose-bound, least privilege, and audited", async () => {
  const identities = new PrivilegedIdentity({ verify: (_email, otp) => otp === "123456" });
  const invitation = identities.invite("support@example.com", "customer_support", "platform-admin");
  const support = await identities.accept(invitation.token, "a secure privileged passphrase", "123456");
  assert.equal((await identities.signIn("support@example.com", "a secure privileged passphrase", "123456")).mfaVerified, true);
  await assert.rejects(() => identities.stepUp(support, "000000"), /step_up_failed/);
  const audit = new AuditLog();
  const console = new SupportConsole(audit);
  const result = console.readTimeline(support, "customer-1", "billing_reconciliation");
  assert.equal(result.customerContent, undefined);
  assert.deepEqual(audit.entries()[0], { actorId: support.userId, role: "customer_support", purpose: "billing_reconciliation", subjectId: "customer-1", action: "timeline.read", result: "allowed" });
  assert.throws(() => console.changeCatalog(support), /forbidden/);
});

test("commercial catalogs require separated evidence and dual approval", () => {
  const catalogs = new CatalogGovernance();
  const draft = catalogs.draft("catalog-v2", { economic: true, payment: true, tax: true, legal: true, product: true, operations: true }, "commercial-a");
  catalogs.approve(draft.id, "commercial-b");
  assert.equal(catalogs.activate(draft.id, "commercial-c").state, "active");
  assert.throws(() => catalogs.draft("bad", { economic: true, payment: false, tax: true, legal: true, product: true, operations: true }, "commercial-a"), /missing_activation_evidence/);
});

test("operations recovery is idempotent and cannot grant access or inspect content", () => {
  const operations = new OperationsConsole();
  assert.deepEqual(operations.recover("gen-1", "workflow_retry", "operator-1"), { accepted: true, correlationId: "recovery:gen-1:workflow_retry" });
  assert.equal(operations.recover("gen-1", "workflow_retry", "operator-1").duplicate, true);
  assert.throws(() => operations.recover("gen-1", "grant_access", "operator-1"), /forbidden_recovery_action/);
  assert.equal("customerContent" in operations.inspect("gen-1"), false);
});

test("exceptional access rejects self approval, expires, and records reads", () => {
  const audit = new AuditLog();
  const access = new PrivilegedAccessController(audit, { now: () => 1000 });
  const operator = { userId: "operator-1", role: "platform_operator" as const, mfaVerified: true as const, stepUpAt: 900 };
  const request = access.request(operator, "customer-1", "incident_diagnosis", ["artifact.metadata.read"], 500);
  assert.throws(() => access.approve(request.id, "operator-1"), /self_approval_forbidden/);
  access.approve(request.id, "security-1");
  assert.equal(access.authorize(request.id, "operator-1", "artifact.metadata.read"), true);
  access.setNow(() => 1600);
  assert.throws(() => access.authorize(request.id, "operator-1", "artifact.metadata.read"), /access_expired/);
});

test("copy corrections create immutable zero-cost renditions", () => {
  const corrections = new RenditionCorrections();
  const original = corrections.publish("artifact-1", "access-1", "copy-v1", "原始文字");
  const corrected = corrections.correct(original.id, "copy-v2", "更正后的文字", "editor-1", "approver-1");
  assert.equal(corrected.artifactId, original.artifactId);
  assert.equal(corrected.analysisCreditCost, 0);
  assert.equal(corrected.supersedes, original.id);
  assert.equal(corrections.get(original.id).bytes, "原始文字");
});

test("security boundary pins gateway, isolates subjects, and verifies delivery", async () => {
  assert.deepEqual(gatewayProfile, { baseUrl: "https://api.rich-tide.com/v1", model: "gpt-5.6-sol", reasoningEffort: "medium", fallback: "none" });
  const boundary = new SecurityBoundary(["api.rich-tide.com", "api.airwallex.com"]);
  assert.throws(() => boundary.authorize("customer-a", "customer-b", "artifact.read"), /subject_mismatch/);
  assert.throws(() => boundary.allowEgress("evil.example"), /egress_denied/);
  const signature = await boundary.signDelivery("artifact-1", 2000, "secret");
  assert.equal(await verifySignedDelivery(signature, "artifact-1", 1500, "secret"), true);
  assert.equal(await verifySignedDelivery(signature, "artifact-1", 2500, "secret"), false);
});

test("Cloudflare and release qualification remain blocked without deployed and external evidence", () => {
  const qualification = qualifyCloudflare({ inventory: true, authoritativeUsageAccount: true, replayTests: true, outboxTests: true, immutableStorage: true, containerEgress: true, observability: true, costAndRegionalReadiness: false, deployedStaging: false });
  assert.equal(qualification.qualified, false);
  assert.deepEqual(qualification.blockers, ["CF-7 成本与区域就绪证据缺失", "CF-8 尚无部署后的暂存环境证据"]);
  const release = ratifyReleaseCandidate({ repositoryCi: true, stagingQualification: qualification, regulatoryPerimeter: false, airwallexApproval: false, fieldDataRights: false, taxApproval: false, privacyApproval: false, consumerTerms: false, researchBetaGate: true });
  assert.equal(release.decision, "blocked");
  assert.equal(release.activationPermitted, false);
  assert.ok(release.blockers.includes("香港监管边界未获书面确认"));
});
