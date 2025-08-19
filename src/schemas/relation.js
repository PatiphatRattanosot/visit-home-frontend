import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;
const choiceOptions = /^[0-4]$/;

export const RelationSchema = yup.object().shape({
  family_member: yup.number().min(1, "จำนวนสมาชิกในครอบครัวไม่ควรน้อยกว่า 1"),
  family_time: yup.number().min(0, "เวลาที่ใช้ร่วมกันในครอบครัวไม่ควรเป็น 0"),
  father_relation: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับบิดา"),
  mother_relation: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับมารดา"),
  brother_relation: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับพี่ชาย"),
  sister_relation: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับพี่สาว"),
  grand_parent_relation: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับปู่ย่าตายาย"),
  relatives_relation: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับญาติพี่น้อง"),
  other_relative: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  other_relation: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกความสัมพันธ์กับญาติอื่น"),
  when_student_alone: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  total_household_income: yup
    .number()
    .min(0, "รายได้รวมของครัวเรือนไม่ควรน้อยกว่า 0"),
  daily_total_to_school: yup
    .number()
    .min(0, "เงินที่นักเรียนได้รับไม่ควรน้อยกว่า 0"),
  received_daily_from: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  student_part_time: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  student_income: yup.number().min(0, "รายได้ของนักเรียนไม่ควรน้อยกว่า 0"),
  support_from_school: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  support_from_organize: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  parent_concern: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
});

export const RelationInitialValues = {
  family_member: 1,
  family_time: 0,
  father_relation: "1",
  mother_relation: "1",
  brother_relation: "1",
  sister_relation: "1",
  grand_parent_relation: "1",
  relatives_relation: "1",
  other_relative: "",
  other_relation: "4",
  when_student_alone: "",
  total_household_income: 0,
  daily_total_to_school: 0,
  received_daily_from: "",
  student_part_time: "",
  student_income: 0,
  support_from_school: "",
  support_from_organize: "",
  parent_concern: "",
}