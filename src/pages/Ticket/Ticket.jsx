import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styles from "./Ticket.module.css";
function Ticket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [newStatus, setNewStatus] = useState("");
  const [files, setFiles] = useState([]);

  // data
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/ticket`, {
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
      const res = await fetch("http://localhost:3001/update-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the content type header
        },
        body: JSON.stringify({
          ticket_id: ticket.ticket_id,
          status: newStatus,
        }),
      });
      const data = res.json;
      if (!res.ok) {
        console.log("Error updating the ticket status!");
        return;
      }
      console.log(data);
      return;
    }
    setNewStatus(ticket.status);
  };
  return (
    <div className={styles.ticketContainer}>
      <div className={styles.heading}>
        <h1>Ticket ID {id}</h1>
        <NavLink to="/admin" className={styles.backButton}>
          &larr; Back
        </NavLink>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.ticketInfo}>
          <h2 className={styles.infoHeading}>
            <i>Ticket Info</i>
          </h2>
          <div className={styles.infoListContainer}>
            <ul className={styles.fields}>
              <li>
                <span className={styles.field}>Request Type</span>
              </li>
              <li>
                <span className={styles.field}>Status</span>
              </li>
              <li>
                <span className={styles.field}>Ticket Submission Date</span>
              </li>
            </ul>
            <ul className={styles.values}>
              <li>
                <span className={styles.value}>{ticket.request_type}</span>
              </li>
              <li>
                <span className={styles.value}>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    {ticket.status === "NEW" && (
                      <option value="NEW">NEW</option>
                    )}
                    <option value="OPEN">OPEN</option>
                    <option value="CLOSED">CLOSE</option>
                  </select>
                  {newStatus !== ticket.status && (
                    <button onClick={handleChange}>Update</button>
                  )}
                </span>
              </li>
              <li>
                <span className={styles.value}>{ticket.created_at}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.customerInfo}>
          <h2 className={styles.infoHeading}>
            <i>Customer Info</i>
          </h2>
          <div className={styles.infoListContainer}>
            <ul className={styles.fields}>
              <li>Customer Name</li>
              {ticket.company && <li>Company Name</li>}
              {ticket.state && <li>State</li>}
              <li>Email</li>
              {ticket.phone && <li>Phone</li>}
              {ticket.contact_method && <li>Contact Method</li>}
            </ul>
            <ul className={styles.values}>
              <li>
                {ticket.f_name}&nbsp;{ticket.l_name}
              </li>
              {ticket.company && <li>{ticket.company}</li>}
              {ticket.state && <li>{ticket.state}</li>}
              <li>{ticket.email}</li>
              {ticket.phone && <li>{ticket.phone}</li>}
              {ticket.contact_method && <li>{ticket.contact_method}</li>}
            </ul>
          </div>
        </div>
        <div className={styles.customerNotes}>
          <h2 className={styles.infoHeading}>
            <i>Customer Notes</i>
          </h2>
          <span className={styles.customerNote}>{ticket.text}</span>
        </div>
      </div>
      {files.length > 0 && (
        <div className={styles.galleryContainer}>
          <h2 className={styles.infoHeading}>
            <i>Gallery</i>
          </h2>
          <div className={styles.gallery}>
            {files.map((file, index) => (
              <div key={index} className={styles.galleryFlex}>
                {/* Display image */}
                {file.type.includes("image") && (
                  <img
                    className={`${styles.gallery__item} ${styles.image}`}
                    src={`http://localhost:3001/${file.url}`}
                    alt={`File ${index + 1}`}
                  />
                )}
                {/* Display video */}
                {file.type.includes("video") && (
                  <video
                    controls
                    src={`http://localhost:3001/${file.url}`}
                    className={styles.gallery__item}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Ticket;
