import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;
const phoneRule = /^\d+$/;

export const PersonalInfoSchema = yup.object().shape({
  father_prefix: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  father_name: yup.string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  father_last_name: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  father_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  father_job: yup.string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  mother_prefix: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  mother_name: yup.string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  mother_last_name: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  mother_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  mother_job: yup.string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  family_relation_status: yup
    .string()
    .matches(/^[0-4]$/, "กรุณาเลือกสถานะความสัมพันธ์ของครอบครัว"),
  parent_prefix: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  parent_name: yup.string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  parent_last_name: yup
    .string()
    .matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  parent_phone: yup
    .string()
    .matches(phoneRule, "กรุณากรอกตัวเลขอย่างเดียว")
    .min(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
    .max(10, "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง"),
  parent_job: yup.string().matches(onlyThaiLang, "กรุณากรอกข้อมูลเป็นภาษาไทย"),
  lat: yup.number(),
  lng: yup.number(),
});

export const PersonalInfoInitialValues = {
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
};
