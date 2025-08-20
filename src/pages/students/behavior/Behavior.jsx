import { useState, useEffect } from "react";
import Stepper from "../../../components/Stepper";
import { useStudentStore } from "../../../stores/student.store";
import useYearSelectStore from "../../../stores/year_select.store";
import { useAuthStore } from "../../../stores/auth.store";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";

const Behavior = () => {
  const { userInfo } = useAuthStore();
  const { getYearlyData } = useStudentStore();
  const { selectedYear } = useYearSelectStore();

  const [behaviorInfo, setBehaviorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBehaviorInfo = async () => {
      setLoading(true);
      try {
        const data = await getYearlyData(selectedYear);
        const info = data?.students?.[0]?.yearly_data?.[0]?.behavior_and_risk;
        setBehaviorInfo(info || null);
      } catch (error) {
        console.error("Error fetching behavior info:", error);
        setBehaviorInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBehaviorInfo();
  }, [selectedYear]);

  const stepperPath = {
    stepOne: `/student/personal-info`,
    stepTwo: `/student/relation`,
    stepThree: `/student/family-status`,
    stepFour: `/student/behavior`,
  };

  // Label Maps
  const healthRiskMap = {
    0: "ร่างกายแข็งแรง",
    1: "ร่างกายไม่แข็งแรง",
    2: "สมรรถภาพทางร่างกายต่ำ",
    3: "มีโรคประจำตัวหรือเจ็บป่วยบ่อย",
    4: "ป่วยเป็นโรคร้ายแรง/เรื้อรัง",
    5: "มีภาวะทุพโภชนาการ",
  };

  const welfareSafetyMap = {
    0: "ไม่มีความเสี่ยงใดๆ",
    1: "พ่อแม่แยกทางกัน หรือ แต่งงานใหม่",
    2: "มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้าย",
    3: "บุคคลในครอบครัวเล่นการพนัน",
    4: "ไม่มีผู้ดูแล",
    5: "ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน",
    6: "พักอาศัยในชุมชนแออัด/ใกล้แหล่งมั่วสุม",
    7: "เล่นการพนัน",
    8: "คนในครอบครัวติดยาเสพติด",
    9: "มีความขัดแย้งในครอบครัว",
    10: "มีความรุนแรงในครอบครัว",
    11: "ถูกล่วงละเมิดทางเพศ",
  };

  const studentRespMap = {
    0: "ช่วยงานบ้าน",
    1: "ดูแลคนเจ็บป่วย/พิการ",
    2: "ช่วยค้าขายเล็กๆน้อยๆ",
    3: "ทำงานพิเศษแถวบ้าน",
    4: "ช่วยงานในนาไร่",
  };

  const hobbiesMap = {
    0: "ดูทีวี/ฟังเพลง",
    1: "เที่ยวห้าง/ดูหนัง",
    2: "อ่านหนังสือ",
    3: "ไปหาเพื่อน",
    4: "แว้น/สก๊อย",
    5: "เล่นเกมคอม/มือถือ",
    6: "ไปสวนสาธารณะ",
    7: "เล่นดนตรี",
  };

  const drugsMap = {
    0: "คบเพื่อนในกลุ่มที่ใช้สารเสพติด",
    1: "สมาชิกในครอบครัวข้องเกี่ยวกับยาเสพติด",
    2: "อยู่ในสภาพแวดล้อมที่ใช้สารเสพติด",
    3: "ปัจจุบันเกี่ยวข้องกับสารเสพติด",
    4: "ติดบุหรี่/สุรา/สารเสพติดอื่นๆ",
  };

  const violenceMap = {
    0: "มีการทะเลาะวิวาท",
    1: "ก้าวร้าว เกเร",
    2: "ทะเลาะวิวาทเป็นประจำ",
    3: "ทำร้ายร่างกายผู้อื่น",
    4: "ทำร้ายร่างกายตนเอง",
  };

  const sexualMap = {
    0: "อยู่ในกลุ่มขายบริการ",
    1: "ใช้เครื่องมือสื่อสารเกี่ยวกับเพศบ่อย",
    2: "ตั้งครรภ์",
    3: "ขายบริการทางเพศ",
    4: "หมกมุ่นสื่อทางเพศ",
    5: "มั่วสุมทางเพศ",
  };

  const gamingMap = {
    0: "เล่นเกมเกินวันละ 1 ชั่วโมง",
    1: "ขาดจินตนาการ/ความคิดสร้างสรรค์",
    2: "เก็บตัว แยกจากเพื่อน",
    3: "ใช้จ่ายเงินผิดปกติ",
    4: "อยู่ในกลุ่มเพื่อนเล่นเกม",
    5: "ร้านเกมอยู่ใกล้บ้าน/โรงเรียน",
    6: "เล่นเกมเกิน 2 ชั่วโมง",
    7: "หมกมุ่นจริงจังกับเกม",
    8: "ใช้เงินฟุ่มเฟือย/โกหก/ขโมยเงินเพื่อเล่นเกม",
  };

  // Helpers
  const renderMappedList = (data, map, fallback = "ไม่มี") =>
    data?.length > 0 ? (
      data.map((item, index) => <div key={index}>{map[item] || "ไม่ระบุ"}</div>)
    ) : (
      <div>{fallback}</div>
    );

  return (
    <div className="min-h-screen py-10 bg-gray-100 flex justify-center">
      <div className="bg-white px-6 py-8 w-full max-w-screen-lg rounded-lg shadow-sm">
        <BreadcrumbsLoop options={[{ label: "พฤติกรรมและความเสี่ยง" }]} />

        <div className="flex justify-center md:justify-end mb-6">
          <YearSelector />
        </div>

        <h3 className="text-xl font-bold text-center mb-3">
          ข้อมูลการเยี่ยมบ้านของ{" "}
          <span className="text-gray-600">
            {userInfo?.prefix} {userInfo?.first_name} {userInfo?.last_name}
          </span>
        </h3>

        <div className="flex justify-end my-4">
          <a
            className={behaviorInfo === null ? "btn-green" : "btn-yellow"}
            href={
              behaviorInfo === null
                ? `/student/personal-info/${selectedYear}/add`
                : `/student/behavior/${selectedYear}/update`
            }
          >
            {behaviorInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>

        <div className="my-4 flex justify-center">
          <Stepper step={4} path={stepperPath} />
        </div>

        <div className="flex justify-center mt-6">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-lg font-bold text-center text-gray-600 mb-6">
                พฤติกรรมและความเสี่ยง
              </h3>

              {loading ? (
                <div className="text-center text-gray-500">
                  กำลังโหลดข้อมูล...
                </div>
              ) : behaviorInfo ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
                  <div>
                    ด้านสุขภาพ:{" "}
                    {renderMappedList(behaviorInfo.health_risk, healthRiskMap)}
                  </div>
                  <div>
                    สวัสดิการ/ความปลอดภัย:{" "}
                    {renderMappedList(
                      behaviorInfo.welfare_and_safety,
                      welfareSafetyMap
                    )}
                  </div>
                  <div>
                    ระยะทางบ้าน - โรงเรียน:{" "}
                    <span className="text-black">
                      {behaviorInfo.distance_to_school} กม.
                    </span>
                  </div>
                  <div>
                    ใช้เวลาเดินทาง:{" "}
                    <span className="text-black">
                      {behaviorInfo.time_used} นาที
                    </span>
                  </div>
                  <div>
                    วิธีเดินทาง:{" "}
                    <span className="text-black">
                      {behaviorInfo.school_transport}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    ภาระงานในครอบครัว:{" "}
                    {renderMappedList(
                      behaviorInfo.student_resp,
                      studentRespMap
                    )}
                    {behaviorInfo.student_resp_other && (
                      <div>{behaviorInfo.student_resp_other}</div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    งานอดิเรก:{" "}
                    {renderMappedList(behaviorInfo.hobbies, hobbiesMap)}
                    {behaviorInfo.other_hobbies && (
                      <div>{behaviorInfo.other_hobbies}</div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    พฤติกรรมการใช้สารเสพติด:{" "}
                    {renderMappedList(behaviorInfo.drugs_behav, drugsMap)}
                  </div>
                  <div className="md:col-span-2">
                    พฤติกรรมรุนแรง:{" "}
                    {renderMappedList(behaviorInfo.violent_behav, violenceMap)}
                    {behaviorInfo.other_violent_behav && (
                      <div>{behaviorInfo.other_violent_behav}</div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    พฤติกรรมทางเพศ:{" "}
                    {renderMappedList(behaviorInfo.sexual_behav, sexualMap)}
                  </div>
                  <div className="md:col-span-2">
                    การติดเกม:{" "}
                    {renderMappedList(behaviorInfo.gaming_behav, gamingMap)}
                    {behaviorInfo.other_gaming_behav && (
                      <div>{behaviorInfo.other_gaming_behav}</div>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    เข้าถึงอินเตอร์เน็ตที่บ้าน:{" "}
                    <span className="text-black">
                      {behaviorInfo.computer_internet_access === "0"
                        ? "สามารถเข้าถึงได้"
                        : "ไม่สามารถเข้าถึงได้"}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    ใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์:{" "}
                    <span className="text-black">
                      {behaviorInfo.tech_use_behav === "0"
                        ? "ใช้ไม่เกินวันละ 3 ชั่วโมง"
                        : "ใช้เกินวันละ 3 ชั่วโมง"}
                    </span>
                  </div>
                  <div className="md:col-span-2 font-bold">
                    ผู้ให้ข้อมูล:{" "}
                    <span className="text-black">
                      {behaviorInfo.information_giver}
                    </span>
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
