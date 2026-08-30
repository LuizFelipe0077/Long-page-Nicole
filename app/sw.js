/**
 * sw.js — minimal offline shell cache.
 * Navigation requests (the HTML shell) go network-first: Vite gives every
 * build's JS/CSS a new content hash, but index.html itself is never renamed,
 * so a cache-first index.html would keep pointing at a hash the server no
 * longer has after the next deploy, permanently freezing returning visitors
 * on the build that was live on their first visit. Hashed static assets stay
 * cache-first (safe — a changed file is always a new URL). The /api backend is
 * always network-only (never cache mutations/dashboard data).
 */
// Renamed + version bump on the rebrand: the `activate` handler below already
// deletes any cache key that doesn't match CACHE_NAME, so this also purges
// returning visitors' stale cached HTML/icons/manifest from before the
// rebrand, not just a cosmetic rename.
const CACHE_NAME = 'nicole-carvalho-v6-node';

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
 * push — fires even with the app fully closed.
 * Payload (Push V2): { title, body, tag, kind, actions, pacienteId,
 * suplementoId, lembreteId, dataHoraPrescrita }.
 *
 * Platform notes (documented, not hacked around):
 * - Chromium/Android: `actions` buttons are shown.
 * - Safari/iOS (Home Screen PWA): `actions` are ignored by WebKit — only the
 *   body tap fires `notificationclick` with empty `event.action`.
 */
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (err) {
    data = { title: 'Nicole Carvalho', body: event.data ? event.data.text() : '' };
  }

  const title = data.title || 'Nicole Carvalho';
  // Actions resolution:
  // 1) Explicit `actions` array from server wins — including [] (no buttons).
  //    DailyCompletionNotifier sends actions:[] for conclusão; treating [] as
  //    "missing" used to incorrectly inject "✅ Tomei agora" on Android.
  // 2) If omitted, fall back by kind so older dose payloads still get the button;
  //    all conclusão_* / ack kinds stay button-free.
  const kind = data.kind || 'dose';
  const isCompletionOrAck =
    kind === 'ack' ||
    kind === 'conclusao_dia' ||
    kind === 'conclusao_dia_perfeito' ||
    kind === 'conclusao_dia_imperfeito' ||
    String(kind).indexOf('conclusao_dia') === 0;
  let actions;
  if (Array.isArray(data.actions)) {
    actions = data.actions;
  } else if (isCompletionOrAck) {
    actions = [];
  } else {
    actions = [{ action: 'tomar', title: '✅ Tomei agora' }];
  }

  const options = {
    body: data.body || '',
    icon: './brand/icon-192.png',
    badge: './brand/icon-96.png',
    tag: data.tag || 'nicole-carvalho-lembrete',
    renotify: true,
    silent: false,
    vibrate: [80, 40, 80],
    actions,
    data: {
      url: './#/paciente',
      kind,
      pacienteId: data.pacienteId || null,
      suplementoId: data.suplementoId || null,
      lembreteId: data.lembreteId || null,
      dataHoraPrescrita: data.dataHoraPrescrita || null
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

function isIosLike() {
  const ua = self.navigator.userAgent || '';
  if (/iPad|iPhone|iPod/i.test(ua)) return true;
  // iPadOS desktop UA
  return self.navigator.platform === 'MacIntel' && self.navigator.maxTouchPoints > 1;
}

function buildPatientDeepLink(params) {
  const url = new URL('./#/paciente', self.registration.scope);
  // Hash query so the SPA can read it without a server round-trip.
  const qs = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (params[key] != null && params[key] !== '') qs.set(key, params[key]);
  });
  const q = qs.toString();
  url.hash = q ? `/paciente?${q}` : '/paciente';
  return url.href;
}

