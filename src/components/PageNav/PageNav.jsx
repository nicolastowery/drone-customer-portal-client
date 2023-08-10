import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./PageNav.module.css";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <NavLink to="/dropbox" className={styles.toggle}>
            Dropbox
          </NavLink>
        </li>
        <li className={styles.list__item}>
          <NavLink to="/help" className={styles.toggle}>
            Submit Request
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
