# 04: Find and disambiguate an Instrument

**What to build:** Help a customer select the correct supported Instrument by ticker, issuer, exchange, or qualified identifier.

**Blocked by:** 01: Build the RichTide walking skeleton; 02: Serve the RichTide editorial research shell

**Status:** ready-for-agent

- [ ] Ambiguous matches show legal issuer, exchange, currency, instrument type, and canonical identifier before selection.
- [ ] Unsupported, unlicensed, stale, or ambiguous results fail closed with reviewed Chinese recovery guidance.
- [ ] Tests cover duplicate symbols, long Chinese names, empty results, and canonical deep links.

