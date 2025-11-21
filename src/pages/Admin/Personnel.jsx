import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import SearchPersonnel from "../../components/SearchPersonnel";
import FilterDropdown from "../../components/FilterDropdown";
import Pagination from "../../components/Pagination";
import ModalAddPersonnel from "../../components/modals/AddPersonnel";
import ModalEditPersonnel from "../../components/modals/EditPersonnel";
import Breadcrumbs from "../../components/Breadcrumbs";
import { usePersonnelStore } from "../../stores/admin.store"; // ใช้ store ที่สร้างขึ้นมา
import { useAuthStore } from "../../stores/auth.store";
import {
  sortPersonnelOptions,
  switchSortPersonnel,
} from "../../utils/sortDataTable";
import { getRoleDisplay, showStatus } from "../../utils/userTable";

const Personnel = () => {
  // ใช้ Zustand store เพื่อจัดการข้อมูลบุคลากร
  const { data: personnel, fetchData, deletePersonnel } = usePersonnelStore();
  const [selectedOption, setSelectedOption] = useState("SortToMost");
  const { userInfo } = useAuthStore();

  // สร้าง state สำหรับเก็บข้อมูลบุคลากรที่กรองแล้ว
  // เพื่อใช้ในการแสดงผลในตาราง

  const [searchKeyword, setSearchKeyword] = useState("");
  // สร้าง state สำหรับเก็บข้อมูลบุคลากรที่กรองแล้ว
  const [filteredPersonnel, setFilteredPersonnel] = useState([]);
  // สร้าง satate สำหรับ Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredPersonnel)
    ? filteredPersonnel.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // ฟังก์ชันสำหรับลบข้อมูลบุคลากร

  const handleDeleteUser = async (email) => {
    deletePersonnel(email);
    setFilteredPersonnel(personnel);
  };

  // //สาเหตุที่แยก useefect ออกมาเพราะ อยากให้ fetchPersonnel ใส่เข้าไปใน prop ได้
  useEffect(() => {
    fetchData();
    setFilteredPersonnel(
      personnel?.filter((p) => p?.email !== userInfo?.email)
    );
  }, []);

  useEffect(() => {
    // กรองบุคลากรที่ไม่ใช่ userInfo.email ก่อนเสมอ
    let filtered = personnel.filter((p) => p?.email !== userInfo?.email);

    if (searchKeyword) {
      const keyword = searchKeyword.trim().toLowerCase();
      filtered = filtered.filter((person) => {
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

    let sorted = [...filtered];
    switchSortPersonnel(selectedOption, sorted);

    setFilteredPersonnel(sorted);
    setCurrentPage(1);
  }, [searchKeyword, selectedOption, personnel, userInfo?.email]);

  return (
    <div className="section-container w-full">
      <div className="flex flex-row space-x-4">
        <Breadcrumbs options={[{ label: "หน้าหลัก", link: "/admin" }]} />
      </div>

      <h1 className="text-center">รายชื่อบุคลากร</h1>

      {/* Toolbar centered */}
      <div className="w-full flex justify-center mt-4 mb-4">
        <div className="w-full max-w-8xl flex flex-col md:flex-row items-stretch md:items-center gap-3 px-2">
          {/* ซ้าย: Dropdown */}
          <div className="w-full md:w-56">
            <FilterDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={sortPersonnelOptions}
              className="select select-bordered w-full"
            />
          </div>

          {/* กลาง: Search ขยายกินที่ */}
          <div className="w-full md:flex-1 md:justify-self-center">
            <SearchPersonnel
              setSearchKeyword={setSearchKeyword}
              setCurrentPage={setCurrentPage}
              placeholder="ค้นหาบุคลากร..."
              className="w-full md:w-[20rem]" // ปรับความกว้างที่นี่
            />
          </div>

          {/* ขวา: ปุ่มเพิ่ม */}
          <div className="w-full md:w-auto md:justify-self-end">
            <button
              onClick={() =>
                document.getElementById("add_personnel").showModal()
              }
              className="btn-green w-full md:w-auto"
            >
              เพิ่มบุคลากร
            </button>
          </div>

          {/* Modal */}
          <ModalAddPersonnel
            id="add_personnel"
            onSuccessAddPerson={fetchData}
          />
        </div>
      </div>

      {/* ตารางแสดงข้อมูลบุคลากร */}
      <div className="hidden md:flex overflow-x-auto justify-center">
        <table className="table table-zebra w-full max-w-7xl rounded-lg">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="">เลขที่ประจำตัว</th>
              <th>ชื่อ - นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>เบอร์โทรศัพท์</th>
              <th>สถานะ</th>
              <th>แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((person, index) => (
              <tr key={index}>
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td className="">{person.user_id}</td>
                <td className="">
                  <span>{person.prefix}</span>
                  <span className="mr-2 ml-1">{person.first_name}</span>
                  <span>{person.last_name}</span>
                </td>

                <td className="">{getRoleDisplay(person.role)}</td>
                <td className="">{person.phone}</td>
                <td>{showStatus(person.status)}</td>
                <td className="flex gap-2">
                  <button
                    id={`edit-personnel-button_${person._id}`}
                    data-testid={`edit-personnel-button_${person._id}`}
                    onClick={() =>
                      document
                        .getElementById(`edit_personnel_${person._id}`)
                        .showModal()
                    }
                    className="btn btn-warning"
                  >
                    <BiSolidEdit size={20} />
                  </button>

                  <button
                    id={`delete-personnel-button_${index}`}
                    data-testid={`delete-personnel-button_${index}`}
                    onClick={() => handleDeleteUser(person.email)}
                    className="btn btn-error"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-3 md:hidden">
        {currentItems.map((person, index) => (
          <div
            key={person._id ?? index}
            className="rounded-xl border border-base-300 bg-white shadow-sm p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
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
                <p className="text-sm text-gray-600">
                  {person.phone || "-"}
                </p>
                <p className="text-sm">{showStatus(person.status)}</p>
              </div>
              <span className="badge badge-outline text-xs">
                {person.prefix || "-"}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() =>
                  document
                    .getElementById(`edit_personnel_${person._id}`)
                    ?.showModal()
                }
                className="btn btn-warning btn-sm flex-1 min-w-[140px]"
                id={`edit-personnel-mobile-button_${index}`}
              >
                <BiSolidEdit size={18} />
              </button>
              <button
                id={`delete-personnel-mobile-button_${index}`}
                onClick={() => handleDeleteUser(person.email)}
                className="btn btn-error btn-sm flex-1 min-w-[140px]"
              >
                <AiOutlineDelete size={18} />
              </button>
            </div>
          </div>
        ))}
        {currentItems.length === 0 && (
          <div className="text-center text-sm text-gray-600 py-6 border border-base-300 rounded-xl">
            ไม่พบข้อมูล
          </div>
        )}
      </div>

      {currentItems.map((person, index) => (
        <ModalEditPersonnel
          key={person._id ?? index}
          id={person._id}
          onSuccesUpdatePerson={fetchData}
          index={index}
        />
      ))}

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

export default Personnel;
