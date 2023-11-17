import { useQuery } from "@tanstack/react-query";
import { getTicket } from "../../services/apiTickets.js";

export const useTicket = (id) => {
  const {
    isLoading,
    data: ticket,
    error,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicket(id),
  });

  return { isLoading, error, ticket };
};
