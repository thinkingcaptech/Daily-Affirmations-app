const CACHE_NAME = 'resonance-cache-v1';
const ASSETS = [
  './index.html',
  './app.js',
  './styles.css',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.map((key) => key !== CACHE_NAME && caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetchPromise = fetch(req).then((networkRes) => {
        const resClone = networkRes.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)).catch(() => {});
        return networkRes;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});