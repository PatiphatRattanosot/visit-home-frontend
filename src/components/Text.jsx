import React from "react";

const Text = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  label,
  placeholder,
  name,
  type = "text",
  className = "",
  disabled = false,
  maxLength = 10,
  minLength = 0,
  required = false,
  step = 1,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="text-sm mb-1 text-start">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="input w-full"
        disabled={disabled}
        min={minLength}
        max={maxLength}
        step={step}
      />
      {error && touched && (
        <div className="text-red-500 text-xs mt-2">{error}</div>
      )}
    </div>
  );
};

export default Text;
