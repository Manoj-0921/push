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
self.__WB_MANIFEST;
