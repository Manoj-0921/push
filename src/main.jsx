import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

if ("serviceWorker" in navigator && "PushManager" in window) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("Service Worker registered:", reg.scope))
    .catch((err) => console.error("Service Worker registration failed:", err));
}

export async function subscribeToPush(token) {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Permission denied");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "BMU_YCY4w8CyrDxvP5aQt-1KsAJT8huKF6zfJQoBAGN0Xvcdzmxn5E-h-PKYeJAKEVPnFgO1zz3bZCOzBQQe7t8"
      ),
    });

    await fetch("https://3611d52a1dac.ngrok-free.app/subscribe", {
      method: "POST",
      body: JSON.stringify({ token, subscription }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Subscribed to push");
  } catch (error) {
    console.error("Subscription failed:", error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
