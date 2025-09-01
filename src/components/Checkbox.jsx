import React from "react";

const Checkbox = ({
  name,
  value = [],
  setFieldValue, // <-- use this instead of handleChange
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
  // Custom handler for checkbox change
  const handleCheckboxChange = (optionValue) => (e) => {
    if (e.target.checked) {
      setFieldValue(name, [...value, optionValue]);
    } else {
      setFieldValue(
        name,
        value.filter((v) => v !== optionValue)
      );
    }
  };

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
              type="checkbox"
              name={name}
              id={`${name}_${index}`}
              value={option.value}
              onChange={handleCheckboxChange(option.value)}
              onBlur={onBlur}
              className="mr-3 checkbox checked:bg-white"
              disabled={disabled}
              checked={value.includes(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && touched && (
        <div className="text-red-500 text-xs mt-2">{error}</div>
      )}
    </div>
  );
};

export default Checkbox;
