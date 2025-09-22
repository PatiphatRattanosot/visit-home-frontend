import * as yup from "yup";

export const ClassroomSchema = yup.object().shape({
  room: yup
    .number()
    .typeError("กรุณากรอกเลขชั้นเรียนเป็นตัวเลข")
    .integer("ไม่อนุญาตให้กรอกทศนิยม")
    .min(1, "กรุณากรอกเลขชั้นเรียนตั้งแต่ 1")
    .max(6, "กรุณากรอกเลขชั้นเรียนไม่เกิน 6")
    .required("กรุณากรอกเลขชั้นเรียน"),
  number: yup
    .number()
    .typeError("กรุณากรอกห้องเรียนเป็นตัวเลข")
    .integer("ไม่อนุญาตให้กรอกทศนิยม")
    .min(1, "กรุณากรอกห้องเรียนตั้งแต่ 1")
    .max(7, "กรุณากรอกห้องเรียนไม่เกิน 7")
    .required("กรุณากรอกห้องเรียน"),
  teacherId: yup.string().required("กรุณาเลือกครูที่ปรึกษา"),
});
