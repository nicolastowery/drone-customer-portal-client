const SERVER = "http://localhost:3001/api";

export const getTickets = async () => {
  const res = await fetch(`${SERVER}/admin`);
  const data = await res.json();

  return data;
};

export const getTicket = async (id) => {
  console.log("attempting fetch");
  const res = await fetch(`${SERVER}/ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticket_id: id,
    }),
  });
  const data = await res.json();
  console.log(data);
  return data.ticketData;
};

export const updateTicket = async (id, email, status) => {
  const res = await fetch(`${SERVER}/update-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ticket_id: id,
      status,
      email,
    }),
  });
  const data = await res.json();
  console.log(data);
  if (!res.ok) {
    console.log("Error updating the ticket status!");
    return;
  }
  return data;
};
