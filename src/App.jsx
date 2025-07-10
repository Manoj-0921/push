import { useState } from "react";
import { subscribeToPush } from "./main.jsx";
import "./App.css";

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
      const res = await fetch("https://3611d52a1dac.ngrok-free.app/login", {
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

  return (
    <div>
      <h1>React PWA Push Demo</h1>
      {!token ? (
        <form onSubmit={handleLogin}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <div>{loginStatus}</div>
        </form>
      ) : (
        <button onClick={handleSubscribe}>{status}</button>
      )}
    </div>
  );
}

export default App;
