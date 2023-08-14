function InputField({ label, value, onChange, className, isRequired = false }) {
  return (
    <div className={className}>
      <label htmlFor={label}>
        {label}
        {isRequired && "*"}
      </label>
      <input type="text" id={label} value={value} onChange={onChange} />
    </div>
  );
}

export default InputField;
