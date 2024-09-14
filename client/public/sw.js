console.log("Service Worker Registered");

// Define cache name
const CACHE_NAME = "appV1";

// List of static assets to cache
const STATIC_ASSETS = [
  "/static/js/bundle.js",
  "/",
  "index.html",
  "/manifest.json",
  "/about",
  "/logo192.png",
  "/favicon.ico",
  "/http://localhost:3000/static/media/endless-constellation.f701ac7876618c57d1b690f6251ea0c5.svg",
];

// Install event: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch((error) => {
      console.error("Failed to cache static assets during install:", error);
    })
  );
});

// Fetch event: handle requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Fetch from network if not cached
      return fetch(event.request).then((networkResponse) => {
        // Cache the response for future requests
        return caches.open(CACHE_NAME).then((cache) => {
          // Cache successful response
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch((error) => {
        console.error("Failed to fetch from network:", error);
        // Handle fetch failure (optional: return a fallback response)
        // return caches.match('/offline.html'); // Example fallback
      });
    })
  );
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).catch((error) => {
      console.error("Failed to clean up old caches during activate:", error);
    })
  );
});
