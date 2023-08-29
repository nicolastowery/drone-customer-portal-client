import Button from "../../components/Button/Button";
import styles from "./Success.module.css";
function Success({ setSubmitted }) {
  return (
    <div className={styles.successContainer}>
      <div className={styles.messageContainer}>
        <h1>Request Ticket Successfully Submitted!</h1>
        <div>
          Valued customer, an email has been sent to the provided email address
          detailing the specifics of your ticket.
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={() => setSubmitted(false)}>Submit New Ticket</Button>
      </div>
    </div>
  );
}

export default Success;
