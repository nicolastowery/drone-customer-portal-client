import styles from "./Button.module.css";
function Button({ onClick, children, type = "block" }) {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
