import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Help from "./pages/Help/Help";
import PageNav from "./components/PageNav/PageNav";
import Admin from "./pages/Admin/Admin";
import Ticket from "./pages/Ticket/Ticket";
import TicketList from "./pages/TicketList/TicketList";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
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
    </QueryClientProvider>
  );
}

export default App;
