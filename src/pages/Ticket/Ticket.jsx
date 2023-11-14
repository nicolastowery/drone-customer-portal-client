import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
import InfoBlock from "../../components/InfoBlock/InfoBlock";
import SelectField from "../../components/SelectField/SelectField";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./Ticket.module.css";
import { useTickets } from "../TicketList/useTickets";
function Ticket() {
  const [newStatus, setNewStatus] = useState("");
  const [files, setFiles] = useState([]);
  const { tickets } = useTickets();
  const { id } = useParams();
  const ticket = tickets.find((ticket) => ticket.ticket_id === id);
  const formattedDate = formatDate(ticket.created_at);

  const handleChange = async () => {
    const userConfirmation = window.confirm(
      `Confirm changes: Ticket Status: ${ticket.status} >> ${newStatus}\n\nUpon confirmation, the client will be notified via email of this change.`
    );
    if (userConfirmation) {
      const res = await fetch("http://localhost:3001/api/update-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type header
        },
        body: JSON.stringify({
          ticket_id: ticket.ticket_id,
          status: newStatus,
          email: ticket.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Error updating the ticket status!");
        return;
      }
      // updateTicket(data);
      return;
    }
    setNewStatus(ticket.status);
  };

  const handleDownload = async () => {
    const res = await fetch("http://localhost:3001/api/get-files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticket_id: ticket.ticket_id,
        files,
      }),
    });

    if (!res.ok) {
      console.log("error with downloading files!");
      return;
    }
    const blob = await res.blob(); // Create a Blob from the response data
    const url = URL.createObjectURL(blob); // Generate a temporary URL

    const a = document.createElement("a");
    a.href = url;
    a.download = `${ticket.ticket_id}-files.zip`; // Set the desired file name
    a.style.display = "none"; // Hide the anchor element

    document.body.appendChild(a); // Append the anchor element to the body
    a.click(); // Programmatically click the anchor element

    URL.revokeObjectURL(url); // Clean up the temporary URL

    document.body.removeChild(a); // Remove the anchor element from the body
  };

  return (
    <>
      {tickets ? (
        <div className={styles.ticketContainer}>
          <div className={styles.ticket}>
            <div className={styles.heading}>
              <h1 className={styles.id}>Ticket ID {id}</h1>
              <div className={styles.buttonContainer}>
                {files.length > 0 && (
                  <Button onClick={handleDownload}>Download</Button>
                )}
                <BackButton>
                  <span>&larr; Back</span>
                </BackButton>
              </div>
            </div>
            <div className={styles.infoContainer}>
              <InfoBlock
                type="list"
                title="Ticket Info"
                listItems={[
                  { "Request Type": ticket.request_type },
                  {
                    Status: (
                      <>
                        <SelectField
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          options={
                            ticket.status === "NEW"
                              ? ["NEW", "OPEN", "CLOSED", "VOID"]
                              : ["OPEN", "CLOSED", "VOID"]
                          }
                          className={styles.inline}
                        />
                        {newStatus !== ticket.status && (
                          <Button onClick={handleChange} type="inline">
                            Save
                          </Button>
                        )}{" "}
                      </>
                    ),
                  },
                  { "Ticket Submission Date": formattedDate },
                ]}
              />
              <InfoBlock
                type="list"
                title="Customer Info"
                listItems={[
                  { "Customer Name": `${ticket.f_name} ${ticket.l_name}` },
                  { "Company Name": ticket.company },
                  { State: ticket.state },
                  { Email: ticket.email },
                  { Phone: ticket.phone },
                  { "Contact Method": ticket.contact_method },
                ]}
              />
              <InfoBlock title="Customer Notes">{ticket.text}</InfoBlock>
            </div>
            {ticket.file.length > 0 && <Gallery files={ticket.file} />}
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export default Ticket;
