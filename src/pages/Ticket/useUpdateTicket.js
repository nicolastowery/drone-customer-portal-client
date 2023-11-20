import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTicket as updateTicketApi } from "../../services/apiTickets";

export const useUpdateTicket = (id) => {
  const queryClient = useQueryClient();

  const { mutate: updateTicket, isLoading: isUpdating } = useMutation({
    mutationFn: (ticket) => updateTicketApi(ticket),
    onSuccess: () => {
      toast.success(
        "Ticket successfully updated! The customer has been notified."
      );
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateTicket };
};
