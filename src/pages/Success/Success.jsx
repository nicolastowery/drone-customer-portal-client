import styles from "./Success.module.css";
function Success({ firstName, email, ticketNumber }) {
  return (
    <div>
      <h1>Request Ticket Successfully Submitted!</h1>
      <div>
        Valued customer, an email has been sent to the provided email address
        detailing the specifics of your ticket.
      </div>
    </div>
  );
}

export default Success;
