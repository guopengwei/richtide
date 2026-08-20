# 15: Understand Analysis Credit balances and activity

**What to build:** Let a customer audit authoritative Included, Purchased, and Promotional Credit lots and activity.

**Blocked by:** 13: Generate and unlock Core Analysis exactly once; 14: Recover partial and failed generation safely

**Status:** ready-for-agent

- [ ] Origin, amount, status, expiry, reservation, settlement, release, and refund are distinct and traceable.
- [ ] The Usage Account allocates eligible lots deterministically without negative balances or D1 authorization.
- [ ] Visible activity omits tokens, cache state, infrastructure cost, and other customers; property and isolation tests pass.

