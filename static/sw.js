const CACHE_VERSION = "1.0.0";

const cacheOnInstall = ["/styles.css", "/manifest.json", "/favicon.ico"];
const cacheFirstResources = [
  "/favicon.ico",
  "/icons",
  "/styles.css",
  "/manifest.json",
];

async function cacheFirstWithRefresh(request) {
  const fetchResponsePromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });

  return (await caches.match(request)) || (await fetchResponsePromise);
}

async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log(error);
    const cachedResponse = await caches.match(request);
    return cachedResponse || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
    const { pathname } = new URL(event.request.url);
    if (cacheFirstResources.some((resource) => resource.startsWith(pathname))) {
      event.respondWith(cacheFirst(event.request));
    } else {
      event.respondWith(networkFirst(event.request));
    }
  }
});

self.addEventListener("activate", (event) => {
  const cacheAllowlist = [CACHE_VERSION];
  event.waitUntil(async () => {
    (await caches.keys()).forEach((cacheName) => {
      if (!cacheAllowlist.includes(cacheName)) {
        return caches.delete(cacheName);
      }
    });
  });
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(cacheOnInstall)),
  );
});
