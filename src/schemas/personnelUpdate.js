import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F]+$/;
const phoneRule = /^0[1-9]\d{8}$/;

export const PersonnelSchema = yup.object().shape({
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

  phone: yup
    .string().transform((value) => value.trim())
    .matches(phoneRule, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณากรอกเบอร์โทรศัพท์"),

   status: yup
    .string().transform((value) => value.trim())
    .oneOf([ "Inactive", "Active"], "กรุณาเลือกสถานะที่ถูกต้อง")
    .required("กรุณาเลือกสถานะ"),


});