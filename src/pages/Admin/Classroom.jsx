import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import DateInput from "../../components/DateInput";
import FilterDropdown from "../../components/FilterDropdown";
import SearchClass from "../../components/SearchClassroom";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagiantion from "../../components/Pagination";
import ModalAddClassroom from "../../components/modals/AddClassroom";
import ModalEditClassroom from "../../components/modals/EditClassroom";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import { useClassroomStore } from "../../stores/classroom.store";
import useYearSelectStore from "../../stores/year_select.store";
import YearSelector from "../../components/YearSelector";

const Classroom = () => {
  const { yearId } = useParams();
  const { classrooms, fetchClassrooms, deleteClassroom } = useClassroomStore();
  const { years, selectedYear, setSelectedYear } = useYearSelectStore();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("SortToMost");
  // สร้าง state สำหรับเก็บข้อมูลชั้นเรียนที่กรองแล้ว
  // เพื่อใช้ในการแสดงผลในตาราง
  const optionsForClassroom = [
    { value: "SortToMost", label: "เรียงจากน้อยไปมาก" },
    { value: "MostToSort", label: "เรียงจากมากไปน้อย" },
  ];

  const [filteredClassroom, setFilteredClassroom] = useState([]);
  // สร้าง satate สำหรับ Paginations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(filteredClassroom)
    ? filteredClassroom.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  useEffect(() => {
    setFilteredClassroom(Array.isArray(classrooms) ? classrooms : []);
  }, [classrooms]);

  // หากมี yearId ใน URL ให้ตั้งค่าเป็นปีที่ถูกเลือก
  useEffect(() => {
    if (yearId && selectedYear !== yearId) {
      setSelectedYear(String(yearId));
    }
  }, [yearId]);

  // ดึงชั้นเรียนเมื่อปีที่เลือกเปลี่ยนแปลง
  useEffect(() => {
    if (selectedYear) {
      fetchClassrooms(String(selectedYear));
    }
  }, [selectedYear]);

  useEffect(() => {
    // กรองข้อมูลชั้นเรียนตามตัวเลือกที่เลือก
    //ตรวจสอบว่า classrooms เป็น อาร์เรย์ (Array) หรือไม่
    let sorted = Array.isArray(classrooms) ? [...classrooms] : [];

    if (selectedOption === "SortToMost") {
      sorted.sort((a, b) => a.room - b.room || a.number - b.number);
    } else if (selectedOption === "MostToSort") {
      sorted.sort((a, b) => b.room - a.room || b.number - a.number);
    }
    setFilteredClassroom(sorted);
    setCurrentPage(1); // reset ไปหน้าแรกทุกครั้งที่เรียงใหม่
  }, [selectedOption, classrooms]);

  const handleDeleteClassroom = async (id) => {
    deleteClassroom(id);
    setFilteredClassroom(classrooms);
  };

  return (
    <div className="section-container">
      <div className="flex items-center space-x-2">
        <BreadcrumbsLoop options={[{ label: "จัดการชั้นเรียน" }]} />
      </div>
      <div>
        <h1 className="text-lg md:text-xl text-center">
          เพิ่มชั้นเรียนของปีการศึกษา{" "}
          {years.find((y) => y._id === selectedYear)?.year ?? ""}
        </h1>
        <div className="flex flex-row justify-end items-center m-2">
          <YearSelector />
        </div>

        {/* กล่องสำหรับกำหนดช่วงเวลานัดเยี่ยมบ้าน */}
        <div className="flex justify-center items-center">
          <div className="card w-xl md:w-2xl p-4 shadow-sm flex flex-col items-center justify-center">
            <h2 className="text-lg">กำหนดช่วงเวลานัดเยี่ยมบ้าน</h2>
            <div className="flex gap-2">
              <DateInput
                yearNumber={
                  years.find((y) => y._id === selectedYear)?.year ?? ""
                }
              />
            </div>
          </div>
        </div>

        {/* ฟีเจอร์เสริม */}
        <div className="flex flex-col md:flex-row items-center justify-between m-2 mt-4 mb-4 gap-4">
          <FilterDropdown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            options={optionsForClassroom}
          />
          <div className="flex items-center gap-4">
            <SearchClass
              classroom={classrooms}
              setFilteredClassroom={setFilteredClassroom}
              setCurrentPage={setCurrentPage}
            />
          </div>
          {/* ปุ่มเพิ่มบุคลากร */}
          <div className="flex justify-center w-full md:w-auto">
            <button
              onClick={() =>
                document.getElementById("add_classroom").showModal()
              }
              className="btn-green"
            >
              เพิ่มชั้นเรียน
            </button>
            <ModalAddClassroom
              yearId={selectedYear ?? ""}
              addClassroomSuccess={() => {
                if (selectedYear) fetchClassrooms(selectedYear);
              }}
            />
          </div>
        </div>

        {/* ข้อมูลชั้นเรียนรูปแบบตาราง */}

        <table className="table text-center">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>ชั้นเรียน</th>
              <th>จำนวนสมาชิก</th>
              <th>แก้ไข/ลบ</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {currentItems.map((classroom, index) => (
              <tr key={classroom._id || index} className="hover:bg-gray-100">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>

                <td
                  onClick={() =>
                    navigate(`/admin/year/classroom/${classroom._id}`)
                  }
                  className="cursor-pointer hover:underline"
                >
                  ม.{classroom.room}/{classroom.number}
                </td>
                <td>{classroom.students?.length}</td>

                <td className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() =>
                      document
                        .getElementById(`edit_classroom_${classroom._id}`)
                        .showModal()
                    }
                    className="btn btn-warning"
                  >
                    <BiSolidEdit size={20} />
                  </button>

                  <button
                    onClick={() => handleDeleteClassroom(classroom._id)}
                    className="btn btn-error"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                  <ModalEditClassroom
                    id={classroom._id}
                    onUpdateSuccess={() => {
                      if (selectedYear) fetchClassrooms(selectedYear);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>ชั้นเรียน</th>
              <th>จำนวนสมาชิก</th>
              <th>แก้ไข/ลบ</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* Pagination */}
      <Pagiantion
        totalItems={
          Array.isArray(filteredClassroom) ? filteredClassroom.length : 0
        }
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Classroom;
