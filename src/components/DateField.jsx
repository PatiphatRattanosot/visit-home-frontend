const DateField = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  label,
  placeholder,
  name,
  className = "",
  disabled = false,
  required = false,
  id
}) => {
  return (
    <div className={`date flex flex-col ${className}`}>
      <label htmlFor={name} className="text-sm mb-1 text-start">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`input ${className} ${error && touched ? "input-error" : ""
          }`}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />

      {error && touched && (
        <div className="text-red-500 text-xs mt-2" id={`${name}-error`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default DateField;
