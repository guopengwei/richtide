# Define generation orchestration, single-flight, degradation, and recovery

Parent: [RichTide Retail Investor Platform Design](../map.md)
Type: wayfinder:grilling
Status: open
Assignee: unassigned
Blocked by: [Pin the RichTide gateway contract and failure boundary](005-pin-richtide-gateway-contract-and-failure-boundary.md), [Qualify the Cloudflare architecture against current limits](006-qualify-cloudflare-architecture-against-current-limits.md), [Define canonical artifacts, evidence lineage, corrections, and projections](012-define-canonical-artifacts-evidence-lineage-corrections-and-projections.md)

## Question

What state, lease, idempotency, retry, concurrency, fan-out, partial-publication, settlement-notification, cancellation, and recovery semantics make one canonical Generation Event safe for many independent requesters?

## Resolution evidence

- End-to-end workflow and state-transition model.
- Single-flight keys, lease ownership, retry, replay, and recovery rules.
- Independent requester access, settlement, refund, and revocation scenarios.
- Partial, degraded, quality-blocked, and permanently failed outcomes.
