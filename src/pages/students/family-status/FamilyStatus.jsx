import { useState, useEffect } from "react";
import Stepper from "../../../components/Stepper";
import { useStudentStore } from "../../../stores/student.store";
import useYearSelectStore from "../../../stores/year_select.store";
import { useAuthStore } from "../../../stores/auth.store";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";

const FamilyStatus = () => {
  const { userInfo } = useAuthStore();

  const [familyStatusInfo, setFamilyStatusInfo] = useState(null);

  const { getYearlyData } = useStudentStore();
  const { selectedYear } = useYearSelectStore();

  // ดึงข้อมูล
  useEffect(() => {
    const fetchFamilyStatusInfo = async () => {
      const data = await getYearlyData(selectedYear);
      setFamilyStatusInfo(data?.students[0].yearly_data[0]?.family_status_info);
    };
    fetchFamilyStatusInfo();
  }, [selectedYear]);

  // stepper path
  const stepperPath = {
    stepOne: `/student/personal-info`,
    stepTwo: `/student/relation`,
    stepThree: `/student/family-status`,
    stepFour: `/student/behavior`,
  };

  return (
    <div className="min-h-screen py-9 bg-gray-100 flex justify-center">
      <div className="bg-white px-4 py-6 w-9/12 rounded-lg">
        <BreadcrumbsLoop options={[{ label: "สถานะครัวเรือน" }]} />
        <div className="flex justify-center md:justify-end items-center mb-6">
          <YearSelector />
        </div>
        {/* หัวข้อ */}
        <h3 className="text-center text-xl font-bold">
          ข้อมูลการเยี่ยมบ้านของ{" "}
          <span className="text-gray-600">
            {userInfo?.prefix +
              " " +
              userInfo?.first_name +
              " " +
              userInfo?.last_name}
          </span>
        </h3>
        {/* Stepper */}
        <div className="my-3 flex justify-center">
          <Stepper step={3} path={stepperPath} />
        </div>
        {/* Manage info btn */}
        <div className="flex justify-end my-6">
          <a
            className={familyStatusInfo === null ? "btn-green" : "btn-yellow"}
            href={
              familyStatusInfo === null
                ? `/student/personal-status/${selectedYear}/add`
                : `/student/family-status/${selectedYear}/update`
            }
          >
            {familyStatusInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>

        {/* ข้อมูลนักเรียน */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-xl font-bold text-gray-600 text-center mb-3">
                สถานะของครัวเรือน
              </h3>
              {familyStatusInfo !== null ? (
                <div className="text-left flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-4 text-gray-600">
                    <div>
                      ภาระพึ่งพิงของครัวเรือน:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.household_burdens.map(
                          (burden, index) => (
                            <div key={index}>
                              {burden == "0"
                                ? "มีคนพิการ"
                                : burden == "1"
                                ? "มีผู้สูงอายุเกิน 60 ปี"
                                : burden == "2"
                                ? "เป็นพ่อ/แม่เลี้ยงเดี่ยว"
                                : "มีคนอายุ 15-65 ปี ว่างงาน (ที่ไม่ใช่นักเรียน/นักศึกษา)"}
                            </div>
                          )
                        )}
                      </span>
                    </div>
                    <div>
                      ประเภทที่อยู่อาศัย:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.housing_type == "0"
                          ? "บ้านของตนเอง"
                          : familyStatusInfo?.housing_type == "1"
                          ? "บ้านเช่า"
                          : "อาศัยอยู่กับผู้อื่น"}
                      </span>
                    </div>
                    <div>
                      สภาพที่อยู่อาศัย:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.housing_condition}
                      </span>
                    </div>
                    <div>
                      ยานพาหนะของครอบครัว:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.family_vehicles.map(
                          (vehicle, index) => (
                            <div key={index}>
                              {vehicle == "0"
                                ? "รถมอเตอร์ไซค์"
                                : vehicle == "1"
                                ? "รถยนต์ส่วนบุคคล"
                                : vehicle == "2"
                                ? "รถบรรทุกเล็ก/รถตู้"
                                : "รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆ ประเภทเดียวกัน"}
                            </div>
                          )
                        )}
                      </span>
                    </div>
                    <div>
                      จำนวนที่ดินที่มี:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.less_than_one == 0 ? (
                          <>
                            {familyStatusInfo?.owned_land}
                            {" ไร่"}
                          </>
                        ) : (
                          "น้อยกว่า 1 ไร่"
                        )}
                      </span>
                    </div>
                    <div>
                      เช่าที่ดินจำนวน:{" "}
                      <span className="text-black">
                        {familyStatusInfo?.rented_land !== 0 ? (
                          <>
                            {familyStatusInfo?.rented_land}
                            {" ไร่"}
                          </>
                        ) : (
                          " ไม่มี"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center my-16 text-gray-500">
                  ยังไม่มีข้อมูล
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyStatus;
