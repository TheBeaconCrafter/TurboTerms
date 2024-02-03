const myCache = 'TURBOTERMS_CACHE';

self.addEventListener('install', (event) => {
    event.waitUntil(async function() {
        const cache = await caches.open(myCache);
        const resourcesToCache = [
            '/',
            './manifest.json',
            './sw.js',
            './index.html',
            './script.js',
            './style.css',
            './img/turbotermslogofinal.png',
            './img/turbotermslogocrop.ico',
            './download',
            './download/index.html',
            './vocabbuilder',
            './vocabbuilder/index.html',
            './vocabbuilder/script.js',
            './caching/cache.js',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
            './dependencies/chart.js',
            './dependencies/dragdroptouch.js',
            './config.js',
        ];

        // Iterate over resources and cache them individually
        for (const resource of resourcesToCache) {
            try {
                await cache.add(resource);
                console.log(`Cached ${resource}`);
            } catch (error) {
                console.error(`Failed to cache ${resource}: ${error.message}`);
                // Continue caching other resources even if one fails
            }
        }
    }());
});


self.addEventListener('activate', (event) => {
    event.waitUntil(async function() {
        const cache = await caches.open(myCache);
        const cacheNames = await cache.keys();
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
    }());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(async function() {
        const networkPromise = fetch(event.request);
        const cachePromise = caches.open(myCache);

        try {
            const networkResponse = await networkPromise;
            cachePromise
                .then(cache => {
                    cache.put(event.request, networkResponse);
                });
            return networkResponse.clone();
        } catch (error) {
            const cache = await cachePromise;
            const cacheResponse = await cache.match(event.request);
            return cacheResponse;
        }
    }());
});