/**
 * sw.js — minimal offline shell cache.
 * Navigation requests (the HTML shell) go network-first: Vite gives every
 * build's JS/CSS a new content hash, but index.html itself is never renamed,
 * so a cache-first index.html would keep pointing at a hash the server no
 * longer has after the next deploy, permanently freezing returning visitors
 * on the build that was live on their first visit. Hashed static assets stay
 * cache-first (safe — a changed file is always a new URL). The GAS API is
 * always network-only (never cache mutations/dashboard data).
 */
// Renamed + version bump on the rebrand: the `activate` handler below already
// deletes any cache key that doesn't match CACHE_NAME, so this also purges
// returning visitors' stale cached HTML/icons/manifest from before the
// rebrand, not just a cosmetic rename.
const CACHE_NAME = 'nicole-carvalho-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => caches.open(CACHE_NAME).then((cache) => cache.match(request)))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response.ok) cache.put(request, response.clone());
        return response;
      } catch (err) {
        return cached || Promise.reject(err);
      }
    })
  );
});

/**
 * push — fires even with the app fully closed (that's the whole point of
 * Web Push). Payload is plain JSON sent by the backend's send trigger:
 * { title, body }. Deliberately terse per product spec — no dosage, no
 * extra copy, just "Nicole Carvalho" / supplement name / one short line.
 *
 * Sound/vibration: the Notification API has no "vibrate but never play a
 * sound" switch — `silent: true` suppresses both together, there is no way
 * to separate them from the web platform side. `silent: false` + a short
 * `vibrate` pattern is the closest available approximation of "discreet",
 * and only Android/Chromium honors the `vibrate` array at all — iOS/WebKit
 * ignores it and always follows the system's own notification sound
 * settings (Focus Mode included), a platform limitation, not a bug here.
 */
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (err) {
    data = { title: 'Nicole Carvalho', body: event.data ? event.data.text() : '' };
  }

  const title = data.title || 'Nicole Carvalho';
  const options = {
    body: data.body || '',
    icon: './brand/icon-192.png',
    badge: './brand/icon-96.png',
    tag: data.tag || 'nicole-carvalho-lembrete',
    silent: false,
    vibrate: [80, 40, 80],
    data: { url: './#/paciente' }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

/**
 * notificationclick — always opens/focuses the patient dashboard (Home),
 * never a specific supplement/dose (product decision: keep it simple).
 *
 * `event.action` is already switched on so future action buttons ("Marcar
 * como tomado", "Lembrar depois") have a place to plug in — not implemented
 * yet, on purpose: any action that needs to call registrarCheckin from here
 * requires an auth token the Service Worker can actually read, which today
 * it cannot (sessionStorage/localStorage are invisible to a SW). That only
 * becomes possible once the refresh-token session (IndexedDB-backed) lands.
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  switch (event.action) {
    // case 'marcar': // reserved for a future release — needs SW-readable auth token first
    // case 'lembrar': // reserved for a future release
    default: {
      const targetUrl = new URL('./#/paciente', self.registration.scope).href;
      event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
          for (const client of windowClients) {
            if (client.url.startsWith(self.registration.scope) && 'focus' in client) {
              return client.focus();
            }
          }
          return self.clients.openWindow(targetUrl);
        })
      );
    }
  }
});

// Mirrors frontend/src/utils/sessionDb.js's DB/store/key exactly — sw.js is
// a classic (non-module) script, so it can't `import` that file; these are
// duplicated constants, not a second source of truth (same values, same
// IndexedDB database, read by both).
const AUTH_DB_NAME = 'nicole-carvalho-auth';
const AUTH_STORE_NAME = 'session';
const AUTH_RECORD_KEY = 'current';
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycby_E0a6SOkGz3zOScWyTVNVsH3SicSt6OEZMWISRk2wJLYlCYg2ugu1W3SkvNGlX1hG/exec';

function readRefreshTokenFromIndexedDb() {
  return new Promise((resolve) => {
    const openRequest = indexedDB.open(AUTH_DB_NAME);
    openRequest.onerror = () => resolve(null);
    openRequest.onsuccess = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(AUTH_STORE_NAME)) {
        resolve(null);
        return;
      }
      const tx = db.transaction(AUTH_STORE_NAME, 'readonly');
      const req = tx.objectStore(AUTH_STORE_NAME).get(AUTH_RECORD_KEY);
      req.onsuccess = () => resolve(req.result ? req.result.refreshToken : null);
      req.onerror = () => resolve(null);
    };
  });
}

// The refresh token is rotated (single-use) on every refreshToken call — if
// the newly-issued one isn't written back here, the page's own copy in
// IndexedDB goes stale, and its next refresh attempt would replay an
// already-used token, tripping the backend's theft-detection kill switch
// (RefreshTokenUseCase revokes every session for the patient on replay).
// This write-back is what keeps that from happening.
function writeRefreshTokenToIndexedDb(refreshToken) {
  return new Promise((resolve) => {
    const openRequest = indexedDB.open(AUTH_DB_NAME);
    openRequest.onerror = () => resolve();
    openRequest.onsuccess = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(AUTH_STORE_NAME)) {
        resolve();
        return;
      }
      const tx = db.transaction(AUTH_STORE_NAME, 'readwrite');
      tx.objectStore(AUTH_STORE_NAME).put({ refreshToken }, AUTH_RECORD_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    };
  });
}

async function callGasAction(action, payload) {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...payload })
  });
  const result = await response.json();
  if (result.statusCode !== 200) {
    throw new Error((result.data && result.data.message) || 'Erro ao chamar o backend.');
  }
  return result.data;
}

/**
 * pushsubscriptionchange — fires when the browser itself invalidates and
 * replaces a push subscription (rare; MDN documents browser support as
 * inconsistent). Resubscribes with the same options the old subscription
 * used (they travel with event.oldSubscription, so no VAPID constant needs
 * importing here) and pushes the new endpoint to the backend automatically.
 *
 * salvarInscricaoPush requires an authenticated access token, which this
 * Service Worker cannot read from the page's in-memory token store — but it
 * CAN read the refresh token from IndexedDB (see sessionDb.js), so this
 * exchanges it for a fresh access token via the existing refreshToken
 * action first. Every step is wrapped so a failure here (offline, missing/
 * expired refresh token, browser lacking the event entirely) never throws
 * uncaught — the next time the patient opens the app, initPushNotifications()
 * reconciles the subscription with the backend anyway, so nothing is lost,
 * only delayed.
 */
self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    (async () => {
      try {
        const newSubscription = event.newSubscription
          || await self.registration.pushManager.subscribe(event.oldSubscription ? event.oldSubscription.options : undefined);

        const refreshToken = await readRefreshTokenFromIndexedDb();
        if (!refreshToken) return;

        const refreshed = await callGasAction('refreshToken', { refreshToken });
        await writeRefreshTokenToIndexedDb(refreshed.refreshToken);

        const json = newSubscription.toJSON();
        await callGasAction('salvarInscricaoPush', {
          token: refreshed.token,
          endpoint: json.endpoint,
          p256dh: json.keys.p256dh,
          auth: json.keys.auth
        });
      } catch (err) {
        // Silencioso de propósito — ver comentário acima do listener.
      }
    })()
  );
});
