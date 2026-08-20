# Audit the UZI reference for production reuse

Parent: [RichTide Retail Investor Platform Design](../map.md)
Type: wayfinder:research
Status: closed
Assignee: /root/uzi_reuse
Blocked by: None

## Question

Which UZI Reference capabilities, schemas, data adapters, calculations, validation checks, and rendering concepts are suitable to reuse, adapt, rewrite, or exclude from the governed RichTide product?

## Resolution evidence

- Revision and license evidence.
- Capability and schema inventory mapped to the five approved Analysis Modules.
- Quality, security, provenance, concurrency, dependency, and operational findings.
- A reuse, adapt, rewrite, or exclude recommendation for each material seam.

## Resolution comment

Audit complete. UZI v3.9.4 is MIT-licensed but lacks locally provable commit provenance, has stale revision metadata, and does not establish production data or content rights. No material seam is approved for direct runtime reuse. Adapt selected concepts and test vectors—instrument normalization, missing-value semantics, provider and fallback patterns, bounded orchestration, deterministic DCF and comps, peer currency normalization, calculation lineage, and disclosure UX—behind new RichTide contracts. Rewrite all provider adapters, evidence schemas, calculations, gates, orchestration, storage, and rendering. Exclude the persona jury, aggregate scores, advice-like outputs, local tunnel and cache, unapproved scraping, and legacy report surface. The existing moving-average-based “Wyckoff stage” is excluded; governed Wyckoff and Al Brooks modules require independent implementations and validation.

Research asset: [UZI production-reuse audit](../research/003-uzi-production-reuse-audit.md)
