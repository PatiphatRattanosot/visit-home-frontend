import { string, number, object, array } from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;
const phoneRule = /^(\+66|0)([1-9]\d{8})$/;
const choiceOptions = /^[0-4]$/;

export const initialFormValues = {
  // Page 1 Personal Information
  father_prefix: "",
  father_name: "",
  father_last_name: "",
  father_phone: "",
  father_job: "",
  mother_prefix: "",
  mother_name: "",
  mother_last_name: "",
  mother_phone: "",
  mother_job: "",
  parent_prefix: "",
  parent_name: "",
  parent_last_name: "",
  parent_phone: "",
  parent_job: "",
  lat: 0,
  lng: 0,
  // Page 2 Relationship Information
  family_relation_status: "",
  family_member: 1,
  family_time: 0,
  father_relation: "0",
  mother_relation: "0",
  big_brother_relation: "",
  lil_brother_relation: "",
  big_sister_relation: "",
  lil_sister_relation: "",
  grandparent_relation: "",
  relative_relation: "",
  // Page 3 Family Information
  total_household_income: 0,
  received_daily_from: "0",
  daily_total_to_school: 0,
  student_part_time: "",
  student_income: 0,
  household_burdens: [],
  housing_type: "",
  housing_condition: "",
  family_vehicles: [],
  owned_land: 0,
  rented_land: 0,
  // Page 4 Behavioral Information
  student_resp: [],
  other_student_resp: "",
  hobbies: [],
  other_hobbies: "",
  drugs_behav: [],
  violent_behav: [],
  other_violent_behav: "",
  sexual_behav: [],
  computer_internet_access: "",
  tech_use_behav: "",
  gaming_behav: [],
  other_gaming_behav: "",
  // Page 5 Risk Information
  when_student_alone: "",
  health_risk: [],
  welfare_and_safety: [],
  distance_to_school: 0,
  time_used: 0,
  school_transport: "",
  // Page 6 Additional Information
  support_from_organize: "",
  support_from_school: "",
  parent_concern: "",
};

export const formValidation = object().shape({
  // Page 1 Personal Information
  father_prefix: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  father_name: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  father_last_name: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  father_phone: string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  father_job: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  mother_prefix: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  mother_name: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  mother_last_name: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  mother_phone: string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  mother_job: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_prefix: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_name: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_last_name: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_phone: string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  parent_job: string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  lat: number().required("กรุณาตอบคำถาม"),
  lng: number().required("กรุณาตอบคำถาม"),
  // Page 2 Relationship Information
  family_relation_status: string()
    .matches(/^[0-4]$/, "กรุณาเลือกสถานะความสัมพันธ์ของครอบครัว")
    .required("กรุณาตอบคำถาม"),
  family_member: number()
    .min(1, "จำนวนสมาชิกในครอบครัวไม่ควรน้อยกว่า 1")
    .required("กรุณาตอบคำถาม"),
  family_time: number()
    .min(0, "เวลาที่ใช้ร่วมกันในครอบครัวไม่ควรเป็น 0")
    .required("กรุณาตอบคำถาม"),
  father_relation: string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับบิดา")
    .required("กรุณาตอบคำถาม"),
  mother_relation: string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับมารดา")
    .required("กรุณาตอบคำถาม"),
  big_brother_relation: string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับพี่ชาย")
    .required("กรุณาตอบคำถาม"),
  lil_brother_relation: string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับน้องชาย")
    .required("กรุณาตอบคำถาม"),
  big_sister_relation: string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับพี่สาว")
    .required("กรุณาตอบคำถาม"),
  lil_sister_relation: string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับน้องสาว")
    .required("กรุณาตอบคำถาม"),
  grandparent_relation: string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับปู่ย่าตายาย")
    .required("กรุณาตอบคำถาม"),
  relative_relation: string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับญาติพี่น้อง")
    .required("กรุณาตอบคำถาม"),
  // Page 3 Family Information
  total_household_income: string()
    .matches(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
    .min(0, "รายได้รวมของครัวเรือนไม่ควรน้อยกว่า 0")
    .required("กรุณาตอบคำถาม"),
  received_daily_from: string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  daily_total_to_school: string()
    .matches(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
    .min(0, "เงินที่นักเรียนได้รับไม่ควรน้อยกว่า 0")
    .required("กรุณาตอบคำถาม"),
  student_part_time: string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  student_income: number()
    .min(0, "รายได้ของนักเรียนไม่ควรน้อยกว่า 0")
    .required("กรุณาตอบคำถาม"),
  household_burdens: array()
    .of(string().matches(/^[0-3]$/, "กรุณากรอกเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  housing_type: string()
    .matches(/^[0-2]$/, "กรุณากรอกเลือกคำตอบ")
    .required("กรุณาตอบคำถาม"),
  housing_condition: string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  family_vehicles: array()
    .of(string().matches(/^[0-3]$/, "กรุณากรอกเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  owned_land: number()
    .min(0, "จำนวนที่ดินไม่ควรน้อยกว่า 0")
    .required("กรุณาตอบคำถาม"),
  rented_land: number()
    .min(0, "จำนวนที่ดินไม่ควรน้อยกว่า 0")
    .required("กรุณาตอบคำถาม"),
  // Page 4 Behavioral Information
  student_resp: array()
    .of(string().matches(/^[0-4]$/, "กรุณาเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  other_student_resp: string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  hobbies: array()
    .of(string().matches(/^[0-7]$/, "กรุณาเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  other_hobbies: string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  drugs_behav: array()
    .of(string().matches(/^[0-4]$/, "กรุณาเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  violent_behav: array()
    .of(string().matches(/^[0-4]$/, "กรุณาเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  other_violent_behav: string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  sexual_behav: array()
    .of(string().matches(/^[0-5]$/, "กรุณาเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  computer_internet_access: string()
    .matches(/^[0-1]$/, "กรุณาเลือกคำตอบ")
    .required("กรุณาตอบคำถาม"),
  tech_use_behav: string()
    .matches(/^[0-1]$/, "กรุณาเลือกคำตอบ")
    .required("กรุณาตอบคำถาม"),
  gaming_behav: array()
    .of(string().matches(/^[0-8]$/, "กรุณาตอบเป็นภาษาไทย"))
    .required("กรุณาตอบคำถาม"),
  other_gaming_behav: string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  // Page 5 Risk Information
  when_student_alone: string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  health_risk: array()
    .of(string().matches(/^[0-5]$/, "กรุณาเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  welfare_and_safety: array()
    .of(string().matches(/^(?:[0-9]|10|11)$/, "กรุณาเลือกคำตอบ"))
    .required("กรุณาตอบคำถาม"),
  distance_to_school: number()
    .min(0, "ระยะทางไม่ควรเป็นลบ")
    .required("กรุณาตอบคำถาม"),
  time_used: number()
    .min(0, "เวลาเดินทางไม่ควรเป็นลบ")
    .required("กรุณาตอบคำถาม"),
  school_transport: string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  // Page 6 Additional Information
  support_from_organize: string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  support_from_school: string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_concern: string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
});
