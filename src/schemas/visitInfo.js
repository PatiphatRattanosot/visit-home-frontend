import * as yup from "yup";

export const VisitInfoSchema = yup.object().shape({
  homePicture: yup.mixed().nullable().required(),
  familyPicture: yup.mixed().nullable().required(),
  des_home: yup
    .string()
    .max(255, "คำอธิบายภาพบ้านต้องไม่เกิน 255 ตัวอักษร")
    .required("กรุณากรอกคำอธิบายภาพบ้าน"),
  des_family: yup
    .string()
    .max(255, "คำอธิบายภาพครอบครัวต้องไม่เกิน 255 ตัวอักษร")
    .required("กรุณากรอกคำอธิบายภาพครอบครัว"),
  teacher_comment: yup
    .string()
    .max(500, "ความคิดเห็นต้องไม่เกิน 500 ตัวอักษร")
    .required("กรุณากรอกความคิดเห็นของอาจารย์"),
  student_id: yup.string(),
  teacher_id: yup.string(),
  year_id: yup.string(),
});
