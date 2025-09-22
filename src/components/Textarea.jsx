const Textarea = ({
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
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="text-sm mb-1 text-start">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="textarea w-full"
        disabled={disabled}
      />
      {error && touched && (
        <div className="text-red-500 text-xs mt-2" id={`${name}-error`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Textarea;
