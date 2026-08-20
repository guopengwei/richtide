# Define entitlement, Analysis Credit, access, and billing state machines

Parent: [RichTide Retail Investor Platform Design](../map.md)
Type: wayfinder:grilling
Status: open
Assignee: unassigned
Blocked by: [Choose the first commercial market and launch envelope](002-choose-first-commercial-market-and-launch-envelope.md), [Qualify the Cloudflare architecture against current limits](006-qualify-cloudflare-architecture-against-current-limits.md), [Define canonical artifacts, evidence lineage, corrections, and projections](012-define-canonical-artifacts-evidence-lineage-corrections-and-projections.md)

## Question

What authoritative state machines and invariants govern plans, entitlements, Included/Purchased/Promotional Credits, reservations, grant lots, Analysis Access, subscriptions, purchases, refunds, disputes, expiration, downgrade, and reconciliation?

## Resolution evidence

- Domain state machines and authority matrix.
- Idempotency, transaction, outbox, projection, and reconciliation rules.
- Core-to-Pro delta, partial-publication, expiry, refund, dispute, and downgrade scenarios.
- Cross-user, negative-balance, double-grant, and settlement-without-access prevention.
