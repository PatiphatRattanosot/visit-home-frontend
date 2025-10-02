import { useEffect, useMemo, useState } from "react";
import FilterDropdown from "../../components/FilterDropdown";
import SearchPersonnel from "../../components/SearchPersonnel";
import Pagination from "../../components/Pagination";
import Breadcrumbs from "../../components/Breadcrumbs";
import { usePersonnelStore } from "../../stores/admin.store"; // ใช้ store ที่สร้างขึ้นมา
import { useAuthStore } from "../../stores/auth.store";

const ManageAdminRoles = () => {
  // ใช้ Zustand store เพื่อจัดการข้อมูลบุคลากร
  const { userInfo } = useAuthStore();
  const {
    data: personnel,
    fetchData,
    removeAdminRole,
    addAdminRole,
  } = usePersonnelStore();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedOption, setSelectedOption] = useState("SortToMost");
  const optionsForPersonnel = [
    { value: "SortToMost", label: "เรียงจากน้อยไปมาก" },
    { value: "SortToLess", label: "เรียงจากมากไปน้อย" },
    { value: "AlphaSortToMost", label: "เรียงตามลำดับตัวอักษร ก-ฮ" },
    { value: "AlphaSortToLess", label: "เรียงตามลำดับตัวอักษร ฮ-ก" },
    { value: "PrefixMr", label: "คำนำหน้า นาย-นาง" },
    { value: "PrefixMrs", label: "คำนำหน้า นาง-นาย" },
  ];
  // สร้าง satate สำหรับ Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  useEffect(() => {
    // โหลดข้อมูลบุคลากรครั้งแรก
    fetchData();
  }, [fetchData]);

  const getRoleDisplay = (role) => {
    const roles = Array.isArray(role) ? role : [role]; // แปลงให้เป็น array เสมอ
    //ใช้ includes() เรียงลำดับความสำคัญของบทบาท และ คืนค่าชื่อบทบาทที่เหมาะสม
    if (roles.includes("Admin")) return "เจ้าหน้าที่ฝ่ายทะเบียน";
    if (roles.includes("Teacher")) return "คุณครู";
    if (roles.includes("Student")) return "นักเรียน";

    return "ไม่ทราบบทบาท";
  };

  const handleAddRole = async (email, roleToAdd) => {
    await addAdminRole(email, roleToAdd);
  };

  const handleRemoveRole = async (email, roleToRemove) => {
    await removeAdminRole(email, roleToRemove);
  };

  // คำนวณรายการหลังกรอง/เรียงลำดับ
  const filteredPersonnel = useMemo(() => {
    const safeArray = Array.isArray(personnel) ? personnel : [];

    // สถานะทำงานเท่านั้น
    const active = safeArray.filter(
      (p) => (p?.status || "") === "ใช้งานอยู่" && p.email !== userInfo?.email
    );

    // ค้นหา
    const keyword = searchKeyword.trim().toLowerCase();
    const searched = keyword
      ? active.filter((p) => {
          const firstName = (p?.first_name || "").toLowerCase();
          const lastName = (p?.last_name || "").toLowerCase();
          const fullName = `${p?.first_name || ""} ${
            p?.last_name || ""
          }`.toLowerCase();
          const userId = (p?.user_id ?? "").toString();
          return (
            firstName.includes(keyword) ||
            lastName.includes(keyword) ||
            fullName.includes(keyword) ||
            userId.includes(keyword)
          );
        })
      : active;

    // เรียงลำดับ
    const sorted = [...searched];
    switch (selectedOption) {
      case "SortToMost":
        sorted.sort((a, b) => a.user_id - b.user_id);
        break;
      case "SortToLess":
        sorted.sort((a, b) => b.user_id - a.user_id);
        break;
      case "AlphaSortToMost":
        sorted.sort((a, b) => {
          const nameA = `${a.first_name}${a.last_name}`;
          const nameB = `${b.first_name}${b.last_name}`;
          return nameA.localeCompare(nameB, "th", { sensitivity: "base" });
        });
        break;
      case "AlphaSortToLess":
        sorted.sort((a, b) => {
          const nameA = `${a.first_name}${a.last_name}`;
          const nameB = `${b.first_name}${b.last_name}`;
          // { sensitivity: "base" } คือการเปรียบเทียบแบบไม่สนใจตัวพิมพ์ใหญ่-เล็ก
          // localeCompare() ใช้สำหรับเปรียบเทียบสตริงตามภาษาที่กำหนด
          return nameB.localeCompare(nameA, "th", { sensitivity: "base" });
        });
        break;
      case "PrefixMr":
        sorted.sort((a, b) => {
          const prefixOrder = { นาย: 1, นางสาว: 2, นาง: 3 };
          return (prefixOrder[a.prefix] || 99) - (prefixOrder[b.prefix] || 99);
        });
        break;
      case "PrefixMrs":
        sorted.sort((a, b) => {
          const prefixOrder = { นาย: 1, นางสาว: 2, นาง: 3 };
          return (prefixOrder[b.prefix] || 99) - (prefixOrder[a.prefix] || 99);
        });

        break;
      default:
        break;
    }

    return sorted;
  }, [personnel, searchKeyword, selectedOption]);

  // รีเซ็ตหน้าปัจจุบันเมื่อค้นหาหรือเปลี่ยนตัวเลือกเรียง
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, selectedOption]);

  const currentItems = useMemo(() => {
    return filteredPersonnel.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredPersonnel, indexOfFirstItem, indexOfLastItem]);

  const hasAdminRole = (role) => {
    if (Array.isArray(role)) return role.includes("Admin");
    if (typeof role === "string") return role.includes("Admin");
    return false;
  };
  return (
    <div className="section-container w-full">
      <div className="flex flex-row space-x-4">
        <Breadcrumbs
          options={[
            { label: "หน้าหลัก", link: "/admin" },
            { label: "จัดการบทบาทผู้ดูแล" },
          ]}
        />
      </div>

      <h1 className="text-center">จัดการบทบาทผู้ดูแล</h1>

      {/* Toolbar centered */}
      {/* Toolbar */}
      <div className="w-full flex justify-center mt-4 mb-4">
        <div className="w-full max-w-7xl flex justify-between flex-col md:flex-row items-center gap-3 px-2">
          {/* ซ้าย: Dropdown */}
          <div className="order-1 md:order-none">
            <FilterDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={optionsForPersonnel}
              className="select"
            />
          </div>

          {/* ขวา: Search */}
          <div className="flex justify-end">
            <SearchPersonnel
              placeholder="ค้นหาผู้ดูแล..."
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              className="w-72 md:w-[16rem]"
            />
          </div>
        </div>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="overflow-x-auto flex justify-center">
        <table className="table table-zebra w-full max-w-7xl">
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
            {currentItems.map((person, index) => (
              <tr key={index}>
                <td>{person.user_id}</td>
                <td>{person.prefix}</td>
                <td>{person.first_name}</td>
                <td>{person.last_name}</td>
                <td>{getRoleDisplay(person.role)}</td>
                <td>
                  <input
                    id={`admin-role-toggle_${index}`}
                    data-testid={`admin-role-toggle_${index}`}
                    type="checkbox"
                    checked={hasAdminRole(person.role)}
                    onChange={(e) =>
                      e.target.checked
                        ? handleAddRole(person.email, "Admin")
                        : handleRemoveRole(person.email, "Admin")
                    }
                    // ถ้ามีบทบาท Admin ให้แสดง toggle เป็นสีเขียว ถ้าไม่มีเป็นสีแดง
                    //ถ้ามีบทบาท Admin ให้แสดง toggle เป็นสีเขียว ถ้าไม่มีเป็นสีแดง เปลี่ยนไปตามคลาสของ DaisyUI
                    className={`toggle ${
                      hasAdminRole(person.role)
                        ? "toggle-success"
                        : "toggle-error"
                    }`}
                  />
                  <span
                    className={`text-sm font-semibold ${
                      hasAdminRole(person.role)
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {hasAdminRole(person.role) ? "เจ้าหน้าที่" : "คุณครู"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          {currentItems.length === 0 && (
            <tfoot>
              <tr>
                <td colSpan={6} className="text-center py-4">
                  ไม่พบข้อมูล
                </td>
              </tr>
            </tfoot>
          )}
          {currentItems.length == 10 && (
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
