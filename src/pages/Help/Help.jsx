import { useState } from "react";
import RequestForm from "../../components/RequestForm/RequestForm";
import styles from "./Help.module.css";
function Help() {
  const [requestType, setRequestType] = useState("General Question");
  return (
    <div className={styles.help}>
      <h1 className={styles.h1}>Submit Request Ticket</h1>
      <div className={styles.h2Container}>
        {(requestType === "General Question" ||
          requestType === "Training Request") && (
          <h2>
            Please be sure to cross reference your question with our{" "}
            <a href="https://bestwaydrones.com/pages/faq">FAQ</a> and{" "}
            <a href="#">Knowledge Base</a> before submitting a ticket.
          </h2>
        )}
      </div>
      <RequestForm
        requestType={requestType}
        onChangeRequestType={setRequestType}
      />
    </div>
  );
}

export default Help;
