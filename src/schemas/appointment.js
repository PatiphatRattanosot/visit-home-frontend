import * as Yup from "yup";

const ThaiRegex = /^[ก-๏\s]+$/;

export const AppointmentSchema = Yup.object().shape({
  appointment_date: Yup.date()
    .min(new Date(), "กรุณาเลือกวันที่ในอนาคต")
    .required("กรุณาเลือกวันที่นัดหมาย"),

  comment: Yup.string()
    .max(500, "หมายเหตุไม่ควรเกิน 500 ตัวอักษร")
    .matches(ThaiRegex, "กรุณากรอกหมายเหตุเป็นภาษาไทย"),
  teacherId: Yup.string(),
  studentId: Yup.string(),
  yearId: Yup.string(),
});
