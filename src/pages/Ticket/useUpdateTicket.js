import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTicket as updateTicketApi } from "../../services/apiTickets";

export const useUpdateTicket = (id) => {
  const queryClient = useQueryClient();

  const { mutate: updateTicket, isLoading: isUpdating } = useMutation({
    mutationFn: (ticket) => updateTicketApi(ticket),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
    },
    onError: (err) => /* toast.error */ console.log(err.message),
  });

  return { isUpdating, updateTicket };
};
