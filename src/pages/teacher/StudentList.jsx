import { useEffect, useState } from "react";
import { useClassroomStore } from "../../stores/classroom.store";
import { useAuthStore } from "../../stores/auth.store";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import SearchPersonnel from "../../components/SearchPersonnel";
import FilterDropdown from "../../components/FilterDropdown";
import Pagination from "../../components/Pagination";

const StudentList = () => {
  const { userInfo } = useAuthStore();
  const { classroom, getClassroomByTeacherId } = useClassroomStore(); // classroom = array ของห้อง

  const [selectedOption, setSelectedOption] = useState("SortToMost");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // โหลดห้องของครู (คาดว่ามีห้องเดียว)
  useEffect(() => {
    if (!userInfo?._id) return;
    getClassroomByTeacherId(userInfo._id);
  }, [userInfo?._id]);

  const currentClass =
    Array.isArray(classroom) && classroom.length ? classroom[0] : null;

  // ค้นหา + เรียง (แบบเดียวกับ ClassroomDetail)
  useEffect(() => {
    let list = currentClass?.students || [];

    if (searchKeyword) {
      const q = searchKeyword.toLowerCase();
      list = list.filter((s) => {
        const first = s.first_name?.toLowerCase() || "";
        const last = s.last_name?.toLowerCase() || "";
        const full = `${first} ${last}`;
        const uid = String(s.user_id || "");
        return (
          first.includes(q) ||
          last.includes(q) ||
          full.includes(q) ||
          uid.includes(q)
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
  }, [searchKeyword, selectedOption, classroom]); // ← ผูกกับ classroom แทน currentClass state

  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="section-container">
      <BreadcrumbsLoop
        options={[
          { label: "หน้าหลัก", link: "/" },
          { label: "จัดการห้องเรียน", link: "/admin/year/classroom" },
          {
            label: currentClass
              ? `ห้อง ${currentClass.room}/${currentClass.number}`
              : "Loading...",
            link: "#",
          },
        ]}
      />

      <h1 className="text-2xl text-center md:text-left font-bold mb-4">
        ห้อง{" "}
        {currentClass
          ? `${currentClass.room}/${currentClass.number}`
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
        />
      </div>

      <div className="rounded-xl border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs sm:text-sm">
            <thead>
              <tr>
                <th className="hidden sm:table-cell w-10">
                  <label>
                    <input type="checkbox" className="checkbox checkbox-sm" />
                  </label>
                </th>
                <th className="text-center">เลขที่ประจำตัวนักเรียน</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ - นามสกุล</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((s) => (
                <tr key={s?._id}>
                  <td className="hidden sm:table-cell">
                    <label>
                      <input type="checkbox" className="checkbox checkbox-sm" />
                    </label>
                  </td>
                  <td className="text-center">{s?.user_id}</td>
                  <td>{s?.prefix}</td>
                  <td>
                    {s?.first_name} {s?.last_name}
                  </td>
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
                <th className="hidden sm:table-cell"></th>
                <th className="text-center">เลขที่ประจำตัวนักเรียน</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ - นามสกุล</th>
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
