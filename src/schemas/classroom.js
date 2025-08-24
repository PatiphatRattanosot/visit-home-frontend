import * as yup from "yup";

const onlyNumber = /^\d+$/;

export const ClassroomSchema = yup.object().shape({
  room: yup
    .number()
    .min(1, "กรุณากรอกเลขชั้นเรียนเป็นตัวเลข")
    .max(6, "กรุณากรอกเลขชั้นเรียนไม่เกิน 6")
    .required("กรุณากรอกเลขชั้นเรียน"),
  number: yup
    .number()
    .min(1, "กรุณากรอกห้องเรียนเป็นตัวเลข")
    .max(7, "กรุณากรอกห้องเรียนไม่เกิน 7")
    .required("กรุณากรอกห้องเรียน"),
  teacherId: yup.string().required("กรุณาเลือกครูที่ปรึกษา"),
});