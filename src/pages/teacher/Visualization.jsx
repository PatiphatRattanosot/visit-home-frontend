import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import VisualizServices from "../../services/visualiz/visualiz.service";
import Select from "../../components/Select";
import useYearSelectStore from "../../stores/year_select.store";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

const Visualization = () => {
  const [selectedYear, setSelectedYear] = useState("all"); // ปีปัจจุบันในรูปแบบ พ.ศ.
  const [visitDataStatus, setVisitDataStatus] = useState(null);
  const [sdqDataStatus, setSdqDataStatus] = useState(null);
  const [visitData, setVisitData] = useState(null);

  const { years } = useYearSelectStore();
  const yearsOptions = [
    { value: "all", label: "ทุกปี" },
    ...years.map((year) => ({
      value: year?.year.toString(),
      label: year?.year.toString(),
    })),
  ];

  // Fetch visit data based on selected year
  useEffect(() => {
    setVisitDataStatus(null);
    const fetchData = async () => {
      try {
        const res = await VisualizServices.getVisualiz_visit_status();
        if (res.status === 200) {
          switch (selectedYear) {
            case "all":
              setVisitDataStatus(res.data?.visit_info_total || []);
              break;
            default:
              const filteredData = res.data.visit_info_total.filter(
                (item) => item.year.toString() === selectedYear
              );
              setVisitDataStatus(filteredData);
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedYear]);

  // Fetch SDQ data based on selected year
  useEffect(() => {
    setSdqDataStatus(null);
    const fetchData = async () => {
      try {
        const res = await VisualizServices.getVisualiz_sdq_status();
        if (res.status === 200) {
          switch (selectedYear) {
            case "all":
              setSdqDataStatus(res.data?.sdq_total || []);
              break;
            default:
              const filteredData = res.data.sdq_total.filter(
                (item) => item.year.toString() === selectedYear
              );
              setSdqDataStatus(filteredData);
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedYear]);

  // Fetch student analytics data based on selected year
  useEffect(() => {
    setVisitData(null);
    const fetchData = async () => {
      try {
        const res =
          await VisualizServices.getVisualiz_teacher_students_analytics();
        if (res.status === 200) {
          switch (selectedYear) {
            case "all":
              setVisitData(res.data?.analytics || []);
              break;
            default:
              const filteredData = res.data.analytics.filter(
                (item) => item.year.toString() === selectedYear
              );
              setVisitData(filteredData);
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedYear]);

  // Chart data configurations
  const visitStatusChartData = {
    labels: visitDataStatus?.map((item) => `ปี ${item.year}`) || [],
    datasets: [
      {
        label: "เยี่ยมแล้ว",
        data: visitDataStatus?.map((item) => item.visited) || [],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
      {
        label: "ยังไม่เยี่ยม",
        data: visitDataStatus?.map((item) => item.not_visited) || [],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
      },
    ],
  };

  const sdqStatusChartData = {
    labels: sdqDataStatus?.map((item) => `ปี ${item.year}`) || [],
    datasets: [
      {
        label: "ประเมินแล้ว",
        data: sdqDataStatus?.map((item) => item.assessed) || [],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
      {
        label: "ยังไม่ประเมิน",
        data: sdqDataStatus?.map((item) => item.not_assessed) || [],
        backgroundColor: "rgba(249, 115, 22, 0.8)",
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Pie chart for overall visit status (current year or all years)
  const totalVisited =
    visitDataStatus?.reduce((sum, item) => sum + item.visited, 0) || 0;
  const totalNotVisited =
    visitDataStatus?.reduce((sum, item) => sum + item.not_visited, 0) || 0;

  const visitPieChartData = {
    labels: ["เยี่ยมแล้ว", "ยังไม่เยี่ยม"],
    datasets: [
      {
        data: [totalVisited, totalNotVisited],
        backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)"],
        borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 2,
      },
    ],
  };

  // Pie chart for overall SDQ status
  const totalAssessed =
    sdqDataStatus?.reduce((sum, item) => sum + item.assessed, 0) || 0;
  const totalNotAssessed =
    sdqDataStatus?.reduce((sum, item) => sum + item.not_assessed, 0) || 0;

  const sdqPieChartData = {
    labels: ["ประเมินแล้ว", "ยังไม่ประเมิน"],
    datasets: [
      {
        data: [totalAssessed, totalNotAssessed],
        backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(249, 115, 22, 0.8)"],
        borderColor: ["rgba(59, 130, 246, 1)", "rgba(249, 115, 22, 1)"],
        borderWidth: 2,
      },
    ],
  };

  // Student analytics line chart
  const studentAnalyticsData = {
    labels: visitData?.map((item) => `ปี ${item.year}`) || [],
    datasets: [
      {
        label: "จำนวนนักเรียนทั้งหมด",
        data: visitData?.map((item) => item.total_students) || [],
        borderColor: "rgba(168, 85, 247, 1)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            สถิติและการวิเคราะห์ข้อมูล
          </h1>
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              เลือกปีการศึกษา:
            </label>
            <div className="w-48">
              <Select
                options={yearsOptions}
                value={selectedYear}
                name="selectedYear"
                onChange={(e) => setSelectedYear(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              เยี่ยมแล้วทั้งหมด
            </h3>
            <p className="text-3xl font-bold text-green-600">{totalVisited}</p>
            <p className="text-xs text-gray-400 mt-1">รายการ</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              ยังไม่ได้เยี่ยม
            </h3>
            <p className="text-3xl font-bold text-red-600">{totalNotVisited}</p>
            <p className="text-xs text-gray-400 mt-1">รายการ</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              ประเมิน SDQ แล้ว
            </h3>
            <p className="text-3xl font-bold text-blue-600">{totalAssessed}</p>
            <p className="text-xs text-gray-400 mt-1">รายการ</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              ยังไม่ประเมิน SDQ
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              {totalNotAssessed}
            </p>
            <p className="text-xs text-gray-400 mt-1">รายการ</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Visit Status Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              สถานะการเยี่ยมบ้านแยกตามปี
            </h2>
            <div className="h-80">
              {visitDataStatus && visitDataStatus.length > 0 ? (
                <Bar
                  data={visitStatusChartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: { display: false },
                    },
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงผล
                </div>
              )}
            </div>
          </div>

          {/* SDQ Status Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              สถานะการประเมิน SDQ แยกตามปี
            </h2>
            <div className="h-80">
              {sdqDataStatus && sdqDataStatus.length > 0 ? (
                <Bar
                  data={sdqStatusChartData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: { display: false },
                    },
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงผล
                </div>
              )}
            </div>
          </div>

          {/* Visit Status Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              สัดส่วนการเยี่ยมบ้าน
            </h2>
            <div className="h-80">
              {totalVisited > 0 || totalNotVisited > 0 ? (
                <Doughnut data={visitPieChartData} options={pieChartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงผล
                </div>
              )}
            </div>
          </div>

          {/* SDQ Status Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              สัดส่วนการประเมิน SDQ
            </h2>
            <div className="h-80">
              {totalAssessed > 0 || totalNotAssessed > 0 ? (
                <Doughnut data={sdqPieChartData} options={pieChartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงผล
                </div>
              )}
            </div>
          </div>

          {/* Student Analytics Line Chart */}
          {visitData && visitData.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 xl:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                แนวโน้มจำนวนนักเรียน
              </h2>
              <div className="h-80">
                <Line
                  data={studentAnalyticsData}
                  options={{
                    ...chartOptions,
                    plugins: {
                      ...chartOptions.plugins,
                      title: { display: false },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visualization;
