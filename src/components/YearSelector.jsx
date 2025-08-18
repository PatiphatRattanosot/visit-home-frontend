import { useEffect } from "react";
import { useYearStore } from "../stores/admin.store";
import useYearSelectStore from "../stores/year_select.store";

const YearSelector = () => {
  const { selectedYear, setSelectedYear } = useYearSelectStore();
  const { data: years, fetchData } = useYearStore();
  console.log(years);
  console.log(selectedYear);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <select
      name="year-selector"
      id="year-selector"
      className="select-input w-full max-w-64 md:max-w-32"
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
