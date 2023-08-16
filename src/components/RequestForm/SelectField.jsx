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
      <select value={value} onChange={onChange} disabled={disabled}>
        {options.map((o) => {
          return (
            <option value={o} key={o}>
              {o}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectField;
