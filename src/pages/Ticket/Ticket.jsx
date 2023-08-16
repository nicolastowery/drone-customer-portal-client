import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import InfoBlock from "../../components/InfoBlock/InfoBlock";
import SelectField from "../../components/SelectField/SelectField";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./Ticket.module.css";
function Ticket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [newStatus, setNewStatus] = useState("");
  const [files, setFiles] = useState([]);
  const [zipUrl, setZipUrl] = useState("");

  const updateTicket = async (ticketData) => {
    // Convert the timestamp to a Date object
    const dateObject = new Date(ticketData.created_at);

    // Format the date and time components
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const formattedDate = dateObject.toLocaleString("en-US", options);
    ticketData.created_at = formattedDate;
    setTicket(ticketData);
    setNewStatus(ticketData.status);
  };

  // initial data fetch
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/ticket`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticket_id: id }),
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          const ticketData = data.ticketData;
          updateTicket(ticketData);
          data.files && setFiles(data.files);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [id]);

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
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Error updating the ticket status!");
        return;
      }
      updateTicket(data);
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
    a.download = "download.zip"; // Set the desired file name
    a.style.display = "none"; // Hide the anchor element

    document.body.appendChild(a); // Append the anchor element to the body
    a.click(); // Programmatically click the anchor element

    URL.revokeObjectURL(url); // Clean up the temporary URL

    document.body.removeChild(a); // Remove the anchor element from the body
  };
  return (
    <div className={styles.ticketContainer}>
      <div className={styles.ticket}>
        <div className={styles.heading}>
          <h1 className={styles.id}>Ticket ID {id}</h1>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleDownload}>
              Download
            </button>
            <NavLink to="/admin" className={styles.button}>
              <span>&larr; Back</span>
            </NavLink>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <InfoBlock
            containerType="list"
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
                      <button onClick={handleChange}>Update</button>
                    )}{" "}
                  </>
                ),
              },
              { "Ticket Submission Date": ticket.created_at },
            ]}
          />
          <InfoBlock
            containerType="list"
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
        {files.length > 0 && <Gallery files={files} />}
      </div>
    </div>
  );
}

export default Ticket;
