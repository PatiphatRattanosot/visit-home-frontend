import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F]+$/;
const phoneRule = /^0[1-9]\d{8}$/;
const userIdRule = /^\d$/;


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
  user_id: yup
    .string().transform((value) => value.trim())
    .matches(userIdRule, "กรุณากรอกเลขที่ประจำตัวบุคลากรให้ถูกต้อง")
    .required("กรุณากรอกเลขที่ประจำตัวบุคลากร"),
  phone: yup
    .string().transform((value) => value.trim())
    .matches(phoneRule, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .required("กรุณากรอกเบอร์โทรศัพท์"),

});