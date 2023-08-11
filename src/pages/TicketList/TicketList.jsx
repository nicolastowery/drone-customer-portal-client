import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./TicketList.module.css";
import supabase from "../../supabase/supabase";
function TicketList() {
  const [tickets, setTickets] = useState([]);

  // data
  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:3001/admin`);
      const data = await res.json();
      console.log(data);
      setTickets(data);
      // console.log(data);
    };

    getData();
  }, []);

  const handleLogOut = async () => {
    const confirm = window.confirm("Are you sure you want to sign out?");
    if (confirm) {
      const { error } = await supabase.auth.signOut();
      console.log(error);
    }
    return;
  };

  return (
    <div className={styles.ticketListContainer}>
      <h1 className={styles.heading}>Customer Request Tickets</h1>
      {tickets ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table__heading}>Ticket #</th>
                <th className={styles.table__heading}>Status</th>
                <th className={styles.table__heading}>Name</th>
                <th className={styles.table__heading}>Email</th>
                <th className={styles.table__heading}>Request Type</th>
                <th className={styles.table__heading}>Files</th>
                <th className={styles.table__heading}></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => {
                return (
                  <tr key={t.ticket_id}>
                    <td className={styles.table__cell}>
                      <b>{t.ticket_id}</b>
                    </td>
                    <td className={styles.table__cellCenter}>{t.status}</td>
                    <td className={styles.table__cell}>
                      {t.f_name}&nbsp;{t.l_name}
                    </td>
                    <td className={styles.table__cell}>{t.email}</td>
                    <td className={styles.table__cell}>{t.request_type}</td>
                    <td className={styles.table__cellCenter}>
                      {t.file[0] ? "✅" : "🚫"}
                    </td>
                    <td className={styles.table__cellCenter}>
                      <Link to={`ticket/${t.ticket_id}`}>View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.buttons}>
            <button className={styles.logOutButton} onClick={handleLogOut}>
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <div>Loading Data...</div>
      )}
    </div>
  );
}

export default TicketList;
