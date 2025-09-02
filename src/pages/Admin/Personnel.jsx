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

const Personnel = () => {
  // ใช้ Zustand store เพื่อจัดการข้อมูลบุคลากร
  const { data: personnel, fetchData, deletePersonnel } = usePersonnelStore();
  const [selectedOption, setSelectedOption] = useState("SortToMost");

  // สร้าง state สำหรับเก็บข้อมูลบุคลากรที่กรองแล้ว
  // เพื่อใช้ในการแสดงผลในตาราง
  const optionsForPersonnel = [
    { value: "SortToMost", label: "เรียงจากน้อยไปมาก" },
    { value: "MostToSort", label: "เรียงจากมากไปน้อย" },
    { value: "AlphaSortToMost", label: "เรียงตามลำดับตัวอักษร ก-ฮ" },
    { value: "AlphaMostToSort", label: "เรียงตามลำดับตัวอักษร ฮ-ก" },
  ];
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
    // fetchPersonnel(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลบุคลากร
    fetchData(); // เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลบุคลากร
    setFilteredPersonnel(personnel); // ตั้งค่าเริ่มต้นให้ personnel ทั้งหมด
  }, []);

  useEffect(() => {
    let filtered = personnel;

    if (searchKeyword) {
      // toLoqwer() ใช้เพื่อเปลี่ยนตัวอักษรเป็นตัวพิมพ์เล็ก
      // trim() ใช้เพื่อลบช่องว่างที่ไม่จำเป็น และ toLowerCase() เพื่อเปรียบเทียบแบบไม่สนใจตัวพิมพ์ใหญ่-เล็ก
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

    setFilteredPersonnel(sorted);
    setCurrentPage(1);
  }, [searchKeyword, selectedOption, personnel]);

  const showStatus = (status) => {
    switch (status) {
      case "ทำงาน":
        return (
          <div className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
            ทำงาน
          </div>
        );
      case "เกษียณ":
        return (
          <div className="inline-block px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
            เกษียณ
          </div>
        );
      default:
        return (
          <div className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
            ลาออก
          </div>
        );
    }
  };
  const getRoleDisplay = (role) => {
    const roles = Array.isArray(role) ? role : [role]; // แปลงให้เป็น array เสมอ
    //ใช้ includes() เรียงลำดับความสำคัญของบทบาท และ คืนค่าชื่อบทบาทที่เหมาะสม
    if (roles.includes("Admin")) return "เจ้าหน้าที่ฝ่ายทะเบียน";
    if (roles.includes("Teacher")) return "คุณครู";
    if (roles.includes("Student")) return "นักเรียน";

    return "ไม่ทราบบทบาท";
  };

  return (
    <div className="section-container w-full">
      <div className="flex flex-row space-x-4">
        <Breadcrumbs options={[{ label: "หน้าหลัก", link: "/admin" }]} />
      </div>

      <h1 className="text-center">รายชื่อบุคลากร</h1>

      {/* Toolbar centered */}
      <div className="w-full flex justify-center mt-4 mb-4">
        <div className="w-full max-w-8xl grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-3 px-2">
          {/* ซ้าย: Dropdown */}
          <div>
            <FilterDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={optionsForPersonnel}
            />
          </div>

          {/* กลาง: Search ขยายกินที่ */}
          <div className="md:justify-self-center">
            <SearchPersonnel
              setSearchKeyword={setSearchKeyword}
              setCurrentPage={setCurrentPage}
              placeholder="ค้นหาบุคลากร..."
              className="w-72 md:w-[28rem]" // ปรับความกว้างที่นี่
            />
          </div>

          {/* ขวา: ปุ่มเพิ่ม */}
          <div className="md:justify-self-end">
            <button
              onClick={() =>
                document.getElementById("add_personnel").showModal()
              }
              className="btn-green"
            >
              เพิ่มบุคลากร
            </button>
          </div>

          {/* Modal */}
          <ModalAddPersonnel />
        </div>
      </div>

      {/* ตารางแสดงข้อมูลบุคลากร */}
      <div className="overflow-x-auto flex justify-center">
        <table className="table table-zebra w-full max-w-7xl">
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
                    onClick={() =>
                      document
                        .getElementById(`edit_personnel_${person._id}`)
                        .showModal()
                    }
                    className="btn btn-warning"
                  >
                    <BiSolidEdit size={20} />
                  </button>

                  <ModalEditPersonnel
                    id={person._id}
                    onSuccesUpdatePerson={fetchData}
                  />

                  <button
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
