import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/auth.store";
import { useStudentStore } from "../../../stores/student.store";
import useYearSelectStore from "../../../stores/year_select.store";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";
import Stepper from "../../../components/Stepper";

const Relation = () => {
  const { userInfo } = useAuthStore();
  const { getYearlyData } = useStudentStore();
  const { selectedYear } = useYearSelectStore();

  const [relationInfo, setRelationInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelationInfo = async () => {
      setLoading(true);
      try {
        const data = await getYearlyData(selectedYear);
        const student = data?.students?.[0];
        const yearlyData = student?.yearly_data?.[0];

        if (yearlyData?.relation_info) {
          setRelationInfo(yearlyData.relation_info);
        } else {
          setRelationInfo(null);
        }
      } catch (error) {
        console.error("Failed to fetch relation info:", error);
        setRelationInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRelationInfo();
  }, [selectedYear]);

  const stepperPath = {
    stepOne: `/student/personal-info`,
    stepTwo: `/student/relation`,
    stepThree: `/student/family-status`,
    stepFour: `/student/behavior`,
  };

  const renderRelationLabel = (value) => {
    switch (value) {
      case "0":
        return "สนิทสนม";
      case "1":
        return "เฉยๆ";
      case "2":
        return "ห่างเหิน";
      case "3":
        return "ขัดแย้ง";
      default:
        return "ไม่มี";
    }
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100 flex justify-center">
      <div className="bg-white px-6 py-8 w-full max-w-screen-lg rounded-lg shadow-sm">
        <BreadcrumbsLoop options={[{ label: "ความสัมพันธ์ในครอบครัว" }]} />

        {/* Year Selector */}
        <div className="flex justify-center md:justify-end items-center mb-6">
          <YearSelector />
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-center w-full">
          ข้อมูลการเยี่ยมบ้าน{" "}
          <span className="text-gray-600 hidden md:inline">
            {userInfo?.prefix} {userInfo?.first_name} {userInfo?.last_name}
          </span>
        </h3>

        {/* Manage Info Button */}
        <div className="flex justify-end mt-2">
          <a
            className={relationInfo === null ? "btn-green" : "btn-yellow"}
            href={
              relationInfo === null
                ? `/student/relation/${selectedYear}/add`
                : `/student/relation/${selectedYear}/update`
            }
          >
            {relationInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>

        {/* Stepper */}
        <div className="my-4 flex justify-center">
          <Stepper step={2} path={stepperPath} />
        </div>

        {/* Content */}
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-lg font-bold text-gray-600 text-center mb-6">
                ความสัมพันธ์ในครอบครัว
              </h3>

              {loading ? (
                <div className="text-center text-gray-500">
                  กำลังโหลดข้อมูล...
                </div>
              ) : relationInfo !== null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-gray-600 text-left">
                  <div>
                    จำนวนสมาชิกในครอบครัว:{" "}
                    <span className="text-black">
                      {relationInfo?.family_member} คน
                    </span>
                  </div>
                  <div>
                    เวลาที่ใช้ร่วมกันต่อวัน:{" "}
                    <span className="text-black">
                      {relationInfo?.family_time} ชั่วโมง
                    </span>
                  </div>
                  <div>
                    ความสัมพันธ์กับบิดา:{" "}
                    <span className="text-black">
                      {renderRelationLabel(relationInfo?.father_relation)}
                    </span>
                  </div>
                  <div>
                    ความสัมพันธ์กับมารดา:{" "}
                    <span className="text-black">
                      {renderRelationLabel(relationInfo?.mother_relation)}
                    </span>
                  </div>
                  <div>
                    ความสัมพันธ์กับพี่ชาย:{" "}
                    <span className="text-black">
                      {renderRelationLabel(relationInfo?.brother_relation)}
                    </span>
                  </div>
                  <div>
                    ความสัมพันธ์กับพี่สาว:{" "}
                    <span className="text-black">
                      {renderRelationLabel(relationInfo?.sister_relation)}
                    </span>
                  </div>
                  <div>
                    ความสัมพันธ์กับปู่ย่าตายาย:{" "}
                    <span className="text-black">
                      {renderRelationLabel(relationInfo?.grand_parent_relation)}
                    </span>
                  </div>
                  <div>
                    ความสัมพันธ์กับญาติ:{" "}
                    <span className="text-black">
                      {renderRelationLabel(relationInfo?.relatives_relation)}
                    </span>
                  </div>
                  <div>
                    บุคคลอื่น ๆ:{" "}
                    <span className="text-black">
                      {relationInfo?.other_relative || "ไม่มี"}
                    </span>
                  </div>
                  <div>
                    ความสัมพันธ์กับบุคคลอื่น ๆ:{" "}
                    <span className="text-black">
                      {renderRelationLabel(relationInfo?.other_relation)}
                    </span>
                  </div>
                  <div>
                    เมื่อนักเรียนอยู่บ้านคนเดียว:{" "}
                    <span className="text-black">
                      {relationInfo?.when_student_alone}
                    </span>
                  </div>
                  <div>
                    รายได้รวมของครอบครัว:{" "}
                    <span className="text-black">
                      {relationInfo?.total_household_income} บาท
                    </span>
                  </div>
                  <div>
                    ค่าใช้จ่ายไปโรงเรียนต่อวัน:{" "}
                    <span className="text-black">
                      {relationInfo?.daily_total_to_school} บาท
                    </span>
                  </div>
                  <div>
                    ได้รับเงินจาก:{" "}
                    <span className="text-black">
                      {relationInfo?.received_daily_from}
                    </span>
                  </div>
                  <div>
                    งานพิเศษ:{" "}
                    <span className="text-black">
                      {relationInfo?.student_part_time || "ไม่ได้ทำ"}
                    </span>
                  </div>
                  <div>
                    รายได้จากงานพิเศษ:{" "}
                    <span className="text-black">
                      {relationInfo?.student_income} บาท
                    </span>
                  </div>
                  <div>
                    การสนับสนุนจากโรงเรียน:{" "}
                    <span className="text-black">
                      {relationInfo?.support_from_school}
                    </span>
                  </div>
                  <div>
                    การสนับสนุนจากหน่วยงานอื่น:{" "}
                    <span className="text-black">
                      {relationInfo?.support_from_organize}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    ข้อกังวลของผู้ปกครอง:{" "}
                    <span className="text-black">
                      {relationInfo?.parent_concern}
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

export default Relation;
