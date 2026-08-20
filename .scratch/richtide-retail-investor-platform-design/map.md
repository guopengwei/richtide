# RichTide Retail Investor Platform Design

Type: wayfinder:map
Status: open
Assignee: unassigned

## Destination

Produce a ratified, implementation-ready RichTide product, system, and UX design package, including responsive high-fidelity designs and a throwaway interactive PWA prototype for the critical customer and privileged-role journeys.

The destination is reached when no product, domain, experience, architecture, commercial-control, safety, or handoff decision remains open before production implementation can be planned. Production code, deployment, vendor activation, and launch approval are outside this map.

## Notes

- The approved baseline is `UZI_Cloudflare_Retail_Investor_Platform_Simplified_Design_Spec_v3.md` version 3.3. Preserve its explicit decisions unless investigation proves a contradiction, infeasibility, safety issue, or missing decision.
- `Reference_Only/UZI-Skill-main` is read-only reference material. It is not shipped RichTide behavior and must never be edited by this effort.
- RichTide is the sole customer-facing identity. UZI is not a customer-facing brand.
- The primary customer client is a responsive, installable PWA. Native apps and a WeChat Mini Program are outside the destination.
- The initial interface locale is `zh-CN`, but locale never implies a commercially approved jurisdiction.
- The primary interaction is an instrument-first research workspace, not a chatbot or trading terminal.
- The visual direction is a restrained premium research publication: warm parchment, charcoal or espresso, antique gold, semantic market colors, Simplified-Chinese typography, and accessible light and dark themes.
- Public self-service registration applies to Customers. Customer Support, Commercial Administrators, and Platform Operators use invite-only, role-scoped privileged access.
- Privileged authority is separated from routine customer-content access; exceptional access is purpose-bound, time-limited, and audited.
- Use the `grilling` and `domain-modeling` skills for human decisions, `prototype` for behavioral or visual decisions, and `research` for facts outside the working directory or substantial source investigation.
- Prototype tickets may create throwaway decision assets. No ticket authorizes production implementation, deployment, live vendor provisioning, commercial activation, or release.
- Work no more than one non-research ticket per session. Claim a ticket before working it.
- The local frontier is every open, unassigned child ticket whose `Blocked by` entries are all closed.

## Decisions so far

<!-- Closed decision tickets are indexed here by title with a one-line gist. Detail remains in the ticket. -->

- [Establish first-commercial-market feasibility evidence](issues/001-establish-first-commercial-market-feasibility-evidence.md): Hong Kong is the conditional first-market preference, Singapore is fallback or second, and no market is launch-approved before regulatory, payments, data-rights, tax, privacy, and consumer-terms gates close.
- [Audit the UZI reference for production reuse](issues/003-audit-uzi-reference-for-production-reuse.md): adapt concepts and test vectors behind new RichTide contracts; rewrite governed production seams; exclude persona, score, advice-like, unapproved-source, local-runtime, and legacy-renderer machinery.
- [Qualify the Cloudflare architecture against current limits](issues/006-qualify-cloudflare-architecture-against-current-limits.md): proceed conditionally with the Cloudflare-native design after the required authority, idempotency, storage, egress, observability, capacity, and deployed-evidence gates are incorporated.

## Not yet specified

- Market-specific Airwallex qualification, hosted-checkout behavior, provider events, and production payment contracts after the first Commercial Market is chosen.
- Exact plan prices, included allowances, usage-pack sizes, currencies, taxes, minimum contribution margin, and Complete Pro Analysis Credit rate after market, provider, and measured unit-economics evidence exist.
- Production calibration datasets, parameter sets, and promotion thresholds for Wyckoff and Al Brooks after the instrument universe, source authority, and engine adaptation boundary are resolved.
- Route-level component specifications and acceptance scenarios that only become visible through prototype testing.
- Final operational ownership and implementation sequencing after the production architecture and release-qualification contract are settled.

## Out of scope

- Production application code, infrastructure deployment, commercial activation, production billing, or launch approval.
- Brokerage, trade execution, automated trading, personalized financial advice, or personalized position sizing.
- Customer-facing UZI branding, the investor-persona jury, or simulated endorsements.
- Native mobile applications, a WeChat Mini Program, or any locale beyond `zh-CN`.
- Automatic recharge and deferred 5-to-15-minute intraday analysis.
- LBO analysis, merger models, value-creation plans, AI-readiness scoring, morning notes, standalone sector reports, portfolio rebalancing, and other products deferred by the approved baseline.
