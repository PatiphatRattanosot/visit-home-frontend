import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import { useParams } from "react-router";
import YearSelector from "../../../components/YearSelector";

const Behavior = ({ page, setPage, behaviorInfo }) => {
  const { studentId } = useParams();
  const breadcrumbsOptions = [
    {
      link: `/teacher/student-data/${studentId}`,
      label: "ข้อมูลการเยี่ยมบ้าน",
    },
    { label: "พฤติกรรม" },
  ];

  // ฟังก์ชันสำหรับ mapping
  const mapValuesToLabels = (values, options) => {
    if (!values?.length) return ["-"];
    return values.map((val) => {
      const found = options.find((opt) => opt.value === val);
      return found ? found.label : val; // ถ้าไม่เจอ ให้คืนค่าเดิม
    });
  };

  const hobbies = [
    { value: "0", label: "อ่านหนังสือ" },
    { value: "1", label: "เล่นดนตรี" },
    { value: "2", label: "ดูทีวี/ ฟังเพลง" },
    { value: "3", label: "เล่นเกม คอม / มือถือ" },
    { value: "4", label: "ไปสวนสาธารณะ" },
    { value: "5", label: "ไปเที่ยวห้าง/ ดูหนัง" },
    { value: "6", label: "ไปหาเพื่อน/ แฟน" },
    { value: "7", label: "แว้น/ สก๊อย" },
  ];

  const drugs_behavior = [
    { value: "0", label: "คบเพื่อนในกลุ่มที่ใช้สารเสพติด" },
    { value: "1", label: "อยู่ในสภาพแวดล้อมที่ใช้สารเสพติด" },
    { value: "2", label: "สมาชิกในครอบครัวข้องเกี่ยวกับยาเสพติด" },
    { value: "3", label: "ปัจจุบันเกี่ยวข้องกับสารเสพติด" },
    { value: "4", label: "เป็นผู้ติดบุหรี่ สุรา หรือการใช้สารเสพติดอื่นๆ" },
  ];

  const violence_behavior = [
    { value: "0", label: "มีการทะเลาะวิวาท" },
    { value: "1", label: "ทะเลาะวิวาทเป็นประจำ" },
    { value: "2", label: "ก้าวร้าว เกเร" },
    { value: "3", label: "ทำร้ายร่างกายตนเอง" },
    { value: "4", label: "ทำร้ายร่างกายผู้อื่น" },
  ];

  const sexual_behavior = [
    {
      value: "0",
      label:
        "ใช้เครื่องมือสื่อสารที่เกี่ยวข้องกับด้านเพศเป็นเวลานานและบ่อยครั้ง",
    },
    {
      value: "1",
      label: "หมกมุ่นในการใช้เครื่องมือสื่อสารที่เกี่ยวข้องทางเพศ",
    },
    { value: "2", label: "มีการมั่วสุมทางเพศ" },
    { value: "3", label: "อยู่ในกลุ่มขายบริการ" },
    { value: "4", label: "ขายบริการทางเพศ" },
    { value: "5", label: "ตั้งครรภ์ก่อนวัยอันควร" },
  ];

  const internet_access_options = [
    {
      value: "0",
      label: "สามารถเข้าถึง Internet ได้จากที่บ้าน",
    },
    {
      value: "1",
      label: "ไม่สามารถเข้าถึง Internet ได้จากที่บ้าน",
    },
  ];

  const tech_use_behav_options = [
    { value: "0", label: "ใช้ Social media/game (ไม่เกินวันละ 3 ชั่วโมง)" },
    { value: "1", label: "ใช้ Social media/game (วันละ 3 ชั่วโมงขึ้นไป)" },
  ];

  const student_resp = [
    { value: "0", label: "ช่วยงานบ้าน" },
    { value: "1", label: "ช่วยคนดูแลคนเจ็บป่วย/พิการ" },
    { value: "2", label: "ช่วยงานในนาไร่" },
    { value: "3", label: "ช่วยค้าขายเล็กๆน้อยๆ" },
    { value: "4", label: "ทำงานพิเศษแถวบ้าน" },
  ];

  const gaming_behav = [
    { value: "0", label: "เล่นเกมเกินวันละ 1 ชั่วโมง" },
    { value: "1", label: "เล่นเกมเกินวันละ 2 ชั่วโมง" },
    { value: "2", label: "อยู่ในกลุ่มเพื่อนเล่นเกม" },
    { value: "3", label: "เก็บตัว แยกตัวจากกลุ่มเพื่อน" },
    { value: "4", label: "ร้านเกมอยู่ใกล้บ้านหรือโรงเรียน" },
    { value: "5", label: "หมกมุ่น จริงจังในการเล่นเกม" },
    { value: "6", label: "ใช้จ่ายเงินผิดปกติ" },
    { value: "7", label: "ใช้เงินสิ้นเปลือง โกหก ลักขโมยเงินเพื่อเล่นเกม" },
    { value: "8", label: "ขาดจินตนาการและความคิดสร้างสรรค์" },
  ];

  return (
    <div className="flex items-center justify-center py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        {/* Breadcrumbs */}
        <div className="flex justify-start mb-2">
          <BreadcrumbsLoop options={breadcrumbsOptions} />
        </div>

        {/* Stepper */}
        <div className="mb-8 flex justify-center">
          <Stepper page={page} setPage={setPage} />
        </div>

        <div>
          {/* Heading */}
          <h3 className="text-xl font-bold text-center w-full">
            พฤติกรรมของนักเรียน
          </h3>

          {/* Year Selector */}
          <div className="flex justify-center md:justify-end mt-6">
            <YearSelector />
          </div>

          {/* Behavior Info Section */}
          {!behaviorInfo ? (
            <div className="mt-6 text-center text-red-600 flex items-center justify-center text-lg h-[35vh]">
              ยังไม่มีการกรอกข้อมูลในปีนี้
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* ความรับผิดชอบ */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความรับผิดชอบของนักเรียน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {mapValuesToLabels(
                    behaviorInfo?.student_resp,
                    student_resp
                  ).join(", ")}
                </p>
              </div>

              {/* อื่น ๆ */}
              {behaviorInfo.other_student_resp && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ความรับผิดชอบอื่น ๆ
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {behaviorInfo?.other_student_resp}
                  </p>
                </div>
              )}

              {/* งานอดิเรก */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  งานอดิเรก
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {mapValuesToLabels(behaviorInfo?.hobbies, hobbies).join(", ")}
                </p>
              </div>

              {behaviorInfo?.other_hobbies && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    งานอดิเรกอื่น ๆ
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {behaviorInfo?.other_hobbies}
                  </p>
                </div>
              )}

              {/* พฤติกรรมเกี่ยวกับสารเสพติด */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  พฤติกรรมเกี่ยวกับสารเสพติด
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {mapValuesToLabels(
                    behaviorInfo?.drugs_behav,
                    drugs_behavior
                  ).join(", ")}
                </p>
              </div>

              {/* พฤติกรรมก้าวร้าว */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  พฤติกรรมก้าวร้าว
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {mapValuesToLabels(
                    behaviorInfo?.violent_behav,
                    violence_behavior
                  ).join(", ")}
                </p>
              </div>

              {behaviorInfo.other_violent_behav && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    พฤติกรรมก้าวร้าวอื่น ๆ
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {behaviorInfo?.other_violent_behav}
                  </p>
                </div>
              )}

              {/* พฤติกรรมทางเพศ */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  พฤติกรรมทางเพศ
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {mapValuesToLabels(
                    behaviorInfo?.sexual_behav,
                    sexual_behavior
                  ).join(", ")}
                </p>
              </div>

              {/* การเข้าถึงคอมพิวเตอร์/อินเทอร์เน็ต */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  การเข้าถึงคอมพิวเตอร์/อินเทอร์เน็ต
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {mapValuesToLabels(
                    [behaviorInfo?.computer_internet_access],
                    internet_access_options
                  ).join(", ")}
                </p>
              </div>

              {/* การใช้เทคโนโลยี */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  พฤติกรรมการใช้เทคโนโลยี
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {mapValuesToLabels(
                    [behaviorInfo?.tech_use_behav],
                    tech_use_behav_options
                  ).join(", ")}
                </p>
              </div>

              {/* พฤติกรรมการเล่นเกม */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  พฤติกรรมการเล่นเกม
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {mapValuesToLabels(
                    behaviorInfo?.gaming_behav,
                    gaming_behav
                  ).join(", ")}
                </p>
              </div>

              {behaviorInfo.other_gaming_behav && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    พฤติกรรมการเล่นเกมอื่น ๆ
                  </label>
                  <p className="w-full p-2 rounded-md text-gray-900">
                    {behaviorInfo?.other_gaming_behav}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-soft w-1/2"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              ย้อนกลับ{` (${page - 1})`}
            </button>
            <button
              type="button"
              className="btn btn-soft w-1/2"
              onClick={() => setPage(page + 1)}
            >
              ถัดไป {` (${page + 1})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Behavior;
