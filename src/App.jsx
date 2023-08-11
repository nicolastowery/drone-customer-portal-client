import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./pages/Homepage/Homepage";
import Help from "./pages/Help/Help";
import Dropbox from "./pages/Dropbox/Dropbox";
import PageNav from "./components/PageNav/PageNav";
import Admin from "./pages/Admin/Admin";
import Ticket from "./pages/Ticket/Ticket";
import TicketList from "./pages/TicketList/TicketList";
import Login from "./components/Login/Login";
function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

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
    <Login setToken={setToken} />
  );
}

export default App;
