import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F]+$/;
const numberRule = /^\d+$/;

export const studentSchema = yup.object().shape({
  prefix: yup
    .string()
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณาเลือกคำนำหน้า"),
  first_name: yup
    .string().transform((value) => value.trim())
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกชื่อ"),
  last_name: yup
    .string().transform((value) => value.trim())
    .matches(onlyThaiLang, "จำเป็นต้องเป็นภาษาไทย")
    .required("กรุณากรอกนามสกุล"),
  user_id: yup
    .string().transform((value) => value.trim())
    .matches(numberRule, "กรุณากรอกเลขที่ประจำตัวบุคลากรให้ถูกต้อง")
    .required("กรุณากรอกเลขที่ประจำตัวบุคลากร"),
  class_id: yup.string(),
});
