import { useEffect, useState } from "react";
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
import { useAuthStore } from "../../stores/auth.store";

const StudentList = () => {
  const { userInfo } = useAuthStore();
  const { classroom, getClassroomByTeacherId } = useClassroomStore();
  const { deleteStudent } = useStudentStore();

  const [selectedOption, setSelectedOption] = useState("SortToMost");

  const optionsForstudents = [
    { value: "SortToMost", label: "เรียงจากน้อยไปมาก" },
    { value: "MostToSort", label: "เรียงจากมากไปน้อย" },
    { value: "AlphaSortToMost", label: "เรียงตามลำดับตัวอักษร ก-ฮ" },
    { value: "AlphaMostToSort", label: "เรียงตามลำดับตัวอักษร ฮ-ก" },
  ];

  //state สำหรับนักเรียนที่กรองแล้ว
  const [filteredstudents, setFilteredstudents] = useState([]);

  //state สำหรับเก็บ keyword การค้นหารายชื่อนักเรียนและเลข
  const [searchKeyword, setSearchKeyword] = useState("");

  // สร้าง state สำหรับทำ Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredstudents.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    let filtered = classroom[0]?.students || [];
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter((student) => {
        const firstName = classroom[0].studens[0].first_name?.toLowerCase() || "";
        const lastName = classroom[0].studens[0].toLowerCase() || "";
        const userId = String(classes[0].studens[0].user_id || "");
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
    switch (selectedOption) {
      case "SortToMost":
        sorted.sort((a, b) => Number(a.user_id) - Number(b.user_id));
        break;
      case "MostToSort":
        sorted.sort((a, b) => Number(b.user_id) - Number(a.user_id));
        break;
      case "AlphaSortToMost":
        sorted.sort((a, b) =>
          (a.first_name + a.last_name).localeCompare(
            b.first_name + b.last_name,
            "th"
          )
        );
        break;
      case "AlphaMostToSort":
        sorted.sort((a, b) =>
          (b.first_name + b.last_name).localeCompare(
            a.first_name + a.last_name,
            "th"
          )
        );
        break;
      default:
        break;
    }
    setFilteredstudents(sorted);
    setCurrentPage(1); // รีเซ็ตไปที่หน้าแรกเมื่อมีการเปลี่ยนแปลงการค้นหาหรือการกรอง
  }, [searchKeyword, classroom, selectedOption]);

  useEffect(() => {
    // Fetch classroom details
    getClassroomByTeacherId(userInfo._id);
  }, [userInfo._id, getClassroomByTeacherId]);

  const handleDeleteStudent = async (email) => {
    const ok = await deleteStudent(email); // ← รอผลลบ (true/false) จาก Swal flow
    if (ok) {
      await getClassroomByTeacherId(userInfo._id); // ← ค่อยรีเฟรชห้องเรียน
    }
  };

  console.log("hello student", classroom.students[0]);

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
        {classroom ? `${classroom[0].number}/${classroom[0].room}` : "Loading..."}
      </h1>

      <div className="flex justify-between items-center mb-4 md:flex-row flex-col gap-4">
        <div>
          {/* ชื่อคุณครูที่ปรึกษา */}
          <h2 className="text-xl font-semibold mb-2">
            คุณครูที่ปรึกษา:{" "}
            {classroom
              ? `${useAuthStore().userInfo.first_name}` +
                " " +
                `${useAuthStore().userInfo.last_name}`
              : "Loading..."}
          </h2>
        </div>

        

        {/* ปุ่มเพิ่มนักเรียน */}
        <div className="space-x-2">
          <input
            type="file"
            accept=".xlsx"
            className="hidden"
            id="upload_excel"
          />
          <button
            className="btn-blue"
            onClick={() => {
              document.getElementById("upload_excel").click();
            }}
          >
            เพิ่มนักเรียนจากไฟล์ Excel...
          </button>
          <button
            className="btn-green"
            onClick={() =>
              document.getElementById("add_student_modal").showModal()
            }
          >
            เพิ่มนักเรียน
          </button>
          <AddStudentModal
            classId={userInfo._id}
            onAddstudentsuccess={() => getClassroomByTeacherId(userInfo._id)}
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
          />

          {/* ตัวเลือกการเรียง */}
          <FilterDropdown
            setCurrentPage={setCurrentPage}
            options={optionsForstudents}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
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
              {currentItems.map((student) => (
                <tr key={student?._id}>
                  {/* ซ่อน checkbox บนจอเล็ก */}
                  <td className="hidden sm:table-cell">
                    <label>
                      <input type="checkbox" className="checkbox checkbox-sm" />
                    </label>
                  </td>

                  <td className="text-center">{classes[0].students[0].user_id}</td>
                  <td>{classes[0].students[0].prefix}</td>
                  <td>
                    {classes[0].students[0].first_name} {classes[0].students[0].last_name}
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => {
                          document
                            .getElementById(`edit_student_${student?._id}`)
                            .showModal();
                        }}
                        className="btn btn-warning btn-xs sm:btn-sm"
                      >
                        {/* ใช้ขนาดไอคอนตาม font-size */}
                        <BiSolidEdit className="text-base sm:text-lg" />
                      </button>
                      <ModalEditStudent
                        id={student?._id}
                        classId={teacherId}
                        onUpdateStudent={() => getClassroomByTeacherId(teacherId)}
                      />
                      <button
                        onClick={() => handleDeleteStudent(student?.email)}
                        className="btn btn-error btn-xs sm:btn-sm"
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
                {/* ซ่อน checkbox บนจอเล็ก */}
                <th className="hidden sm:table-cell"></th>

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

      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={filteredstudents.length}
        itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StudentList;
