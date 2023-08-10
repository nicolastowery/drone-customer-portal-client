import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Ticket.module.css";
function Ticket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
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
          setTicket(data.ticketData);
          data.files && setFiles(data.files);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [id]);

  return (
    <div className={styles.ticketContainer}>
      <h1>Ticket ID {id}</h1>
      <ul>
        <li>Request Type: {ticket.request_type}</li>
        <li>
          Customer Name: {ticket.f_name}&nbsp;{ticket.l_name}
        </li>
        {ticket.company && <li>Company Name: {ticket.company}</li>}
        {ticket.state && <li>State: {ticket.state}</li>}
        <li>Email: {ticket.email}</li>
        {ticket.phone && <li>Phone: {ticket.phone}</li>}
        {ticket.contact_method && (
          <li>Preferred contact method: {ticket.contact_method}</li>
        )}
        <li>Message: {ticket.text}</li>
      </ul>
      <h2>
        <i>Gallery</i>
      </h2>
      <div className={styles.gallery}>
        {files &&
          files.map((file, index) => (
            <div key={index} className={styles.galleryContainer}>
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
  );
}

export default Ticket;
