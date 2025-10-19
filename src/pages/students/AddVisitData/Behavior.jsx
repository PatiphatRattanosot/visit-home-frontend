import React from "react";
import Stepper from "../../../components/Stepper";
import Checkbox from "../../../components/Checkbox";
import Radio from "../../../components/Radio";
import LabelCheck from "../../../components/LabelCheck";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import { validateCurrentPage } from "../../../utils/formNavigation";

const Behavior = ({ page, setPage, formik }) => {
  const behaviorFields = [
    "student_resp",
    "other_student_resp",
    "hobbies",
    "other_hobbies",
    "drugs_behav",
    "violent_behav",
    "other_violent_behav",
    "sexual_behav",
    "computer_internet_access",
    "tech_use_behav",
    "gaming_behav",
    "other_gaming_behav",
  ];

  const [isUseDrugs, setIsUseDrugs] = React.useState(false);
  const [isViolence, setIsViolence] = React.useState(false);
  const [haveSexualBehavior, setHaveSexualBehavior] = React.useState(false);

  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "เพิ่มข้อมูลพฤติกรรม" },
  ];

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
        <div className="flex justify-start mb-2">
          <BreadcrumbsLoop options={breadcrumbsOptions} />
        </div>
        <div className="mb-8 flex justify-center">
          <Stepper page={page} setPage={setPage} />
        </div>
        <div>
          {/* Heading */}
          <h3 className="text-xl font-bold text-center w-full">
            พฤติกรรมของนักเรียน
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว */}
            <div className="md:col-span-2">
              <Checkbox
                label="ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว"
                name="student_resp"
                value={formik.values.student_resp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.student_resp}
                touched={formik.touched.student_resp}
                options={student_resp}
                setFieldValue={formik.setFieldValue}
              />
              <div className="md:w-1/2 mt-4 md:pr-3">
                <input
                  type="text"
                  placeholder="ภาระงานความรับผิดชอบ อื่นๆ"
                  className="input w-full"
                  name="other_student_resp"
                  value={formik.values.other_student_resp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.other_student_resp &&
                  formik.touched.other_student_resp && (
                    <div className="text-red-500 text-xs mt-2">
                      {formik.errors.other_student_resp}
                    </div>
                  )}
              </div>
            </div>
            {/* กิจกรรมยามว่าง */}
            <div className="md:col-span-2 flex flex-col">
              <Checkbox
                label="กิจกรรมยามว่าง/ งานอดิเรก"
                name="hobbies"
                value={formik.values.hobbies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.hobbies}
                touched={formik.touched.hobbies}
                options={hobbies}
                setFieldValue={formik.setFieldValue}
              />
              <div className="md:w-1/2 mt-4 md:pr-3">
                <input
                  type="text"
                  placeholder="กิจกรรมยามว่าง อื่นๆ"
                  className="input w-full"
                  name="other_hobbies"
                  value={formik.values.other_hobbies}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.other_hobbies &&
                  formik.touched.other_hobbies && (
                    <div className="text-red-500 text-xs mt-2">
                      {formik.errors.other_hobbies}
                    </div>
                  )}
              </div>
            </div>
            {/* พฤติกรรมการใช้สารเสพติด */}
            <div className="md:col-span-2">
              <div className="flex flex-col">
                <label htmlFor="isUseDrugs" className="text-sm text-start mb-3">
                  พฤติกรรมการใช้สารเสพติด
                </label>
                <LabelCheck
                  label="มีการใช้สารเสพติดหรือไม่"
                  name="isUseDrugs"
                  set={setIsUseDrugs}
                  value={isUseDrugs}
                />
              </div>
            </div>
            {isUseDrugs && (
              <div className="md:col-span-2">
                <Checkbox
                  label="การใช้สารเสพติด"
                  name="drugs_behav"
                  value={formik.values.drugs_behav}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.drugs_behav}
                  touched={formik.touched.drugs_behav}
                  options={drugs_behavior}
                  setFieldValue={formik.setFieldValue}
                />
              </div>
            )}
            {/* พฤติกรรมการใช้ความรุนแรง */}
            <div className="md:col-span-2">
              <div className="flex flex-col">
                <label htmlFor="isViolence" className="text-sm text-start mb-3">
                  พฤติกรรมการใช้ความรุนแรง
                </label>
                <LabelCheck
                  label="มีการใช้ความรุนแรงหรือไม่"
                  name="isViolence"
                  set={setIsViolence}
                  value={isViolence}
                />
              </div>
            </div>
            {isViolence && (
              <div className="md:col-span-2">
                <Checkbox
                  label="การใช้ความรุนแรง"
                  name="violent_behav"
                  value={formik.values.violent_behav}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.violent_behav}
                  touched={formik.touched.violent_behav}
                  options={violence_behavior}
                  setFieldValue={formik.setFieldValue}
                />
                <div className="md:w-1/2 mt-4 md:pr-3">
                  <input
                    type="text"
                    placeholder="พฤติกรรมอื่นๆ"
                    className="input w-full"
                    name="other_violent_behav"
                    value={formik.values.other_violent_behav}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.other_violent_behav &&
                    formik.touched.other_violent_behav && (
                      <div className="text-red-500 text-xs mt-2">
                        {formik.errors.other_violent_behav}
                      </div>
                    )}
                </div>
              </div>
            )}
            {/* พฤติกรรมการใช้สารเสพติด */}
            <div className="md:col-span-2">
              <div className="flex flex-col">
                <label
                  htmlFor="haveSexualBehavior"
                  className="text-sm text-start mb-3"
                >
                  พฤติกรรมทางเพศ
                </label>
                <LabelCheck
                  label="เคยมีพฤติกรรมทางเพศหรือไม่"
                  name="haveSexualBehavior"
                  set={setHaveSexualBehavior}
                  value={haveSexualBehavior}
                />
              </div>
            </div>
            {haveSexualBehavior && (
              <div className="md:col-span-2">
                <Checkbox
                  label="พฤติกรรมทางเพศ"
                  name="sexual_behav"
                  value={formik.values.sexual_behav}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.sexual_behav}
                  touched={formik.touched.sexual_behav}
                  options={sexual_behavior}
                  setFieldValue={formik.setFieldValue}
                />
              </div>
            )}
            {/* การเข้าถึงอินเทอร์เน็ต */}
            <div className="md:col-span-2">
              <Radio
                label="การเข้าถึงอินเทอร์เน็ต"
                name="computer_internet_access"
                value={formik.values.computer_internet_access}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.computer_internet_access}
                touched={formik.touched.computer_internet_access}
                options={internet_access_options}
                setFieldValue={formik.setFieldValue}
                required
              />
            </div>
            {/* การใช้งานเครื่องมือสื่อสารอิเล็กทรอนิกส์ */}
            <div className="md:col-span-2">
              <Radio
                label="การใช้งานเครื่องมือสื่อสารอิเล็กทรอนิกส์"
                name="tech_use_behav"
                value={formik.values.tech_use_behav}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.tech_use_behav}
                touched={formik.touched.tech_use_behav}
                options={tech_use_behav_options}
                required
              />
            </div>
            {/* พฤติกรรมการเล่นเกม */}
            <div className="md:col-span-2">
              <Checkbox
                label="พฤติกรรมการเล่นเกม"
                name="gaming_behav"
                value={formik.values.gaming_behav}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.gaming_behav}
                touched={formik.touched.gaming_behav}
                options={gaming_behav}
                setFieldValue={formik.setFieldValue}
              />
              <div className="md:w-1/2 mt-4 md:pr-3">
                <input
                  type="text"
                  placeholder="พฤติกรรมอื่นๆ"
                  className="input w-full"
                  name="other_violent_behav"
                  value={formik.values.other_violent_behav}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.other_violent_behav &&
                  formik.touched.other_violent_behav && (
                    <div className="text-red-500 text-xs mt-2">
                      {formik.errors.other_violent_behav}
                    </div>
                  )}
              </div>
            </div>
          </div>
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
              onClick={() =>
                validateCurrentPage({
                  formik,
                  fieldsToValidate: behaviorFields,
                  onSuccess: () => setPage(page + 1),
                })
              }
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
