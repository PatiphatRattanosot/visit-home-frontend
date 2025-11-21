import { useEffect, useMemo, useState } from "react";
import FilterDropdown from "../../components/FilterDropdown";
import SearchPersonnel from "../../components/SearchPersonnel";
import Pagination from "../../components/Pagination";
import Breadcrumbs from "../../components/Breadcrumbs";
import { usePersonnelStore } from "../../stores/admin.store"; // ใช้ store ที่สร้างขึ้นมา
import { useAuthStore } from "../../stores/auth.store";
import {sortPersonnelOptions, switchSortPersonnel} from "../../utils/sortDataTable"

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
    switchSortPersonnel(selectedOption, sorted);

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
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-stretch md:items-center gap-3 px-2">
          {/* ซ้าย: Dropdown */}
          <div className="w-full md:w-56 order-1 md:order-none">
            <FilterDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={sortPersonnelOptions}
              className="select select-bordered w-full"
            />
          </div>

          {/* ขวา: Search */}
          <div className="w-full md:flex-1 flex justify-end">
            <SearchPersonnel
              placeholder="ค้นหาผู้ดูแล..."
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              className="w-full md:w-80"
            />
          </div>
        </div>
      </div>

      {/* ตารางแสดงข้อมูล */}
      <div className="hidden md:flex overflow-x-auto justify-center">
        <table className="table table-zebra w-full max-w-7xl rounded-lg">
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
                  <div className="flex items-center gap-2">
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
                  </div>
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

      <div className="grid grid-cols-1 gap-3 md:hidden">
        {currentItems.map((person, index) => (
          <div
            key={person?.email ?? index}
            className="rounded-xl border border-base-300 bg-white shadow-sm p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase text-gray-500">เลขที่ประจำตัว</p>
                <p className="text-lg font-semibold text-gray-900">
                  {person.user_id}
                </p>
                <p className="text-sm text-gray-700">
                  {person.prefix} {person.first_name} {person.last_name}
                </p>
                <p className="text-sm text-gray-600">
                  {getRoleDisplay(person.role)}
                </p>
              </div>
              <span className="badge badge-outline text-xs">
                {person.prefix || "-"}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <input
                id={`admin-role-toggle-mobile_${index}`}
                type="checkbox"
                checked={hasAdminRole(person.role)}
                onChange={(e) =>
                  e.target.checked
                    ? handleAddRole(person.email, "Admin")
                    : handleRemoveRole(person.email, "Admin")
                }
                className={`toggle ${
                  hasAdminRole(person.role) ? "toggle-success" : "toggle-error"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  hasAdminRole(person.role) ? "text-green-600" : "text-red-600"
                }`}
              >
                {hasAdminRole(person.role) ? "เจ้าหน้าที่" : "คุณครู"}
              </span>
            </div>
          </div>
        ))}
        {currentItems.length === 0 && (
          <div className="text-center text-sm text-gray-600 py-6 border border-base-300 rounded-xl">
            ไม่พบข้อมูล
          </div>
        )}
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
