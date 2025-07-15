import { useEffect, useState } from "react";
import FilterDropdown from "../../components/FilterDropdown";
import SearchPersonnel from "../../components/SearchPersonnel";
import Pagination from "../../components/Pagination";
import Breadcrumbs from "../../components/Breadcrumbs";
import ArrowBack from "./../../components/ArrowBack";
import { usePersonnelStore } from "../../stores/admin.store"; // ใช้ store ที่สร้างขึ้นมา
const ManageAdminRoles = () => {
  // ใช้ Zustand store เพื่อจัดการข้อมูลบุคลากร
  const {
    data: personnel,
    fetchData,
    removeAdminRole,
    addAdminRole,
  } = usePersonnelStore();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredPersonnel, setFilteredPersonnel] = useState([]);
  const [selectedOption, setSelectedOption] = useState("SortToMost");
  const optionsForPersonnel = [
    { value: "SortToMost", label: "เรียงจากน้อยไปมาก" },
    { value: "MostToSort", label: "เรียงจากมากไปน้อย" },
    { value: "AlphaSortToMost", label: "เรียงตามลำดับตัวอักษร ก-ฮ" },
    { value: "AlphaMostToSort", label: "เรียงตามลำดับตัวอักษร ฮ-ก" },
  ];
  // สร้าง satate สำหรับ Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredPersonnel)
    ? filteredPersonnel.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    const fetchAndFilter = async () => {
      const allPersonnel = await fetchData(); // สมมุติ return เป็น array
      const activePersonnel = allPersonnel.filter(
        (person) => person.status === "ทำงาน"
      );
      setFilteredPersonnel(activePersonnel);
    };

    fetchAndFilter();
  }, []);

  const getRoleDisplay = (role) => {
    const roles = Array.isArray(role) ? role : [role]; // แปลงให้เป็น array เสมอ
    //ใช้ includes() เรียงลำดับความสำคัญของบทบาท และ คืนค่าชื่อบทบาทที่เหมาะสม
    if (roles.includes("Admin")) return "เจ้าหน้าที่ฝ่ายทะเบียน";
    if (roles.includes("Teacher")) return "คุณครู";
    if (roles.includes("Student")) return "นักเรียน";

    return "ไม่ทราบบทบาท";
  };

  const handleAddRole = async (email, roleToAdd) => {
    await addAdminRole(email, roleToAdd); // เรียกผ่าน store
  };

  const handleRemoveRole = async (email, roleToRemove) => {
    await removeAdminRole(email, roleToRemove); // เรียกผ่าน store
  };

  useEffect(() => {
    // กรองข้อมูลตามคำค้นหา
    let filtered = personnel;
    if (searchKeyword) {
      const keyword = searchKeyword.trim().toLowerCase();

      filtered = personnel.filter((person) => {
        const firstName = person.first_name.toLowerCase();
        const lastName = person.last_name.toLowerCase();
        const fullName =
          `${person.first_name} ${person.last_name}`.toLowerCase();
        const userId = person.user_id.toString();

        return (
          firstName.includes(keyword) ||
          lastName.includes(keyword) ||
          fullName.includes(keyword) ||
          userId.includes(keyword)
        );
      });
    }

    // กรองข้อมูลตามสถานะ "ทำงาน"
    filtered = filtered.filter((person) => person.status === "ทำงาน");

    let sorted = [...filtered];
    // เรียงลำดับข้อมูลตามตัวเลือกที่เลือก

    if (selectedOption === "SortToMost") {
      sorted.sort((a, b) => a.user_id - b.user_id);
    } else if (selectedOption === "MostToSort") {
      sorted.sort((a, b) => b.user_id - a.user_id);
    } else if (selectedOption === "AlphaMostToSort") {
      sorted.sort((a, b) => {
        const nameA = `${a.prefix}${a.first_name}${a.last_name}`;
        const nameB = `${b.prefix}${b.first_name}${b.last_name}`;
        return nameA.localeCompare(nameB, "th", { sensitivity: "base" });
      });
    } else if (selectedOption === "AlphaSortToMost") {
      sorted.sort((a, b) => {
        const nameA = `${a.prefix}${a.first_name}${a.last_name}`;
        const nameB = `${b.prefix}${b.first_name}${b.last_name}`;
        return nameB.localeCompare(nameA, "th", { sensitivity: "base" });
      });
    }

    setCurrentPage(1);
    setFilteredPersonnel(sorted);
  }, [selectedOption, personnel, searchKeyword]);
  return (
    <div className="section-container">
      <div className="overflow-x-auto">
        <div className="flex flex-row space-x-4">
          <ArrowBack backPath="/admin" />
          <Breadcrumbs />
        </div>
        {/* หัวข้อ */}
        <p className="text-xl text-center">หน้าจัดการบทบาทผู้ดูแล</p>
        {/* ฟีเจอร์เสริม */}
        <div className="flex flex-col md:flex-row justify-between mb-4 mt-4 gap-2">
          {/* Dropdown สำหรับการกรองข้อมูล */}
          <FilterDropdown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={optionsForPersonnel}
          />

          {/* ช่องค้นหา */}
          <div className="ml-auto">
            <SearchPersonnel
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
            />
          </div>
        </div>

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>เลขที่ประจำตัว</th>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>บทบาทผู้ดูแล</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {currentItems.map((person, index) => (
              <tr key={index}>
                <td>{person.user_id}</td>
                <td>{person.prefix}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{getRoleDisplay(person.role)}</td>
                <td>
                  <input
                    type="checkbox"
                    // ใช้ได้สองแบบเลย
                    // checked={user.role === "admin"}
                    checked={person.role.includes("Admin")}
                    onChange={(e) =>
                      e.target.checked
                        ? handleAddRole(person.email, "Admin")
                        : handleRemoveRole(person.email, "Admin")
                    }
                    className="toggle toggle-secondary"
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          {currentItems.length === itemsPerPage && (
            <tfoot>
              <tr>
                <th>เลขที่ประจำตัว</th>
                <th>คำนำหน้า</th>
                <th>ชื่อ</th>
                <th>นามสกุล</th>
                <th>ตำแหน่ง</th>
                <th>บทบาทผู้ดูแล</th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      {/* Pagination */}
      <Pagination
        totalItems={filteredPersonnel.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ManageAdminRoles;