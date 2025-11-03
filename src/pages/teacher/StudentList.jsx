import { useEffect, useState } from "react";
import { useClassroomStore } from "../../stores/classroom.store";
import { useAuthStore } from "../../stores/auth.store";
import { useScheduleStore } from "../../stores/schedule.store";
import ManageStudent from "../../components/modals/ManageStudent";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import SearchPersonnel from "../../components/SearchPersonnel";
import FilterDropdown from "../../components/FilterDropdown";
import Pagination from "../../components/Pagination";
import useYearSelectStore from "../../stores/year_select.store";
import YearSelector from "../../components/YearSelector";
import Appointment from "../../components/teacher/Appointment";
import { useVisitInfoStore } from "../../stores/visit.store";
import {
  switchSortStudent,
  sortStudentOptions,
} from "../../utils/sortDataStudentTable";

const StudentList = () => {
  const { userInfo } = useAuthStore();
  const { classroom, getClassroomByTeacherId } = useClassroomStore(); // classroom = array ของห้อง
  const { selectedYear, setSelectedYear, years } = useYearSelectStore();
  const { fetchSchedule } = useScheduleStore();
  const { getVisitInfoByStudentId } = useVisitInfoStore();
  const [studentSchedules, setStudentSchedules] = useState([]);
  const [currentYearData, setCurrentYearData] = useState(null);

  const [selectedOption, setSelectedOption] = useState("SortToMost");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentVisitData, setStudentVisitData] = useState([]);
  const itemsPerPage = 10;

  // useEffect สำหรับเรียกข้อมูล sheduleLength มาโชว์์ที่หน้ารายชื่อนักเรียน
  useEffect(() => {
    const fetchScheduleLengthShow = async () => { };
    fetchScheduleLengthShow();
  }, []);

  // Find current year data when selectedYear or years change
  useEffect(() => {
    if (selectedYear && years.length > 0) {
      const yearData = years.find((year) => year._id === selectedYear);
      setCurrentYearData(yearData || null);
    }
  }, [selectedYear, years]);

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
    switchSortStudent(selectedOption, sorted);

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

  const loadSchedules = async () => {
    if (!currentClass?.students) return;

    let results = {};
    for (const student of currentClass.students) {
      try {
        const response = await fetchSchedule(selectedYear, student._id);
        // Based on your API response structure: response.schedules contains the schedule object
        if (response && response.appointment_date) {
          results[student._id] = {
            appointment_date: response.appointment_date,
            student_id: student._id,
          };
        }
      } catch (error) {
        console.log(
          `Error fetching schedule for student ${student._id}:`,
          error
        );
        // Continue with other students even if one fails
      }
    }
    setStudentSchedules(results);
  };

  const loadVisitData = async () => {
    if (!currentClass?.students) return;

    let results = {};
    for (const student of currentClass.students) {
      try {
        const response = await getVisitInfoByStudentId(
          student._id,
          selectedYear
        );
        // Based on your API response structure: response contains the visit info data
        if (response) {
          results[student._id] = {
            data: response,
            student_id: student._id,
          };
        }
      } catch (error) {
        console.log(
          `Error fetching visit data for student ${student._id}:`,
          error
        );
        // Continue with other students even if one fails
      }
    }
    setStudentVisitData(results);
  };

  const refreshSchedules = async () => {
    await loadSchedules();
    await loadVisitData();
  };

  useEffect(() => {
    loadSchedules();
    loadVisitData();
  }, [currentClass, selectedYear]);

  const VisitStatusBadge = ({ value }) => {
    if (value === "Completed") {
      return (
        <span className="badge text-white badge-success badge-md">
          กรอกข้อมูลแล้ว
        </span>
      );
    }

    return (
      <span className="badge text-white badge-error badge-md">
        ยังไม่กรอกข้อมูล
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
          : "คุณยังไม่มีชั้นเรียนในปีการศึกษานี้"}
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          คุณครูที่ปรึกษา:{" "}
          {userInfo
            ? `${userInfo.first_name} ${userInfo.last_name}`
            : "กำลังโหลด..."}
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
          options={sortStudentOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          className="select select-bordered w-42"
        />
        <YearSelector
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        {/* โชว์ข้อมูลช่วงเวลาวันนัดเยี่ยมบ้าน */}
        <div>
          <span
            className={`badge text-lg text-white badge-lg ${currentYearData?.start_schedule_date &&
              currentYearData?.end_schedule_date
              ? "badge-info" // สีฟ้าเมื่อมีช่วงเวลา
              : "badge-error" // สีแดงเมื่อไม่มีช่วงเวลา
              }`}
          >
            {currentYearData?.start_schedule_date &&
              currentYearData?.end_schedule_date
              ? `ช่วงเวลานัดเยี่ยมบ้าน: ${new Date(
                currentYearData.start_schedule_date
              ).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })} - ${new Date(
                currentYearData.end_schedule_date
              ).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}`
              : "ยังไม่กำหนดช่วงเวลานัดเยี่ยมบ้าน"}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="text-center">เลขที่ประจำตัวนักเรียน</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ - นามสกุล</th>
                <th>สถานะการกรอกข้อมูล</th>
                <th>วันที่นัดเยี่ยมบ้าน</th>
                <th>นัดวันเยี่ยมบ้าน</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((student, index) => (
                <tr
                  className="cursor-pointer hover:bg-gray-100"
                  key={index}
                >
                  <td
                    id={`student_${index}`}
                    data-testid={`student_${index}`}
                    className="text-center cursor-pointer hover:underline"
                    onClick={() =>
                      document
                        .getElementById(`manage_student_${index}`)
                        .showModal()
                    }
                  >
                    {student?.user_id}
                  </td>

                  <td>{student?.prefix}</td>
                  <td
                    onClick={() =>
                      document
                        .getElementById(`manage_student_${index}`)
                        .showModal()
                    }
                    className="cursor-pointer"
                    id={`student_name_${index}`}
                    data-testid={`student_name_${index}`}
                  >
                    {student?.first_name} {student?.last_name}
                  </td>
                  <td>
                    <VisitStatusBadge value={student?.isCompleted} />
                  </td>
                  <td>
                    <span
                      className={`badge ${studentVisitData[student._id]
                        ? "badge-success"
                        : studentSchedules[student._id]
                          ? "badge-warning"
                          : "badge-error"
                        } text-white w-32`}
                    >
                      {studentVisitData[student._id]
                        ? "เยี่ยมบ้านแล้ว"
                        : studentSchedules[student._id]
                          ? new Date(
                            studentSchedules[student._id].appointment_date
                          ).toLocaleDateString("th-TH", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                          : "ยังไม่ได้นัด"}
                    </span>
                  </td>
                  <td>
                    {currentYearData?.start_schedule_date &&
                      currentYearData?.end_schedule_date ? (
                      <button
                        onClick={() =>
                          document
                            .getElementById(
                              `add_appointment_schedule_${index}`
                            )
                            .showModal()
                        }
                        className="btn-blue btn-sm hover:btn-blue/80"
                        id={`appointment_button_${index}`}
                        data-testid={`appointment_button_${index}`}
                      >
                        นัดวันเยี่ยมบ้าน
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        ยังไม่กำหนดช่วงเวลา
                      </span>
                    )}
                  </td>
                  <td>
                    <ManageStudent
                      id={index}
                      student={student}
                    />
                  </td>
                  <Appointment
                    studentId={student._id}
                    student={student}
                    id={index}
                    onScheduleUpdate={refreshSchedules}
                    currentYearData={currentYearData}
                  />
                </tr>
              ))}

              {currentItems.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-base text-gray-500 py-6"
                  >
                    ไม่พบข้อมูลนักเรียน
                  </td>
                </tr>
              )}
            </tbody>
            {currentItems.length == 10 && (
              <tfoot>
                <tr>
                  <th className="text-center">เลขที่ประจำตัวนักเรียน</th>
                  <th>คำนำหน้า</th>
                  <th>ชื่อ - นามสกุล</th>
                  <th>สถานะการกรอกข้อมูล</th>
                  <th>วันที่นัดเยี่ยมบ้าน</th>
                  <th>นัดวันเยี่ยมบ้าน</th>
                </tr>
              </tfoot>
            )}
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
