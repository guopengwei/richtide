# Build the RichTide responsive investor research experience

Parent: [RichTide Retail Investor Platform Design](../map.md)
Type: spec
Status: open
Labels: ready-for-agent
Blocked by: None

## Problem Statement

Retail investors who research A-share, Hong Kong, and United States equities must currently reconstruct a view from disconnected filings, price charts, valuation models, news, and technical interpretations. The available UZI reference demonstrates breadth but presents a dense, persona-led, score-heavy research report whose production sources, evidence contracts, calculations, security model, and commercial rights are not qualified for RichTide. It also risks turning uncertainty into apparent advice.

RichTide needs one coherent, trustworthy, Simplified-Chinese research experience that helps a customer understand a named Instrument without pretending to provide personalized trading instructions. The experience must expose evidence, assumptions, time, provenance, disagreement, uncertainty, data gaps, access rights, and Analysis Credit consequences with the same care as its conclusions. It must work as an installable responsive PWA for focused desktop research and touch-first mobile review, in equivalent light and dark themes, while supporting privileged staff work without granting routine access to customer content.

## Solution

Build RichTide as an instrument-first research publication and structured workspace. A customer begins with an Instrument, sees a compact Overview, and progressively opens the three Core Analysis Modules, the two Pro Research Beta modules, the Unified Decision Map, evidence, methodology, history, and exports. The product leads with the strongest supported research posture and the decisive evidence, not a chatbot transcript, giant score, or long model-authored essay.

The interface uses a restrained premium editorial system: warm parchment and ivory canvases, espresso and charcoal text, antique gold for identity and deliberate emphasis, and semantic market colors only when they encode a sourced state. Dense evidence uses aligned tables, direct chart labels, tabular numerals, and one authoritative home per claim. Customer actions expose plan, entitlement, Analysis Credit cost, eligible balance, expected post-action balance, generation state, partial-delivery behavior, and recovery before commitment.

Hong Kong is the conditional first Commercial Market, with Singapore retained as fallback or second. This specification is ready for design and prototype implementation, but not commercial activation: jurisdiction, Airwallex, source rights, tax, privacy, consumer terms, calibrated Pro methods, and deployed Cloudflare qualification remain fail-closed release gates.

## User Stories

