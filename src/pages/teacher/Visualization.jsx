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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import VisualizServices from "../../services/visualiz/visualiz.service";
import Select from "../../components/Select";
import useYearSelectStore from "../../stores/year_select.store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  ChartDataLabels
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
        label: "นักเรียนที่กรอกข้อมูลแล้ว",
        data: visitDataStatus?.map((item) => item.status_total) || [],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
    ],
  };

  const sdqStatusChartData = {
    labels:
      sdqDataStatus?.map(
        (item) => `ปี ${item.year} ห้อง ${item.class.room}/${item.class.number}`
      ) || [],
    datasets: [
      {
        label: "ประเมิน SDQ แล้ว",
        data: sdqDataStatus?.map((item) => item.status_total) || [],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Pie chart for overall visit status (current year or all years)
  const totalCompleted =
    visitDataStatus?.reduce((sum, item) => sum + item.status_total, 0) || 0;

  const visitPieChartData = {
    labels: ["นักเรียนที่กรอกข้อมูลแล้ว"],
    datasets: [
      {
        data: [totalCompleted],
        backgroundColor: ["rgba(34, 197, 94, 0.8)"],
        borderColor: ["rgba(34, 197, 94, 1)"],
        borderWidth: 2,
      },
    ],
  };

  // Pie chart for overall SDQ status
  const totalAssessed =
    sdqDataStatus?.reduce((sum, item) => sum + item.status_total, 0) || 0;

  const sdqPieChartData = {
    labels: ["ประเมิน SDQ แล้ว"],
    datasets: [
      {
        data: [totalAssessed],
        backgroundColor: ["rgba(59, 130, 246, 0.8)"],
        borderColor: ["rgba(59, 130, 246, 1)"],
        borderWidth: 2,
      },
    ],
  };

  // Student analytics charts
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

  // Family Relation Status Chart
  const familyRelationData = {
    labels: visitData?.map((item) => `ปี ${item.year}`) || [],
    datasets: [
      {
        label: "อยู่ด้วยกัน",
        data:
          visitData?.map(
            (item) => item.family_relation_status?.together || 0
          ) || [],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
      {
        label: "หย่าร้าง",
        data:
          visitData?.map(
            (item) => item.family_relation_status?.divorced || 0
          ) || [],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
      },
      {
        label: "แยกกันอยู่",
        data:
          visitData?.map(
            (item) => item.family_relation_status?.separated || 0
          ) || [],
        backgroundColor: "rgba(249, 115, 22, 0.8)",
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 2,
      },
      {
        label: "อื่นๆ",
        data:
          visitData?.map((item) => item.family_relation_status?.other || 0) ||
          [],
        backgroundColor: "rgba(156, 163, 175, 0.8)",
        borderColor: "rgba(156, 163, 175, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Household Income Chart
  const householdIncomeData = {
    labels: visitData?.map((item) => `ปี ${item.year}`) || [],
    datasets: [
      {
        label: "ต่ำกว่า 3,000 บาท",
        data:
          visitData?.map((item) => item.household_income?.below_3000 || 0) ||
          [],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
      },
      {
        label: "3,000-5,000 บาท",
        data:
          visitData?.map(
            (item) => item.household_income?.income_3000_5000 || 0
          ) || [],
        backgroundColor: "rgba(249, 115, 22, 0.8)",
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 2,
      },
      {
        label: "5,000-7,000 บาท",
        data:
          visitData?.map(
            (item) => item.household_income?.income_5000_7000 || 0
          ) || [],
        backgroundColor: "rgba(234, 179, 8, 0.8)",
        borderColor: "rgba(234, 179, 8, 1)",
        borderWidth: 2,
      },
      {
        label: "7,000-9,000 บาท",
        data:
          visitData?.map(
            (item) => item.household_income?.income_7000_9000 || 0
          ) || [],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
      {
        label: "มากกว่า 9,000 บาท",
        data:
          visitData?.map((item) => item.household_income?.above_9000 || 0) ||
          [],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Daily Allowance Chart
  const dailyAllowanceData = {
    labels: visitData?.map((item) => `ปี ${item.year}`) || [],
    datasets: [
      {
        label: "ต่ำกว่า 40 บาท",
        data:
          visitData?.map((item) => item.daily_allowance?.below_40 || 0) || [],
        backgroundColor: "rgba(239, 68, 68, 0.8)",
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 2,
      },
      {
        label: "40-60 บาท",
        data:
          visitData?.map(
            (item) => item.daily_allowance?.allowance_40_60 || 0
          ) || [],
        backgroundColor: "rgba(249, 115, 22, 0.8)",
        borderColor: "rgba(249, 115, 22, 1)",
        borderWidth: 2,
      },
      {
        label: "60-80 บาท",
        data:
          visitData?.map(
            (item) => item.daily_allowance?.allowance_60_80 || 0
          ) || [],
        backgroundColor: "rgba(234, 179, 8, 0.8)",
        borderColor: "rgba(234, 179, 8, 1)",
        borderWidth: 2,
      },
      {
        label: "80-100 บาท",
        data:
          visitData?.map(
            (item) => item.daily_allowance?.allowance_80_100 || 0
          ) || [],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 2,
      },
      {
        label: "มากกว่า 100 บาท",
        data:
          visitData?.map((item) => item.daily_allowance?.above_100 || 0) || [],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Calculate totals for current year or all years for pie charts
  const totalStudents =
    visitData?.reduce((sum, item) => sum + item.total_students, 0) || 0;

  // Family relation pie chart data
  const familyRelationTotals = visitData?.reduce(
    (acc, item) => ({
      together: acc.together + (item.family_relation_status?.together || 0),
      divorced: acc.divorced + (item.family_relation_status?.divorced || 0),
      separated: acc.separated + (item.family_relation_status?.separated || 0),
      other: acc.other + (item.family_relation_status?.other || 0),
    }),
    { together: 0, divorced: 0, separated: 0, other: 0 }
  ) || { together: 0, divorced: 0, separated: 0, other: 0 };

  const familyRelationPieData = {
    labels: ["อยู่ด้วยกัน", "หย่าร้าง", "แยกกันอยู่", "อื่นๆ"],
    datasets: [
      {
        data: [
          familyRelationTotals.together,
          familyRelationTotals.divorced,
          familyRelationTotals.separated,
          familyRelationTotals.other,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(156, 163, 175, 0.8)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(156, 163, 175, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Household income pie chart data
  const incomeTotals = visitData?.reduce(
    (acc, item) => ({
      below_3000: acc.below_3000 + (item.household_income?.below_3000 || 0),
      income_3000_5000:
        acc.income_3000_5000 + (item.household_income?.income_3000_5000 || 0),
      income_5000_7000:
        acc.income_5000_7000 + (item.household_income?.income_5000_7000 || 0),
      income_7000_9000:
        acc.income_7000_9000 + (item.household_income?.income_7000_9000 || 0),
      above_9000: acc.above_9000 + (item.household_income?.above_9000 || 0),
    }),
    {
      below_3000: 0,
      income_3000_5000: 0,
      income_5000_7000: 0,
      income_7000_9000: 0,
      above_9000: 0,
    }
  ) || {
    below_3000: 0,
    income_3000_5000: 0,
    income_5000_7000: 0,
    income_7000_9000: 0,
    above_9000: 0,
  };

  const incomePieData = {
    labels: ["< 3,000", "3,000-5,000", "5,000-7,000", "7,000-9,000", "> 9,000"],
    datasets: [
      {
        data: [
          incomeTotals.below_3000,
          incomeTotals.income_3000_5000,
          incomeTotals.income_5000_7000,
          incomeTotals.income_7000_9000,
          incomeTotals.above_9000,
        ],
        backgroundColor: [
          "rgba(239, 68, 68, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(234, 179, 8, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(59, 130, 246, 1)",
        ],
        borderWidth: 2,
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
      datalabels: {
        display: true,
        color: "#ffffff",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value, context) => {
          return value > 0 ? value : "";
        },
        anchor: "center",
        align: "center",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  const lineChartOptions = {
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
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${value} คน`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "#ffffff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          return value > 0 ? value : "";
        },
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
              นักเรียนที่กรอกข้อมูลแล้ว
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {totalCompleted}
            </p>
            <p className="text-xs text-gray-400 mt-1">คน</p>
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
              จำนวนนักเรียนทั้งหมด
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {totalStudents}
            </p>
            <p className="text-xs text-gray-400 mt-1">คน</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              ครอบครัวอยู่ด้วยกัน
            </h3>
            <p className="text-3xl font-bold text-emerald-600">
              {familyRelationTotals.together}
            </p>
            <p className="text-xs text-gray-400 mt-1">ครอบครัว</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {/* Visit Status Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              จำนวนนักเรียนที่กรอกข้อมูลแยกตามปี
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
              จำนวนการประเมิน SDQ แยกตามปีและห้อง
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
                    scales: {
                      ...chartOptions.scales,
                      x: {
                        ticks: {
                          maxRotation: 45,
                          minRotation: 45,
                        },
                      },
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
              สัดส่วนนักเรียนที่กรอกข้อมูล
            </h2>
            <div className="h-80">
              {totalCompleted > 0 ? (
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
              {totalAssessed > 0 ? (
                <Doughnut data={sdqPieChartData} options={pieChartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงผล
                </div>
              )}
            </div>
          </div>

          {/* Family Relations Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              สถานะครอบครัว
            </h2>
            <div className="h-80">
              {familyRelationTotals.together > 0 ||
              familyRelationTotals.divorced > 0 ||
              familyRelationTotals.separated > 0 ||
              familyRelationTotals.other > 0 ? (
                <Doughnut
                  data={familyRelationPieData}
                  options={pieChartOptions}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงผล
                </div>
              )}
            </div>
          </div>

          {/* Household Income Pie Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              รายได้ครัวเรือน (บาท)
            </h2>
            <div className="h-80">
              {incomeTotals.below_3000 > 0 ||
              incomeTotals.income_3000_5000 > 0 ||
              incomeTotals.income_5000_7000 > 0 ||
              incomeTotals.income_7000_9000 > 0 ||
              incomeTotals.above_9000 > 0 ? (
                <Doughnut data={incomePieData} options={pieChartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  ไม่มีข้อมูลสำหรับแสดงผล
                </div>
              )}
            </div>
          </div>

          {/* Student Count Bar Chart with Step Size 1 */}
          {visitData && visitData.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                จำนวนนักเรียนแต่ละปี
              </h2>
              <div className="h-80">
                <Bar
                  data={{
                    labels: visitData?.map((item) => `ปี ${item.year}`) || [],
                    datasets: [
                      {
                        label: "จำนวนนักเรียน",
                        data:
                          visitData?.map((item) => item.total_students) || [],
                        backgroundColor: "rgba(168, 85, 247, 0.8)",
                        borderColor: "rgba(168, 85, 247, 1)",
                        borderWidth: 2,
                      },
                    ],
                  }}
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

          {/* Student Analytics Line Chart */}
          {visitData && visitData.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                แนวโน้มจำนวนนักเรียน
              </h2>
              <div className="h-80">
                <Line
                  data={studentAnalyticsData}
                  options={{
                    ...lineChartOptions,
                    plugins: {
                      ...lineChartOptions.plugins,
                      title: { display: false },
                    },
                  }}
                />
              </div>
            </div>
          )}

          {/* Family Relation Status Bar Chart */}
          {visitData && visitData.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 xl:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                สถานะครอบครัวแยกตามปี
              </h2>
              <div className="h-80">
                <Bar
                  data={familyRelationData}
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

          {/* Household Income Bar Chart */}
          {visitData && visitData.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 xl:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                รายได้ครัวเรือนแยกตามปี
              </h2>
              <div className="h-80">
                <Bar
                  data={householdIncomeData}
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

          {/* Daily Allowance Bar Chart */}
          {visitData && visitData.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 xl:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                ค่าขนมที่ได้รับรายวันแยกตามปี
              </h2>
              <div className="h-80">
                <Bar
                  data={dailyAllowanceData}
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

          {/* Comprehensive Student Statistics Chart */}
          {visitData && visitData.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6 xl:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                สรุปสถิติการกรอกข้อมูลและการประเมิน
              </h2>
              <div className="h-80">
                <Bar
                  data={{
                    labels: visitData?.map((item) => `ปี ${item.year}`) || [],
                    datasets: [
                      {
                        label: "จำนวนนักเรียนทั้งหมด",
                        data:
                          visitData?.map((item) => item.total_students) || [],
                        backgroundColor: "rgba(168, 85, 247, 0.8)",
                        borderColor: "rgba(168, 85, 247, 1)",
                        borderWidth: 2,
                      },
                      {
                        label: "กรอกข้อมูลแล้ว",
                        data:
                          visitDataStatus?.map((item) => item.status_total) ||
                          [],
                        backgroundColor: "rgba(34, 197, 94, 0.8)",
                        borderColor: "rgba(34, 197, 94, 1)",
                        borderWidth: 2,
                      },
                      {
                        label: "ประเมิน SDQ แล้ว",
                        data:
                          sdqDataStatus
                            ?.reduce((acc, item) => {
                              const yearData = acc.find(
                                (d) => d.year === item.year
                              );
                              if (yearData) {
                                yearData.total += item.status_total;
                              } else {
                                acc.push({
                                  year: item.year,
                                  total: item.status_total,
                                });
                              }
                              return acc;
                            }, [])
                            .map((item) => item.total) || [],
                        backgroundColor: "rgba(59, 130, 246, 0.8)",
                        borderColor: "rgba(59, 130, 246, 1)",
                        borderWidth: 2,
                      },
                    ],
                  }}
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
