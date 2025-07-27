import RadioInput from "../../../components/RadioInput";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import TextArea from "../../../components/TextArea";
import { useAuthStore } from "../../../stores/auth.store";
import Stepper from "../../../components/Stepper";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import {
  RelationSchema,
  RelationInitialValues,
} from "../../../schemas/relation";
import BreadcrumbsLoop from "../../../components/students/Breadcrumbs";
import { useStudentFormStore } from "../../../stores/student.store";
import { useEffect } from "react";

const AddRelationForm = () => {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  const { year } = useParams();

  const { setFormData } = useStudentFormStore();

  // stepper path
  const stepperPath = {
    stepOne: `/student/visit-info/${year}/personal-info/add`,
    stepTwo: `/student/visit-info/${year}/relation/add`,
    stepThree: `/student/visit-info/${year}/family-status/add`,
    stepFour: `/student/visit-info/${year}/behavior/add`,
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    initialValues,
  } = useFormik({
    initialValues: RelationInitialValues,
    validationSchema: RelationSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      setFormData({ relation_info: values });
      actions.resetForm();
      navigate(`/student/visit-info/${year}/family-status/add`);
    },
  });

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("student-form-storage"));
    console.log("Local Data:", localData);
    if (localData && localData.state.formData.relation_info) {
      setValues(localData.state.formData.relation_info);
    }
  }, []);

  const relationOpts = ["สนิทสนม", "เฉยๆ", "ห่างเหิน", "ขัดแย้ง", "ไม่มี"];
  const studentAloneOpts = ["ญาติ", "เพื่อนบ้าน", "นักเรียนอยู่บ้านด้วยตนเอง"];
  const familyMembers = [
    "บิดา",
    "มารดา",
    "ลุง",
    "ป้า",
    "น้า",
    "อา",
    "ปู่",
    "ย่า",
    "ตา",
    "ยาย",
    "พี่ชาย",
    "พี่สาว",
  ];
  const parentNeeded = [
    "ด้านการเรียน",
    "ด้านพฤติกรรม",
    "ด้านเศรษฐกิจ (เช่น ขอรับทุน)",
  ];
  const receivedHelp = ["เบี้ยผู้สูงอายุ", "เบี้ยพิการ"];

  console.log(values);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <BreadcrumbsLoop
          options={[
            { link: "/student/visit-info/", label: "ข้อมูลเยี่ยมบ้าน" },
            {
              link: `/student/visit-info/${year}/relation`,
              label: "ความสัมพันธ์ในครอบครัว",
            },
            { label: "เพิ่มความสัมพันธ์ในครอบครัว" },
          ]}
        />
        <div className="flex justify-center mb-9">
          <Stepper step={2} path={stepperPath} />
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-center text-xl font-bold text-gray-600">
            ความสัมพันธ์ในครอบครัวของ{" "}
            <span className="text-black">{`${userInfo?.prefix} ${userInfo?.first_name} ${userInfo?.last_name}`}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* จำนวนสมาชิกในครอบครัว */}
            <TextInput
              label={"สมาชิกในครอบครัวมีเวลาอยู่ร่วมกันกี่ชั่วโมงต่อวัน"}
              name={"family_time"}
              value={values.family_time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.family_time}
              touched={touched.family_time}
              placeholder={"กรอกเวลาที่ใช้ร่วมกัน"}
              type="number"
            />
            {/* เวลาร่วมกัน */}
            <TextInput
              label={"จำนวนสมาชิกในครัวเรือน (รวมตัวนักเรียนด้วย)"}
              name={"family_member"}
              value={values.family_member}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.family_member}
              touched={touched.family_member}
              placeholder={"กรอกจำนวนสมาชิก"}
              type="number"
            />
            {/* ความสัมพันธ์ บิดา */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างบิดา"}
              options={relationOpts}
              className="w-full"
              name={"father_relation"}
              value={values.father_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.father_relation}
              touched={touched.father_relation}
              indexValue
            />
            {/* ความสัมพันธ์ มารดา */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างมารดา"}
              options={relationOpts}
              className="w-full"
              name={"mother_relation"}
              value={values.mother_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.mother_relation}
              touched={touched.mother_relation}
              indexValue
            />
            {/* ความสัมพันธ์ พี่/น้องชาย */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างพี่ชาย,น้องชาย"}
              options={relationOpts}
              className="w-full"
              name={"brother_relation"}
              value={values.brother_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.brother_relation}
              touched={touched.brother_relation}
              indexValue
            />
            {/* ความสัมพันธ์ พี่/น้องสาว */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างพี่สาว,น้องสาว"}
              options={relationOpts}
              className="w-full"
              name={"sister_relation"}
              value={values.sister_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.sister_relation}
              touched={touched.sister_relation}
              indexValue
            />
            {/* ความสัมพันธ์ ปู่/ย่า/ตา/ยาย */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างปู่,ย่า,ตา,ยาย"}
              options={relationOpts}
              className="w-full"
              name={"grand_parent_relation"}
              value={values.grand_parent_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.grand_parent_relation}
              touched={touched.grand_parent_relation}
              indexValue
            />
            {/* ความสัมพันธ์ ญาติๆ */}
            <SelectInput
              label={"ความสัมพันธ์ระหว่างญาติ"}
              options={relationOpts}
              className="w-full"
              name={"relatives_relation"}
              value={values.relatives_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.relatives_relation}
              touched={touched.relatives_relation}
              indexValue
            />
            {/* ความสัมพันธ์อื่นๆ */}
            <TextInput
              label={"คนอื่นๆ"}
              placeholder={"กรอกบุคคลที่รู้จัก"}
              name={"other_relative"}
              value={values.other_relative}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.other_relative}
              touched={touched.other_relative}
            />
            {/* ความสัมพันธ์อื่นๆ */}
            <SelectInput
              label={"ความสัมพันธ์กับคนอื่นๆ"}
              options={relationOpts}
              className="w-full"
              name={"other_relation"}
              value={values.other_relation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.other_relation}
              touched={touched.other_relation}
              indexValue
            />
            {/* เวลาผู้ปกครองไม่อยู่ */}
            <div className="md:col-span-2">
              <RadioInput
                label={
                  "กรณีที่ผู้ปกครองไม่อยู่บ้าน ฝากเด็กนักเรียนอยู่บ้านกับใคร"
                }
                options={studentAloneOpts}
                name={"when_student_alone"}
                value={values.when_student_alone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.when_student_alone}
                touched={touched.when_student_alone}
                extraOpt
              />
            </div>
            {/* รายได้รวม */}
            <div className="md:col-span-2">
              <TextInput
                label={"รายได้รวมของครัวเรือน (บาท)"}
                type="number"
                placeholder={"กรอกรายได้ของครอบครัว"}
                name={"total_household_income"}
                value={values.total_household_income}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.total_household_income}
                touched={touched.total_household_income}
                className="md:w-1/2 md:pr-3"
              />
            </div>
            {/* เงินค่าขนม */}
            <TextInput
              label={"นักเรียนได้เงินมาโรงเรียนวันละ (บาท)"}
              type="number"
              placeholder={"กรอกเงินค่าขนมของนักเรียน"}
              name={"daily_total_to_school"}
              value={values.daily_total_to_school}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.daily_total_to_school}
              touched={touched.daily_total_to_school}
            />
            {/* ได้เงินจาก */}
            <SelectInput
              label={"นักเรียนได้รับค่าใช้จ่ายจาก"}
              options={familyMembers}
              className="w-full"
              name={"received_daily_from"}
              value={values.received_daily_from}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.received_daily_from}
              touched={touched.received_daily_from}
            />
            {/* งาน part-time */}
            <TextInput
              label={"นักเรียนทำงานหารายได้พิเศษ อาชีพ"}
              placeholder={"กรอกอาชีพเสริมของนักเรียน"}
              name={"student_part_time"}
              value={values.student_part_time}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.student_part_time}
              touched={touched.student_part_time}
            />
            {/* รายได้ของนักเรียน */}
            <TextInput
              label={"รายได้จากงานที่ทำ (บาท)"}
              placeholder={"กรอกรายได้ที่นักเรียนได้รับจากงาน"}
              type="number"
              name={"student_income"}
              value={values.student_income}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.student_income}
              touched={touched.student_income}
              disabled={values.student_part_time === ""}
            />
            {/* สิ่งที่ผู้ปกครองอากให้โรงเรียนช่วย */}
            <div className="md:col-span-2">
              <RadioInput
                label={"สิ่งที่ผู้ปกครองต้องการให้โรงเรียนช่วยเหลือนักเรียน"}
                options={parentNeeded}
                extraOpt
                name={"support_from_school"}
                value={values.support_from_school}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.support_from_school}
                touched={touched.support_from_school}
              />
            </div>
            {/* ความช่วยเหลือที่เคยได้รับ */}
            <div className="md:col-span-2">
              <RadioInput
                label={
                  "ความช่วยเหลือที่ครอบครัวเคยได้รับจากหน่วยงานหรือต้องการได้รับการช่วยเหลือ"
                }
                options={receivedHelp}
                extraOpt
                name={"support_from_organize"}
                value={values.support_from_organize}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.support_from_organize}
                touched={touched.support_from_organize}
              />
            </div>
            {/* ความห่วงใยของผู้ปกครองที่มีต่อนักเรียน */}
            <div className="md:col-span-2">
              <TextArea
                label={"ความห่วงใยของผู้ปกครองที่มีต่อนักเรียน"}
                placeholder={"กรอกความคิดเห็นที่นี่"}
                name={"parent_concern"}
                value={values.parent_concern}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.parent_concern}
                touched={touched.parent_concern}
              />
            </div>
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn-gray w-1/2"
              type="button"
              onClick={() => {
                setValues(initialValues);
                setFormData({ relation_info: values });
                navigate(`/student/visit-info/${year}/personal-info/add`);
              }}
            >
              ก่อนหน้า
            </button>
            <button type="submit" className="btn-gray w-1/2">
              ถัดไป
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRelationForm;