1. As a public visitor, I want to understand that RichTide is an evidence-backed equity-research product, so that I do not mistake it for a broker, trading terminal, or personalized adviser.
2. As a public visitor, I want to compare Free, Lite, and Pro in plain Simplified Chinese, so that I can choose a plan without learning internal system terms.
3. As a public visitor, I want paid features, Analysis Credit rates, usage-pack limits, and Research Beta labels disclosed before registration, so that the offer is not misleading.
4. As a prospective customer, I want to know which Commercial Market, instruments, currencies, timeframes, and source limits are supported, so that I can judge whether the product fits my research needs.
5. As a prospective customer, I want balanced limitations and non-advice boundaries beside the product claims, so that confidence is earned through clarity rather than disclaimers hidden in a footer.
6. As a customer, I want self-service registration with verified identity and secure recovery, so that I can establish and regain control of my account.
7. As a customer, I want authentication flows without a role picker, so that privileged roles cannot be self-asserted.
8. As a customer, I want onboarding to teach the Instrument, Analysis Module, Decision Map, evidence, Research Posture, and Analysis Credit concepts, so that I can use the product without reading a manual.
9. As a customer, I want the interface and every owned message in `zh-CN`, so that the entire journey remains linguistically consistent.
10. As a customer, I want dates, prices, percentages, currencies, units, market sessions, and timezones to retain their exact market context, so that localized formatting does not change meaning.
11. As a customer, I want to search by ticker, issuer name, exchange, or qualified identifier, so that I can select the correct Instrument.
12. As a customer, I want ambiguous symbols to show exchange, legal issuer, currency, and instrument type before selection, so that I do not analyze the wrong security.
13. As a customer, I want recent Instruments and watchlist entries available from the research home, so that repeated work is quick without turning the product into a portfolio adviser.
14. As a customer, I want an Instrument header with identity, market status, last price, exact as-of time, currency, source status, and refresh state, so that every conclusion has immediate temporal context.
15. As a customer, I want six stable top-level Instrument tabs, so that Overview, the three Core modules, Pro technical analysis, and sources remain predictable.
16. As a customer, I want the Overview to surface Research Posture, Business Quality, Valuation Range, top Catalyst, top Risk, What Changed, coverage, and freshness, so that I can understand the supported state quickly.
17. As a customer, I want the Overview to distinguish observation, deterministic calculation, calibrated output, model-authored synthesis, and unavailable evidence, so that unlike things are not presented as equally authoritative.
18. As a customer, I want each conclusion to open a consistent evidence drawer, so that I can trace key facts, formulas or detector output, sources, timestamps, limitations, and method versions.
19. As a customer, I want original-language source titles and excerpts labeled as original, with an adjacent Chinese summary, so that audit fidelity and readability coexist.
20. As a customer, I want stale, incomplete, conflicting, corrected, or unlicensed evidence visibly labeled, so that a polished surface cannot hide a quality problem.
21. As a customer, I want Business Quality organized around growth, profitability, cash generation, balance sheet, and durability or governance, so that the economic case is easy to audit.
22. As a customer, I want every Business Quality score or status to expose supporting facts and formulas, so that it never behaves as an unexplained rating.
23. As a customer, I want industry-inappropriate ratios to be absent or explicitly not assessed, so that banks, insurers, REITs, commodity producers, and biotech companies are not forced into one model.
24. As a customer, I want Valuation to show bear, base, and bull ranges rather than a single precise target, so that uncertainty remains visible.
25. As a customer, I want the selected valuation family and excluded methods explained, so that I understand why a model fits the Instrument.
26. As a customer, I want assumptions, sensitivities, terminal-value concentration, comparable normalization, and reverse-DCF expectations adjacent to the valuation result, so that I can challenge the range.
27. As a customer, I want Catalysts and Risks ordered by materiality, source authority, event time, and observation time, so that I can distinguish a thesis change from recent noise.
28. As a customer, I want rumors and secondary reports visually distinct from official disclosures, so that uncertainty is not laundered by presentation.
29. As a customer, I want What Changed to compare the current Analysis Package with the prior eligible package, so that recurring review focuses on material differences.
30. As a customer, I want unchanged findings compressed and meaningful changes expanded, so that the interface rewards attention rather than repetition.
31. As a Pro customer, I want Wyckoff Market Structure labeled Research Beta and separated into state, phase probabilities, events, supply or demand, range boundaries, invalidation, targets, and method disclosure, so that it reads as a qualified method rather than mystique.
32. As a Pro customer, I want candidate, confirmed, invalidated, and hindsight-confirmed Wyckoff events to use distinct marks and text labels, so that event status never depends on color alone.
33. As a Pro customer, I want engineering thresholds distinguished from classic Wyckoff principles, so that implementation choices are not misrepresented as canonical theory.
34. As a Pro customer, I want Al Brooks Price Action labeled Research Beta and ordered by state, direction, location, breakout, follow-through, reversal, targets, probabilities, and Trader's Equation, so that the reasoning chain is inspectable.
35. As a Pro customer, I want probability, confidence interval, calibration version, sample size, horizon, target, stop, and cost assumptions shown together, so that a percentage cannot appear more certain than its evidence.
36. As a Pro customer, I want Research Beta outputs to show unknown or not assessed when validation is insufficient, so that the system does not fill evidence gaps with prose.
37. As a Free or Lite customer, I want Pro methodology previews without computed Pro values, so that I can understand the feature without receiving leaked entitlements.
38. As a Pro customer, I want the Decision Map to reconcile all five modules on fundamental attractiveness and technical setup quality, so that disagreement is visible in one coherent view.
39. As a Pro customer, I want the Decision Map to state the main supporting evidence, risks, disagreements, watch conditions, invalidation conditions, and next review triggers, so that the synthesis remains actionable as research without becoming advice.
40. As a customer, I want Research Posture language to avoid buy, sell, hold, position-size, or personalized urgency, so that the product maintains its publication boundary.
41. As a customer, I want the main price chart to toggle earnings, material events, valuation bands, Wyckoff structure, Brooks events, targets, invalidation, and higher-timeframe levels, so that I can compare methods without visual overload.
42. As a customer, I want chart overlays individually switchable and directly labeled, so that legends and overlapping colors do not make the chart ambiguous.
43. As a keyboard or screen-reader user, I want every material chart to have an equivalent semantic table or concise text alternative, so that the evidence is available without vision or pointer input.
44. As a mobile customer, I want the same core research capabilities re-composed for touch and narrow screens, so that mobile is not a reduced-content product.
45. As a mobile customer, I want sticky Instrument context, thumb-reachable primary actions, 44-pixel targets, and bottom-sheet disclosures where appropriate, so that dense research remains operable in one hand.
46. As a tablet customer, I want master-detail layouts that support both touch and pointer, so that I can read evidence beside a conclusion without desktop crowding.
47. As a desktop customer, I want persistent research navigation, aligned comparison columns, keyboard shortcuts, and full-width evidence tables, so that focused analysis uses the available space productively.
48. As a customer, I want light mode by default, system preference respected on first visit, and my explicit light or dark choice persisted, so that the product fits my reading context.
49. As a customer, I want light and dark themes to preserve the same hierarchy, semantic meaning, and contrast, so that theme does not change interpretation.
50. As a customer with reduced-motion preference, I want state changes without ornamental movement, so that the interface remains comfortable and understandable.
51. As a customer, I want analysis preflight to disclose package, published cost, eligible balance sources, and projected balance before confirmation, so that Analysis Credit spend is informed.
52. As a customer, I want reopening an unlocked Analysis Artifact to cost zero and be labeled already unlocked, so that I am not charged twice for access I hold.
53. As a customer, I want joining an active job or receiving a cached artifact to use the same first-unlock price as initiating generation, so that billing is fair and comprehensible.
54. As a customer, I want truthful queued, collecting, calculating, synthesizing, validating, publishing, partial, degraded, failed, and recovered states, so that progress never implies unsupported completion.
55. As a customer, I want a valid Core projection delivered when allowed even if Pro computation fails, with only the Core rate settled and the difference released, so that partial value and billing remain aligned.
56. As a customer, I want failed generation to restore reserved credits and provide a traceable activity record, so that recovery does not require trust in an invisible adjustment.
57. As a customer, I want Included, Purchased, and Promotional Credits separated by amount, origin, status, expiry, and activity, so that different rights are never collapsed into one misleading balance.
58. As a Lite customer, I want usage packs to extend Core quantity without implying Pro access, so that quantity and capability remain distinct.
59. As a Free customer, I want Promotional Credits to be clearly campaign-scoped and Core-only, so that a promotion does not suggest an ordinary paid entitlement.
60. As a paid customer, I want a purchase review with quantity, estimated package equivalents, validity, currency, tax, total, refund rule, and no automatic recharge, so that checkout has no surprise terms.
61. As a customer returning from checkout, I want payment shown as pending verification until a verified provider event grants value, so that a browser redirect is not mistaken for payment authority.
62. As a customer, I want cancellation and downgrade copy to explain expiration, freezing, retained access, and alert changes before confirmation, so that the lifecycle is predictable.
63. As a customer, I want exports to preserve the exact Analysis Artifact, copy catalog, evidence, method, quality, and access versions, so that a historical report does not silently change.
64. As a customer, I want the PWA to retain installed chrome, navigation, recent non-sensitive metadata, and explicit offline states without caching protected artifact content by default, so that intermittent connectivity is safe and understandable.
65. As a Customer Support specialist, I want a purpose-bound diagnostic view of account, entitlement, generation, and billing state without routine content access, so that I can resolve issues with least privilege.
66. As a Customer Support specialist, I want exceptional content access to require purpose, approval, time limit, audit, and customer-policy checks, so that support cannot browse research activity casually.
67. As a Commercial Administrator, I want to manage draft catalogs, approvals, activation gates, pricing evidence, payment mappings, and market availability without editing balances directly, so that commercial changes are governed.
68. As a Platform Operator, I want to inspect provider health, generation state, projection lag, storage, capacity, spend, incidents, and reconciliation without inheriting commercial or support authority, so that operations remains bounded.
69. As a privileged user, I want invite-only authentication, stronger factors, session controls, and explicit active-role context, so that administrative authority cannot be confused with customer identity.
70. As an auditor, I want every privileged read, mutation, approval, exceptional access, correction, refund, and entitlement transition to be attributable and append-only, so that the system has a defensible record.
71. As a product owner, I want unsupported jurisdictions, instruments, plans, sources, methods, locales, and provider states to fail closed, so that availability cannot outrun qualification.
72. As a research-method owner, I want definitions, parameters, datasets, calibration releases, and quality gates versioned independently from presentation, so that methodological changes remain reproducible.
73. As a designer, I want one semantic token contract shared across customer and privileged surfaces, so that visual hierarchy and state meaning do not drift by route.
74. As an engineer, I want entitlement-specific Artifact Projections from the server, so that the client never receives hidden Pro values or relies on presentation for authorization.
75. As an engineer, I want stable machine codes mapped through one versioned Chinese copy catalog, so that errors and state labels remain testable without exposing internal English.
76. As a release approver, I want deployed staging evidence for security, accessibility, localization, billing, generation recovery, Cloudflare limits, and jurisdiction gates, so that local success is not represented as production readiness.

