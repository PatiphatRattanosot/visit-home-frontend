import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import ModalAddYear from "../../components/modals/AddYear";
import ModalEditYear from "../../components/modals/EditYear";
import { useNavigate } from "react-router";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Breadcrumbs from "../../components/Breadcrumbs";

import { useClassroomStore } from "../../stores/classroom.store";
import useYearSelectStore from "../../stores/year_select.store";
const YearManagement = () => {
  // ใช้ Zustand store เพื่อจัดการข้อมูลปีการศึกษา
  const { years, fetchYears, deleteYear } = useYearSelectStore();
  const { setClassrooms } = useClassroomStore();
  const navigate = useNavigate();

  // เรียกข้อมูลปีการศึกษา
  useEffect(() => {
    fetchYears();
    setClassrooms([]); // เคลียร์ข้อมูลชั้นเรียนเมื่อเปลี่ยนปีการศึกษา
  }, [years, fetchYears, setClassrooms]);

  // เลือกปีแล้วมันจะเกิดแอ็คชั่น
  const handleSelectYear = async (year) => {
    toast.success(`คุณเลือกปีการศึกษา ${year.year} แล้ว`);
    // setYear(year) แล้ว redirect ไปหน้าอื่น
    navigate(`/admin/year/classroom/${year._id}/${year.year}`);
  };

  // ฟังก์ชันสำหรับลบปีการศึกษา
  const handleDeleteYear = async (_id) => {
    deleteYear(_id);
  };

  return (
    <>
      <div className="section-container">
        <div className="flex flex-row space-x-4">
          <Breadcrumbs />
        </div>
        <h1 className="text-center text-2xl font-bold mt-4 mb-6">
          จัดการปีการศึกษา
        </h1>

        <div className="flex flex-col items-center gap-6">
          {years.length === 0 ? (
            <div className="text-center">
              <h3 className="text-lg mb-4">ยังไม่มีการเพิ่มปีการศึกษา</h3>
              <button
                className="btn btn-outline size-40 rounded-xl"
                onClick={() => document.getElementById("add_year").showModal()}
              >
                <FaPlus className="size-28 text-gray-800" />
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {years.map((year, index) => (
                <div key={index} className="relative">
                  <button
                    className="btn btn-outline w-40 h-40 rounded-xl text-4xl text-gray-800"
                    onClick={() => handleSelectYear(year)}
                  >
                    {year.year}
                  </button>

                  {/* จุดสามจุดที่มุมขวาบน */}
                  <div className="absolute top-2 right-2">
                    <div className="dropdown dropdown-end">
                      <label tabIndex={0} className="btn btn-sm  z-10">
                        <p className="text-lg">⋯</p>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-2 z-[2] p-2 shadow bg-base-100 rounded-box w-36"
                      >
                        <li>
                          <button
                            onClick={() =>
                              document
                                .getElementById(`Edit_year_${year._id}`)
                                .showModal()
                            }
                          >
                            <FaPencilAlt className="text-yellow" /> แก้ไข
                          </button>
                        </li>

                        <li>
                          <button onClick={() => handleDeleteYear(year._id)}>
                            <MdDeleteForever className="text-red" />
                            ลบ
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Modal แก้ไขปีการศึกษา ย้ายออกมาอยู่ส่วนของ div ที่มี key*/}
                  <ModalEditYear onUpdateSuccess={fetchYears} year={year} />
                </div>
              ))}

              <button
                onClick={() => document.getElementById("add_year").showModal()}
                className="btn btn-outline w-40 h-40 rounded-xl text-4xl text-gray-800"
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>

      <ModalAddYear addDataSuccess={fetchYears} />
    </>
  );
};

export default YearManagement;
