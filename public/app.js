const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
themeButton?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("richtide-theme", next);
});
const savedTheme = localStorage.getItem("richtide-theme");
if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;
const runtimeCopy = document.querySelector("#runtime-copy")?.dataset ?? {};
const format = (template, values) => Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), template ?? "");
const number = new Intl.NumberFormat("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dateTime = new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Hong_Kong" });

async function loadJson(path) {
  const response = await fetch(path, { headers: { accept: "application/json" }, credentials: "same-origin" });
  if (!response.ok) throw new Error("request_failed");
  return response.json();
}

loadJson("/api/instruments/HK-00700/overview").then((overview) => {
  const output = document.querySelector("#overview-state");
  if (output) output.textContent = format(runtimeCopy.overview, { posture: overview.posture, asOf: dateTime.format(new Date(overview.asOf)), risk: overview.topRisk });
}).catch(() => { const output = document.querySelector("#overview-state"); if (output) output.textContent = runtimeCopy.overviewError ?? ""; });

for (const name of ["fundamentals", "valuation", "events", "evidence"]) {
  loadJson(`/api/instruments/HK-00700/${name}`).then((value) => {
    const output = document.querySelector(`[data-api="${name}"]`);
    if (!output) return;
    if (name === "fundamentals") output.textContent = format(runtimeCopy.fundamentals, { count: value.measures.length });
    if (name === "valuation") output.textContent = format(runtimeCopy.valuation, { bear: number.format(value.bear), base: number.format(value.base), bull: number.format(value.bull), currency: value.currency, price: number.format(value.currentPrice) });
    if (name === "events") output.textContent = value.events.map((event) => format(runtimeCopy.events, { label: event.label, eventAt: dateTime.format(new Date(event.eventAt)), observedAt: dateTime.format(new Date(event.observedAt)) })).join("；");
    if (name === "evidence") output.textContent = format(runtimeCopy.evidence, { source: value.source, language: value.sourceLanguage, summary: value.chineseSummary, limitation: value.limitation });
  }).catch(() => { const output = document.querySelector(`[data-api="${name}"]`); if (output) output.textContent = runtimeCopy.unavailable ?? ""; });
}

if ("serviceWorker" in navigator) navigator.serviceWorker.register("/service-worker.js").then((registration) => {
  registration.addEventListener("updatefound", () => {
    const notice = document.createElement("p");
    notice.setAttribute("role", "status");
    notice.textContent = runtimeCopy.update ?? "";
    const reload = document.createElement("button");
    reload.type = "button";
    reload.textContent = runtimeCopy.reload ?? "";
    reload.addEventListener("click", () => window.location.reload());
    notice.append(" ", reload);
    document.querySelector("main")?.prepend(notice);
  });
});
