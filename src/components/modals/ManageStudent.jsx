import useYearSelectStore from "../../stores/year_select.store";
import SDQServices from "../../services/sdq/sdq.service";
import { useState, useEffect } from "react";

const ManageStudent = ({ student }) => {
  const { selectedYear } = useYearSelectStore();
  if (!student) return null; // Ensure student is defined before rendering

  const [sdqTeacher, setSdqTeacher] = useState(null);

  useEffect(() => {
    const fetchSDQData = async () => {
      try {
        const res = await SDQServices.getSDQByYearAndAssessor({
          year_id: selectedYear,
          student_id: student._id,
          assessor: "Teacher",
        });
        if (res.status === 200) {
          setSdqTeacher(res.data?.sdq?.isEstimate);
        } else {
          setSdqTeacher(null);
        }
      } catch (err) {
        setSdqTeacher(null);
        console.error("Failed to fetch SDQ data:", err);
      }
    };
    fetchSDQData();
  }, [student._id, selectedYear]);

  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const getStudentData = async () => {
      try {
      } catch (error) {
        setStudentData(null);
        console.error("Failed to fetch student data:", error);
      }
    };
    getStudentData();
  }, [student._id, selectedYear]);

  return (
    <div>
      <dialog id={`manage_student_${student._id}`} className="modal">
        <div className="modal-box max-w-4xl w-full max-h-screen overflow-y-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center mb-4">
            {`จัดการนักเรียน ${student.first_name} ${student.last_name}`}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {!sdqTeacher && (
              <a
                href={`/teacher/sdq/${student._id}/${selectedYear}/estimate`}
                className="btn"
              >
                ประเมิน SDQ
              </a>
            )}
            <a
              href={`/teacher/sdq/${student._id}/${selectedYear}`}
              className="btn"
            >
              ผลประเมิน SDQ
            </a>
            <button className="btn">ดูเส้นทาง</button>
            <a href={`/teacher/student-data/${student._id}`} className="btn">
              ข้อมูลนักเรียน
            </a>
            <a href={`/teacher/visit-info/add/${student._id}`} className="btn">
              ผลการเยี่ยมบ้าน
            </a>

            <button className="btn">พิมพ์เอกสาร</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageStudent;
