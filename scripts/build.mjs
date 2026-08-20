import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { copy, copyCatalogVersion } from "../src/copy.ts";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("public", "dist", { recursive: true });
await writeFile("dist/manifest.webmanifest", `${JSON.stringify({ name: copy("pwa.name"), short_name: "RichTide", lang: "zh-CN", start_url: "/", display: "standalone", background_color: "#f4ecdc", theme_color: "#f4ecdc", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }], copy_catalog_version: copyCatalogVersion })}\n`);
await writeFile("dist/offline.html", `<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>${copy("offline.title")}</title><link rel="stylesheet" href="/styles.css"></head>\n<body><main class="instrument-page"><section class="instrument-hero"><p class="eyebrow">RichTide</p><h1>${copy("offline.heading")}</h1><p>${copy("offline.description")}</p><p><a class="button" href="/">${copy("offline.return")}</a></p></section></main></body></html>\n`);
console.log("PWA assets assembled in dist/");
