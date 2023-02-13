const CACHE_NAME = 'wytwornia-kontentu-cache-v6.033';
const urlsToCache = [
        './',
        './images/main_mobile_small.jpg',
        './wizualizacje',
        './wirtualny-spacer',
        './wiadomosc-nie-wyslana',
        './wiadomosc-wyslana',
        './filmy-reklamowe',
        './manifest.json',
        './aplikacje-webowe', 
        './images/logo.svg',
        './style.min.css',
        './scripts.min.js',
        './dom_bg_tiny.jpg',
        './images/price.svg',
        './images/effort.svg',
        './images/quality.svg',
        './images/zdjecia/dom2_thumb.jpg',
        './images/zdjecia/6_thumb.jpg',
        './images/zdjecia/dron/9_thumb.jpg',
        './images/zdjecia/dron/9.webp',
        './images/zdjecia/dron/14_thumb.jpg',
        './images/zdjecia/dron/7_thumb.jpg',
        './images/zdjecia/dron/4_thumb.jpg',
        './images/zdjecia/dron/1_thumb.jpg',
        './images/zdjecia/dron/2_thumb.jpg',
        './images/zdjecia/dron/19_thumb.jpg',
        './images/zdjecia/dron/12_thumb.jpg',
        './images/zdjecia/dron/13_thumb.jpg',
        './images/zdjecia/dron/10_thumb.jpg',
        './images/zdjecia/dron/6_thumb.jpg',
        './images/zdjecia/dron/8_thumb.jpg',
        './images/zdjecia/dron/11_thumb.jpg',
        './images/zdjecia/dron/3_thumb.jpg',
        './images/zdjecia/dron/15_thumb.jpg',
        './images/zdjecia/dron/16_thumb.jpg',
        './images/zdjecia/dron/17_thumb.jpg',
        './images/zdjecia/dron/18_thumb.jpg',
        './images/zdjecia/dron/5_thumb.jpg',
        './rendery/render_sofa.jpg',
        './rendery/kuchnia_fix.jpg',
        './rendery/gabinet_fix.jpg',
        './rendery/salon_fix_tiny.jpg',
        './rendery/salon_fix.jpg',
        './rendery/gabinet_thumb.jpg',
        './rendery/11_thumb.jpg',
        './rendery/9_thumb.jpg',
        './rendery/2_thumb.jpg',
        './rendery/6_thumb.jpg',
        './rendery/3_thumb.jpg',
        './rendery/4_thumb.jpg',
        './rendery/14_thumb.jpg',
        './rendery/5_thumb.jpg',
        './rendery/1_thumb.jpg',
        './rendery/10_thumb.jpg',
        './images/wirtualny-spacer-3d.jpg',
        './images/wirtualny-spacer.jpg',
        './images/code.jpg',
        './images/dev.jpg',
        './images/dev2.jpg',
        './images/headerApp2.jpg',
        './images/headerApp.jpg',
        './images/data.jpg',
        './icon-192x192.png',
        './images/favicon.jpg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', function(event) {
  console.log('Activate event');
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);


            console.log('Opened cache');
          }
        }))
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

