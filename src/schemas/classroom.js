import * as yup from "yup";

const onlyNumber = /^\d+$/;

export const ClassroomSchema = yup.object().shape({
  room: yup
    .string()
    .matches(onlyNumber, "กรุณากรอกหมายเลขห้องเรียนเป็นตัวเลข")
    .required("กรุณากรอกเลขชั้นเรียน"),
  number: yup
    .string()
    .matches(onlyNumber, "กรุณากรอกชั้นเรียนเป็นตัวเลข")
    .required("กรุณากรอกห้องเรียน"),
  teacherId: yup.string().required("กรุณาเลือกครูที่ปรึกษา"),
});