import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
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
  BarElement
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

  return (
    <>
      <div className="section-container flex flex-col items-center justify-center space-y-10">
        <h1 className="text-center">รายงานสถานะบุคลากรและการเยี่ยมบ้าน</h1>
        {/*  grid บน md: จอใหญ่  โชว์ 2 คอลัมน์, บนมือถือ 1 คอลัมน์ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full justify-items-center">
          {/* Doughnut 1 */}
          <div className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] text-center">
            <h1>จำนวนผู้ใช้แต่ละบทบาท</h1>
            {chartDataRole && <Doughnut data={chartDataRole} />}
          </div>

          {/* Doughnut 2 */}
          <div className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] text-center">
            <h1>สถานะอาจารย์</h1>
            {chartDataStatus && <Doughnut data={chartDataStatus} />}
          </div>
        </div>

        {/* Bar chart อยู่ตรงกลางเสมอ */}
        <div className="w-[300px] md:w-[600px] h-[300px] md:h-[400px] text-center">
          <h1>จำนวนสถานะเยี่ยมบ้าน</h1>

          <div className="flex justify-end items-center">
            <Select
              name="year"
              label="เลือกปีการศึกษา"
              value={selectedYear ?? ""}
              onChange={(e) =>
                setSelectedYear(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              options={yearsOptions}
              className="mb-4 w-32"
            />
          </div>
          {chartDataVisitor && (
            <Bar
              data={chartDataVisitor}
              options={{
                scales: {
                  y: {
                    ticks: {
                      stepSize: 1,
                      precision: 0, // ให้เป็นจำนวนเต็ม
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