## Implementation Decisions

### Product, market, and authority

- `RichTide` is the only customer-facing identity. UZI is a source methodology and failure-learning reference, not a brand, runtime, renderer, or production contract.
- The product is an instrument-first research workspace and publication. It is not a chatbot, brokerage interface, trade-execution surface, personalized recommendation engine, or portfolio-sizing tool.
- The customer plans are Free, Lite, and Pro. The retained Analysis Modules are Fundamentals & Business Quality, Valuation & Scenarios, Catalysts & Risks, Wyckoff Market Structure, and Al Brooks Price Action. The Unified Decision Map is a synthesis layer, not a sixth method.
- Hong Kong is the conditional first Commercial Market; Singapore is fallback or second. Paid activation is blocked until written regulatory-perimeter, Airwallex, market-data rights, tax, privacy, and consumer-terms evidence is approved. Mainland China, the United States, the United Kingdom, and Australia are closed for the first paid launch.
- Initial customer coverage is daily and weekly A-share, Hong Kong, and United States equity research only where field-level acquisition, storage, derivation, display, export, retention, and geographic rights are approved.
- Customers register publicly and self-serve verification, recovery, and eligible commerce. Customer Support, Commercial Administrators, and Platform Operators are invite-only privileged identities with stronger authentication and server-authoritative roles.

