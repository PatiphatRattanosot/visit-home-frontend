import * as yup from "yup";

export const VisitInfoSchema = yup.object().shape({
  home_description: yup
    .string()
    .max(255, "คำอธิบายภาพบ้านต้องไม่เกิน 255 ตัวอักษร")
    .required("กรุณากรอกคำอธิบายภาพบ้าน"),
  family_description: yup
    .string()
    .max(255, "คำอธิบายภาพครอบครัวต้องไม่เกิน 255 ตัวอักษร")
    .required("กรุณากรอกคำอธิบายภาพครอบครัว"),
  comment: yup
    .string()
    .max(500, "ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร")
    .required("กรุณากรอกความคิดเห็นของอาจารย์"),
  student_id: yup.string(),
  teacher_id: yup.string(),
  year_id: yup.string(),
});
