
console.log('Hellow from SW');

var urls = [
  '/',
  'styles1.css',
  'launcher.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v22/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2'
];

self.addEventListener("install", (event) => {
    console.log('The SW is now installed'); 
    event.waitUntil(
      caches.open('activityLauncher').then(cache => cache.addAll(urls))
    );
});

self.addEventListener('fetch', function(event) {
event.respondWith(
    caches.match(event.request)
        .then((response) => {
            // Even if the response is in the cache, we fetch it
            // and update the cache for future usage
            var fetchPromise = fetch(event.request).then(
                function(networkResponse) {
                    caches.open("activityLauncher").then(function(cache) {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            // We use the currently cached version if it's there
            return response || fetchPromise;
        })
    );
});

// Service Worker's changes for Sync
self.addEventListener("sync", function(event) {
    if (event.tag=="eurocheck") {
        event.waitUntil(fetch("http://api.fixer.io/latest?base=USD")
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                console.log(response.rates.EUR);
            })
        );
    }
});