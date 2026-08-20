interface ChartPoint { time: string; price?: number; valuation?: number; event?: string }
export function createAccessibleChart(points: ChartPoint[]) {
  return {
    overlays: ["价格", "事件", "估值", "技术", "目标", "失效条件", "高周期"],
    visualEncodings: { price: "实线", valuation: "虚线", event: "菱形", target: "点线", invalidation: "叉号" },
    tableText: points.map((point) => `${point.time}：${point.price ?? "无"} HKD；估值 ${point.valuation ?? "无"} HKD；${point.event ?? "无事件"}`).join("\n"),
    animation: "optional" as const
  };
}