### Information architecture

- The primary shell contains Research, Watchlist, Alerts, History, Billing, and Account destinations. The current Instrument remains persistent context inside the research area.
- The Instrument page has exactly six top-level tabs: `概览`, `基本面与企业质量`, `估值与情景`, `催化剂与风险`, `专业技术分析`, and `来源与方法`.
- The Pro technical area has `威科夫市场结构`, `阿尔·布鲁克斯价格行为`, and `方法一致性` subsections.
- Each page supports two reading speeds: an executive path with the strongest supported state and decisive evidence, and an audit path with exact tables, assumptions, methods, caveats, sources, and version history.
- Every claim has one primary visual home. Summaries may link to evidence but must not duplicate the same conclusion through multiple equal-weight cards, charts, badges, and prose blocks.
- The interface uses progressive disclosure rather than a long AI narrative. A standard evidence drawer follows `结论 → 关键事实 → 公式或检测器输出 → 来源与时间戳 → 数据局限 → 方法版本`.

### RichTide visual token contract

- The design adapts the reference inventory's semantic roles—canvas, surface, boundary, text hierarchy, positive, negative, warning, information, chart series, and theme parity—but does not copy its cyan terminal palette, neon treatments, glass effects, shadows, persona colors, or score emphasis.
- Semantic tokens are the only permitted color interface. Components do not use raw palette values. Implementations may encode the following approved values as OKLCH with equivalent hex fallbacks, provided contrast does not regress.

| Semantic token | Light | Dark | Use |
|---|---:|---:|---|
| `canvas` | `#F6F0E4` | `#17130F` | Page field |
| `surface` | `#FCF8F0` | `#211B15` | Reading and control surfaces |
| `surface-raised` | `#FFFDF8` | `#2A221A` | Menus, drawers, selected evidence |
| `text-primary` | `#241D17` | `#EFE6D8` | Main copy and values |
| `text-secondary` | `#6F6256` | `#B9AA97` | Supporting copy |
| `boundary` | `#D8CBB8` | `#493C2E` | Rules and control boundaries |
| `brand-gold` | `#7D581B` | `#D2A85B` | Brand identity, focus, deliberate emphasis |
| `positive` | `#1E6A50` | `#78B697` | Sourced constructive state |
| `negative` | `#A4463C` | `#DC8B82` | Sourced adverse state |
| `warning` | `#8A6128` | `#DBAE69` | Uncertainty, staleness, or attention |
| `information` | `#4F6874` | `#91AEB7` | Neutral method or provenance state |

