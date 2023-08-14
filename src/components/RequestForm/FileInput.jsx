function FileInput({
  label,
  accept,
  onChange,
  className,
  multiple = true,
  isRequired = false,
}) {
  return (
    <div className={className}>
      <label htmlFor={label}>
        {label}
        {isRequired && "*"}
      </label>
      {multiple ? (
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          id={label}
          multiple
        />
      ) : (
        <input type="file" accept={accept} onChange={onChange} id={label} />
      )}
    </div>
  );
}

export default FileInput;
