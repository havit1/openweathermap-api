const CACHE_NAME = "Your forecast app";
const urlsToCache = ["/"];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  let cacheWhiteList = ["Your forecast app"];
  event.waitUntil(
    caches.keys().then(cachesNames => {
      return Promise.all(
        cachesNames.map(cacheNames => {
          if (cacheWhiteList.indexOf(cacheNames) === -1) {
            return caches.delete(cacheNames);
          }
        })
      );
    })
  );
});
