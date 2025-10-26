import React from "react";
import Stepper from "../../../components/Stepper";
import Text from "../../../components/Text";
import Radio from "../../../components/Radio";
import Checkbox from "../../../components/Checkbox";
import LabelCheck from "../../../components/LabelCheck";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import { validateCurrentPage } from "../../../utils/formNavigation";

const Risk = ({ page, setPage, formik }) => {
  const [haveHealthIssues, setHaveHealthIssues] = React.useState(false);

  const riskFields = [
    "when_student_alone",
    "health_risk",
    "welfare_and_safety",
    "distance_to_school",
    "time_used",
    "school_transport",
  ];

  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "แก้ไขข้อมูลความเสี่ยง" },
  ];

  const notHomeOptions = [
    { value: "0", label: "ญาติ" },
    { value: "1", label: "เพื่อนบ้าน" },
    { value: "2", label: "อยู่บ้านด้วยตนเอง" },
  ];

  const health_risk = [
    { value: "0", label: "ร่างกายไม่แข็งแรง" },
    { value: "1", label: "สมรรถภาพทางร่างกายต่ำ" },
    { value: "2", label: "มีภาวะทุพโภชนาการ" },
    { value: "3", label: "มีโรคประจำตัวหรือเจ็บป่วยบ่อย" },
    { value: "4", label: "ป่วยเป็นโรคร้ายแรง/เรื้อรัง" },
  ];

  const welfare_and_safety = [
    { value: "0", label: "ไม่มีความเสี่ยง" },
    { value: "1", label: "พ่อแม่แยกทางกัน หรือ แต่งงานใหม่" },
    { value: "2", label: "มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้าย" },
    { value: "3", label: "บุคคลในครอบครัวเล่นการพนัน" },
    { value: "4", label: "เล่นการพนัน" },
    {
      value: "5",
      label: "พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์",
    },
    { value: "6", label: "บุคคลในครอบครัวติดสารเสพติดแรง/เรื้อรัง/ติดต่อ" },
    { value: "7", label: "มีความขัดแย้งและมีการใช้ความรุนแรงในครอบครัว" },
    { value: "8", label: "ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน" },
    { value: "9", label: "ไม่มีผู้ดูแล" },
    { value: "10", label: "ถูกล่วงละเมิดทางเพศ" },
  ];

  const school_transport = [
    {
      value: "0",
      label: "ผู้ปกครองมาส่ง",
    },
    {
      value: "1",
      label: "รถโรงเรียน",
    },
    {
      value: "2",
      label: "รถโดยสารประจำทาง",
    },
    {
      value: "3",
      label: "รถจักรยานยนต์",
    },
    {
      value: "4",
      label: "รถจักรยาน",
    },
    {
      value: "5",
      label: "รถยนต์",
    },
    {
      value: "6",
      label: "เดิน",
    },
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
            ความเสี่ยงต่าง ๆ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* กรณีที่ผู้ปกครองไม่อยู่บ้าน ฝากเด็กนักเรียนอยู่บ้านกับใคร */}
            <div className="md:col-span-2">
              <Radio
                label="กรณีที่ผู้ปกครองไม่อยู่บ้าน ฝากเด็กนักเรียนอยู่บ้านกับใคร"
                name="when_student_alone"
                options={notHomeOptions}
                value={formik.values.when_student_alone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.when_student_alone}
                touched={formik.touched.when_student_alone}
                required
              />
            </div>
            {/* ด้านสุขภาพ */}
            <div className="md:col-span-2 flex flex-col">
              <label
                htmlFor="haveHealthIssues"
                className="mb-3 text-start text-sm"
              >
                ด้านสุขภาพ
              </label>
              <LabelCheck
                label="มีความเสี่ยงด้านสุขภาพหรือไม่"
                set={setHaveHealthIssues}
                value={haveHealthIssues}
                name="haveHealthIssues"
              />
            </div>
            {haveHealthIssues && (
              <div className="md:col-span-2">
                <Checkbox
                  label="ความเสี่ยงด้านสุขภาพ"
                  name="health_risk"
                  options={health_risk}
                  value={formik.values.health_risk}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.health_risk}
                  touched={formik.touched.health_risk}
                  setFieldValue={formik.setFieldValue}
                />
              </div>
            )}
            {/* สวัสดิการหรือความปลอดภัย */}
            <div className="md:col-span-2">
              <Checkbox
                label="ความเสี่ยงด้านสวัสดิการหรือความปลอดภัย"
                name="welfare_and_safety"
                options={welfare_and_safety}
                value={formik.values.welfare_and_safety}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.welfare_and_safety}
                touched={formik.touched.welfare_and_safety}
                setFieldValue={formik.setFieldValue}
              />
            </div>
            {/* ระยะทางจากบ้านไปโรงเรียน */}
            <Text
              label="ระยะทางจากบ้านไปโรงเรียนประมาณกี่กิโลเมตร"
              name="distance_to_school"
              value={formik.values.distance_to_school}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.distance_to_school}
              touched={formik.touched.distance_to_school}
              type="number"
              min={0}
              max={200}
              required
              id="distance_to_school"
            />
            {/* เวลาที่ใช้ */}
            <Text
              label="เวลาที่ใช้ในการเดินทางไปโรงเรียนประมาณกี่นาที"
              name="time_used"
              value={formik.values.time_used}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.time_used}
              touched={formik.touched.time_used}
              type="number"
              min={0}
              max={60}
              step={5}
              required
              id="time_used"
            />
            {/* วิธีการเดินทางของนักเรียนไปโรงเรียน */}
            <div className="md:col-span-2">
              <Radio
                label="วิธีการเดินทางที่ใช้ในการมาโรงเรียนเป็นส่วนใหญ่"
                name="school_transport"
                options={school_transport}
                value={formik.values.school_transport}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.school_transport}
                touched={formik.touched.school_transport}
                required
              />
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
                  fieldsToValidate: riskFields,
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

export default Risk;
