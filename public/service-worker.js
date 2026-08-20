const CACHE = "richtide-shell-v1";
const SHELL = ["/styles.css", "/manifest.webmanifest", "/icon.svg", "/offline.html"];
self.addEventListener("install", (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL))));
self.addEventListener("activate", (event) => event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))));
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.pathname.startsWith("/api/") || url.pathname.startsWith("/exports/") || url.pathname.startsWith("/admin/")) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then((response) => response ?? (event.request.mode === "navigate" ? caches.match("/offline.html") : Response.error()))));
});
