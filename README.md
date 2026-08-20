# RichTide 投资研究

RichTide 是一个简体中文、证据优先的个人投资者研究 PWA。本仓库实现 35 张生产实施票据的本地可验证合同，并将需要真实暂存环境、支付商户、数据权利、监管、税务、隐私和人工批准的发布门保持为关闭状态。

## 本地验证

```bash
corepack pnpm install
pnpm run ci
```

Focused seams can be run with `pnpm test:walking-skeleton` or Node's test runner against one file in `tests/`. `pnpm build` assembles static PWA assets in `dist/`; it does not deploy or activate a market.

## Authority boundaries

- The `UsageAccount` domain is the sole authority for Analysis Credit reservation, settlement, release, and balance. D1 tables are projections and idempotency/audit stores only.
- The only LLM profile is server-owned `gpt-5.6-sol` with medium reasoning through `https://api.rich-tide.com/v1`; there is no alternate model, direct provider route, or BYOK path.
- Browser returns, D1 projections, callbacks, and privileged roles cannot grant paid access.
- `Reference_Only/UZI-Skill-main` remains read-only methodology evidence and is not imported at runtime.
- `/health/ready` intentionally returns `503` until deployed Cloudflare evidence and external activation approvals exist.

## Release status

Repository CI is local evidence only. Staging, production, commercial, regulatory, and human approval are separate. See [implementation status](docs/implementation-status.md) for the exact ticket frontier.
