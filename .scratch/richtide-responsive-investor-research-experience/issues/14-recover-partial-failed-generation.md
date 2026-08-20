# 14: Recover partial and failed generation safely

**What to build:** Give customers truthful generation progress, safe partial delivery, and idempotent recovery.

**Blocked by:** 13: Generate and unlock Core Analysis exactly once

**Status:** ready-for-agent

- [ ] Queued through recovered states are exposed without implying unsupported completion.
- [ ] Retries never substitute another model, effort, source contract, or legacy pipeline.
- [ ] Core-only publication settles Core and releases the rest; no eligible projection releases all reserved credits.
- [ ] Fault tests cover disconnects, ambiguous timeouts, Workflow retries, Container termination, R2 orphans, D1 lag, and quality failure.