- Primary text, secondary text, and brand-gold pairs must meet WCAG AA against their intended canvas or surface. Market colors always pair with shape, line style, iconography where established, and text; color is never the only status cue.
- Typography uses self-hosted Source Han Serif SC for restrained editorial display and section turns, and self-hosted Source Han Sans SC for interface copy, tables, charts, numbers, controls, and long reading. Platform Chinese fallbacks are `PingFang SC`, `Microsoft YaHei`, then `sans-serif`. A narrow monospace role is reserved for tickers, evidence IDs, method versions, timestamps, and code-like identifiers.
- Type roles are tokenized as display, title, section, subsection, body, label, metadata, and numeric. Fluid sizes use `clamp()` within bounded roles. Body copy remains at least 16 CSS pixels on supported mobile widths; aligned financial values use tabular numerals.
- Spacing uses an eight-point-led rhythm with semantic steps `4, 8, 12, 16, 24, 32, 48, 64, 96`. Within-group, between-group, and chapter gaps have different owners; arbitrary local margins are prohibited.
- Corners remain precise: square for data tables and editorial rules, 4 pixels for compact controls, and 8 pixels for interactive surfaces. Fully rounded pills are reserved for binary filters or compact statuses that genuinely need a capsule shape.
- Shadows are exceptional and quiet. Hierarchy is established through typography, spacing, alignment, density, and tonal contrast before elevation. Decorative gradients, glows, glassmorphism, paper textures, colored side rails, blobs, fake depth, and ornamental icons are excluded.

### Grid and responsive adaptation

- The shared composition grid is 12 columns on desktop, 6 on tablet, and 4 on mobile. Reading text normally occupies 6–7 desktop columns; charts, evidence tables, comparisons, and Decision Map views may use all 12.
- Breakpoints begin at the content failure points, with verification at 320–767 pixels, 768–1023 pixels, and 1024 pixels and above. Components use container queries where their own width determines reflow.
- Desktop presents persistent navigation, simultaneous context and detail where useful, full-width data evidence, pointer enhancement, and keyboard acceleration. Content width is capped on very large displays; evidence does not stretch into unreadable lines.
- Tablet uses touch-safe two-column or master-detail layouts, adapting by orientation. It supports pointer and keyboard without reducing touch targets.
- Mobile uses one primary column, a compact sticky Instrument header, thumb-reachable primary action, horizontally scrollable tablist with visible current position, and bottom sheets for secondary selection or disclosure. Evidence tables use deliberate column prioritization plus an accessible full-table view; headers and critical values are never truncated into ambiguity.
- Mobile preserves every critical task. Hover-only disclosure, desktop-only evidence, hidden billing meaning, and inaccessible chart gestures are prohibited.
- Every pointer target is at least 44 by 44 CSS pixels, focus order follows the reading order, safe-area insets are respected, and portrait plus landscape orientations are qualified.

### Research composition and visualization

- The opening viewport is evidence-led: Instrument identity and freshness, current Research Posture, the decisive supporting and contradicting evidence, and an explicit quality or gap state. A giant aggregate alpha score is prohibited.
- Fundamentals uses five aligned evidence groups rather than a generic card grid. Each group owns a conclusion, exact measures, trend basis, peer basis where valid, gaps, and provenance.
- Valuation makes the range and current-price relationship the focal geometry. Scenarios share a common scale. Assumptions, sensitivity, model disagreement, and implied expectations are directly connected to the range.
- Catalysts & Risks uses a time-aware evidence ledger with source tier, event time, observed time, materiality, confidence, and correction state. Official disclosure outranks commentary; rumor status is explicit.
- Wyckoff and Brooks are separate Research Beta compositions. Their candidate, confirmed, invalidated, uncertain, and unavailable states use distinct marks and text. Parameters, definitions, horizons, calibration, and sample sizes remain inspectable.
- The Decision Map uses the approved two-axis relationship between fundamental attractiveness and technical setup quality. Catalyst and risk severity modifies confidence and review urgency; it does not become a hidden third score.
- Charts exist only when a relationship becomes faster to understand visually. Direct labels are preferred to legends. Every material visual has a caption stating what it supports and what it does not establish, plus a semantic table or concise text equivalent.
- Chart overlays use a small stable set of semantic series tokens, distinct line styles, mark shapes, and layer order. Users can toggle overlays independently without changing the underlying Analysis Artifact.
- Dense tables use semantic captions, headers, row groups, right-aligned numeric columns, explicit units and currencies, sticky context where useful, and full-width placement. Tiny type, clipped headers, decorative sparklines, and repeated-category columns are prohibited.

