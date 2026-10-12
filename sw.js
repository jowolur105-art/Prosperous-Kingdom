// Service Worker — Prosperous Kingdom PWA
// Cache-first for same-origin assets; offline navigation falls back to index.html

const CACHE_NAME = 'prosperous-kingdom-v1';

// All static files to precache (must be complete for 100% offline)
const PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/base.css',
  './css/ui.css',
  './js/main.js',
  './js/router.js',
  './js/data/config.js',
  './js/data/strings.js',
  './js/data/questions.js',
  './js/store.js',
  './js/audio.js',
  './js/rng.js',
  './js/track.js',
  './js/game/engine.js',
  './js/game/player.js',
  './js/game/draw.js',
  './js/game/hud.js',
  './js/screens/menu.js',
  './js/screens/setup.js',
  './js/screens/intro.js',
  './js/screens/turn.js',
  './js/screens/play.js',
  './js/screens/question.js',
  './js/screens/turnresult.js',
  './js/screens/final.js',
  './js/screens/review.js',
  './js/screens/teacher.js',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './assets/bg-home.webp',
  './assets/bg-kingdom.webp',
  './assets/dragon.png',
  './assets/ground.webp',
  './assets/knight_0.png',
  './assets/knight_1.png',
  './assets/knight_2.png',
  './assets/knight_3.png',
  './assets/medieval-font.css',
  './assets/fonts/font_0.ttf',
  './assets/fonts/font_1.ttf',
  './assets/fonts/font_2.ttf',
  './assets/bgm-kingdom.mp3',
];

// ===== Install: precache all static assets =====
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(PRECACHE);
    })
  );
});

// ===== Activate: clean old caches, claim clients =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) =>
        Promise.all(
          names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
        )
      )
      .then(() => self.clients.claim())
  );
});

// ===== Fetch: network-first for scripts, cache fallback when offline =====
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (url.origin !== location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Network-first for fresh code, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
