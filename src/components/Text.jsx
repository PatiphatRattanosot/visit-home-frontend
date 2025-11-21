import React from "react";

const Text = ({
  id,
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
  maxLength,
  minLength,
  min = 0,
  max = 100,
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
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="input w-full"
        disabled={disabled}
        minLength={minLength}
        maxLength={maxLength}
        max={max}
        min={min}
        step={step}
        data-testid={id}
      />
      {error && touched && (
        <div className="text-red-500 text-xs mt-2" id={`${name}-error`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Text;
