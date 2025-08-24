import { useState, useEffect } from "react";
import Stepper from "../../../components/Stepper";
import { useStudentStore } from "../../../stores/student.store";
import useYearSelectStore from "../../../stores/year_select.store";
import { useAuthStore } from "../../../stores/auth.store";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";

const FamilyStatus = () => {
  const { userInfo } = useAuthStore();
  const { getYearlyData } = useStudentStore();
  const { selectedYear } = useYearSelectStore();

  const [familyStatusInfo, setFamilyStatusInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFamilyStatusInfo = async () => {
      setLoading(true);
      try {
        const data = await getYearlyData(selectedYear);
        const student = data?.students?.[0];
        const yearlyData = student?.yearly_data?.[0];
        setFamilyStatusInfo(yearlyData?.family_status_info || null);
      } catch (error) {
        console.error("Failed to fetch family status info:", error);
        setFamilyStatusInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyStatusInfo();
  }, [selectedYear]);

  const stepperPath = {
    stepOne: `/student/personal-info`,
    stepTwo: `/student/relation`,
    stepThree: `/student/family-status`,
    stepFour: `/student/behavior`,
  };

  const householdBurdensLabels = {
    0: "มีคนพิการ",
    1: "มีผู้สูงอายุเกิน 60 ปี",
    2: "เป็นพ่อ/แม่เลี้ยงเดี่ยว",
    3: "มีคนอายุ 15-65 ปี ว่างงาน (ที่ไม่ใช่นักเรียน/นักศึกษา)",
  };

  const housingTypeLabels = {
    0: "บ้านของตนเอง",
    1: "บ้านเช่า",
    2: "อาศัยอยู่กับผู้อื่น",
  };

  const vehicleLabels = {
    0: "รถมอเตอร์ไซค์",
    1: "รถยนต์ส่วนบุคคล",
    2: "รถบรรทุกเล็ก/รถตู้",
    3: "รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆ ประเภทเดียวกัน",
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100 flex justify-center">
      <div className="bg-white px-6 py-8 w-full max-w-screen-lg rounded-lg shadow-sm">
        <BreadcrumbsLoop options={[{ label: "สถานะครัวเรือน" }]} />

        {/* Year Selector */}
        <div className="flex justify-center md:justify-end items-center mb-6">
          <YearSelector />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-center w-full">
          ข้อมูลการเยี่ยมบ้าน{" "}
          <span className="text-gray-600 hidden md:block">
            {userInfo?.prefix} {userInfo?.first_name} {userInfo?.last_name}
          </span>
        </h3>

        {/* Manage Info Button */}
        <div className="flex justify-end mt-2">
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

        {/* Stepper */}
        <div className="my-4 flex justify-center">
          <Stepper step={3} path={stepperPath} />
        </div>

        {/* Content */}
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-lg font-bold text-gray-600 text-center mb-6">
                สถานะของครัวเรือน
              </h3>

              {loading ? (
                <div className="text-center text-gray-500">
                  กำลังโหลดข้อมูล...
                </div>
              ) : familyStatusInfo !== null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-gray-600 text-left">
                  <div>
                    ภาระพึ่งพิงของครัวเรือน:
                    <ul className="list-disc list-inside text-black mt-1">
                      {familyStatusInfo?.household_burdens?.length > 0 ? (
                        familyStatusInfo.household_burdens.map(
                          (burden, index) => (
                            <li key={index}>
                              {householdBurdensLabels[burden] || "ไม่ทราบ"}
                            </li>
                          )
                        )
                      ) : (
                        <li>ไม่มี</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    ประเภทที่อยู่อาศัย:{" "}
                    <span className="text-black">
                      {housingTypeLabels[familyStatusInfo?.housing_type] ||
                        "ไม่ทราบ"}
                    </span>
                  </div>

                  <div>
                    สภาพที่อยู่อาศัย:{" "}
                    <span className="text-black">
                      {familyStatusInfo?.housing_condition || "ไม่ระบุ"}
                    </span>
                  </div>

                  <div>
                    ยานพาหนะของครอบครัว:
                    <ul className="list-disc list-inside text-black mt-1">
                      {familyStatusInfo?.family_vehicles?.length > 0 ? (
                        familyStatusInfo.family_vehicles.map(
                          (vehicle, index) => (
                            <li key={index}>
                              {vehicleLabels[vehicle] || "อื่น ๆ"}
                            </li>
                          )
                        )
                      ) : (
                        <li>ไม่มี</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    จำนวนที่ดินที่มี:{" "}
                    <span className="text-black">
                      {familyStatusInfo?.less_than_one === 0
                        ? `${familyStatusInfo?.owned_land || 0} ไร่`
                        : "น้อยกว่า 1 ไร่"}
                    </span>
                  </div>

                  <div>
                    เช่าที่ดินจำนวน:{" "}
                    <span className="text-black">
                      {familyStatusInfo?.rented_land > 0
                        ? `${familyStatusInfo?.rented_land} ไร่`
                        : "ไม่มี"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-red-500 mt-8">
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
