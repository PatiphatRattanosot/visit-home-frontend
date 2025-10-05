import { useEffect } from "react";
import useYearSelectStore from "../stores/year_select.store";

const YearSelector = () => {
  const { selectedYear, setSelectedYear, years, fetchYears } =
    useYearSelectStore();

  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  return (
    <select
      name="year-selector"
      id="year-selector"
      className="select w-full max-w-64 md:max-w-32"
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
    >
      {years.map((year, index) => (
        <option key={index} value={year._id}>
          {year.year}
        </option>
      ))}
    </select>
  );
};

export default YearSelector;
