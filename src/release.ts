interface CloudflareEvidence { inventory: boolean; authoritativeUsageAccount: boolean; replayTests: boolean; outboxTests: boolean; immutableStorage: boolean; containerEgress: boolean; observability: boolean; costAndRegionalReadiness: boolean; deployedStaging: boolean }
export function qualifyCloudflare(evidence: CloudflareEvidence) {
  const gates: Array<[keyof CloudflareEvidence, string]> = [
    ["inventory", "CF-1 资源清单证据缺失"], ["authoritativeUsageAccount", "CF-2 权威使用账户证据缺失"], ["replayTests", "CF-3 重放测试证据缺失"], ["outboxTests", "CF-4 发件箱测试证据缺失"], ["immutableStorage", "CF-5 不可变存储证据缺失"], ["containerEgress", "CF-6 容器出站限制证据缺失"], ["observability", "CF-6 关联可观测性证据缺失"], ["costAndRegionalReadiness", "CF-7 成本与区域就绪证据缺失"], ["deployedStaging", "CF-8 尚无部署后的暂存环境证据"]
  ];
  const blockers = gates.filter(([key]) => !evidence[key]).map(([, label]) => label);
  return { qualified: blockers.length === 0, blockers, evidence: { ...evidence } };
}
interface ReleaseEvidence { repositoryCi: boolean; stagingQualification: ReturnType<typeof qualifyCloudflare>; regulatoryPerimeter: boolean; airwallexApproval: boolean; fieldDataRights: boolean; taxApproval: boolean; privacyApproval: boolean; consumerTerms: boolean; researchBetaGate: boolean }
export function ratifyReleaseCandidate(evidence: ReleaseEvidence) {
  const blockers = [...evidence.stagingQualification.blockers];
  const external: Array<[keyof ReleaseEvidence, string]> = [["regulatoryPerimeter", "香港监管边界未获书面确认"], ["airwallexApproval", "Airwallex 商户与能力尚未批准"], ["fieldDataRights", "字段级数据权利尚未批准"], ["taxApproval", "税务处理尚未批准"], ["privacyApproval", "隐私处理尚未批准"], ["consumerTerms", "消费者条款尚未批准"], ["researchBetaGate", "研究测试版质量门未通过"], ["repositoryCi", "仓库 CI 未通过"]];
  for (const [key, label] of external) if (!evidence[key]) blockers.push(label);
  return { decision: blockers.length === 0 ? "conditional" as const : "blocked" as const, activationPermitted: blockers.length === 0, blockers, candidateVersion: "richtide-v0.1.0-rc.1", versions: { copyCatalog: "zh-CN@2026-08-20.1", schema: "0001_control_plane", worker: "richtide-v0.1.0-rc.1" }, exceptionOwners: Object.fromEntries(blockers.map((blocker) => [blocker, ownerFor(blocker)])), rollback: "回退到上一不可变版本", permittedEnvelope: blockers.length === 0 ? "仅经批准的香港客户与许可证券" : "无" };
}

function ownerFor(blocker: string): string { if (/CF-|暂存|区域|成本/.test(blocker)) return "平台运营负责人"; if (/Airwallex/.test(blocker)) return "支付产品负责人"; if (/数据权利/.test(blocker)) return "数据治理负责人"; if (/税务/.test(blocker)) return "财税负责人"; if (/隐私/.test(blocker)) return "隐私负责人"; if (/监管|消费者/.test(blocker)) return "法律与合规负责人"; if (/研究测试版/.test(blocker)) return "研究质量负责人"; return "工程发布负责人"; }
