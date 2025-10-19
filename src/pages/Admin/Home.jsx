import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import VisualizServices from "../../services/visualiz/visualiz.service";
import Select from "../../components/Select";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

const Home = () => {
  const [chartDataRole, setChartDataRole] = useState(null);
  const [chartDataStatus, setChartDataStatus] = useState(null);

  const [chartDataVisitor, setChartDataVisitor] = useState(null);
  const [allVisitorData, setAllVisitorData] = useState([]); // เก็บข้อมูลทั้งหมด
  const [selectedYear, setSelectedYear] = useState(null); // ปีที่เลือก

  // สร้าง options สำหรับ Select การทำงานคือ loop ข้อมูล allVisitorData เพื่อสร้าง options
  // เพิ่ม option "ทั้งหมด" ที่มี value เป็น "" เพื่อแสดงทุกปี
  const yearsOptions = [
    { value: "", label: "ทั้งหมด" },
    ...allVisitorData.map((item) => ({
      value: item.year,
      label: item.year.toString(),
    })),
  ];

  // chart role
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await VisualizServices.getVisualiz_total_role();
        const data = response.data;
        setChartDataRole({
          labels: ["เจ้าหน้าที่", "อาจารย์", "นักเรียน"],
          datasets: [
            {
              label: "จำนวนผู้ใช้แต่ละบทบาท",
              data: [data.admin_total, data.teacher_total, data.student_total],
              backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //chart status
  useEffect(() => {
    const fetchDataTeacherStatus = async () => {
      try {
        const response = await VisualizServices.getVisualiz_total_status();
        const data = response.data;
        setChartDataStatus({
          labels: ["ทำงานอยู่", "ไม่ได้ใช้งานแล้ว"],
          datasets: [
            {
              label: "สถานะอาจารย์",
              data: [data.active_total, data.inactive_total],
              backgroundColor: ["#4bc0c0", "#ff9f40"],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataTeacherStatus();
  }, []);

  // chart visitor
  useEffect(() => {
    const fetchDataVisitor = async () => {
      try {
        const response = await VisualizServices.getVisualiz_total_visitor();
        let visitData = response.data.visit_info_total;

        // เรียงปีจากมากไปน้อย และเลือกมา 4 ปีล่าสุด
        visitData = visitData
          .sort((a, b) => b.year - a.year)
          .slice(0, 4)
          .reverse();

        setAllVisitorData(visitData);
        setSelectedYear(null);
        // ถ้าไม่ได้เลือกปี ให้ตั้งค่าเป็นปีล่าสุด
        setSelectedYear(visitData[visitData.length - 1].year); // ตั้งค่า default  ปีล่าสุด
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataVisitor();
  }, []);
  // สร้าง chartDataVisitor
  useEffect(() => {
    if (allVisitorData.length > 0) {
      let labels = [];
      let data = [];

      if (selectedYear === null) {
        //  ยังไม่เลือกปี แสดง 4 ปีล่าสุดทั้งหมด
        labels = allVisitorData.map((item) => item.year);
        data = allVisitorData.map((item) => item.status_total);
      } else {
        //  ถ้าเลือกปี  แสดงปีเดียว
        const filtered = allVisitorData.find(
          (item) => item.year === selectedYear
        );
        if (filtered) {
          labels = [filtered.year];
          data = [filtered.status_total];
        }
      }

      setChartDataVisitor({
        labels,
        datasets: [
          {
            label: "สถานะเยี่ยมบ้าน",
            data,
            backgroundColor: "#36a2eb",
            borderWidth: 1,
          },
        ],
      });
    }
  }, [selectedYear, allVisitorData]);

  // Calculate totals for statistics cards
  const totalUsers = chartDataRole
    ? chartDataRole.datasets[0].data.reduce((sum, value) => sum + value, 0)
    : 0;

  const activeTeachers = chartDataStatus
    ? chartDataStatus.datasets[0].data[0] || 0
    : 0;

  const totalVisits =
    chartDataVisitor && allVisitorData.length > 0
      ? selectedYear
        ? allVisitorData.find((item) => item.year === selectedYear)
            ?.status_total || 0
        : allVisitorData.reduce((sum, item) => sum + item.status_total, 0)
      : 0;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
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

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ภาพรวมระบบและสถิติการใช้งาน
          </h1>
          <p className="text-gray-600">
            รายงานสถานะบุคลากรและการเยี่ยมบ้านนักเรียน
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              จำนวนผู้ใช้ทั้งหมด
            </h3>
            <p className="text-3xl font-bold text-blue-600">{totalUsers}</p>
            <p className="text-xs text-gray-400 mt-1">คน</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              อาจารย์ที่ใช้งานอยู่
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {activeTeachers}
            </p>
            <p className="text-xs text-gray-400 mt-1">คน</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              การเยี่ยมบ้านสำเร็จ
            </h3>
            <p className="text-3xl font-bold text-purple-600">{totalVisits}</p>
            <p className="text-xs text-gray-400 mt-1">ครั้ง</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">
              ปีการศึกษาล่าสุด
            </h3>
            <p className="text-3xl font-bold text-orange-600">
              {allVisitorData.length > 0
                ? Math.max(...allVisitorData.map((item) => item.year))
                : "-"}
            </p>
            <p className="text-xs text-gray-400 mt-1">ปี พ.ศ.</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Roles Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              จำนวนผู้ใช้แต่ละบทบาท
            </h2>
            <div className="h-80">
              {chartDataRole ? (
                <Doughnut data={chartDataRole} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  กำลังโหลดข้อมูล...
                </div>
              )}
            </div>
          </div>

          {/* Teacher Status Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              สถานะการใช้งานของอาจารย์
            </h2>
            <div className="h-80">
              {chartDataStatus ? (
                <Doughnut data={chartDataStatus} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  กำลังโหลดข้อมูล...
                </div>
              )}
            </div>
          </div>

          {/* Visitor Statistics Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                สถิติการเยี่ยมบ้านแยกตามปี
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  เลือกปี:
                </label>
                <Select
                  name="year"
                  value={selectedYear ?? ""}
                  onChange={(e) =>
                    setSelectedYear(
                      e.target.value === "" ? null : Number(e.target.value)
                    )
                  }
                  options={yearsOptions}
                  className="w-32"
                />
              </div>
            </div>
            <div className="h-80">
              {chartDataVisitor ? (
                <Bar data={chartDataVisitor} options={barChartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  กำลังโหลดข้อมูล...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
