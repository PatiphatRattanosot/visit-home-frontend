const SDQRadio = ({
  className,
  name,
  label,
  value,
  onBlur,
  onChange,
  error,
  touched,
  options = [],
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
        {label} <span className="text-red-600">*</span>
      </label>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-3 mt-2`} id={name}>
        {/* Choice 1 */}
        <div className="flex items-center text-sm space-x-2">
          <input
            type="radio"
            className="radio"
            id={`${name}_0`}
            name={name}
            value={options[0]}
            checked={value === options[0]}
            onChange={onChange}
            onBlur={onBlur}
          />
          <label htmlFor={`${name}_0`}>ไม่จริง</label>
        </div>

        {/* Choice 2 */}
        <div className="flex items-center text-sm space-x-2">
          <input
            type="radio"
            className="radio"
            id={`${name}_1`}
            name={name}
            value={options[1]}
            checked={value === options[1]}
            onChange={onChange}
            onBlur={onBlur}
          />
          <label htmlFor={`${name}_1`}>ค่อนข้างจริง</label>
        </div>

        {/* Choice 3 */}
        <div className="flex items-center text-sm space-x-2">
          <input
            type="radio"
            className="radio"
            id={`${name}_2`}
            name={name}
            value={options[2]}
            checked={value === options[2]}
            onChange={onChange}
            onBlur={onBlur}
          />
          <label htmlFor={`${name}_2`}>จริง</label>
        </div>
      </div>
      {error && touched && (
        <div className="text-red-600 text-xs mt-1">{error}</div>
      )}
    </div>
  );
};

export default SDQRadio;
