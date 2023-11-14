import { useQuery } from "@tanstack/react-query";
import { getTickets } from "../../services/apiTickets.js";

export const useTickets = () => {
  const {
    isLoading,
    data: tickets,
    error,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });

  return { isLoading, error, tickets };
};
