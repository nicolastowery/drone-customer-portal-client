import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import { useTicket } from "./useTicket";
import { useUpdateTicket } from "./useUpdateTicket";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
import InfoBlock from "../../components/InfoBlock/InfoBlock";
import SelectField from "../../components/SelectField/SelectField";
import Gallery from "../../components/Gallery/Gallery";
import { downloadFile } from "../../services/apiTickets";
import styles from "./Ticket.module.css";

function Ticket() {
  const { id } = useParams();
  const { ticket } = useTicket(id);
  const { updateTicket } = useUpdateTicket(id);
  const [newStatus, setNewStatus] = useState(ticket?.status);
  const formattedDate = formatDate(ticket?.created_at);

  useEffect(() => {
    // Set the initial value of newStatus when the component mounts
    if (ticket) {
      setNewStatus(ticket.status);
    }
  }, [ticket]);

  const handleChange = async () => {
    const userConfirmation = window.confirm(
      `Confirm changes: Ticket Status: ${ticket.status} >> ${newStatus}\n\nUpon confirmation, the client will be notified via email of this change.`
    );
    if (userConfirmation) {
      updateTicket({
        ...ticket,
        status: newStatus,
      });
    }
  };

  const handleDownload = () => {
    ticket.files.forEach(async (file) => {
      const blob = await downloadFile(file.filename);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${ticket.ticket_id}${file.filename.substring(
        file.filename.indexOf("-")
      )}`;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  };

  return (
    <>
      {newStatus ? (
        <div className={styles.ticketContainer}>
          <div className={styles.ticket}>
            <div className={styles.heading}>
              <h1 className={styles.id}>Ticket ID {id}</h1>
              <div className={styles.buttonContainer}>
                {ticket?.files?.length > 0 && (
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
                  { "Request Type": ticket?.request_type },
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
            {ticket?.files?.length > 0 && <Gallery files={ticket.files} />}
          </div>
        </div>
      ) : (
        <div>LOADING...</div>
      )}
    </>
  );
}

export default Ticket;
