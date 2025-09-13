import React from "react";
import SDQServices from "../../../services/sdq/sdq.service";
import { useParams } from "react-router";
import { useStudentStore } from "../../../stores/student.store";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import Breadcrumbs from "../../../components/Breadcrumbs";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement
);

const SDQResult = () => {
  const { yearId, studentId } = useParams();
  const [student, setStudent] = React.useState(null);
  const { getStudentById } = useStudentStore();
  const [sdqTeacher, setSdqTeacher] = React.useState(null);
  const [sdqParent, setSdqParent] = React.useState(null);
  const [sdqStudent, setSdqStudent] = React.useState(null);

  React.useEffect(() => {
    const fetchStudent = async () => {
      const studentData = await getStudentById(studentId);
      setStudent(studentData);
      console.log(studentData);
    };
    fetchStudent();
  }, [studentId, getStudentById]);

  // Fetch SDQ data for Teacher assessor
  React.useEffect(() => {
    setSdqTeacher(null); // Reset state when selectedYear changes
    const fetchData = async () => {
      try {
        const res = await SDQServices.getSDQByYearAndAssessor({
          year_id: yearId,
          student_id: studentId,
          assessor: "Teacher",
        });
        if (res.status === 200) {
          const sdqData = res.data?.sdq;
          setSdqTeacher(sdqData);
          console.log(sdqData);
        } else {
          setSdqTeacher(null);
        }
      } catch (err) {
        setSdqTeacher(null);
        console.error("Failed to fetch SDQ data:", err);
      }
    };
    fetchData();
  }, [studentId, yearId]);

  // Fetch SDQ data for Parent assessor
  React.useEffect(() => {
    setSdqParent(null); // Reset state when selectedYear changes
    const fetchData = async () => {
      try {
        const res = await SDQServices.getSDQByYearAndAssessor({
          year_id: yearId,
          student_id: studentId,
          assessor: "Parent",
        });
        if (res.status === 200) {
          const sdqData = res.data?.sdq;
          setSdqParent(sdqData);
          console.log(sdqData);
        } else {
          setSdqParent(null);
        }
      } catch (err) {
        setSdqParent(null);
        console.error("Failed to fetch SDQ data:", err);
      }
    };
    fetchData();
  }, [studentId, yearId]);

  // Fetch SDQ data for Student assessor
  React.useEffect(() => {
    setSdqStudent(null); // Reset state when selectedYear changes
    const fetchData = async () => {
      try {
        const res = await SDQServices.getSDQByYearAndAssessor({
          year_id: yearId,
          student_id: studentId,
          assessor: "Student",
        });
        if (res.status === 200) {
          const sdqData = res.data?.sdq;
          setSdqStudent(sdqData);
          console.log(sdqData);
        } else {
          setSdqStudent(null);
        }
      } catch (err) {
        setSdqStudent(null);
        console.error("Failed to fetch SDQ data:", err);
      }
    };
    fetchData();
  }, [studentId, yearId]);

  const studentDataSet = {
    id: 1,
    label: "นักเรียน",
    data: [
      sdqStudent?.emotional?.total_score || 0,
      sdqStudent?.behavioral?.total_score || 0,
      sdqStudent?.hyperactivity?.total_score || 0,
      sdqStudent?.friendship?.total_score || 0,
      sdqStudent?.social?.total_score || 0,
    ],
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235, 1)",
    borderWidth: 1,
  };

  const parentDataSet = {
    id: 2,
    label: "ผู้ปกครอง",
    data: [
      sdqParent?.emotional?.total_score || 0,
      sdqParent?.behavioral?.total_score || 0,
      sdqParent?.hyperactivity?.total_score || 0,
      sdqParent?.friendship?.total_score || 0,
      sdqParent?.social?.total_score || 0,
    ],
    backgroundColor: "rgba(255, 206, 86, 0.2)",
    borderColor: "rgba(255, 206, 86, 1)",
    borderWidth: 1,
  };

  const teacherDataSet = {
    id: 3,
    label: "ครูที่ปรึกษา",
    data: [
      sdqTeacher?.emotional?.total_score || 0,
      sdqTeacher?.behavioral?.total_score || 0,
      sdqTeacher?.hyperactivity?.total_score || 0,
      sdqTeacher?.friendship?.total_score || 0,
      sdqTeacher?.social?.total_score || 0,
    ],
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132, 1)",
    borderWidth: 1,
  };

  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50 px-4 py-6">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-5xl p-4 md:p-6 bg-white rounded-lg shadow-md">
          <Breadcrumbs
            options={[
              { label: "รายชื่อนักเรียน", link: `/teacher` },
              { label: "ผลการประเมิน" },
            ]}
          />
          {/* Heading */}
          <h3 className="text-xl font-bold text-center w-full flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
            ผลการประเมิน SDQ{" "}
            <span>
              ของ {student?.prefix} {student?.first_name} {student?.last_name}
            </span>
          </h3>

          {/* Radar Chart */}
          <div className="mt-6 w-full flex justify-center items-center">
            <div className="w-full max-w-3xl aspect-square">
              <Radar
                data={{
                  labels: [
                    "ด้านอารมณ์",
                    "ด้านความประพฤติ/เกเร",
                    "ด้านพฤติกรรมอยู่ไม่นิ่ง/สมาธิสั้น",
                    "ด้านความสัมพันธ์กับเพื่อน",
                    "ด้านสัมพันธภาพทางสังคม",
                  ],
                  datasets: [studentDataSet, parentDataSet, teacherDataSet],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      min: 0,
                      max: 10,
                      ticks: {
                        stepSize: 1,
                        backdropColor: "transparent",
                      },
                      pointLabels: {
                        font: {
                          size: 12,
                        },
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        font: {
                          size: 14,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDQResult;
