const CheckboxInput = ({
  name,
  value = [],
  extraOpt = false,
  onChange,
  onBlur,
  label,
  options = [],
  className = "",
  grid = "grid-cols-1",
  touched,
  error,
  valueExtra,
  nameExtra,
  touchedExtra,
  errorExtra,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} : <span className="text-red-600">*</span>
      </label>

      <div className={`grid grid-cols-1 md:${grid} gap-3 mt-2`} id={name}>
        {options.map((item, index) => (
          <div className="flex items-center text-sm space-x-2" key={index}>
            <input
              type="checkbox"
              className="checkbox"
              id={`${name}_${index}`}
              name={name}
              value={String(index)}
              checked={value.includes(String(index))}
              onChange={onChange}
              onBlur={onBlur}
            />
            <label htmlFor={`${name}_${index}`}>{item}</label>
          </div>
        ))}
      </div>
      {extraOpt && (
        <div className="flex items-center text-sm mt-4">
          <input
            type="text"
            placeholder="อื่นๆ"
            className="text-input"
            id={nameExtra}
            name={nameExtra}
            value={valueExtra}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      )}
      {touchedExtra && errorExtra && (
        <div className="text-red-600 text-xs mt-1">{errorExtra}</div>
      )}

      {error && touched && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default CheckboxInput;
