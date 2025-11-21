import React from "react";

const Select = ({
  id,
  value,
  onChange,
  options = [],
  onBlur,
  error,
  touched,
  label,
  name,
  defaultOpt,
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
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="select w-full"
        disabled={disabled}
        data-testid={id}
      >
        {defaultOpt && <option value="">{defaultOpt}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && (
        <div className="text-red-500 text-xs mt-2" id={`${name}-error`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
