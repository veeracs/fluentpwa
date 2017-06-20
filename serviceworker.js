
console.log('Hellow from SW');


var urls = ['/', 'styles.css', 'launcher.js'];
 
self.addEventListener("install", (event) => {
    console.log('The SW is now installed');
    event.waitUntil(
      caches.open('activityLauncher').then(cache => cache.addAll(urls))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
            if (response) {
                console.log(`The request ${event.request.url} is in the cache!`); 
                // We use the currently cached version if it exits
                return response;
            } else {
                console.log(`We need to go to the network for ${event.request.url}`);
                // Even if the response is in the cache, we fetch it and update the cache for future usage
                return fetch(event.request).then(
                  (networkResponse) => {
                    // http responses are buffers, so that means they need to be cloned
                    caches.put(event.request, networkResponse.clone());
                    return networkResponse;
                  }
                );
            }
        })
    );
});

self.addEventListener('activate', function(event) {
  // Array of cache that we will use in this version
  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1']; 
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Deletes the cache because we won't use it here
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});    

