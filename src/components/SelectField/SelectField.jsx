import styles from "./SelectField.module.css";
function SelectField({
  label,
  value,
  onChange,
  options,
  disabled = false,
  className,
  isRequired = false,
}) {
  return (
    <div className={className}>
      {label && (
        <label>
          {label}
          {isRequired && "*"}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={disabled ? styles.disabled : styles.select}
      >
        {options.map((o) => {
          return (
            <option value={o} key={o} className={styles.option}>
              {o}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectField;
