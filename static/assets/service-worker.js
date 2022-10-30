// caches.has('static').then((hasCache) => {
//     if (!hasCache) {
//         cacheNow();
//     }
// })

// function cacheNow() {
//     caches.open("static").then(cache=>{
//         return cache.addAll([
//             "./",
//             "./index.html",
//             "./icons/icon_x192.png",
//             "./favicon.png",
//             "./icondark.png",
//             "./banner.png",
//             "./home.js",
//             "./app.css",
//             "/require/init.css",
//             "/require/init.js",
//             "./game.html",
//             "./game.css",
//             "./game.js",
//             "./tlib.js",
//             "./version.txt"
//         ]);
//     })
// }

// self.addEventListener('install',e=>{
//     e.waitUntil(
//         cacheNow()
//     )
// })

// self.addEventListener('fetch',e=>{
//     if (!navigator.onLine) {
//         e.respondWith(
//             caches.match(e.request).then(response=>{
//                 return response || fetch(e.request);
//             })
//         )
//     }
// })

importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js');

workbox.routing.registerRoute(
    /\.(?:css|js|html)$/,
    new workbox.strategies.StaleWhileRevalidate({
        "cacheName": "webapp",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 15768000
            })
        ]
    })
)

workbox.routing.registerRoute(
    '/maths/',
    new workbox.strategies.StaleWhileRevalidate()
)

workbox.routing.registerRoute(
    '/maths/version.txt',
    new workbox.strategies.StaleWhileRevalidate()
)

workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|gif|svg)$/,
    new workbox.strategies.CacheFirst({
        "cacheName": "images",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 31536000
            })
        ]
    })
)