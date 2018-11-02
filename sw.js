// for like CSS, HTML...
const staticCacheName = 'restaurants-static';

// for images.
const contentImgsCache = 'restaurants-content-imgs';
const allCaches = [
    staticCacheName,
    contentImgsCache
];


self.addEventListener('const staticCacheName = 'review-cache-v1';
const assets = [
  './',
  'index.html',
  'restaurant.html?id=1',
  'restaurant.html?id=2',
  'restaurant.html?id=3',
  'restaurant.html?id=4',
  'restaurant.html?id=5',
  'restaurant.html?id=6',
  'restaurant.html?id=7',
  'restaurant.html?id=8',
  'restaurant.html?id=9',
  'restaurant.html?id=10',
  './css/styles.css',
  './css/responsive.css',
  './js/main.js',
  './js/dbhelper.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName)
      .then( (cache) => {
        return cache.addAll(assets);
      })
  );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
          .then( (cacheNames) => {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('review-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
          })
    );
});




self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});install', function (event) {
    console.log('installed successfully');
    console.log('location');
    console.log(location);

    // caching all static files
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/',
                './css/styles.css',
                './js/dbhelper.js',
                './js/main.js',
                './js/restaurant_info.js',
                './index.html',
                './restaurant.html'
            ]);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('Activated successfully...');


    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('restaurants-') &&
                        !allCaches.includes(cacheName);
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    const requestUrl = new URL(event.request.url);
    console.log(requestUrl);


    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('/'));
            return;
        }

       /* if (requestUrl.pathname.startsWith('/photos/')) {
            event.respondWith(servePhoto(event.request));
            return;
        }*/

    }

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
