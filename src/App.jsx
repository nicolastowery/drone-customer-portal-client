import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage/Homepage";
import Help from "./pages/Help/Help";
import Dropbox from "./pages/Dropbox/Dropbox";
import PageNav from "./components/PageNav/PageNav";
import Admin from "./pages/Admin/Admin";
import Ticket from "./pages/Ticket/Ticket";
import TicketList from "./pages/TicketList/TicketList";
function App() {
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async (password) => {
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type header
        },
        body: JSON.stringify({ password }), // Send the password in a JSON object
      });

      if (res.ok) {
        const data = await res.json();
        const { token } = data;
        localStorage.setItem("token", token);
        setToken(token);
        console.log("token saved!");
      } else {
        console.error("Error signing in:", res.status);
      }
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleLogout = () => {
    const userConfirmation = window.confirm(
      "WARNING: You are about to logout of the Bestway Drones Customer Portal!\n\nPlease ensure that you have your password either saved in your browser or elsewhere. If you have lost your password, contact us at (270) 887-8550."
    );
    if (!userConfirmation) return;
    localStorage.removeItem("token");
    setToken(null);
  };

  return token ? (
    <>
      <button onClick={handleLogout}>Log Out</button>
      <BrowserRouter>
        <PageNav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="help" element={<Help />} />
          <Route path="dropbox" element={<Dropbox />} />
          <Route path="admin" element={<Admin />}>
            <Route index element={<TicketList />} />
            <Route path="ticket/:id" element={<Ticket />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  ) : (
    <>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin(password)}>Log In</button>
    </>
  );
}

export default App;
