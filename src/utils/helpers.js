export const formatDate = (date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleString("en-US", options);
  return formattedDate;
};
