import React from "react";
import Stepper from "../../../components/Stepper";
import Text from "../../../components/Text";
import Select from "../../../components/Select";
import Radio from "../../../components/Radio";
import Checkbox from "../../../components/Checkbox";
import LabelCheck from "../../../components/LabelCheck";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";

const Family = ({ page, setPage, formik }) => {
  const [studentWork, setStudentWork] = React.useState(false);
  const [haveHouseholdBurdens, setHaveHouseholdBurdens] = React.useState(false);
  const [haveLand, setHaveLand] = React.useState(false);
  const [rentedLand, setRentedLand] = React.useState(false);
  const [haveVehicles, setHaveVehicles] = React.useState(false);

  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "แก้ไขข้อมูลสถานะครัวเรือน" },
  ];

  const family_members = [
    { value: "0", label: "บิดา" },
    { value: "1", label: "มารดา" },
    { value: "2", label: "พี่ชาย" },
    { value: "3", label: "พี่สาว" },
    { value: "4", label: "ลุง" },
    { value: "5", label: "ป้า" },
    { value: "6", label: "น้า" },
    { value: "7", label: "อา" },
    { value: "8", label: "ปู่" },
    { value: "9", label: "ย่า" },
    { value: "10", label: "ตา" },
    { value: "11", label: "ยาย" },
  ];

  const household_burdens = [
    { value: 0, label: "มีผู้สูงอายุเกิน 60 ปี" },
    { value: 1, label: "มีผู้พิการ" },
    { value: 2, label: "เป็นพ่อ/ แม่เลี้ยงเดี่ยว" },
    {
      value: 3,
      label: "มีคนอายุ 15-65 ปี ว่างงาน (ที่ไม่ใช่นักเรียน/นักศึกษา)",
    },
  ];

  const housing_types = [
    { value: "0", label: "บ้านของตนเอง" },
    { value: "1", label: "บ้านเช่า" },
    { value: "2", label: "อาศัยอยู่กับผู้อื่น" },
  ];

  const housing_conditions = [
    { value: "0", label: "สภาพบ้านปกติ" },
    { value: "1", label: "ไม่มีห้องส้วมในที่อยู่อาศัยและบริเวณ" },
    {
      value: "2",
      label:
        "สภาพบ้านชำรุดทรุดโทรม หรือ บ้านทำจากวัสดุพื้นบ้าน เช่น ไม้ไผ่ ใบจากหรือวัสดุเหลือใช้",
    },
  ];

  const family_vehicles = [
    { value: "0", label: "รถมอเตอร์ไซค์" },
    { value: "1", label: "รถยนต์ส่วนบุคคล" },
    { value: "2", label: "รถบรรทุกเล็ก/รถตู้" },
    { value: "3", label: "รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆ ประเภทเดียวกัน" },
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
            สถานะของครัวเรือน
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* รายได้รวมของครัวเรือน */}
            <div className="md:col-span-2">
              <Text
                label="รายได้รวมของครัวเรือน (บาท)"
                name="total_household_income"
                value={formik.values.total_household_income}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.total_household_income}
                touched={formik.touched.total_household_income}
                type="number"
                minLength={0}
                maxLength={1000000}
                step={1000}
                className="md:w-1/2 md:pr-3"
              />
            </div>
            {/* นักเรียนได้เงินมาโรงเรียน */}
            <Select
              label="นักเรียนได้รับเงินมาโรงเรียนจาก"
              options={family_members}
              name="received_daily_from"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.received_daily_from}
              error={formik.errors.received_daily_from}
              touched={formik.touched.received_daily_from}
            />
            <Text
              label="นักเรียนได้เงินมาโรงเรียนวันละ (บาท)"
              name="daily_total_to_school"
              value={formik.values.daily_total_to_school}
              onChange={formik.handleChange}
              minLength={0}
              maxLength={1000}
              type="number"
              error={formik.errors.daily_total_to_school}
              touched={formik.touched.daily_total_to_school}
              step={5}
            />
            {/* งานพิเศษ */}
            <div className="md:col-span-2 flex flex-col">
              <div className="text-sm text-start mb-3">งานพิเศษ</div>
              <LabelCheck
                label="นักเรียนทำงานพิเศษหรือไม่"
                name="studentWork"
                value={studentWork}
                set={setStudentWork}
              />
            </div>
            {studentWork && (
              <Text
                label="งานพิเศษที่ทำ"
                placeholder="ระบุงานพิเศษที่ทำ"
                name="student_part_time"
                value={formik.values.student_part_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.student_part_time}
                touched={formik.touched.student_part_time}
                disabled={!studentWork}
              />
            )}
            {studentWork && (
              <Text
                label="รายได้ (บาท)"
                name="student_income"
                value={formik.values.student_income}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.student_income}
                touched={formik.touched.student_income}
                type="number"
                minLength={0}
                maxLength={50000}
                step={100}
                disabled={!studentWork}
              />
            )}
            {/* ภาระพึ่งพิงของครัวเรือน */}
            <div className="md:col-span-2 flex flex-col">
              <div className="text-sm text-start mb-3">
                มีภาระพึ่งพิงหรือไม่
              </div>
              <LabelCheck
                label="มีภาระพึ่งพิงหรือไม่"
                name="haveHouseholdBurdens"
                set={setHaveHouseholdBurdens}
                value={haveHouseholdBurdens}
              />
            </div>
            {haveHouseholdBurdens && (
              <div className="md:col-span-2">
                <Checkbox
                  label="ภาระพึ่งพิงของครัวเรือน"
                  name="household_burdens"
                  value={formik.values.household_burdens}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.household_burdens}
                  touched={formik.touched.household_burdens}
                  options={household_burdens}
                  setFieldValue={formik.setFieldValue}
                />
              </div>
            )}
            {/* ประเภทที่อยู่อาศัย */}
            <div className="md:col-span-2">
              <Radio
                label="ประเภทที่อยู่อาศัย"
                name="housing_type"
                options={housing_types}
                value={formik.values.housing_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.housing_type}
                touched={formik.touched.housing_type}
              />
            </div>
            {/* สภาพที่อยู่อาศัย */}
            <div className="md:col-span-2">
              <Radio
                label="สภาพที่อยู่อาศัย"
                name="housing_condition"
                options={housing_conditions}
                value={formik.values.housing_condition}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.housing_condition}
                touched={formik.touched.housing_condition}
              />
            </div>
            {/* ยานพาหนะในครอบครัว */}
            <div className="md:col-span-2 flex flex-col">
              <div className="text-sm text-start mb-3">ยานพาหนะ</div>
              <LabelCheck
                label="มียานพาหนะหรือไม่"
                name="haveVehicles"
                set={setHaveVehicles}
                value={haveVehicles}
              />
            </div>
            {haveVehicles && (
              <div className="md:col-span-2">
                <Checkbox
                  label="ยานพาหนะในครอบครัว"
                  name="family_vehicle"
                  options={family_vehicles}
                  value={formik.values.family_vehicle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.family_vehicle}
                  touched={formik.touched.family_vehicle}
                  setFieldValue={formik.setFieldValue}
                />
              </div>
            )}
            {/* มีที่ดิน */}
            <div className="md:col-span-2 flex flex-col">
              <div className="text-sm text-start mb-3">ที่ดิน</div>
              <LabelCheck
                label="มีที่ดินหรือไม่"
                name="haveLand"
                set={setHaveLand}
                value={haveLand}
              />
            </div>
            {haveLand && (
              <div className="md:col-span-2 md:w-1/2 md:pr-3">
                <Text
                  label="มีที่ดินประมาณกี่ไร่"
                  name="owned_land"
                  value={formik.values.owned_land}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.owned_land}
                  touched={formik.touched.owned_land}
                  type="number"
                  minLength={0}
                  maxLength={5000}
                />
              </div>
            )}
            {/* เช่าที่ดิน */}
            <div className="md:col-span-2">
              <LabelCheck
                label="เช่าที่ดินหรือไม่"
                name="rentedLand"
                set={setRentedLand}
                value={rentedLand}
              />
            </div>
            {rentedLand && (
              <div className="md:col-span-2 md:w-1/2 md:pr-3">
                <Text
                  label="เช่าที่ดินประมาณกี่ไร่"
                  name="rented_land"
                  value={formik.values.rented_land}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.rented_land}
                  touched={formik.touched.rented_land}
                  type="number"
                  minLength={0}
                  maxLength={5000}
                />
              </div>
            )}
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

export default Family;
