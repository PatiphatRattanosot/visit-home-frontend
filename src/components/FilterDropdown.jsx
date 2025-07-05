const FilterDropdown = ({ selectedOption, setSelectedOption, options }) => {
  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <select
      name="selectedOption"
      id="selectedOption"
      className="select select-bordered w-40"
      onChange={handleChange}
      value={selectedOption}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterDropdown;
