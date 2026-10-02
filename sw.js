/* Service Worker: cache-first, wyłącznie pliki z własnego hosta.
   Po zmianie index.html / app.js / app.css podbij numer wersji w CACHE. */
const PREFIX="zuzel-";
const CACHE=PREFIX+"v13";
const CORE=["./","./index.html","./app.js","./app.css","./manifest.json"];
self.addEventListener("install",e=>{
  /* icon.svg jest opcjonalna — jej brak nie może zablokować instalacji całej aplikacji. */
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE).then(()=>c.add("./icon.svg").catch(()=>{}))).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  /* Kasujemy wyłącznie własne, stare cache (prefiks) — nigdy cudze. */
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=="GET"||u.origin!==self.location.origin)return;
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).catch(()=>r.mode==="navigate"?caches.match("./index.html"):Response.error())));
});
