import Logo from "../Logo/Logo";
import styles from "./PageNav.module.css";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <div>
        <div>PRE-ALPHA BUILD</div>
        <div>NOT INTENDED FOR GENERAL PUBLIC USE</div>
      </div>
    </nav>
  );
}

export default PageNav;
