# Choose the production PWA, localization, and rendering architecture

Parent: [RichTide Retail Investor Platform Design](../map.md)
Type: wayfinder:grilling
Status: open
Assignee: unassigned
Blocked by: [Qualify the Cloudflare architecture against current limits](006-qualify-cloudflare-architecture-against-current-limits.md), [Prototype RichTide navigation and the instrument-first task model](016-prototype-richtide-navigation-and-instrument-first-task-model.md), [Prototype the RichTide visual system and accessible chart grammar](017-prototype-richtide-visual-system-and-accessible-chart-grammar.md), [Prototype the Decision Map, modules, evidence, history, and exports](018-prototype-decision-map-modules-evidence-history-and-exports.md), [Prototype analysis preflight, credits, progress, partial delivery, and Pro gating](019-prototype-analysis-preflight-credits-progress-partial-delivery-and-pro-gating.md), [Prototype registration, subscriptions, usage packs, cancellation, and refunds](020-prototype-registration-subscriptions-usage-packs-cancellation-and-refunds.md), [Prototype support, commercial-administration, and platform-operations consoles](021-prototype-support-commercial-admin-and-platform-operations-consoles.md)

## Question

Which production frontend, routing, rendering, state, streaming, chart, PWA, caching, localization, copy-catalog, export, and design-system boundaries implement the validated experiences without exposing privileged data or silently mutating historical renditions?

## Resolution evidence

- Production frontend and package boundary diagram.
- Server/client rendering and data-ownership decisions.
- PWA installation, cache, update, offline, streaming, and recovery contract.
- Versioned `zh-CN` copy and immutable rendition architecture.
