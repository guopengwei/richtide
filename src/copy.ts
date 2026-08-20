export const destinations = [
  { id: "overview", label: "概览" },
  { id: "fundamentals", label: "基本面与企业质量" },
  { id: "valuation", label: "估值与情景" },
  { id: "events", label: "催化剂与风险" },
  { id: "technical", label: "专业技术分析" },
  { id: "sources", label: "来源与方法" }
] as const;

export const copyCatalog = Object.freeze({ id: "zh-CN@2026-08-20.1", activatedAt: "2026-08-20T00:00:00Z", approvalEvidence: "design-spec-v3.3", supersedes: null });
export const copyCatalogVersion = copyCatalog.id;
const catalog: Readonly<Record<string, string>> = Object.freeze({
  "shell.fixtureNotice": "演示数据，不用于投资决策",
  "shell.titleSuffix": "｜RichTide 研究",
  "shell.skip": "跳到主要内容",
  "shell.tagline": "独立研究 · 证据可查",
  "shell.theme": "切换明暗主题",
  "shell.themeShort": "明暗",
  "shell.nav": "研究导航",
  "shell.exchangeSeparator": " · ",
  "shell.hongKongTime": "香港时间",
  "overview.heading": "研究判断",
  "overview.loading": "正在载入经治理的研究概览……",
  "overview.template": "{posture}。截至 {asOf}；主要风险：{risk}。",
  "fundamentals.heading": "基本面与企业质量",
  "fundamentals.description": "每项指标保留期间、单位与计算沿袭。",
  "fundamentals.loaded": "已载入 {count} 项带期间、单位和计算沿袭的指标。",
  "valuation.heading": "估值与情景",
  "valuation.description": "熊市、基础与牛市情景使用同一诚实刻度。",
  "valuation.loaded": "熊市 {bear}、基础 {base}、牛市 {bull} {currency}；现价 {price}。",
  "events.heading": "催化剂与风险",
  "events.description": "按重要性、来源权威、事件时间与观察时间排序。",
  "events.item": "{label}；事件时间 {eventAt}；观察时间 {observedAt}",
  "technical.heading": "专业技术分析",
  "technical.description": "威科夫市场结构、阿尔·布鲁克斯价格行为与方法一致性均标记为研究测试版。非专业版仅显示方法说明，不提供计算结果。",
  "sources.heading": "来源与方法",
  "sources.description": "原文语言、中文摘要、权利状态、原始摘要与转换沿袭均可追查。",
  "sources.loaded": "{source}（原文语言：{language}）：{summary} 局限：{limitation}",
  "plans.heading": "分析方案",
  "plans.description": "免费版、轻享版与专业版的服务器端权限投影互相隔离；预览不会包含专业版计算结果。",
  "plans.link": "查看方案与分析积分",
  "state.unavailable": "当前不可用",
  "state.overviewUnavailable": "暂时无法载入研究概览，请稍后重试。",
  "state.javascript": "启用 JavaScript 可载入最新研究状态；证券身份与时间仍可阅读。",
  "pwa.update": "发现新版本",
  "pwa.reload": "重新载入",
  "pwa.name": "RichTide 投资研究",
  "offline.title": "暂时离线｜RichTide",
  "offline.heading": "暂时离线",
  "offline.description": "研究数据、分析积分和权限操作需要联网核验。连接恢复后，请返回上一页重新载入。",
  "offline.return": "返回研究首页",
  "auth.genericEmail": "如果该邮箱可以注册，我们已发送验证说明。",
  "instrument.unsupported": "该证券不在当前许可范围。请检查交易所与代码，或选择其他证券。",
  "offline.authority": "当前离线。连接恢复后才能执行此操作。"
});

export function copy(key: string): string {
  const value = catalog[key];
  if (!value) throw new Error(`Missing copy: ${key}`);
  return value;
}

export function allCopy(): Readonly<Record<string, string>> { return catalog; }
