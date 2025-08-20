// public/sw.js
const CACHE_NAME = 'cahj-v1';
const urlsToCache = [
  '/',
  '/css/app.css',
  '/js/app.js',
  '/images/new-logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});