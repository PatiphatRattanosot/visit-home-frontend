import { useEffect, useState } from "react";
import { useClassroomStore } from "../../stores/classroom.store";
import { useAuthStore } from "../../stores/auth.store";
import FilterDropdown from "../../components/FilterDropdown";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import ManageStudent from "../../components/modals/ManageStudent";
import { useNavigate } from "react-router";
const StudentList = () => {
  const { classroomsByTeacherId, getClassroomByTeacherId } = useClassroomStore();
  const { userInfo } = useAuthStore();
  const teacherId = userInfo?._id;
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [selectedOption, setSelectedOption] = useState("SortToMost");
  // state สำหรับจัดการ Search
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredStudent, setFilteredStudent] = useState([]);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredStudent)
    ? filteredStudent.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    let filtered = classroomsByTeacherId;

    if (searchKeyword) {
      // toLoqwer() ใช้เพื่อเปลี่ยนตัวอักษรเป็นตัวพิมพ์เล็ก
      // trim() ใช้เพื่อลบช่องว่างที่ไม่จำเป็น และ toLowerCase() เพื่อเปรียบเทียบแบบไม่สนใจตัวพิมพ์ใหญ่-เล็ก
      const keyword = searchKeyword.trim().toLowerCase();
      filtered = classroomsByTeacherId.filter((student) => {
        const user_id = student.user_id.toLowerCase();
        const firstName = student.first_name.toLowerCase();
        const lastName = student.last_name.toLowerCase();
        const fullName =
          `${student.first_name} ${student.last_name}`.toLowerCase();

        return (
          firstName.includes(keyword) ||
          lastName.includes(keyword) ||
          fullName.includes(keyword) ||
          user_id.includes(keyword)
        );
      });
    }

    let sorted = [...filtered];
    switch (selectedOption) {
      case "SortToMost":
        sorted.sort((a, b) => a.user_id - b.user_id);
        break;
      case "MostToSort":
        sorted.sort((a, b) => b.user_id - a.user_id);
        break;
      case "AlphaSortToMost":
        sorted.sort((a, b) => {
          const nameA = `${a.prefix}${a.first_name}${a.last_name}`;
          const nameB = `${b.prefix}${b.first_name}${b.last_name}`;
          return nameB.localeCompare(nameA, "th", { sensitivity: "base" });
        });
        break;
      case "AlphaMostToSort":
        sorted.sort((a, b) => {
          const nameA = `${a.prefix}${a.first_name}${a.last_name}`;
          const nameB = `${b.prefix}${b.first_name}${b.last_name}`;
          // { sensitivity: "base" } คือการเปรียบเทียบแบบไม่สนใจตัวพิมพ์ใหญ่-เล็ก
          // localeCompare() ใช้สำหรับเปรียบเทียบสตริงตามภาษาที่กำหนด
          return nameA.localeCompare(nameB, "th", { sensitivity: "base" });
        });
        break;
    }

    setFilteredStudent(sorted);
    // setCurrentPage(1);
  }, [searchKeyword, selectedOption, classroomsByTeacherId]);

  const optionsForStudent = [
    { value: "SortToMost", label: "เรียงจากน้อยไปมาก" },
    { value: "MostToSort", label: "เรียงจากมากไปน้อย" },
    { value: "AlphaMostToSort", label: "เรียงตามลำดับตัวอักษร ก-ฮ" },
    { value: "AlphaSortToMost", label: "เรียงตามลำดับตัวอักษร ฮ-ก" },
  ];

  //useEffect สำหรับการดึงข้อมูลชั้นเรียนของครู
  useEffect(()=> {
    getClassroomByTeacherId(teacherId);
  },[teacherId, getClassroomByTeacherId]);

  //useEffect สำหรับการตั้งค่า filteredStudent
  useEffect(() => {
    setFilteredStudent(classroomsByTeacherId);
  }, [classroomsByTeacherId]);

  const showStatus = (visit_status) => {
    switch (visit_status) {
      case "เยี่ยมบ้านแล้ว":
        return (
          <div className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
            เยี่ยมบ้านแล้ว
          </div>
        );
      default:
        return (
          <div className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
            ยังไม่เยี่ยมบ้าน
          </div>
        );
    }
  };
const navigate = useNavigate();
    const goToVisitInfo = () => {
    navigate("/teacher/visit-info", { state: { student } });
  };
  return (
    <div className="section-container">
      <p className="text-xl text-center font-bold">รายชื่อนักเรียน </p>
      {/* ฟีเจอร์เสริม */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 mt-4 gap-2">
        {/* Dropdown สำหรับการกรองข้อมูล */}
        <FilterDropdown
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          options={optionsForStudent}
        />

        {/* ช่องค้นหา */}
        <Search
          setSearchKeyword={setSearchKeyword}
          setCurrentPage={setCurrentPage}
          placeholder="ค้นหานักเรียนด้วยชื่อหรือรหัส..."
        />

        <button className="btn btn-outline btn-accent">
          พิมพ์เอกสารรายชื่อนักเรียน
        </button>
      </div>
      {/* ตาราง */}
      <div className="">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th className="text-center">เลขที่</th>
              <th className="text-center">เลขที่ประจำตัว</th>
              <th>ชื่อ - นามสกุล</th>
              <th className="text-center">จัดการนักเรียน</th>
              <th className="text-center">สถานะการเยี่ยมบ้าน</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((student, index) => (
              <tr
                key={`${index}, ${student.id}`}
                className="hover:bg-gray-200"
                onClick={() => {
                  setSelectedStudent(student);
                  document
                    .getElementById(`manage_student_${student.id}`)
                    .showModal();
                }}
              >
                <td className="text-center">{student.number}</td>
                <td className="text-center">{student.user_id}</td>
                <td>{`${student.prefix}${student.first_name} ${student.last_name}`}</td>
                <td>
                  <div className="flex flex-wrap justify-center gap-2">
            
            <button onClick={goToVisitInfo} className="btn">ผลการเยี่ยมบ้าน</button>
            <button className="btn">ข้อมูลการเยี่ยมบ้าน</button>
            <button className="btn">พิมพ์เอกสาร</button>
          </div>
                </td>
                <td className="text-center">
                  {showStatus(student.visit_status)}
                </td>
              </tr>
            ))}
          </tbody>

          {/* foot */}
          {currentItems.length === itemsPerPage && (
            <tfoot>
              <tr>
                <th className="text-center">เลขที่</th>
                <th className="text-center">เลขที่ประจำตัว</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th className="text-center">สถานะการเยี่ยมบ้าน</th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {/* pagination */}
      <ManageStudent
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
      <Pagination
        totalItems={filteredStudent.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StudentList;
