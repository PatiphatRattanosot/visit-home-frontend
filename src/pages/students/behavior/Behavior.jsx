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
                ? `/student/personal-info/${selectedYear}/add`
                : `/student/behavior/${selectedYear}/update`
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
                          : behaviorInfo?.health_risk.map((risk, index) => (
                              <div key={index}>
                                {risk == "0"
                                  ? "ร่างกายแข็งแรง"
                                  : risk == "1"
                                  ? "ร่างกายไม่แข็งแรง"
                                  : risk == "2"
                                  ? "สมรรถภาพทางร่างกายต่ำ"
                                  : risk == "3"
                                  ? "มีโรคประจำตัวหรือเจ็บป่วยบ่อย"
                                  : risk == "4"
                                  ? "ป่วยเป็นโรคร้ายแรง/เรื้อรัง"
                                  : "มีภาวะทุพโภชนาการ"}
                              </div>
                            ))}
                      </span>
                    </div>
                    {/* สวัสดิการหรือความปลอดภัย */}
                    <div>
                      สวัสดิการหรือความปลอดภัย:{" "}
                      <span className="text-black">
                        {behaviorInfo?.welfare_and_safety.map((item, index) => (
                          <div key={index}>
                            {item == "0"
                              ? "ไม่มีความเสี่ยงใดๆ"
                              : item == "1"
                              ? "พ่อแม่แยกทางกัน หรือ แต่งงานใหม่"
                              : item == "2"
                              ? "มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้าย"
                              : item == "3"
                              ? "บุคคลในครอบครัวเล่นการพนัน"
                              : item == "4"
                              ? "ไม่มีผู้ดูแล"
                              : item == "5"
                              ? "ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน"
                              : item == "6"
                              ? "พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์"
                              : item == "7"
                              ? "เล่นการพนัน"
                              : item == "8"
                              ? "บุคคลในครอบครัวติดสารเสพติดแรง/เรื้อรัง/ติดต่อ"
                              : item == "9"
                              ? "มีความขัดแย้ง/ทะเลาะกันในครอบครัว"
                              : item == "10"
                              ? "ความขัดแย้งและมีการใช้ความรุนแรงในครอบครัว"
                              : "ถูกล่วงละเมิดทางเพศ"}
                          </div>
                        ))}
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
                      นาที
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
                          {behaviorInfo?.student_resp.map((resp, index) => (
                            <div key={index}>
                              {resp == "0"
                                ? "ช่วยงานบ้าน"
                                : resp == "1"
                                ? "ช่วยคนดูแลคนเจ็บป่วย/พิการ"
                                : resp == "2"
                                ? "ช่วยค้าขายเล็กๆน้อยๆ"
                                : resp == "3"
                                ? "ทำงานพิเศษแถวบ้าน"
                                : "ช่วยงานในนาไร่"}
                            </div>
                          ))}
                          {behaviorInfo?.student_resp_other && (
                            <div>{behaviorInfo?.student_resp_other}</div>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* กิจกรรมยามว่างหรืองานอดิเรก */}
                      <div>
                        กิจกรรมยามว่างหรืองานอดิเรก:{" "}
                        <span className="text-black">
                          {behaviorInfo?.hobbies.map((hobby, index) => (
                            <div key={index}>
                              {hobby == "0"
                                ? "ดูทีวี/ ฟังเพลง"
                                : hobby == "1"
                                ? "ปเที่ยวห้าง/ ดูหนัง"
                                : hobby == "2"
                                ? "อ่านหนังสือ"
                                : hobby == "3"
                                ? "ไปหาเพื่อน/ เพื่อน"
                                : hobby == "4"
                                ? "แว้น/ สก๊อย"
                                : hobby == "5"
                                ? "เล่นเกม คอม / มือถือ"
                                : hobby == "6"
                                ? "ไปสวนสาธารณะ"
                                : "เล่นดนตรี"}
                            </div>
                          ))}
                          {behaviorInfo?.other_hobbies && (
                            <div>{behaviorInfo?.other_hobbies}</div>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมการใช้สารเสพติด */}
                      <div>
                        พฤติกรรมการใช้สารเสพติด:{" "}
                        <span className="text-black">
                          {behaviorInfo?.drugs_behav.map((drug, index) => (
                            <div key={index}>
                              {drug == "0"
                                ? "คบเพื่อนในกลุ่มที่ใช้สารเสพติด"
                                : drug == "1"
                                ? "สมาชิกในครอบครัวข้องเกี่ยวกับยาเสพติด"
                                : drug == "2"
                                ? "อยู่ในสภาพแวดล้อมที่ใช้สารเสพติด"
                                : drug == "3"
                                ? "ปัจจุบันเกี่ยวข้องกับสารเสพติด"
                                : "เป็นผู้ติดบุหรี่ สุรา หรือการใช้สารเสพติดอื่นๆ"}
                            </div>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมการใช้ความรุนแรง */}
                      <div>
                        พฤติกรรมการใช้ความรุนแรง:{" "}
                        <span className="text-black">
                          {behaviorInfo?.violent_behav.map(
                            (violence, index) => (
                              <div key={index}>
                                {violence == "0"
                                  ? "มีการทะเลาะวิวาท"
                                  : violence == "1"
                                  ? "ก้าวร้าว เกเร"
                                  : violence == "2"
                                  ? "ทะเลาะวิวาทเป็นประจำ"
                                  : violence == "3"
                                  ? "ทำร้ายร่างกายผู้อื่น"
                                  : "ทำร้ายร่างกายตนเอง"}
                              </div>
                            )
                          )}
                          {behaviorInfo?.other_violent_behav && (
                            <div>{behaviorInfo?.other_violent_behav}</div>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* พฤติกรรมทางเพศ */}
                      <div>
                        พฤติกรรมทางเพศ:{" "}
                        <span className="text-black">
                          {behaviorInfo?.sexual_behav.map((sexual, index) => (
                            <div key={index}>
                              {sexual == "0"
                                ? "อยู่ในกลุ่มขายบริการ"
                                : sexual == "1"
                                ? "ใช้เครื่องมือสื่อสารที่เกี่ยวข้องกับด้านเพศเป็นเวลานานและบ่อยครั้ง"
                                : sexual == "2"
                                ? "ตั้งครรภ์"
                                : sexual == "3"
                                ? "ขายบริการทางเพศ"
                                : sexual == "4"
                                ? "หมกมุ่นในการใช้เครื่องมือสื่อสารที่เกี่ยวข้องทางเพศ"
                                : "มีการมั่วสุมทางเพศ"}
                            </div>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การติดเกม */}
                      <div>
                        การติดเกม:{" "}
                        <span className="text-black">
                          {behaviorInfo?.gaming_behav.map((game, index) => (
                            <div key={index}>
                              {game == "0"
                                ? "เล่นเกมเกินวันละ 1 ชั่วโมง"
                                : game == "1"
                                ? "ขาดจินตนาการและความคิดสร้างสรรค์"
                                : game == "2"
                                ? "เก็บตัว แยกตัวจากกลุ่มเพื่อน"
                                : game == "3"
                                ? "ใช้จ่ายเงินผิดปกติ"
                                : game == "4"
                                ? "อยู่ในกลุ่มเพื่อนเล่นเกม"
                                : game == "5"
                                ? "ร้านเกมอยู่ใกล้บ้านหรือโรงเรียน"
                                : game == "6"
                                ? "ใช้เวลาเล่นเกมเกิน 2 ชั่วโมง"
                                : game == "7"
                                ? "หมกมุ่น จริงจังในการเล่นเกม"
                                : "ใช้เงินสิ้นเปลือง โกหก ลักขโมยเงินเพื่อเล่นเกม"}
                            </div>
                          ))}
                          {behaviorInfo?.other_gaming_behav && (
                            <div>{behaviorInfo?.other_gaming_behav}</div>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน */}
                      <div>
                        การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน:{" "}
                        <span className="text-black">
                          {behaviorInfo?.computer_internet_access == "0"
                            ? "สามารถเข้าถึง Internet ได้จากที่บ้าน"
                            : "ไม่สามารถเข้าถึง Internet ได้จากที่บ้าน"}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      {/* การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์ */}
                      <div>
                        การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์:{" "}
                        <span className="text-black">
                          {behaviorInfo?.tech_use_behav == "0"
                            ? "ใช้ Social media/game (ไม่เกินวันละ 3 ชั่วโมง)"
                            : "ใช้ Social media/game (วันละ 3 ชั่วโมงขึ้นไป)"}
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
