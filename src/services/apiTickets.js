const SERVER = "http://localhost:3001";

export const getTickets = async () => {
  const res = await fetch(`${SERVER}/api/admin`);
  const data = await res.json();
  console.log(data);
  return data;
};
