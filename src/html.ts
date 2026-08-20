import type { Instrument } from "./contracts.ts";
import { copy, destinations } from "./copy.ts";

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

export function renderInstrumentPage(instrument: Instrument): string {
  const title = escapeHtml(instrument.legalName);
  const price = new Intl.NumberFormat("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(instrument.price);
  const observedAt = new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Hong_Kong", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(instrument.observedAt));
  return `<!doctype html>
<html lang="zh-CN" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#f4ecdc">
  <title>${title}${copy("shell.titleSuffix")}</title>
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/styles.css">
  <script type="module" src="/app.js"></script>
</head>
<body>
  <a class="skip-link" href="#main">${copy("shell.skip")}</a>
  <header class="masthead"><a class="brand" href="/">RichTide</a><span>${copy("shell.tagline")}</span><button id="theme-toggle" type="button" aria-label="${copy("shell.theme")}">${copy("shell.themeShort")}</button></header>
  <main id="main" class="instrument-page">
    <nav aria-label="${copy("shell.nav")}">${destinations.map((destination, index) => `<a${index === 0 ? ' aria-current="page"' : ""} href="#${destination.id}">${destination.label}</a>`).join("")}</nav>
    <section class="instrument-hero" id="overview">
      <p class="eyebrow">${escapeHtml(instrument.exchange)}${copy("shell.exchangeSeparator")}${escapeHtml(instrument.symbol)}</p>
      <h1>${title}</h1>
      <p class="price">${price} ${escapeHtml(instrument.currency)}</p>
      <p><time datetime="${escapeHtml(instrument.observedAt)}">${observedAt}（${copy("shell.hongKongTime")}）</time></p>
      <p class="fixture-notice" role="note">${copy("shell.fixtureNotice")}</p>
    </section>
    <section aria-labelledby="posture"><h2 id="posture">${copy("overview.heading")}</h2><p id="overview-state" aria-live="polite">${copy("overview.loading")}</p></section>
    <section id="fundamentals" aria-labelledby="fundamentals-title"><h2 id="fundamentals-title">${copy("fundamentals.heading")}</h2><p>${copy("fundamentals.description")}</p><div data-api="fundamentals"></div></section>
    <section id="valuation" aria-labelledby="valuation-title"><h2 id="valuation-title">${copy("valuation.heading")}</h2><p>${copy("valuation.description")}</p><div data-api="valuation"></div></section>
    <section id="events" aria-labelledby="events-title"><h2 id="events-title">${copy("events.heading")}</h2><p>${copy("events.description")}</p><div data-api="events"></div></section>
    <section id="technical" aria-labelledby="technical-title"><h2 id="technical-title">${copy("technical.heading")}</h2><p>${copy("technical.description")}</p></section>
    <section id="sources" aria-labelledby="sources-title"><h2 id="sources-title">${copy("sources.heading")}</h2><p>${copy("sources.description")}</p><div data-api="evidence"></div></section>
    <section aria-labelledby="access-title"><h2 id="access-title">${copy("plans.heading")}</h2><p>${copy("plans.description")}</p><a class="button" href="/plans">${copy("plans.link")}</a></section>
    <div id="runtime-copy" hidden data-overview="${copy("overview.template")}" data-overview-error="${copy("state.overviewUnavailable")}" data-fundamentals="${copy("fundamentals.loaded")}" data-valuation="${copy("valuation.loaded")}" data-events="${copy("events.item")}" data-evidence="${copy("sources.loaded")}" data-unavailable="${copy("state.unavailable")}" data-update="${copy("pwa.update")}" data-reload="${copy("pwa.reload")}"></div>
    <noscript><p role="status">${copy("state.javascript")}</p></noscript>
  </main>
</body>
</html>`;
}
