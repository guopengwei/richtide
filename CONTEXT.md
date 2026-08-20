# RichTide Retail Investor Intelligence

RichTide is a Simplified-Chinese research product for self-directed retail investors. This glossary defines the product language shared by customer, commercial, analytical, and operational design work.

## Product and people

**RichTide**:
The sole customer-facing product and company identity for this effort.
_Avoid_: UZI, UZI by RichTide

**UZI Reference**:
The read-only source methodology and codebase under `Reference_Only/UZI-Skill-main`; it is evidence for design and reuse decisions, not a shipped RichTide product.
_Avoid_: RichTide engine, production implementation

**Customer**:
An authenticated person who researches instruments and may hold a Free, Lite, or Pro plan.
_Avoid_: Account, investor persona, trader

**Customer Support**:
The case-scoped privileged role that assists with customer access, entitlement, payment, and delivery issues.
_Avoid_: Administrator, operator

**Commercial Administrator**:
The privileged role responsible for catalogs, plans, promotions, refunds, and commercial reconciliation policy.
_Avoid_: Customer Support, Platform Operator

**Platform Operator**:
The privileged role responsible for source health, analysis jobs, quality gates, artifacts, and incidents.
_Avoid_: Administrator, Customer Support

**Commercial Market**:
An explicitly approved jurisdiction-and-currency envelope in which RichTide may offer paid service under configured data, payment, tax, refund, and financial-promotion rules.
_Avoid_: Locale, language market

## Research product

**Instrument**:
A canonically identified exchange-listed security eligible for RichTide research under the active source and market policy.
_Avoid_: Stock when the supported security class is broader, ticker

**Analysis Module**:
One of the five governed analytical perspectives: Fundamentals and Business Quality, Valuation and Scenarios, Catalysts and Risks, Wyckoff Market Structure, or Al Brooks Price Action.
_Avoid_: Method, dimension, investor

**Decision Map**:
The governed synthesis that reconciles available Analysis Modules into a research posture, disagreements, evidence, risks, and change conditions.
_Avoid_: Recommendation, trade signal, personalized advice

**Research Posture**:
A non-personalized description of how fundamental attractiveness, technical setup, catalysts, risks, and uncertainty relate at a stated time.
_Avoid_: Buy rating, trade instruction

**Analysis Package**:
A published entitlement-and-usage bundle: Snapshot Free, Core Lite, or Complete Pro.
_Avoid_: Report tier, model tier

**Research Beta**:
A customer-visible publication status for a method that has passed minimum safety gates but has not passed the validation required for production-status claims.
_Avoid_: Production, predictive proof

## Artifacts and access

**Generation Event**:
The internal execution that creates one immutable analysis artifact family from canonical inputs.
_Avoid_: Customer charge, analysis request

**Canonical Artifact**:
The immutable internal analytical record containing governed components, evidence, lineage, validation, and rendition references.
_Avoid_: Customer report, mutable report

**Artifact Projection**:
The entitlement-specific view of a Canonical Artifact that contains only components the authenticated Customer may receive.
_Avoid_: Hidden fields, client-side masking

**Analysis Access**:
The durable per-Customer grant proving that a particular Artifact Projection was successfully unlocked and settled.
_Avoid_: Generation Event, download link

**Analysis Credit**:
The customer-facing unit used to unlock an Analysis Package for the first time under a published catalog rate.
_Avoid_: LLM token, compute credit, money

**Included Credit**:
An Analysis Credit granted by an active paid plan for a defined grant period.
_Avoid_: Purchased Credit, Promotional Credit

**Purchased Credit**:
An Analysis Credit granted from a verified prepaid usage-pack purchase and governed by its purchase lot.
_Avoid_: Included Credit, wallet balance

**Promotional Credit**:
An Analysis Credit granted by a bounded campaign and usable only within that campaign's entitlement scope.
_Avoid_: Free plan entitlement, Purchased Credit
