import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/auth.store";
import Stepper from "../../../components/Stepper";
import { useStudentStore } from "../../../stores/student.store";
import useYearSelectStore from "../../../stores/year_select.store";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";

const Relation = () => {
  const { userInfo } = useAuthStore();
  const [relationInfo, setRelationInfo] = useState(null);

  const { getYearlyData } = useStudentStore();
  const { selectedYear } = useYearSelectStore();

  // ดึงข้อมูล
  useEffect(() => {
    const fetchRelationInfo = async () => {
      const data = await getYearlyData(selectedYear);
      setRelationInfo(data?.students[0].yearly_data[0]?.relation_info);
    };
    fetchRelationInfo();
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
        <BreadcrumbsLoop options={[{ label: "ความสัมพันธ์ในครอบครัว" }]} />
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
          <Stepper step={2} path={stepperPath} />
        </div>
        {/* Manage info btn */}
        <div className="flex justify-end my-6">
          <a
            className={relationInfo === null ? "btn-green" : "btn-yellow"}
            href={
              relationInfo === null
                ? `/student/personal-info/add`
                : `/student/relation/update`
            }
          >
            {relationInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>

        {/* ข้อมูลนักเรียน */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-xl font-bold text-gray-600 text-center mb-3">
                ความสัมพันธ์ในครอบครัว
              </h3>
              {relationInfo !== null ? (
                <div className="text-left flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                    <div>
                      จำนวนสมาชิกในครอบครัว:{" "}
                      <span className="text-black">
                        {relationInfo.family_member}
                      </span>{" "}
                      คน
                    </div>
                    <div>
                      เวลาที่ใช้ร่วมกันในครอบครัวต่อวัน:{" "}
                      <span className="text-black">
                        {relationInfo.family_time}
                      </span>{" "}
                      ชั่วโมง
                    </div>
                    <div>
                      ความสัมพันธ์กับบิดา:{" "}
                      <span className="text-black">
                        {relationInfo.father_relation}
                      </span>
                    </div>
                    <div>
                      ความสัมพันธ์กับมารดา:{" "}
                      <span className="text-black">
                        {relationInfo.mother_relation}
                      </span>
                    </div>
                    <div>
                      ความสัมพันธ์กับพี่ชาย:{" "}
                      <span className="text-black">
                        {relationInfo.brother_relation}
                      </span>
                    </div>
                    <div>
                      ความสัมพันธ์กับพี่สาว:{" "}
                      <span className="text-black">
                        {relationInfo.sister_relation}
                      </span>
                    </div>
                    <div>
                      ความสัมพันธ์กับปู่ย่าตายาย:{" "}
                      <span className="text-black">
                        {relationInfo.grand_parent_relation}
                      </span>
                    </div>
                    <div>
                      ความสัมพันธ์กับญาติ:{" "}
                      <span className="text-black">
                        {relationInfo.relatives_relation}
                      </span>
                    </div>
                    <div>
                      บุคคลอื่น ๆ:{" "}
                      <span className="text-black">
                        {relationInfo.other_relative || "ไม่มี"}
                      </span>
                    </div>
                    <div>
                      ความสัมพันธ์กับบุคคลอื่น ๆ:{" "}
                      <span className="text-black">
                        {relationInfo.other_relation}
                      </span>
                    </div>
                    <div>
                      เมื่อนักเรียนอยู่บ้านคนเดียว:{" "}
                      <span className="text-black">
                        {relationInfo.when_student_alone}
                      </span>
                    </div>
                    <div>
                      รายได้รวมของครอบครัว:{" "}
                      <span className="text-black">
                        {relationInfo.total_household_income}
                      </span>{" "}
                      บาท
                    </div>
                    <div>
                      ค่าใช้จ่ายไปโรงเรียนต่อวัน:{" "}
                      <span className="text-black">
                        {relationInfo.daily_total_to_school}
                      </span>{" "}
                      บาท
                    </div>
                    <div>
                      ได้รับเงินจาก:{" "}
                      <span className="text-black">
                        {relationInfo.received_daily_from}
                      </span>
                    </div>
                    <div>
                      งานพิเศษ:{" "}
                      <span className="text-black">
                        {relationInfo.student_part_time || "ไม่ได้ทำ"}
                      </span>
                    </div>
                    <div>
                      รายได้จากงานพิเศษ:{" "}
                      <span className="text-black">
                        {relationInfo.student_income}
                      </span>{" "}
                      บาท
                    </div>
                    <div>
                      การสนับสนุนจากโรงเรียน:{" "}
                      <span className="text-black">
                        {relationInfo.support_from_school}
                      </span>
                    </div>
                    <div>
                      การสนับสนุนจากหน่วยงานอื่น:{" "}
                      <span className="text-black">
                        {relationInfo.support_from_organize}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      ข้อกังวลของผู้ปกครอง:{" "}
                      <span className="text-black">
                        {relationInfo.parent_concern}
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

export default Relation;
