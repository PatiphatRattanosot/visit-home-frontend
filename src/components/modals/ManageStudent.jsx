import { useNavigate } from "react-router";
const ManageStudent = ({ student }) => {
  if (!student) return null; // Ensure student is defined before rendering
  const navigate = useNavigate();
  const goToVisitInfo = () => {
    navigate(`/teacher/visit-info/add/${student._id}`);
  };
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
            <button className="btn">ประวัติการประเมิน SDQ</button>
            <button className="btn">ประเมิน SDQ</button>
            <button className="btn">ดูเส้นทาง</button>
            <button onClick={goToVisitInfo} className="btn">
              ผลการเยี่ยมบ้าน
            </button>
            <button className="btn">ข้อมูลการเยี่ยมบ้าน</button>
            <button className="btn">พิมพ์เอกสาร</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageStudent;
