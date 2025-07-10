// ✅ Handle incoming push notifications
self.addEventListener("push", function (event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || "Push Notification";
  const options = {
    body: data.body || "You have a new message.",
    icon: "pwa-192x192.png",
    badge: "pwa-192x192.png",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ✅ Handle notification click — opens root of PWA
self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});

// ✅ Required for Workbox to inject pre-cache manifest
[{"revision":null,"url":"assets/index-B5IzWNc6.css"},{"revision":null,"url":"assets/index-DWOZKnJE.js"},{"revision":"b0181c421f44e69ddeb64cca92fb3d33","url":"index.html"},{"revision":"1872c500de691dce40960bb85481de07","url":"registerSW.js"},{"revision":"68b329da9893e34099c7d8ad5cb9c940","url":"sw.js"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"pwa-192x192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"pwa-512x512.png"},{"revision":"95d306d06f9db8f8951e56e408e13bd9","url":"manifest.webmanifest"}];
