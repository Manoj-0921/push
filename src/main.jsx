import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 👇 required import for PWA registration
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
