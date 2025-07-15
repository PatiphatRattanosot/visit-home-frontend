import * as yup from "yup";

const onlyNumber = /^\d+$/;


export const ClassroomSchema = yup.object().shape({
  room: yup
    .string()
    .matches(onlyNumber, "กรุณากรอกหมายเลขห้องเรียนเป็นตัวเลข")
    .matches(/^[1-6]$/, "กรุณากรอกหมายเลขห้องเรียนเป็นเลข 1-6")
    .max(100, "กรุณากรอกหมายเลขห้องเรียนไม่เกิน 3 หลัก")
    .min(1, "กรุณากรอกหมายเลขห้องเรียนอย่างน้อย 1 หลัก")
    .required("กรุณากรอกเลขชั้นเรียน"),
  number: yup
    .string()
    .matches(onlyNumber, "กรุณากรอกชั้นเรียนเป็นตัวเลข")
    .matches(/^[1-7]$/, "กรุณากรอกหมายเลขชั้นเรียนเป็นเลข 1-7")
    .max(100, "กรุณากรอกหมายเลขห้องเรียนไม่เกิน 3 หลัก")
    .min(1, "กรุณากรอกหมายเลขห้องเรียนอย่างน้อย 1 หลัก")
    .required("กรุณากรอกห้องเรียน"),
  teacherId: yup.string().required("กรุณาเลือกครูที่ปรึกษา"),
});