### Interaction, content, and state

- Light is the initial default. The first visit may honor system preference; an explicit customer choice persists. Theme switching is available in Account and the global display menu, and equivalent meaning is required in both themes.
- Motion communicates state changes only. Use transform and opacity with restrained deceleration; avoid layout animation, bounce, elastic easing, parallax, celebration, and ambient movement. `prefers-reduced-motion` removes non-essential transitions.
- The versioned `zh-CN` copy catalog is the sole source for owned display strings across public, customer, support, commercial-administration, platform-operations, export, notification, chart, and accessibility surfaces.
- Raw machine codes, model errors, stack traces, provider text, or untranslated English never appear as fallback UI. Safe Chinese recovery copy includes a non-secret support identifier.
- Source language is preserved for audit, accompanied by a clearly labeled Chinese summary. Machine translation is never presented as original text.
- Empty states teach the next permitted action. Loading states name the phase. Errors explain what happened, what was preserved or restored, and the safe next action. Success states confirm the durable business outcome rather than a client callback.
- Analysis preflight is the only initiation seam. It re-resolves entitlement, package, catalog rate, eligible balance, and existing access before reservation. A changed catalog requires a new disclosed preflight.
- Generation uses truthful state transitions and one active job per equivalent canonical input. Partial Core delivery settles only the eligible Core rate. No eligible projection releases the full reservation. Existing authorized access reopens for zero credits.
- Free and Lite clients never receive Pro fields. The server emits entitlement-specific Artifact Projections; presentation masking is not authorization.
- The billing experience separates Included, Purchased, and Promotional Credits. Usage packs extend quantity only. Provider checkout return remains pending until verified webhook and reconciliation evidence establishes payment and grants a lot.
- Installability includes manifest, icons, standalone display, safe update behavior, and an explicit offline shell. Protected reports, evidence, balances, and privileged data are not placed in general-purpose offline caches. Offline actions that require authority remain disabled with an explanatory state.

### Privileged surfaces

- Customer Support centers on customer-authorized diagnosis, access and billing timelines, job states, correction status, and governed exceptional-access requests. It does not provide routine browsing of customer research content.
- Commercial Administration centers on catalog versioning, plan and pack mappings, approval evidence, jurisdiction activation, Airwallex mapping, refunds, disputes, and reconciliation. It cannot mutate the authoritative Usage Account ledger directly.
- Platform Operations centers on infrastructure inventory, provider health, Generation Events, Workflow and Container health, queues and outboxes, projection lag, storage, spend, incidents, and recovery. It cannot activate commercial terms or grant itself support access.
- All privileged actions require explicit role context, purpose, least privilege, step-up authentication where risk warrants it, append-only audit, and safe confirmation for consequential actions.

### Production contracts and UZI boundary

