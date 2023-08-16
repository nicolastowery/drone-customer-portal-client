function TextArea({
  label,
  value,
  onChange,
  maxLength,
  placeholder,
  isRequired,
  className,
  textareaClassName,
}) {
  return (
    <div className={className}>
      <label htmlFor={label}>
        {label}
        {isRequired && "*"}
      </label>
      <textarea
        className={textareaClassName}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextArea;
