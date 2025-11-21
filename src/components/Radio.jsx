import React from "react";

const Radio = ({
  name,
  value,
  onChange,
  onBlur,
  label,
  options = [],
  className = "",
  grid = "grid-cols-1",
  touched,
  error,
  disabled = false,
  required = false,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="text-sm mb-3 text-start">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className={`grid grid-cols-1 md:${grid} gap-4`} id={name}>
        {options.map((option, index) => (
          <label key={option.value} className="flex items-center text-sm">
            <input
              type="radio"
              name={name}
              id={`${name}_${index}`}
              value={option.value}
              onChange={onChange}
              onBlur={onBlur}
              className="mr-3 radio"
              disabled={disabled}
              checked={value === option.value}
              data-testid={`${name}_${index}`}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && touched && (
        <div className="text-red-500 text-xs mt-2" id={`${name}-error`}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Radio;
