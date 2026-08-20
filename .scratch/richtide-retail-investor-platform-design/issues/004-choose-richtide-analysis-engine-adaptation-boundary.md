# Choose the RichTide analysis-engine adaptation boundary

Parent: [RichTide Retail Investor Platform Design](../map.md)
Type: wayfinder:grilling
Status: open
Assignee: unassigned
Blocked by: [Audit the UZI reference for production reuse](003-audit-uzi-reference-for-production-reuse.md)

## Question

Where is the production boundary between adapted UZI Reference code and new RichTide-owned collection, normalization, calculation, validation, orchestration, and rendering modules?

## Resolution evidence

- Approved module and process boundaries.
- Explicit code and behavior that will not be copied.
- Versioning, packaging, provenance, failure-isolation, and replacement seams.
