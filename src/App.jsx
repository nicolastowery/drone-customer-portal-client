import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Help from "./pages/Help/Help";
import Dropbox from "./pages/Dropbox/Dropbox";
import PageNav from "./components/PageNav/PageNav";
import Admin from "./pages/Admin/Admin";
import Ticket from "./pages/Ticket/Ticket";
import TicketList from "./pages/TicketList/TicketList";

function App() {
  return (
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
  );
}

export default App;