async function openOrFocusPatient(deepLink) {
  const targetUrl = deepLink || new URL('./#/paciente', self.registration.scope).href;
  const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const client of windowClients) {
    if (client.url.startsWith(self.registration.scope) && 'focus' in client) {
      if ('navigate' in client) {
        try {
          await client.navigate(targetUrl);
        } catch (_err) {
          // navigate may fail on some engines — focus is enough; FE reads nothing.
        }
      }
      await client.focus();
      if (client.postMessage) {
        client.postMessage({ type: 'PUSH_NAV', url: targetUrl });
      }
      return;
    }
  }
  await self.clients.openWindow(targetUrl);
}

async function notifyClientsDashboardRefresh(result) {
  const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
  for (const client of windowClients) {
    client.postMessage({ type: 'PUSH_CHECKIN_DONE', result: result || null });
  }
}

async function authenticatedGasCall(action, fields) {
  const refreshed = await refreshAccessFromIndexedDb();
  return callGasAction(action, { token: refreshed.token, ...fields });
}

/**
 * notificationclick
 * - action `tomar` (Android/Chromium): check-in via API without opening UI.
 * - default body tap: open app. On iOS (no action buttons), open already
 *   primed to run check-in (best effort per Apple limits).
 */
self.addEventListener('notificationclick', (event) => {
  const nData = (event.notification && event.notification.data) || {};
  event.notification.close();

  if (event.action === 'tomar') {
    event.waitUntil(
      (async () => {
        try {
          if (!nData.suplementoId || !nData.dataHoraPrescrita) {
            throw new Error('Payload da notificação incompleto para check-in.');
          }
          const result = await authenticatedGasCall('registrarCheckin', {
            suplementoId: nData.suplementoId,
            dataHoraPrescrita: nData.dataHoraPrescrita
          });
          await notifyClientsDashboardRefresh(result);
          await self.registration.showNotification('✅ Registrado', {
            body: 'Check-in confirmado. Seu tratamento continua no ritmo.',
            icon: './brand/icon-192.png',
            badge: './brand/icon-96.png',
            tag: 'nicole-checkin-ok',
            silent: true,
            data: { kind: 'ack' }
          });
        } catch (err) {
          const msg = err && err.message ? String(err.message) : '';
          // Idempotent: dose already confirmed — calm ack, not error deep-link.
          if (/já registrado/i.test(msg)) {
            await notifyClientsDashboardRefresh(null);
            await self.registration.showNotification('✅ Já registrado', {
              body: 'Esta dose já estava confirmada.',
              icon: './brand/icon-192.png',
              badge: './brand/icon-96.png',
              tag: 'nicole-checkin-ok',
              silent: true,
              data: { kind: 'ack' }
            });
            return;
          }
          await openOrFocusPatient(
            buildPatientDeepLink({
              pushCheckin: '1',
              suplementoId: nData.suplementoId || '',
              dataHoraPrescrita: nData.dataHoraPrescrita || ''
            })
          );
        }
      })()
    );
    return;
  }

  if (nData.kind === 'ack') return;

  const isCompletionKind =
    nData.kind === 'conclusao_dia' ||
    nData.kind === 'conclusao_dia_perfeito' ||
    nData.kind === 'conclusao_dia_imperfeito' ||
    String(nData.kind || '').indexOf('conclusao_dia') === 0;
  const shouldPrimeCheckin =
    !isCompletionKind &&
    nData.kind !== 'ack' &&
    nData.suplementoId &&
    nData.dataHoraPrescrita &&
    isIosLike();

  const deepLink = shouldPrimeCheckin
    ? buildPatientDeepLink({
        pushCheckin: '1',
        suplementoId: nData.suplementoId,
        dataHoraPrescrita: nData.dataHoraPrescrita
      })
    : new URL('./#/paciente', self.registration.scope).href;

  event.waitUntil(openOrFocusPatient(deepLink));
});

