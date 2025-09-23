import { useEffect, useState } from "react";
import { useClassroomStore } from "../../stores/classroom.store";
import { useAuthStore } from "../../stores/auth.store";
import ManageStudent from "../../components/modals/ManageStudent";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import SearchPersonnel from "../../components/SearchPersonnel";
import FilterDropdown from "../../components/FilterDropdown";
import Pagination from "../../components/Pagination";
import useYearSelectStore from "../../stores/year_select.store";
import YearSelector from "../../components/YearSelector";
import Appointment from "../../components/teacher/Appointment";

const StudentList = () => {
  const { userInfo } = useAuthStore();
  const { classroom, getClassroomByTeacherId } = useClassroomStore(); // classroom = array ของห้อง
  const { selectedYear, setSelectedYear } = useYearSelectStore();

  const [selectedOption, setSelectedOption] = useState("SortToMost");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getClassroomByTeacherId(String(userInfo._id), String(selectedYear));
  }, [userInfo?._id, selectedYear]);

  const currentClass =
    Array.isArray(classroom) && classroom.length ? classroom[0] : null;

  // ค้นหา + เรียง (แบบเดียวกับ ClassroomDetail)
  useEffect(() => {
    let list = currentClass?.students || [];

    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      list = list.filter((student) => {
        const first = student.first_name?.toLowerCase() || "";
        const last = student.last_name?.toLowerCase() || "";
        const full = `${first} ${last}`;
        const uid = String(student.user_id || "");
        return (
          first.includes(keyword) ||
          last.includes(keyword) ||
          full.includes(keyword) ||
          uid.includes(keyword)
        );
      });
    }

    let sorted = [...list];
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

    setFilteredStudents(sorted);
    setCurrentPage(1);
  }, [searchKeyword, selectedOption, classroom]);

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const VisitStatusBadge = ({ value }) => {
    if (value === "Completed") {
      return (
        <span className="badge text-white badge-success badge-md">
          เยี่ยมบ้านแล้ว
        </span>
      );
    }

    return (
      <span className="badge text-white badge-error badge-md">
        ยังไม่เยี่ยมบ้าน
      </span>
    );
  };
  return (
    <div className="section-container">
      <BreadcrumbsLoop
        options={[
          { label: "หน้าหลัก", link: "/" },
          { label: "รายชื่อนักเรียน", link: "/admin/year/classroom" },
        ]}
      />

      <h1 className="text-2xl text-center md:text-left font-bold mb-4">
        ห้อง{" "}
        {currentClass
          ? `${currentClass?.room}/${currentClass?.number}`
          : "Loading..."}
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          คุณครูที่ปรึกษา:{" "}
          {userInfo
            ? `${userInfo.first_name} ${userInfo.last_name}`
            : "Loading..."}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        <SearchPersonnel
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          placeholder="ค้นหานักเรียน..."
          setCurrentPage={setCurrentPage}
        />
        <FilterDropdown
          options={[
            { value: "SortToMost", label: "เรียงเลข น้อย → มาก" },
            { value: "MostToSort", label: "เรียงเลข มาก → น้อย" },
            { value: "AlphaSortToMost", label: "ชื่อ ก → ฮ" },
            { value: "AlphaMostToSort", label: "ชื่อ ฮ → ก" },
          ]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          className="select select-bordered w-42"
        />
        <YearSelector
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </div>

      <div className="rounded-xl border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="text-center">เลขที่ประจำตัวนักเรียน</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ - นามสกุล</th>
                <th>สถานะการเยี่ยมบ้าน</th>
                <th>นัดวันเยี่ยมบ้าน</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((student) => (
                <tr
                  className="cursor-pointer hover:bg-gray-100"
                  key={student?._id}
                >
                  <td
                    className="text-center cursor-pointer hover:underline"
                    onClick={() =>
                      document
                        .getElementById(`manage_student_${student._id}`)
                        .showModal()
                    }
                  >
                    {student?.user_id}
                  </td>

                  <td>{student?.prefix}</td>
                  <td
                    onClick={() =>
                      document
                        .getElementById(`manage_student_${student._id}`)
                        .showModal()
                    }
                  >
                    {student?.first_name} {student?.last_name}
                  </td>
                  <td>
                    <VisitStatusBadge value={student?.isCompleted} />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        document
                          .getElementById(
                            `add_appointment_schedule_${student._id}`
                          )
                          .showModal()
                      }
                      className="btn-blue btn-sm hover:btn-blue/80"
                    >
                      นัดวันเยี่ยมบ้าน
                    </button>
                  </td>
                  <td>
                    <ManageStudent
                      id={`manage_student_${student._id}`}
                      student={student}
                    />
                  </td>
                  <Appointment
                    studentId={student._id}
                    student={student}
                    id={`add_appointment_schedule_${student._id}`}
                  />
                </tr>
              ))}

              {currentItems.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center text-base text-gray-500 py-6"
                  >
                    ไม่พบข้อมูลนักเรียน
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th className="text-center">เลขที่ประจำตัวนักเรียน</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ - นามสกุล</th>
                <th>สถานะการเยี่ยมบ้าน</th>
                <th>นัดวันเยี่ยมบ้าน</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

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

export default StudentList;
