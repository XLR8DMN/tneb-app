// ─────────────────────────────────────────────
//  TNEB Sample — Service Worker
//  Enables offline use + fast load from cache
// ─────────────────────────────────────────────

const CACHE_NAME = 'tneb-sample-v1';

// Files to cache on install
const PRECACHE = [
  './tneb-sample.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './splash.png',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Noto+Serif+Tamil:wght@400;600&display=swap'
];

// ── Install: pre-cache all assets ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching assets');
        // Cache what we can — ignore failures for external fonts
        return Promise.allSettled(
          PRECACHE.map(url => cache.add(url).catch(e => console.warn('[SW] Failed to cache:', url)))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ── Activate: delete old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for local, network-first for API ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Network-first for SMS backend API calls
  if (url.pathname.includes('/send-otp') || url.pathname.includes('/verify-otp')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => new Response(JSON.stringify({ success: false, message: 'You are offline' }), {
          headers: { 'Content-Type': 'application/json' }
        }))
    );
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;

        return fetch(event.request)
          .then(response => {
            // Only cache valid responses
            if (!response || response.status !== 200 || response.type === 'opaque') {
              return response;
            }
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
            return response;
          })
          .catch(() => {
            // Offline fallback — return the main app
            if (event.request.destination === 'document') {
              return caches.match('./tneb-sample.html');
            }
          });
      })
  );
});

// ── Push notifications (future use) ──
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const title = data.title || 'TNEB Sample';
  const options = {
    body: data.body || 'You have a new notification',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || './' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
