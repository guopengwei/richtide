# Qualify the Cloudflare architecture against current limits

Parent: [RichTide Retail Investor Platform Design](../map.md)
Type: wayfinder:research
Status: closed
Assignee: /root/cloudflare_qualification
Blocked by: None

## Question

Does the approved Workers, Durable Objects, D1, R2, Workflows, Queues, and Containers architecture remain feasible under current Cloudflare contracts, limits, consistency semantics, failure modes, observability, and regional availability?

## Resolution evidence

- Primary official sources with access dates.
- Responsibility and authority matrix for each Cloudflare primitive.
- Limit, consistency, recovery, cost, and preview-status risks.
- Required architecture corrections or explicit qualification gates.

## Resolution comment

Conditionally qualified the Cloudflare-native architecture. Workers, SQLite-backed Durable Objects, D1, R2, Workflows, Queues, and Containers are generally available and no current platform limit blocks the design on Workers Paid, but production requires the report's corrections and Gates CF-1 through CF-8. Keep the Usage Account Durable Object as sole credit and access authority; treat Workflow, Queue, and alarm behavior as at-least-once and make every effect idempotent; assign Queues only to outbox projection and notification or remove them; enforce R2 immutability in application policy; seal stateless Containers with deny-by-default egress and mixed-version compatibility; partition or archive D1 before its non-increasable 10 GB and single-thread ceilings; and keep beta features off the launch-critical path. Production remains gated on launch jurisdiction and deployed staging evidence.

Research asset: [Cloudflare architecture qualification](../research/006-cloudflare-architecture-qualification.md)
