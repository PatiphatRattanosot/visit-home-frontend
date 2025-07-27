import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router";
import { useAuthStore } from "../../../stores/auth.store";
import Stepper from "../../../components/Stepper";
import CheckboxInput from "../../../components/CheckboxInput";
import RadioInput from "../../../components/RadioInput";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import {
  BehaviorSchema,
  BehaviorInitialValues,
} from "../../../schemas/behavior";
import BreadcrumbsLoop from "../../../components/students/Breadcrumbs";
import { useStudentFormStore } from "../../../stores/student.store";
import { useEffect } from "react";

const AddBehaviorForm = () => {
  const { userInfo } = useAuthStore();

  const { setFormData, submitForm } = useStudentFormStore();

  const {
    initialValues,
    values,
    setValues,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: BehaviorInitialValues,
    validationSchema: BehaviorSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      setFormData({ behavior_and_risk: values });
      const localFormData = JSON.parse(
        localStorage.getItem("student-form-storage")
      );
      if (localFormData) {
        await submitForm(userInfo._id, year, localFormData.state.formData);
      }
      actions.resetForm();
    },
  });

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("student-form-storage"));
    console.log("Local Data:", localData);
    if (localData && localData.state.formData.behavior_and_risk) {
      setValues(localData.state.formData.behavior_and_risk);
    }
  }, []);

  const { year } = useParams();
  const navigate = useNavigate();
  // stepper path
  const stepperPath = {
    stepOne: `/student/visit-info/${year}/personal-info/add`,
    stepTwo: `/student/visit-info/${year}/relation/add`,
    stepThree: `/student/visit-info/${year}/family-status/add`,
    stepFour: `/student/visit-info/${year}/behavior/add`,
  };

  const familyMember = [
    "บิดา",
    "มารดา",
    "พี่ชาย",
    "พี่สาว",
    "ลุง",
    "ป้า",
    "น้า",
    "อา",
    "ปู่",
    "ย่า",
    "ตา",
    "ยาย",
    "ทวด",
    "พ่อเลี้ยง",
    "แม่เลี้ยง",
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <BreadcrumbsLoop
          options={[
            { link: "/student/visit-info/", label: "ข้อมูลเยี่ยมบ้าน" },
            {
              link: `/student/visit-info/${year}/behavior`,
              label: "พฤติกรรมและความเสี่ยง",
            },
            { label: "เพิ่มพฤติกรรมและความเสี่ยง" },
          ]}
        />
        <div className="flex justify-center mb-9">
          <Stepper step={4} path={stepperPath} />
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-center text-xl font-bold text-gray-600">
            พฤติกรรมและความเสี่ยงของ{" "}
            <span className="text-black">{`${userInfo?.prefix} ${userInfo?.first_name} ${userInfo?.last_name}`}</span>
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-8">
            {/* สุขภาพ */}
            <CheckboxInput
              label={"ด้านสุขภาพ (ตอบได้มากกว่า 1 ข้อ)"}
              options={[
                "ร่างกายแข็งแรง",
                "ร่างกายไม่แข็งแรง",
                "สมรรถภาพทางร่างกายต่ำ",
                "มีโรคประจำตัวหรือเจ็บป่วยบ่อย",
                "ป่วยเป็นโรคร้ายแรง/เรื้อรัง",
                "มีภาวะทุพโภชนาการ",
              ]}
              name={"health_risk"}
              value={values.health_risk}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.health_risk}
              touched={touched.health_risk}
              grid="grid-cols-2"
            />
            {/* สวัสดิการหรือความปลอดภัย */}
            <CheckboxInput
              label={"สวัสดิการหรือความปลอดภัย (ตอบได้มากกว่า 1 ข้อ)"}
              options={[
                "ไม่มีความเสี่ยงใดๆ",
                "พ่อแม่แยกทางกัน หรือ แต่งงานใหม่",
                "มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้าย",
                "บุคคลในครอบครัวเล่นการพนัน",
                "ไม่มีผู้ดูแล",
                "ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน",
                "พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์",
                "เล่นการพนัน",
                "บุคคลในครอบครัวติดสารเสพติดแรง/เรื้อรัง/ติดต่อ",
                "มีความขัดแย้ง/ทะเลาะกันในครอบครัว",
                "ความขัดแย้งและมีการใช้ความรุนแรงในครอบครัว",
                "ถูกล่วงละเมิดทางเพศ",
              ]}
              name={"welfare_and_safety"}
              value={values.welfare_and_safety}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.welfare_and_safety}
              touched={touched.welfare_and_safety}
              grid="grid-cols-2"
            />
            {/* group การเดินทาง */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ระยะทางไปโรงเรียน */}
              <TextInput
                type="number"
                label={"ระยะทางจากบ้านไปโรงเรียนประมาณ (กิโลเมตร)"}
                name={"distance_to_school"}
                value={values.distance_to_school}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.distance_to_school}
                touched={touched.distance_to_school}
                placeholder={"กรอกระยะทางไปโรงเรียน"}
              />
              {/* เวลาเดินทาง */}
              <TextInput
                type="number"
                label={"เวลาที่ใช้เดินทางโดยประมาณ (ชั่วโมง)"}
                name={"time_used"}
                value={values.time_used}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.time_used}
                touched={touched.time_used}
                placeholder={"กรอกเวลาที่ใช้ในการเดินทาง"}
              />
            </div>
            {/* วิธีการเดินทาง */}
            <RadioInput
              label={"วิธีการเดินทางของนักเรียนไปโรงเรียน"}
              name={"school_transport"}
              value={values.school_transport}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.school_transport}
              touched={touched.school_transport}
              options={[
                "ผู้ปกครองมาส่ง",
                "รถโดยสารประจำทาง",
                "รถจักรยานยนต์",
                "รถโรงเรียน",
                "รถยนต์",
                "รถจักรยาน",
                "เดิน",
              ]}
              extraOpt
              grid="grid-cols-2"
            />
            {/* ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว */}
            <CheckboxInput
              label={
                "ภาระงานความรับผิดชอบของนักเรียนที่มีต่อครอบครัว (ตอบได้มากกว่า 1 ข้อ)"
              }
              name={"student_responsibilities"}
              value={values.student_responsibilities}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.student_responsibilities}
              touched={touched.student_responsibilities}
              options={[
                "ช่วยงานบ้าน",
                "ช่วยคนดูแลคนเจ็บป่วย/พิการ",
                "ช่วยค้าขายเล็กๆน้อยๆ",
                "ทำงานพิเศษแถวบ้าน",
                "ช่วยงานในนาไร่",
              ]}
              extraOpt
              grid="grid-cols-2"
              setFieldValue={setFieldValue}
            />
            {/* กิจกรรมยามว่างหรืองานอดิเรก */}
            <CheckboxInput
              label={"กิจกรรมยามว่างหรืองานอดิเรก (ตอบได้มากกว่า 1 ข้อ)"}
              name={"hobbies"}
              value={values.hobbies}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.hobbies}
              touched={touched.hobbies}
              options={[
                "ดูทีวี/ ฟังเพลง",
                "ไปเที่ยวห้าง/ ดูหนัง",
                "อ่านหนังสือ",
                "ไปหาเพื่อน/ เพื่อน",
                "แว้น/ สก๊อย",
                "เล่นเกม คอม / มือถือ",
                "ไปสวนสาธารณะ",
                "เล่นดนตรี",
              ]}
              extraOpt
              grid="grid-cols-2"
              setFieldValue={setFieldValue}
            />
            {/* พฤติกรรมการใช้สารเสพติด */}
            <CheckboxInput
              label={"พฤติกรรมการใช้สารเสพติด (ตอบได้มากกว่า 1 ข้อ)"}
              name={"drugs_behav"}
              value={values.drugs_behav}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.drugs_behav}
              touched={touched.drugs_behav}
              options={[
                "คบเพื่อนในกลุ่มที่ใช้สารเสพติด",
                "สมาชิกในครอบครัวข้องเกี่ยวกับยาเสพติด",
                "อยู่ในสภาพแวดล้อมที่ใช้สารเสพติด",
                "ปัจจุบันเกี่ยวข้องกับสารเสพติด",
                "เป็นผู้ติดบุหรี่ สุรา หรือการใช้สารเสพติดอื่นๆ",
              ]}
              grid="grid-cols-2"
            />
            {/* พฤติกรรมการใช้ความรุนแรง */}
            <CheckboxInput
              label={"พฤติกรรมการใช้ความรุนแรง (ตอบได้มากกว่า 1 ข้อ)"}
              name={"violent_behav"}
              value={values.violent_behav}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.violent_behav}
              touched={touched.violent_behav}
              options={[
                "มีการทะเลาะวิวาท",
                "ก้าวร้าว เกเร",
                "ทะเลาะวิวาทเป็นประจำ",
                "ทำร้ายร่างกายผู้อื่น",
                "ทำร้ายร่างกายตนเอง",
              ]}
              extraOpt
              grid="grid-cols-2"
              setFieldValue={setFieldValue}
            />
            {/* พฤติกรรมทางเพศ */}
            <CheckboxInput
              label={"พฤติกรรมทางเพศ (ตอบได้มากกว่า 1 ข้อ)"}
              name={"sexual_behav"}
              value={values.sexual_behav}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.sexual_behav}
              touched={touched.sexual_behav}
              options={[
                "อยู่ในกลุ่มขายบริการ",
                "ใช้เครื่องมือสื่อสารที่เกี่ยวข้องกับด้านเพศเป็นเวลานานและบ่อยครั้ง",
                "ตั้งครรภ์",
                "ขายบริการทางเพศ",
                "หมกมุ่นในการใช้เครื่องมือสื่อสารที่เกี่ยวข้องทางเพศ",
                "มีการมั่วสุมทางเพศ",
              ]}
              grid="grid-cols-2"
            />
            {/* การติดเกม */}
            <CheckboxInput
              label={"การติดเกม (ตอบได้มากกว่า 1 ข้อ)"}
              name={"gaming_behav"}
              value={values.gaming_behav}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.gaming_behav}
              touched={touched.gaming_behav}
              options={[
                "เล่นเกมเกินวันละ 1 ชั่วโมง",
                "ขาดจินตนาการและความคิดสร้างสรรค์",
                "เก็บตัว แยกตัวจากกลุ่มเพื่อน",
                "ใช้จ่ายเงินผิดปกติ",
                "อยู่ในกลุ่มเพื่อนเล่นเกม",
                "ร้านเกมอยู่ใกล้บ้านหรือโรงเรียน",
                "ใช้เวลาเล่นเกมเกิน 2 ชั่วโมง",
                "หมกมุ่น จริงจังในการเล่นเกม",
                "ใช้เงินสิ้นเปลือง โกหก ลักขโมยเงินเพื่อเล่นเกม",
              ]}
              extraOpt
              grid="grid-cols-2"
              setFieldValue={setFieldValue}
            />
            {/* การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน */}
            <RadioInput
              label={"การเข้าถึงสื่อคอมพิวเตอร์และอินเตอร์เน็ตที่บ้าน"}
              name={"computer_internet_access"}
              value={values.computer_internet_access}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.computer_internet_access}
              touched={touched.computer_internet_access}
              options={[
                "สามารถเข้าถึง Internet ได้จากที่บ้าน",
                "ไม่สามารถเข้าถึง Internet ได้จากที่บ้าน",
              ]}
              grid="grid-cols-2"
            />
            {/* การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์ */}
            <RadioInput
              label={"การใช้เครื่องมือสื่อสารอิเล็กทรอนิกส์"}
              name={"tech_use_behav"}
              value={values.tech_use_behav}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.tech_use_behav}
              touched={touched.tech_use_behav}
              options={[
                "ใช้ Social media/game (ไม่เกินวันละ 3 ชั่วโมง)",
                "ใช้ Social media/game (วันละ 3 ชั่วโมงขึ้นไป)",
              ]}
              grid="grid-cols-2"
            />
            {/* ผู้ให้ข้อมูล */}
            <SelectInput
              label={"ผู้ให้ข้อมูลนักเรียน"}
              name={"information_giver"}
              value={values.information_giver}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.information_giver}
              touched={touched.information_giver}
              options={familyMember}
              defaultOpt={"ผู้ให้ข้อมูล"}
              className="w-1/2 pr-3"
            />
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn-gray w-1/2"
              type="button"
              onClick={() => {
                setValues(initialValues);
                setFormData({ behavior_and_risk: values });
                navigate(`/student/visit-info/${year}/family-status/add`);
              }}
            >
              ก่อนหน้า
            </button>
            <button type="submit" className="btn-green w-1/2">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBehaviorForm;
