import { string, number, object, array } from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;
const phoneRule = /^\d+$/;
const choiceOptions = /^[0-4]$/;

export const initialFormValues = {
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
  family_relation_status: "",
  parent_prefix: "",
  parent_name: "",
  parent_last_name: "",
  parent_phone: "",
  parent_job: "",
  lat: 0,
  lng: 0,
  family_member: 1,
  family_time: 0,
  father_relation: "0",
  mother_relation: "0",
  brother_relation: "0",
  sister_relation: "0",
  grand_parent_relation: "0",
  relatives_relation: "0",
  other_relative: "",
  other_relation: "4",
  when_student_alone: "",
  total_household_income: 0,
  daily_total_to_school: 0,
  received_daily_from: "0",
  student_part_time: "",
  student_income: 0,
  support_from_school: "",
  support_from_organize: "",
  parent_concern: "",
  household_burdens: [],
  housing_type: "",
  housing_condition: "",
  family_vehicles: [],
  owned_land: 0,
  rented_land: 0,
  health_risk: [],
  welfare_and_safety: [],
  distance_to_school: 0,
  time_used: 0,
  school_transport: "",
  student_resp: [],
  student_resp_other: "",
  hobbies: [],
  other_hobbies: "",
  drugs_behav: [],
  violent_behav: [],
  other_violent_behav: "",
  sexual_behav: [],
  gaming_behav: [],
  other_gaming_behav: "",
  computer_internet_access: "",
  tech_use_behav: "",
  information_giver: "",
};

export const formValidation = object().shape({
  father_prefix: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  father_name: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  father_last_name: string().matches(
    onlyThaiLang,
    "กรุณากรอกข้อมูลเป็นภาษาไทย"
  ),
  father_phone: string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  father_job: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  mother_prefix: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  mother_name: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  mother_last_name: string().matches(
    onlyThaiLang,
    "กรุณากรอกข้อมูลเป็นภาษาไทย"
  ),
  mother_phone: string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  mother_job: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  family_relation_status: string().matches(
    /^[0-4]$/,
    "กรุณาเลือกสถานะความสัมพันธ์ของครอบครัว"
  ),
  parent_prefix: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  parent_name: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  parent_last_name: string().matches(
    onlyThaiLang,
    "กรุณากรอกข้อมูลเป็นภาษาไทย"
  ),
  parent_phone: string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  parent_job: string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  lat: number(),
  lng: number(),
  family_member: number().min(1, "จำนวนสมาชิกในครอบครัวไม่ควรน้อยกว่า 1"),
  family_time: number().min(0, "เวลาที่ใช้ร่วมกันในครอบครัวไม่ควรเป็น 0"),
  father_relation: string().matches(
    choiceOptions,
    "กรุณาเลือกความสัมพันธ์กับบิดา"
  ),
  mother_relation: string().matches(
    choiceOptions,
    "กรุณาเลือกความสัมพันธ์กับมารดา"
  ),
  brother_relation: string().matches(
    choiceOptions,
    "กรุณาเลือกความสัมพันธ์กับพี่ชาย"
  ),
  sister_relation: string().matches(
    choiceOptions,
    "กรุณาเลือกความสัมพันธ์กับพี่สาว"
  ),
  grand_parent_relation: string().matches(
    choiceOptions,
    "กรุณาเลือกความสัมพันธ์กับปู่ย่าตายาย"
  ),
  relatives_relation: string().matches(
    choiceOptions,
    "กรุณาเลือกความสัมพันธ์กับญาติพี่น้อง"
  ),
  other_relative: string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  other_relation: string().matches(
    choiceOptions,
    "กรุณาเลือกความสัมพันธ์กับญาติอื่น"
  ),
  when_student_alone: string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  total_household_income: string()
    .matches(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
    .min(0, "รายได้รวมของครัวเรือนไม่ควรน้อยกว่า 0"),
  daily_total_to_school: string()
    .matches(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
    .min(0, "เงินที่นักเรียนได้รับไม่ควรน้อยกว่า 0"),
  received_daily_from: string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  student_part_time: string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  student_income: number().min(0, "รายได้ของนักเรียนไม่ควรน้อยกว่า 0"),
  support_from_school: string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  support_from_organize: string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  parent_concern: string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  household_burdens: array().of(
    string().matches(/^[0-3]$/, "กรุณากรอกเลือกคำตอบ")
  ),
  housing_type: string().matches(/^[0-2]$/, "กรุณากรอกเลือกคำตอบ"),
  housing_condition: string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  family_vehicles: array().of(
    string().matches(/^[0-3]$/, "กรุณากรอกเลือกคำตอบ")
  ),
  owned_land: number().min(0, "จำนวนที่ดินไม่ควรน้อยกว่า 0"),
  rented_land: number().min(0, "จำนวนที่ดินไม่ควรน้อยกว่า 0"),
  health_risk: array().of(string().matches(/^[0-5]$/, "กรุณาเลือกคำตอบ")),
  welfare_and_safety: array().of(
    string().matches(/^(?:[0-9]|10|11)$/, "กรุณาเลือกคำตอบ")
  ),
  distance_to_school: number().min(0, "ระยะทางไม่ควรเป็นลบ"),
  time_used: number().min(0, "เวลาเดินทางไม่ควรเป็นลบ"),
  school_transport: string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  student_resp: array().of(string().matches(/^[0-4]$/, "กรุณาเลือกคำตอบ")),
  student_resp_other: string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  hobbies: array().of(string().matches(/^[0-7]$/, "กรุณาเลือกคำตอบ")),
  other_hobbies: string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  drugs_behav: array().of(string().matches(/^[0-4]$/, "กรุณาเลือกคำตอบ")),
  violent_behav: array().of(string().matches(/^[0-4]$/, "กรุณาเลือกคำตอบ")),
  other_violent_behav: string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  sexual_behav: array().of(string().matches(/^[0-5]$/, "กรุณาเลือกคำตอบ")),
  gaming_behav: array().of(string().matches(/^[0-8]$/, "กรุณาตอบเป็นภาษาไทย")),
  other_gaming_behav: string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  computer_internet_access: string().matches(/^[0-1]$/, "กรุณาเลือกคำตอบ"),
  tech_use_behav: string().matches(/^[0-1]$/, "กรุณาเลือกคำตอบ"),
  information_giver: string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
});
