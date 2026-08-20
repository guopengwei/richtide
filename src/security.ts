export const gatewayProfile = Object.freeze({ baseUrl: "https://api.rich-tide.com/v1", model: "gpt-5.6-sol", reasoningEffort: "medium", fallback: "none" });
import { bytesToHex } from "./crypto.ts";
interface SignedDelivery { artifactId: string; expiresAt: number; signature: string }
async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const value = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  return bytesToHex(new Uint8Array(value));
}
export class SecurityBoundary {
  readonly #allowedHosts: Set<string>;
  constructor(allowedHosts: string[]) { this.#allowedHosts = new Set(allowedHosts); }
  authorize(actorSubject: string, resourceSubject: string, _action: string): true { if (actorSubject !== resourceSubject) throw new Error("subject_mismatch"); return true; }
  allowEgress(host: string): true { if (!this.#allowedHosts.has(host)) throw new Error("egress_denied"); return true; }
  async signDelivery(artifactId: string, expiresAt: number, secret: string): Promise<SignedDelivery> { return { artifactId, expiresAt, signature: await hmac(`${artifactId}:${expiresAt}`, secret) }; }
}
export async function verifySignedDelivery(delivery: SignedDelivery, artifactId: string, now: number, secret: string): Promise<boolean> { if (delivery.artifactId !== artifactId || now > delivery.expiresAt) return false; return delivery.signature === await hmac(`${delivery.artifactId}:${delivery.expiresAt}`, secret); }
