import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import useYearSelectStore from "../../stores/year_select.store";
import YearSelector from "../../components/YearSelector";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Visualization = () => {
  return (
    <div className="section-container">
      <h1>Visualization</h1>
    </div>
  );
};

export default Visualization;
