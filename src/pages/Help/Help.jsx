import { useState } from "react";
import RequestForm from "../../components/RequestForm/RequestForm";
import styles from "./Help.module.css";
import Success from "../Success/Success";
function Help() {
  const [requestType, setRequestType] = useState("General Question");
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className={styles.help}>
      {!submitted && (
        <>
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
            onSubmit={setSubmitted}
          />
        </>
      )}
      {submitted && <Success setSubmitted={setSubmitted} />}
    </div>
  );
}

export default Help;
