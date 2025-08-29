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
      <h1 className="text-2xl text-center md:text-left font-bold mb-4">
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
        <div className="space-x-2">
          <input type="file" accept=".xlsx" className="hidden" id="upload_excel" />
          <button className="btn-blue"
            onClick={()=>{document.getElementById("upload_excel").click()}}
          >เพิ่มนักเรียนจากไฟล์ Excel...</button>
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
  <div className="rounded-xl border border-base-300 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="table table-zebra w-full text-xs sm:text-sm">
      <thead>
        <tr>
          {/* ซ่อน checkbox บนจอเล็ก */}
          <th className="hidden sm:table-cell w-10">
            <label>
              <input type="checkbox" className="checkbox checkbox-sm" />
            </label>
          </th>

          <th className="text-center">
            {/* สลับข้อความตามขนาดจอ */}
            <span className="hidden sm:inline">เลขที่ประจำตัวนักเรียน</span>
            <span className="inline sm:hidden">เลขประจำตัว</span>
          </th>

          <th className="">คำนำหน้า</th>
          <th className="">ชื่อ - นามสกุล</th>

          <th className="text-center">
            {/* ทำให้ปุ่มเล็กลงบนมือถือ */}
            <span>แก้ไข/ลบ</span>
          </th>
        </tr>
      </thead>

      <tbody>
        {classroom?.students?.map((student) => (
          <tr key={student?._id}>
            {/* ซ่อน checkbox บนจอเล็ก */}
            <td className="hidden sm:table-cell">
              <label>
                <input type="checkbox" className="checkbox checkbox-sm" />
              </label>
            </td>

            <td className="text-center">{student?.user_id}</td>
            <td>{student?.prefix}</td>
            <td>{student?.first_name} {student?.last_name}</td>

            <td className="text-center">
              <div className="flex justify-center gap-1 sm:gap-2">
                <button className="btn btn-warning btn-xs sm:btn-sm">
                  {/* ใช้ขนาดไอคอนตาม font-size */}
                  <BiSolidEdit className="text-base sm:text-lg" />
                </button>
                <button className="btn btn-error btn-xs sm:btn-sm">
                  <AiOutlineDelete className="text-base sm:text-lg" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      <tfoot>
        <tr>
          {/* ซ่อน checkbox บนจอเล็ก */}
          <th className="hidden sm:table-cell"></th>

          <th className="text-center">
            <span className="hidden sm:inline">เลขที่ประจำตัวนักเรียน</span>
            <span className="inline sm:hidden">เลขประจำตัว</span>
          </th>

          <th>คำนำหน้า</th>
          <th>ชื่อ - นามสกุล</th>
          <th className="text-center">แก้ไข/ลบ</th>
        </tr>
      </tfoot>
    </table>
  </div>
</div>


      {/* pagination */}
    </div>
  );
};

export default ClassroomDetail;