// Mirrors frontend/src/utils/sessionDb.js's DB/store/key exactly — sw.js is
// a classic (non-module) script, so it can't `import` that file; these are
// duplicated constants, not a second source of truth (same values, same
// IndexedDB database, read by both).
const AUTH_DB_NAME = 'nicole-carvalho-auth';
const AUTH_STORE_NAME = 'session';
const AUTH_RECORD_KEY = 'current';
/** Must match frontend/src/utils/silentRefreshSession.js AUTH_REFRESH_LOCK. */
const AUTH_REFRESH_LOCK = 'nicole-carvalho-auth-refresh';
function apiBaseUrl() {
  if (typeof self !== 'undefined' && self.location && self.location.origin) {
    return `${self.location.origin}/api`;
  }
  return '/api';
}

let refreshInflight = null;

function isDefinitiveSessionError(err) {
  const msg = String((err && err.message) || '');
  return /Sessão inválida|Sessão expirada|conta está inativa|temporariamente bloqueada/i.test(msg);
}

function readRefreshTokenFromIndexedDb() {
  return new Promise((resolve) => {
    const openRequest = indexedDB.open(AUTH_DB_NAME, 1);
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(AUTH_STORE_NAME)) {
        db.createObjectStore(AUTH_STORE_NAME);
      }
    };
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

function writeRefreshTokenToIndexedDb(refreshToken) {
  return new Promise((resolve) => {
    const openRequest = indexedDB.open(AUTH_DB_NAME, 1);
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(AUTH_STORE_NAME)) {
        db.createObjectStore(AUTH_STORE_NAME);
      }
    };
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

function clearRefreshTokenFromIndexedDb() {
  return new Promise((resolve) => {
    const openRequest = indexedDB.open(AUTH_DB_NAME, 1);
    openRequest.onerror = () => resolve();
    openRequest.onsuccess = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(AUTH_STORE_NAME)) {
        resolve();
        return;
      }
      const tx = db.transaction(AUTH_STORE_NAME, 'readwrite');
      tx.objectStore(AUTH_STORE_NAME).delete(AUTH_RECORD_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    };
  });
}

/**
 * Rotate refresh → access under the same Web Lock as the page
 * (AUTH_REFRESH_LOCK). Single-flight (refreshInflight) + exclusive lock so
 * notificationclick / pushsubscriptionchange never race AuthContext boot/401.
 * Re-reads IndexedDB inside the lock after waiting for the previous holder.
 */
async function refreshAccessFromIndexedDb() {
  if (refreshInflight) return refreshInflight;

  const run = async () => {
    const refreshToken = await readRefreshTokenFromIndexedDb();
    if (!refreshToken) {
      throw new Error('Sessão indisponível no Service Worker (sem refresh token).');
    }
    try {
      const refreshed = await callGasAction('refreshToken', { refreshToken });
      await writeRefreshTokenToIndexedDb(refreshed.refreshToken);
      return refreshed;
    } catch (err) {
      if (isDefinitiveSessionError(err)) {
        await clearRefreshTokenFromIndexedDb();
      }
      throw err;
    }
  };

  refreshInflight = (async () => {
    if (self.navigator && self.navigator.locks && self.navigator.locks.request) {
      return self.navigator.locks.request(AUTH_REFRESH_LOCK, { mode: 'exclusive' }, run);
    }
    return run();
  })().finally(() => {
    refreshInflight = null;
  });

  return refreshInflight;
}

async function callGasAction(action, payload) {
  const response = await fetch(apiBaseUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action, ...payload })
  });
  const text = await response.text();
  let result;
  try {
    result = JSON.parse(text);
  } catch (_err) {
    throw new Error('Resposta inválida do servidor.');
  }
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

        const refreshed = await refreshAccessFromIndexedDb();

        const json = newSubscription.toJSON();
        await callGasAction('salvarInscricaoPush', {
          token: refreshed.token,
          endpoint: json.endpoint,
          p256dh: json.keys && json.keys.p256dh,
          auth: json.keys && json.keys.auth
        });
      } catch (_err) {
        // Best-effort — next app open reconciles via initPushNotifications().
      }
    })()
  );
});
