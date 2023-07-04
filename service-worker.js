const CACHE_NAME = 'mi-cache';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'mixkit-alarm-digital-clock-beep-989.wav',
  'icon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// service-worker.js

// Definir una lista de recursos a almacenar en caché
const archivosEnCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/imagen.png'
];

// Evento de instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('mi-cache').then(cache => {
      // Almacenar en caché los archivos necesarios
      return cache.addAll(archivosEnCache);
    })
  );
});

// Evento fetch: intentar buscar los recursos en caché antes de realizar una solicitud a la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si el recurso está en caché, devolverlo desde la caché
      if (response) {
        return response;
      }
      // Si el recurso no está en caché, realizar la solicitud a la red
      return fetch(event.request);
    })
  );
});

