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
import { usePersonnelStore } from "../../stores/admin.store";

const Classroom = () => {
  const { yearId } = useParams();
  const { fetchData: fetchPersonnelData } = usePersonnelStore();

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
    await deleteClassroom(id).then(async () => {
      fetchClassrooms(selectedYear);
      await fetchPersonnelData();
    });
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
        <div className="flex flex-row justify-center md:justify-end items-center m-2">
          <YearSelector />
        </div>

        {/* กล่องสำหรับกำหนดช่วงเวลานัดเยี่ยมบ้าน */}
        <div className="flex justify-center items-center px-2">
          <div className="card w-full max-w-2xl p-4 shadow-sm flex flex-col items-center justify-center gap-3">
            <h2 className="text-lg">กำหนดช่วงเวลานัดเยี่ยมบ้าน</h2>
            <div className="w-full flex flex-col md:flex-row md:justify-center gap-2">
              <DateInput
                yearNumber={
                  years.find((y) => y._id === selectedYear)?.year ?? ""
                }
              />
            </div>
          </div>
        </div>

        {/* ฟีเจอร์เสริม */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between m-2 mt-4 mb-4 gap-3">
          <div className="w-full md:w-auto">
            <FilterDropdown
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              options={optionsForClassroom}
            />
          </div>
          <div className="w-full md:w-96 flex items-center gap-4">
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
              className="btn-green w-full md:w-auto"
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

        <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>ชั้นเรียน</th>
                <th>จำนวนสมาชิก</th>
                <th>แก้ไข/ลบ</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {currentItems.map((classroom, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td
                    id={`classroom-name-${index}`}
                    data-testid={`classroom-name-${index}`}
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
                      id={`edit-classroom-button_${index}`}
                      data-testid={`edit-classroom-button_${index}`}
                    >
                      <BiSolidEdit size={20} />
                    </button>

                    <button
                      onClick={() => handleDeleteClassroom(classroom._id)}
                      className="btn btn-error"
                      id={`delete-classroom-button_${index}`}
                      data-testid={`delete-classroom-button_${index}`}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>ชั้นเรียน</th>
                <th>จำนวนสมาชิก</th>
                <th>แก้ไข/ลบ</th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-3 md:hidden">
          {currentItems.map((classroom, index) => (
            <div
              key={classroom._id ?? index}
              className="rounded-xl border border-gray-200 bg-white shadow-sm p-4"
            >
              <button
                onClick={() =>
                  navigate(`/admin/year/classroom/${classroom._id}`)
                }
                className="text-left w-full"
              >
                <p className="text-xs uppercase text-gray-500">ชั้นเรียน</p>
                <p className="text-lg font-semibold text-gray-900">
                  ม.{classroom.room}/{classroom.number}
                </p>
                <p className="text-sm text-gray-600">
                  จำนวนนักเรียน: {classroom.students?.length ?? 0}
                </p>
              </button>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={() =>
                    document
                      .getElementById(`edit_classroom_${classroom._id}`)
                      ?.showModal()
                  }
                  className="btn btn-warning btn-sm flex-1 min-w-[140px]"
                  id={`edit-classroom-mobile-button_${index}`}
                >
                  <BiSolidEdit size={18} />
                </button>

                <button
                  onClick={() => handleDeleteClassroom(classroom._id)}
                  className="btn btn-error btn-sm flex-1 min-w-[140px]"
                  id={`delete-classroom-mobile-button_${index}`}
                >
                  <AiOutlineDelete size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {currentItems.map((classroom, index) => (
          <ModalEditClassroom
            key={classroom._id ?? index}
            id={classroom._id}
            index={index}
            onUpdateSuccess={() => {
              if (selectedYear) fetchClassrooms(selectedYear);
            }}
          />
        ))}
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
