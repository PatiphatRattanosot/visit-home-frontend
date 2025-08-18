import { useState, useEffect } from "react";
import Stepper from "../../../components/Stepper";
import { useStudentStore } from "../../../stores/student.store";
import useYearSelectStore from "../../../stores/year_select.store";
import { useAuthStore } from "../../../stores/auth.store";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";

const Behavior = () => {
  const { userInfo } = useAuthStore();

  const [behaviorInfo, setBehaviorInfo] = useState(null);
  console.log(behaviorInfo);

  const { getYearlyData } = useStudentStore();
  const { selectedYear } = useYearSelectStore();

  // ดึงข้อมูล
  useEffect(() => {
    const fetchBehaviorInfo = async () => {
      const data = await getYearlyData(selectedYear);
      setBehaviorInfo(data?.students[0].yearly_data[0]?.behavior_and_risk);
    };
    fetchBehaviorInfo();
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
        <BreadcrumbsLoop options={[{ label: "พฤติกรรมและความเสี่ยง" }]} />
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
          <Stepper step={4} path={stepperPath} />
        </div>
        {/* Manage info btn */}
        <div className="flex justify-end my-6">
          <a
            className={behaviorInfo === null ? "btn-green" : "btn-yellow"}
            href={
              behaviorInfo === null
                ? `/student/personal-info/add`
                : `/student/behavior/update`
            }
          >
            {behaviorInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>

        {/* ข้อมูลนักเรียน */}
        <div className="flex justify-center mt-6">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-xl font-bold text-gray-600 text-center mb-3">
                พฤติกรรมและความเสี่ยง
              </h3>
              {behaviorInfo !== null ? (
                <div className="text-left flex flex-col gap-2.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-gray-600">
                    {/* สุขภาพ */}
                    <div>
                      ด้านสุขภาพ:{" "}
                      <span className="text-black">
                        {behaviorInfo?.health_risk.length === 0
                          ? "ไม่มีความเสี่ยง"
                          : behaviorInfo?.health_risk.join(", ")}
                      </span>
                    </div>
                    {/* สวัสดิการหรือความปลอดภัย */}
                    <div>
                      สวัสดิการหรือความปลอดภัย:{" "}
                      <span className="text-black">
                        {behaviorInfo?.welfare_and_safety.length === 0
                          ? "ไม่มีความเสี่ยง"
                          : behaviorInfo?.welfare_and_safety.join(", ")}
                      </span>
                    </div>
                    {/* ระยะทางระหว่างบ้านไปโรงเรียน */}
                    <div>
                      ระยะทางระหว่างบ้านไปโรงเรียน:{" "}
                      <span className="text-black">
                        {behaviorInfo?.distance_to_school}
                      </span>{" "}
                      กิโลเมตร
                    </div>
                    {/* ใช้เวลาเดินทางประมาณ */}
                    <div>
                      ใช้เวลาเดินทางประมาณ:{" "}
                      <span className="text-black">
                        {behaviorInfo?.time_used}
                      </span>{" "}
                      ชั่วโมง
                    </div>
                    {/* การเดินทางของนักเรียนไปโรงเรียน */}
                    <div>
                      การเดินทางของนักเรียนไปโรงเรียน:{" "}
                      <span className="text-black">
                        {behaviorInfo?.school_transport}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      {/* ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว */}
                      <div>
                        ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว:{" "}
                        <span className="text-black">
                          {behaviorInfo?.student_resp.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo?.student_resp.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* กิจกรรมยามว่างหรืองานอดิเรก */}
                      <div>
                        กิจกรรมยามว่างหรืองานอดิเรก:{" "}
                        <span className="text-black">
                          {behaviorInfo?.hobbies.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo?.hobbies.join(", ")}
                          {behaviorInfo?.other_hobbies &&
                            `, ${behaviorInfo?.other_hobbies}`}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมการใช้สารเสพติด */}
                      <div>
                        พฤติกรรมการใช้สารเสพติด:{" "}
                        <span className="text-black">
                          {behaviorInfo?.drugs_behav.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo?.drugs_behav.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมการใช้ความรุนแรง */}
                      <div>
                        พฤติกรรมการใช้ความรุนแรง:{" "}
                        <span className="text-black">
                          {behaviorInfo?.violent_behav.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo?.violent_behav.join(", ")}
                          {behaviorInfo?.other_violent_behav &&
                            `, ${behaviorInfo?.other_violent_behav}`}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมทางเพศ */}
                      <div>
                        พฤติกรรมทางเพศ:{" "}
                        <span className="text-black">
                          {behaviorInfo?.sexual_behav.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo?.sexual_behav.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การติดเกม */}
                      <div>
                        การติดเกม:{" "}
                        <span className="text-black">
                          {behaviorInfo?.gaming_behav.length === 0
                            ? "ไม่มีความเสี่ยง"
                            : behaviorInfo?.gaming_behav.join(", ")}
                          {behaviorInfo?.other_gaming_behav &&
                            `, ${behaviorInfo.other_gaming_behav}`}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน */}
                      <div>
                        การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน:{" "}
                        <span className="text-black">
                          {behaviorInfo?.computer_internet_access}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์ */}
                      <div>
                        การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์:{" "}
                        <span className="text-black">
                          {behaviorInfo?.tech_use_behav}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* ผู้ให้ข้อมูลนักเรียน */}
                      <div className="font-bold">
                        ผู้ให้ข้อมูลนักเรียน:{" "}
                        <span className="text-black">
                          {behaviorInfo?.information_giver}
                        </span>
                      </div>
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

export default Behavior;
