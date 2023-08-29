import { BrowserRouter, Routes, Route } from "react-router-dom";

import Help from "./pages/Help/Help";
import PageNav from "./components/PageNav/PageNav";
import Admin from "./pages/Admin/Admin";
import Ticket from "./pages/Ticket/Ticket";
import TicketList from "./pages/TicketList/TicketList";
function App() {
  return (
    <BrowserRouter>
      <PageNav />
      <Routes>
        <Route path="/" element={<Help />} />
        <Route path="drone-admin" element={<Admin />}>
          <Route index element={<TicketList />} />
          <Route path="ticket/:id" element={<Ticket />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
