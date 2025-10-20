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
import { caseMapping } from "../../../utils/sdq2ndPageMapping";
import SDQTable from "../../../components/teacher/SDQTable";

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
  const [selectedSDQ, setSelectedSDQ] = React.useState("Teacher");

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
          
        } else {
          setSdqTeacher(null);
        }
      } catch (err) {
        setSdqTeacher(null);
        // console.error("Failed to fetch SDQ data:", err);
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
    
        } else {
          setSdqParent(null);
        }
      } catch (err) {
        setSdqParent(null);
        // console.error("Failed to fetch SDQ data:", err);
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
      
        } else {
          setSdqStudent(null);
        }
      } catch (err) {
        setSdqStudent(null);
        // console.error("Failed to fetch SDQ data:", err);
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
    borderWidth: 1.5,
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
    borderWidth: 1.5,
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
    borderWidth: 1.5,
  };

  // Calculate averages only from available data
  const availableAssessors = [sdqTeacher, sdqParent, sdqStudent].filter(
    Boolean
  );
  const assessorCount = availableAssessors.length;

  const calculateAverage = (field) => {
    if (assessorCount === 0) return "ยังไม่มีการประเมิน";

    let sum = 0;
    if (sdqTeacher?.[field]?.total_score) sum += sdqTeacher[field].total_score;
    if (sdqParent?.[field]?.total_score) sum += sdqParent[field].total_score;
    if (sdqStudent?.[field]?.total_score) sum += sdqStudent[field].total_score;

    return assessorCount > 0
      ? Math.round((sum / assessorCount) * 100) / 100
      : 0;
  };

  const tableData = [
    {
      assessor: "ครูที่ปรึกษา",
      emotional: sdqTeacher
        ? sdqTeacher?.emotional?.total_score || 0
        : "ยังไม่มีการประเมิน",
      behavioral: sdqTeacher
        ? sdqTeacher?.behavioral?.total_score || 0
        : "ยังไม่มีการประเมิน",
      hyperactivity: sdqTeacher
        ? sdqTeacher?.hyperactivity?.total_score || 0
        : "ยังไม่มีการประเมิน",
      friendship: sdqTeacher
        ? sdqTeacher?.friendship?.total_score || 0
        : "ยังไม่มีการประเมิน",
      social: sdqTeacher
        ? sdqTeacher?.social?.total_score || 0
        : "ยังไม่มีการประเมิน",
    },
    {
      assessor: "ผู้ปกครอง",
      emotional: sdqParent
        ? sdqParent?.emotional?.total_score || 0
        : "ยังไม่มีการประเมิน",
      behavioral: sdqParent
        ? sdqParent?.behavioral?.total_score || 0
        : "ยังไม่มีการประเมิน",
      hyperactivity: sdqParent
        ? sdqParent?.hyperactivity?.total_score || 0
        : "ยังไม่มีการประเมิน",
      friendship: sdqParent
        ? sdqParent?.friendship?.total_score || 0
        : "ยังไม่มีการประเมิน",
      social: sdqParent
        ? sdqParent?.social?.total_score || 0
        : "ยังไม่มีการประเมิน",
    },
    {
      assessor: "นักเรียน",
      emotional: sdqStudent
        ? sdqStudent?.emotional?.total_score || 0
        : "ยังไม่มีการประเมิน",
      behavioral: sdqStudent
        ? sdqStudent?.behavioral?.total_score || 0
        : "ยังไม่มีการประเมิน",
      hyperactivity: sdqStudent
        ? sdqStudent?.hyperactivity?.total_score || 0
        : "ยังไม่มีการประเมิน",
      friendship: sdqStudent
        ? sdqStudent?.friendship?.total_score || 0
        : "ยังไม่มีการประเมิน",
      social: sdqStudent
        ? sdqStudent?.social?.total_score || 0
        : "ยังไม่มีการประเมิน",
    },
    {
      assessor: "คะแนนเฉลี่ย",
      emotional: calculateAverage("emotional"),
      behavioral: calculateAverage("behavioral"),
      hyperactivity: calculateAverage("hyperactivity"),
      friendship: calculateAverage("friendship"),
      social: calculateAverage("social"),
    },
  ];

  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50 px-4 py-6">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-6xl p-4 md:p-6 bg-white rounded-lg shadow-md">
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
                  datasets: [teacherDataSet, parentDataSet, studentDataSet],
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
                      },
                      pointLabels: {
                        font: {
                          size: 14,
                        },
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        font: {
                          size: 16,
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="mt-8">
            <SDQTable data={tableData} />
          </div>
          {/* Assessor Selector */}
          <div className="mt-8 w-full flex justify-center md:justify-start space-x-2 items-center">
            {sdqTeacher && (
              <button
                className={`btn ${
                  selectedSDQ === "Teacher" ? "btn-neutral" : ""
                }`}
                onClick={() => setSelectedSDQ("Teacher")}
              >
                ครูที่ปรึกษา
              </button>
            )}
            {sdqParent && (
              <button
                className={`btn ${
                  selectedSDQ === "Parent" ? "btn-neutral" : ""
                }`}
                onClick={() => setSelectedSDQ("Parent")}
              >
                ผู้ปกครอง
              </button>
            )}
            {sdqStudent && (
              <button
                className={`btn ${
                  selectedSDQ === "Student" ? "btn-neutral" : ""
                }`}
                onClick={() => setSelectedSDQ("Student")}
              >
                นักเรียน
              </button>
            )}
          </div>

          {sdqTeacher && selectedSDQ === "Teacher" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เด็กมีปัญหาในด้านใดด้านหนึ่งต่อไปนี้หรือไม่ : ด้านอารมณ์
                  ด้านสมาธิ ด้านพฤติกรรม หรือความสามารถเข้ากับผู้อื่น
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {"- "}
                  {caseMapping(
                    "overall_problem",
                    sdqTeacher?.other?.overall_problem
                  )}
                </p>
              </div>
              {sdqTeacher?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้เกิดขึ้นมานานเท่าไหร่แล้ว
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "problem_time",
                      sdqTeacher?.other?.problem_time
                    )}
                  </p>
                </div>
              )}
              {sdqTeacher?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้ทำให้เด็กรู้สึกไม่สบายใจหรือไม่
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "student_uneasy",
                      sdqTeacher?.other?.student_uneasy
                    )}
                  </p>
                </div>
              )}
              {sdqTeacher?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้รบกวนชีวิตประจำวันของเด็กในด้านต่าง ๆ
                    ต่อไปนี้หรือไม่ : การคบเพื่อน การเรียนในห้องเรียน
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "is_annoy_student",
                      sdqTeacher?.other?.is_annoy_student
                    )}
                  </p>
                </div>
              )}
              {sdqTeacher?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้ทำให้เกิดความยุ่งยากหรือไม่
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "is_difficult_student",
                      sdqTeacher?.other?.is_difficult_student
                    )}
                  </p>
                </div>
              )}
            </div>
          ) : sdqParent && selectedSDQ === "Parent" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความเห็นหรือความกังวลอื่น
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {"- "}
                  {sdqParent?.other?.additional === ""
                    ? "ไม่ระบุ"
                    : sdqParent?.other?.additional}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  โดยรวมเด็กมีปัญหาในด้านใดด้านหนึ่งต่อไปนี้หรือไม่ : ด้านอารมณ์
                  ด้านสมาธิ ด้านพฤติกรรม หรือความสามารถเข้ากับผู้อื่น
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {"- "}
                  {caseMapping(
                    "overall_problem",
                    sdqParent?.other?.overall_problem
                  )}
                </p>
              </div>
              {sdqParent?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้เกิดขึ้นมานานเท่าไหร่แล้ว
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "problem_time",
                      sdqParent?.other?.problem_time
                    )}
                  </p>
                </div>
              )}
              {sdqParent?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้ทำให้เด็กรู้สึกไม่สบายใจหรือไม่
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "student_uneasy",
                      sdqParent?.other?.student_uneasy
                    )}
                  </p>
                </div>
              )}
              {sdqParent?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้รบกวนชีวิตประจำวันของเด็กในด้านต่าง ๆ
                    ต่อไปนี้หรือไม่ : ความเป็นอยู่ที่บ้าน การคบเพื่อน
                    การเรียนในห้องเรียน กิจกรรมยามว่าง
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "is_annoy_student",
                      sdqParent?.other?.is_annoy_student
                    )}
                  </p>
                </div>
              )}
              {sdqParent?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้ทำให้ผู้ปกครองหรือครอบครัวเกิดความยุ่งยากหรือไม่
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "is_difficult_student",
                      sdqParent?.other?.is_difficult_student
                    )}
                  </p>
                </div>
              )}
            </div>
          ) : sdqStudent && selectedSDQ === "Student" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สิ่งอื่นที่จะบอก
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {"- "}
                  {sdqStudent?.other?.additional === ""
                    ? "ไม่ระบุ"
                    : sdqStudent?.other?.additional}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  โดยรวมเด็กมีปัญหาในด้านใดด้านหนึ่งต่อไปนี้หรือไม่ : ด้านอารมณ์
                  ด้านสมาธิ ด้านพฤติกรรม หรือความสามารถเข้ากับผู้อื่น
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {"- "}
                  {caseMapping(
                    "overall_problem",
                    sdqStudent?.other?.overall_problem
                  )}
                </p>
              </div>
              {sdqStudent?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้เกิดขึ้นมานานเท่าไหร่แล้ว
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "problem_time",
                      sdqStudent?.other?.problem_time
                    )}
                  </p>
                </div>
              )}
              {sdqStudent?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้ทำให้เด็กรู้สึกไม่สบายใจหรือไม่
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "student_uneasy",
                      sdqStudent?.other?.student_uneasy
                    )}
                  </p>
                </div>
              )}
              {sdqStudent?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหานี้รบกวนชีวิตประจำวันของเด็กในด้านต่าง ๆ
                    ต่อไปนี้หรือไม่ : ความเป็นอยู่ที่บ้าน การคบเพื่อน
                    การเรียนในห้องเรียน กิจกรรมยามว่าง
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "is_annoy_student",
                      sdqStudent?.other?.is_annoy_student
                    )}
                  </p>
                </div>
              )}
              {sdqStudent?.other?.overall_problem !== "0" && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ปัญหาของเด็กทำให้ชั้นเรียนเกิดความยุ่งยากหรือไม่
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {"- "}
                    {caseMapping(
                      "is_difficult_student",
                      sdqStudent?.other?.is_difficult_student
                    )}
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SDQResult;
