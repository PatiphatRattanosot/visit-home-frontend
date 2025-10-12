import { string, number, object, array } from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;
const phoneRule = /^0[1-9]\d{8}$/;
const choiceOptions = /^[0-4]$/;

export const initialFormValues = {
  // Page 1 Personal Information
  phone: "",
  father_prefix: "นาย",
  father_name: "",
  father_last_name: "",
  father_phone: "",
  father_job: "",
  mother_prefix: "นาง",
  mother_name: "",
  mother_last_name: "",
  mother_phone: "",
  mother_job: "",
  parent_prefix: "",
  parent_name: "",
  parent_last_name: "",
  parent_phone: "",
  parent_job: "",
  lat: "",
  lng: "",
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
  support_from_organize: [],
  support_from_school: [],
  parent_concern: "",
};

export const formValidation = object().shape({
  // Page 1 Personal Information
  phone: string()
    .transform((value) => value?.trim())
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  father_prefix: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  father_name: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  father_last_name: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  father_phone: string()
    .transform((value) => value?.trim())
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  father_job: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  mother_prefix: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  mother_name: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  mother_last_name: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  mother_phone: string()
    .transform((value) => value?.trim())
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  mother_job: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_prefix: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_name: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_last_name: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  parent_phone: string()
    .transform((value) => value?.trim())
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  parent_job: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย")
    .required("กรุณาตอบคำถาม"),
  lat: number()
    .typeError("กรุณากรอกเป็นตัวเลข")
    .required("กรุณาเลือกตำแหน่งบนแผนที่"),
  lng: number()
    .typeError("กรุณากรอกเป็นตัวเลข")
    .required("กรุณาเลือกตำแหน่งบนแผนที่"),
  // Page 2 Relationship Information
  family_relation_status: string()
    .transform((value) => value?.trim())
    .matches(/^[0-4]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  family_member: number()
    .min(1, "จำนวนสมาชิกในครอบครัวไม่ควรน้อยกว่า 1")
    .required("กรุณาตอบคำถาม"),
  family_time: number()
    .min(0, "เวลาที่ใช้ร่วมกันในครอบครัวไม่ควรเป็น 0")
    .required("กรุณาตอบคำถาม"),
  father_relation: string()
    .transform((value) => value?.trim())
    .matches(choiceOptions, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  mother_relation: string()
    .transform((value) => value?.trim())
    .matches(choiceOptions, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  big_brother_relation: string()
    .transform((value) => value?.trim())
    .matches(choiceOptions, "กรุณาเลือกคำตอบให้ถูกต้อง"),
  lil_brother_relation: string()
    .transform((value) => value?.trim())
    .matches(choiceOptions, "กรุณาเลือกคำตอบให้ถูกต้อง"),
  big_sister_relation: string()
    .transform((value) => value?.trim())
    .matches(choiceOptions, "กรุณาเลือกคำตอบให้ถูกต้อง"),
  lil_sister_relation: string()
    .transform((value) => value?.trim())
    .matches(choiceOptions, "กรุณาเลือกคำตอบให้ถูกต้อง"),
  grandparent_relation: string()
    .transform((value) => value?.trim())
    .matches(choiceOptions, "กรุณาเลือกคำตอบให้ถูกต้อง"),
  relative_relation: string()
    .transform((value) => value?.trim())
    .matches(choiceOptions, "กรุณาเลือกคำตอบให้ถูกต้อง"),
  // Page 3 Family Information
  total_household_income: number()
    .min(0, "รายได้รวมของครัวเรือนไม่ควรน้อยกว่า 0")
    .required("กรุณาตอบคำถาม"),
  received_daily_from: string()
    .transform((value) => value?.trim())
    .matches(/^(?:[0-9]|10|11)$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  daily_total_to_school: string()
    .transform((value) => value?.trim())
    .matches(/^\d+$/, "กรุณากรอกเป็นตัวเลข")
    .min(0, "เงินที่นักเรียนได้รับไม่ควรน้อยกว่า 0")
    .required("กรุณาตอบคำถาม"),
  student_part_time: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  student_income: number().min(0, "รายได้ของนักเรียนไม่ควรน้อยกว่า 0"),
  household_burdens: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-3]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  housing_type: string()
    .transform((value) => value?.trim())
    .matches(/^[0-2]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  housing_condition: string()
    .transform((value) => value?.trim())
    .matches(/^[0-2]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  family_vehicles: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-3]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  owned_land: number().min(0, "จำนวนที่ดินไม่ควรน้อยกว่า 0"),
  rented_land: number().min(0, "จำนวนที่ดินไม่ควรน้อยกว่า 0"),
  // Page 4 Behavioral Information
  student_resp: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-4]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  other_student_resp: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  hobbies: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-7]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  other_hobbies: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  drugs_behav: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-4]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  violent_behav: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-4]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  other_violent_behav: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  sexual_behav: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-5]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  computer_internet_access: string()
    .transform((value) => value?.trim())
    .matches(/^[0-1]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  tech_use_behav: string()
    .transform((value) => value?.trim())
    .matches(/^[0-1]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  gaming_behav: array()
    .of(
      string()
        .transform((value) => value?.trim())
        .matches(/^[0-8]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    )
    .required("กรุณาตอบคำถาม"),
  other_gaming_behav: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  // Page 5 Risk Information
  when_student_alone: string()
    .transform((value) => value?.trim())
    .matches(/^[0-2]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  health_risk: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-5]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  welfare_and_safety: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^(?:[0-9]|10|11)$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  distance_to_school: number()
    .min(0, "ระยะทางไม่ควรเป็นลบ")
    .required("กรุณาตอบคำถาม"),
  time_used: number()
    .min(0, "เวลาเดินทางไม่ควรเป็นลบ")
    .required("กรุณาตอบคำถาม"),
  school_transport: string()
    .transform((value) => value?.trim())
    .matches(/^[0-6]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
    .required("กรุณาตอบคำถาม"),
  // Page 6 Additional Information
  support_from_organize: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-1]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  support_from_school: array().of(
    string()
      .transform((value) => value?.trim())
      .matches(/^[0-2]$/, "กรุณาเลือกคำตอบให้ถูกต้อง")
  ),
  parent_concern: string()
    .transform((value) => value?.trim())
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
});