- Adapt from UZI only instrument-normalization cases, missing-value semantics, provider capability and fallback concepts, bounded orchestration lessons, deterministic valuation test vectors, peer-currency normalization, calculation-lineage requirements, and useful disclosure interactions.
- Rewrite RichTide provider adapters, Evidence Records, calculations, module engines, quality gates, orchestration, storage, rendering, security, tenancy, entitlement, and localization contracts. No production runtime imports UZI's report schemas, filesystem cache, renderer, data adapters, legacy fallback, or package installer.
- Exclude investor personas, simulated endorsements, aggregate Alpha Scores, buy zones, battle plans, Hold/Add/Trim/Exit language, position sizing, unauthenticated tunnel sharing, unapproved scraping, and moving-average relabeling as Wyckoff.
- The Cloudflare-native production design uses Workers as the trust boundary; one SQLite-backed Usage Account Durable Object per user as sole mutable Analysis Credit and Analysis Access authority; D1 as rebuildable query projection; R2 for immutable-by-policy artifacts; Workflows for durable orchestration; Containers for stateless Python computation; and Queues only for explicit outbox projection, notification, or reconciliation responsibilities.
- Every external effect is idempotent. Workflow, Queue, and alarm delivery are treated as at-least-once. Published R2 artifacts use unique keys, digests, manifests, supersession, and repairable publication. Containers have deny-by-default egress, no canonical local state, no customer secrets, bounded resources, and mixed-version compatibility.
- The fixed server-side model profile remains `gpt-5.6-sol` with medium reasoning through the qualified `https://api.rich-tide.com/v1` gateway contract. Failure never substitutes another model, effort, base URL, provider, direct endpoint, or customer key.
- Cloudflare beta capabilities are not launch-critical dependencies. D1 partition and archive thresholds are defined before the 10 GB per-database ceiling. Production requires deployed evidence for qualification gates CF-1 through CF-8.

## Testing Decisions

- The preferred and highest testing seam is the externally observable responsive PWA journey against production-shaped service contracts: select an Instrument, inspect evidence, preflight access, generate or join analysis, receive an entitled Artifact Projection, reopen it, inspect credit activity, and recover from a typed failure. Tests assert customer-visible behavior, durable business outcomes, accessibility semantics, and authoritative API results rather than component internals.
- One browser journey must cover the public-to-customer path in `zh-CN`: product explanation, registration, onboarding, Instrument selection, Free preview, Lite Core preflight, Analysis Credit settlement, evidence drawer, What Changed, history, billing, cancellation disclosure, and sign-out.
- A Pro browser journey must cover Method Research Beta labeling, no-leak upgrade behavior, Wyckoff and Brooks evidence, Decision Map disagreement, chart alternatives, export provenance, partial Core delivery, and Core-to-Pro delta settlement.
- A privileged-role journey must prove that Support, Commercial Administration, and Platform Operations expose different capabilities, require invite-only role authority, and deny routine customer-content access.
- Contract tests cover Instrument identity, Evidence Record lineage, module result schemas, Artifact manifests and projections, copy-catalog versions, preflight and reservation, generation events, billing events, provider corrections, and stable error codes.
- State-machine and property tests are the deliberate lower seam for authority that a browser cannot exhaustively prove. They cover credit grants, earliest-expiry allocation, reservation, settlement, release, refund, freezing, access grants, generation idempotency, partial closure, catalog transitions, billing reconciliation, and privileged approvals.
- Concurrency and replay tests prove one Generation Event for equivalent canonical inputs, independent requester settlement, no negative grants, no double provider effect, no duplicate publication, and deterministic recovery after ambiguous timeouts.
- Entitlement tests inspect response payloads, not hidden DOM. Free and Lite responses contain no Wyckoff, Brooks, Decision Map, Pro export, probability, event, target, or method-alert fields.
- Research-method tests use point-in-time datasets, frozen definitions, no-look-ahead fixtures, hard negatives, unit and currency normalization, deterministic formulas, calibration, censored outcomes, confidence intervals, and explicit unknown states. UZI-derived test vectors are reviewed inputs, never production authority.
- Evidence tests trace every displayed number and material factual claim to a field-level Evidence Record with source, time, raw hash, transform lineage, unit, currency, period, rights policy, and correction state.
- Localization tests inventory every reachable route, state, notification, export, chart label, accessible name, and provider return. Missing, unused, duplicated, untranslated, or unsafe fallback strings fail CI outside the approved proper-name and machine-identifier allowlist.
- Accessibility tests combine automated checks with keyboard, screen-reader, high-contrast, zoom, reduced-motion, and chart-alternative review. They verify landmarks, headings, focus, live progress, dialogs or sheets, tables, forms, errors, target size, contrast, and equivalent theme meaning.
- Responsive tests run at 320, 375, 768, 1024, 1440, and a large desktop width, plus phone and tablet landscape. They assert no clipped identifiers, ambiguous table headers, unreachable controls, hover-only content, layout shift, or loss of critical functionality.
- Visual-regression tests cover the token primitives and representative Overview, Valuation, Catalysts & Risks, Wyckoff, Brooks, Decision Map, billing, and privileged-console states in both themes. Review focuses on hierarchy, grid alignment, line breaks, data density, and semantic parity rather than pixel-locking dynamic evidence.
- Performance tests use realistic long Chinese names, dense tables, chart overlays, large evidence ledgers, slow networks, cached and uncached navigation, and older devices. Budgets cover first useful render, interaction latency, layout shift, font loading, chart rendering, and protected-cache behavior.
- Security tests cover authentication, recovery, session revocation, role escalation, cross-user access, ID enumeration, entitlement bypass, signed artifact delivery, injection in source or model text, URL allowlists, CSP, export sanitization, privileged step-up, purpose expiry, and audit immutability.
- Billing tests use the pinned Airwallex sandbox contract and prove that checkout completion and browser return grant nothing; only verified, idempotent provider evidence plus reconciliation may activate subscription or Purchased Credit state.
- Failure-injection tests cover provider outage, gateway mismatch, Workflow retry, Queue duplicate and reorder, Container termination, R2 orphan, D1 lag or outage, Usage Account overload, source correction, translation failure, quality-gate failure, partial Pro failure, and customer disconnect.
- Cloudflare qualification runs against deployed staging resources, not only local emulators. It must close CF-1 through CF-8 for configuration, authority, recovery, outbox, storage, Container isolation, observability and cost, and regional readiness before production approval.
- Real-device acceptance covers current iOS Safari, Android Chrome, desktop Safari, Chrome, Firefox, and Edge with touch, pointer, and keyboard. PWA install, update, offline shell, safe cache behavior, and return from hosted checkout are included.
- Tests must not assert private component structure, CSS class names, exact internal orchestration order, or implementation-specific database queries when the same external contract can prove the requirement.

