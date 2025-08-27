import { useEffect } from "react";
import { useParams } from "react-router";
import { useClassroomStore } from "../../stores/classroom.store";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import AddStudentModal from "../../components/modals/AddStudent";
import BreadcrumbsLoop from "../../components/Breadcrumbs";

const ClassroomDetail = () => {
  const { classroomId } = useParams();
  const { classroom, getClassroomById } = useClassroomStore();

  useEffect(() => {
    // Fetch classroom details
    getClassroomById(classroomId);
  }, [classroomId, getClassroomById]);

  return (
    <div className="section-container">
      {/* breadcrumb */}
      <BreadcrumbsLoop
        options={[
          { label: "หน้าหลัก", link: "/" },
          { label: "จัดการห้องเรียน", link: "/admin/year/classroom" },
          { label: `ห้อง ${classroom?.number}/${classroom?.room}`, link: "#" },
        ]}
      />

      {/* หัวข้อเลขห้อง */}
      <h1 className="text-2xl font-bold mb-4">
        ห้อง{" "}
        {classroom ? `${classroom.number}/${classroom.room}` : "Loading..."}
      </h1>

      <div className="flex justify-between items-center mb-4 md:flex-row flex-col gap-4">
        <div>
          {/* ชื่อคุณครูที่ปรึกษา */}
          <h2 className="text-xl font-semibold mb-2">
            คุณครูที่ปรึกษา:{" "}
            {classroom
              ? `${classroom.teacher_id.first_name}` +
                " " +
                `${classroom.teacher_id.last_name}`
              : "Loading..."}
          </h2>
        </div>

        {/* ปุ่มเพิ่มนักเรียน */}
        <div>
          <button
            className="btn-green"
            onClick={() =>
              document.getElementById("add_student_modal").showModal()
            }
          >
            เพิ่มนักเรียน
          </button>
          <AddStudentModal
            classId={classroomId}
            onAddStudentSuccess={() => getClassroomById(classroomId)}
          />
        </div>
      </div>

      {/* ตารางชื่อนักเรียน */}
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="text-center">เลขที่ประจำตัวนักเรียน</th>
            <th className="">คำนำหน้า</th>
            <th className="">ชื่อ - นามสกุล</th>
            <th className="text-center">แก้ไข/ลบ</th> {/* เพิ่ม text-center */}
          </tr>
        </thead>
        <tbody>
          {classroom?.students.map((student) => (
            <tr key={student?._id}>
              <td>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </td>
              <td className="text-center">{student?.user_id}</td>
              <td className="">{student?.prefix}</td>
              <td className="">
                {student?.first_name} {student?.last_name}
              </td>
              <td className="text-center">
                <div className="flex gap-2 justify-center">
                  <button className="btn btn-warning">
                    <BiSolidEdit size={20} />
                  </button>
                  <button className="btn btn-error">
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className="text-center">เลขที่ประจำตัวนักเรียน</th>
            <th className="">คำนำหน้า</th>
            <th className="">ชื่อ - นามสกุล</th>
            <th className="text-center">แก้ไข/ลบ</th>
          </tr>
        </tfoot>
      </table>

      {/* pagination */}
    </div>
  );
};

export default ClassroomDetail;
