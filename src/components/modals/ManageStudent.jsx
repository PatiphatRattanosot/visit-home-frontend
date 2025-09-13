import { useNavigate } from "react-router";
import useYearSelectStore from "../../stores/year_select.store";

const ManageStudent = ({ student }) => {
  const { selectedYear } = useYearSelectStore();
  if (!student) return null; // Ensure student is defined before rendering
  const navigate = useNavigate();
  const goToVisitInfo = () => {
    navigate(`/teacher/visit-info/add/${student._id}`);
  };

  return (
    <div>
      <dialog id={`manage_student_${student._id}`} className="modal">
        <div className="modal-box max-w-2xl w-full max-h-screen overflow-y-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center mb-4">
            {`จัดการนักเรียน ${student.first_name} ${student.last_name}`}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`/teacher/sdq/${student._id}/${selectedYear}/estimate`}
              className="btn"
            >
              ประเมิน SDQ
            </a>
            <button className="btn">ดูเส้นทาง</button>
            <button onClick={goToVisitInfo} className="btn">
              ผลการเยี่ยมบ้าน
            </button>

            <button className="btn">พิมพ์เอกสาร</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageStudent;