## Out of Scope

- Production implementation, deployment, live Cloudflare provisioning, Airwallex activation, commercial launch, or representation that any jurisdiction is approved.
- Brokerage integration, order routing, execution, automated trading, personalized financial advice, suitability assessment, personalized rankings, or position sizing.
- Customer-facing UZI identity, persona jury, simulated investor quotations, aggregate Alpha Score, entertainment debate, buy zones, battle plans, or legacy report rendering.
- Native iOS, native Android, desktop-native applications, WeChat Mini Program, smartwatch, TV, or email-native research experiences.
- Locales other than `zh-CN`; a language selector is excluded until another locale has a complete separately approved catalog and release gate.
- Mainland China customer acquisition, payment, personal-data collection, or research publication without a dedicated feasibility and approval effort.
- Five-to-fifteen-minute intraday analysis, real-time trading data, automatic Analysis Credit recharge, postpaid metered billing, or customer-provided model credentials.
- LBO models, merger models, standalone sector reports, portfolio rebalancing, value-creation plans, AI-readiness scores, morning notes, and methods deferred by the governing baseline.
- General availability claims for Wyckoff or Al Brooks before their versioned validation and promotion gates are independently approved.
- Direct runtime reuse of UZI provider adapters, schemas, calculations, local cache, orchestration, renderer, source acquisition, or quality thresholds.

## Further Notes

- The approved design tone is restrained premium research publication: warm, exact, calm, and evidence-led. The memorable organizing move is the visible path from Research Posture to decisive evidence, method disagreement, and source lineage—not decorative finance imagery.
- The source `design.md` and `design.dark.md` files are byte-identical. Their transferable decisions are evidence-first composition, 12/6/4 grids, two reading speeds, semantic tables, direct chart labels, theme parity, progressive disclosure, and restraint. Vercel identity, Geist-specific implementation, and its monochrome brand shell are not RichTide requirements.
- UZI's existing semantic token roles informed the RichTide token taxonomy, but its exact slate, cyan, neon, glass, shadow, and persona styling is rejected.
- Research reports are evidence snapshots dated 2026-08-20. Platform status, pricing, legal interpretation, provider capability, and licensing can change and must be rechecked at their release gates.
- `ready-for-agent` authorizes implementation of the responsive design and throwaway prototype against mocked or qualified contracts. It does not authorize vendor activation, production data ingestion, deployment, or launch.
