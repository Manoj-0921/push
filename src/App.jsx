import { useEffect, useState } from "react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      console.log("Install result:", result.outcome);
      setDeferredPrompt(null);
      setShowInstall(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>🚀 Vite + React + PWA</h1>
      {showInstall && <button onClick={handleInstall}>📲 Install App</button>}
    </div>
  );
}

export default App;
