import * as yup from "yup";

const onlyNumber = /^\d+$/;


export const ClassroomSchema = yup.object().shape({
  room: yup
    .string()
    .matches(onlyNumber, "กรุณากรอกหมายเลขห้องเรียนเป็นตัวเลข")
    .max(9, "กรุณากรอกหมายเลขห้องเรียนไม่เกิน 9 หลัก")
    .required("กรุณากรอกเลขชั้นเรียน"),
  number: yup
    .string()
    .matches(onlyNumber, "กรุณากรอกชั้นเรียนเป็นตัวเลข")
    .max(15, "กรุณากรอกชั้นเรียนไม่เกิน 15 หลัก")
    .required("กรุณากรอกห้องเรียน"),
  teacherId: yup.string().required("กรุณาเลือกครูที่ปรึกษา"),
});