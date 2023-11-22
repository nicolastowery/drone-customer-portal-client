import supabase, { getAccessToken } from "../supabase/supabase";

const SERVER = "http://localhost:3001/api";

export const getTickets = async () => {
  const access_token = await getAccessToken();
  const res = await fetch(`${SERVER}/admin`, {
    headers: {
      Authorization: access_token,
    },
  });
  if (!res.ok) {
    console.log("error authenticating");
    return;
  }
  const data = await res.json();

  return data;
};

export const getTicket = async (id) => {
  const access_token = await getAccessToken();
  const res = await fetch(`${SERVER}/ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
    body: JSON.stringify({
      ticket_id: id,
    }),
  });
  const data = await res.json();
  return data;
};

export const updateTicket = async (ticket) => {
  const access_token = await getAccessToken();
  const res = await fetch(`${SERVER}/update-ticket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: access_token,
    },
    body: JSON.stringify(ticket),
  });
  const data = await res.json();
  if (!res.ok) {
    console.log("Error updating the ticket status!");
    return;
  }
  return data;
};

export const downloadFile = async (filename) => {
  const { data, error } = await supabase.storage
    .from("uploads")
    .download(filename);

  if (error) {
    console.log(error);
    return;
  }
  return data;
};
