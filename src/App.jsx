import { useState } from "react";
import { subscribeToPush } from "./main.jsx";
import "./App.css"; // Ensure this contains @tailwind directives

function App() {
  const [status, setStatus] = useState("Enable Push Notifications");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginStatus("Logging in...");
    try {
      const res = await fetch("https://9ab4491a6116.ngrok-free.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();
      setToken(data.token);
      setLoginStatus("Logged in!");
    } catch (err) {
      setLoginStatus("Login failed");
    }
  };

  const handleSubscribe = async () => {
    setStatus("Subscribing...");
    await subscribeToPush(token);
    setStatus("Subscribed!");
  };

  const handleLogout = async () => {
    await fetch(" https://9ab4491a6116.ngrok-free.app/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    setToken(null);
    setUsername("");
    setPassword("");
    setLoginStatus("");
    setStatus("Enable Push Notifications");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
        <h1 className="text-xl font-bold text-center mb-4">React PWA Push Demo</h1>
        {!token ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <div className="text-sm text-center text-gray-500">{loginStatus}</div>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <button
              onClick={handleSubscribe}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {status}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ml-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
