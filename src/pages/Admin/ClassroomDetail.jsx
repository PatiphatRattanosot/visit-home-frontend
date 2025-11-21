import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useClassroomStore } from "../../stores/classroom.store";
import { useStudentStore } from "../../stores/student.store";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import AddStudentModal from "../../components/modals/AddStudent";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import ModalEditStudent from "../../components/modals/EditStudent";
import FilterDropdown from "../../components/FilterDropdown";
import Pagination from "../../components/Pagination";
import SearchPersonnel from "../../components/SearchPersonnel";
import ImportStudentBtn from "../../components/ImportStudentBtn";
import { sortStudentOptions, switchSortStudent } from "../../utils/sortDataStudentTable";

const ClassroomDetail = () => {
  const { classroomId } = useParams();
  const { classroom, getClassroomById } = useClassroomStore();
  const { deleteStudent } = useStudentStore();

  const [selectedOption, setSelectedOption] = useState("SortToMost");

  //state สำหรับนักเรียนที่กรองแล้ว
  const [filteredStudents, setFilteredStudents] = useState([]);

  //state สำหรับเก็บ keyword การค้นหารายชื่อนักเรียนและเลข
  const [searchKeyword, setSearchKeyword] = useState("");

  // สร้าง state สำหรับทำ Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    let filtered = classroom?.students || [];
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter((student) => {
        const firstName = student.first_name?.toLowerCase() || "";
        const lastName = student.last_name?.toLowerCase() || "";
        const userId = String(student.user_id || "");
        const fullName = `${firstName} ${lastName}`;
        return (
          firstName.includes(keyword) ||
          lastName.includes(keyword) ||
          fullName.includes(keyword) ||
          userId.includes(keyword)
        );
      });
    }

    let sorted = [...filtered];
    switchSortStudent(selectedOption, sorted);
    setFilteredStudents(sorted);
    setCurrentPage(1); // รีเซ็ตไปที่หน้าแรกเมื่อมีการเปลี่ยนแปลงการค้นหาหรือการกรอง
  }, [searchKeyword, classroom, selectedOption]);

  useEffect(() => {
    // Fetch classroom details
    getClassroomById(classroomId);
  }, [classroomId, getClassroomById]);

  const handleDeleteStudent = async (email) => {
    const ok = await deleteStudent(email); //  รอผลลบ (true/false) จาก Swal
    if (ok) {
      await getClassroomById(classroomId); // รีเฟรชห้องเรียน
    }
  };

  return (
    <div className="section-container">
      {/* breadcrumb */}
      <BreadcrumbsLoop
        options={[
          { label: "หน้าหลัก", link: "/" },
          { label: "จัดการห้องเรียน", link: "/admin/year/classroom" },
          { label: `ห้อง ${classroom?.room}/${classroom?.number}`, link: "#" },
        ]}
      />

      {/* หัวข้อเลขห้อง */}
      <h1 className="text-2xl text-center md:text-left font-bold mb-4">
        ห้อง{" "}
        {classroom ? `${classroom.room}/${classroom.number}` : "Loading..."}
      </h1>

      <div className="flex justify-between items-start md:items-center mb-4 md:flex-row flex-col gap-4">
        <div>
          {/* ชื่อคุณครูที่ปรึกษา */}
          <h2 className="text-xl font-semibold mb-2">
            คุณครูที่ปรึกษา:{" "}
            {classroom && classroom?.teacher_id
              ? `${classroom?.teacher_id?.first_name}` +
              " " +
              `${classroom?.teacher_id?.last_name}`
              : "ยังไม่มีครูที่ปรึกษา"}
          </h2>
        </div>

        {/* ปุ่มเพิ่มนักเรียน */}

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto md:justify-end">
          <ImportStudentBtn classId={classroomId} />
          <button
            className="btn-green w-full sm:w-auto"
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
      <div className="flex flex-col md:flex-row justify-start mb-4 mt-4 gap-2">
        {/* ค้นหานักเรียน */}
        <SearchPersonnel
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          placeholder="ค้นหานักเรียน..."
          setCurrentPage={setCurrentPage}
          className="w-full md:w-80"
        />

        {/* ตัวเลือกการเรียง */}
        <FilterDropdown
          setCurrentPage={setCurrentPage}
          options={sortStudentOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          className="select select-bordered w-full md:w-56"
        />
      </div>

      {/* ตารางชื่อนักเรียน */}
      <div className="hidden md:block rounded-xl border border-base-300 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="text-center">
                  {/* สลับข้อความตามขนาดจอ */}
                  <span className="hidden sm:inline">
                    เลขที่ประจำตัวนักเรียน
                  </span>
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
              {currentItems.map((student, index) => (
                <tr key={index}>
                  <td className="text-center">{student?.user_id}</td>
                  <td>{student?.prefix}</td>

                  <td>
                    {student?.first_name} {student?.last_name}
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => {
                          document
                            .getElementById(`edit_student_${index}`)
                            ?.showModal();
                        }}
                        className="btn btn-warning btn-xs sm:btn-sm"
                        id={`edit-student-button_${index}`}
                        data-testid={`edit-student-button_${index}`}
                      >
                        {/* ใช้ขนาดไอคอนตาม font-size */}
                        <BiSolidEdit className="text-base sm:text-lg" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student?.email)}
                        className="btn btn-error btn-xs sm:btn-sm"
                        id={`delete-student-button_${index}`}
                        data-testid={`delete-student-button_${index}`}
                      >
                        <AiOutlineDelete className="text-base sm:text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th className="text-center">
                  <span className="hidden sm:inline">
                    เลขที่ประจำตัวนักเรียน
                  </span>
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

      <div className="grid grid-cols-1 gap-3 md:hidden">
        {currentItems.map((student, index) => (
          <div
            key={student?._id ?? index}
            className="rounded-xl border border-base-300 bg-white shadow-sm p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase text-gray-500">เลขประจำตัว</p>
                <p className="text-lg font-semibold text-gray-900">
                  {student?.user_id || "-"}
                </p>
                <p className="text-sm text-gray-700">
                  {student?.prefix} {student?.first_name} {student?.last_name}
                </p>
              </div>
              <span className="badge badge-outline text-xs">
                {student?.prefix || "-"}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  document
                    .getElementById(`edit_student_${index}`)
                    ?.showModal()
                }
                className="btn btn-warning btn-sm flex-1 min-w-[140px]"
                id={`edit-student-mobile-button_${index}`}
              >
                <BiSolidEdit className="text-base" />
              </button>

              <button
                onClick={() => handleDeleteStudent(student?.email)}
                className="btn btn-error btn-sm flex-1 min-w-[140px]"
                id={`delete-student-mobile-button_${index}`}
              >
                <AiOutlineDelete className="text-base" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentItems.map((student, index) => (
        <ModalEditStudent
          key={student?._id ?? index}
          id={index}
          index={index}
          classId={classroomId}
          studentId={student?._id}
          onUpdateStudent={() => getClassroomById(classroomId)}
        />
      ))}

      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={filteredStudents.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ClassroomDetail;
