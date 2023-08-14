function TextArea({
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  isRequired,
  className,
}) {
  return (
    <div className={className}>
      <label htmlFor={label}>
        {label}
        {isRequired && "*"}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextArea;
