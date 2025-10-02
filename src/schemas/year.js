import * as yup from "yup";

const onlyNumber = /^[0-9]+$/;
const currentYear = new Date().getFullYear() + 543; // ปีปัจจุบันแบบ พ.ศ.
const minYear = currentYear - 10; // ย้อนหลังได้ 10 ปี
const maxYear = currentYear + 5; // เผื่ออนาคตได้ 5 ปี

export const YearSchema = yup.object().shape({
  year: yup
    .string()
    .transform((value) => value.trim())
    .matches(onlyNumber, "กรุณากรอกปีการศึกษาให้ถูกต้อง")
    .min(4, "กรุณากรอกปีการศึกษาให้ถูกต้อง")
    .max(4, "กรุณากรอกปีการศึกษาให้ถูกต้อง")
    .test(
      "year-range",
      `ปีการศึกษาต้องอยู่ระหว่าง ${minYear} - ${maxYear}`,
      (value) => {
        if (!value) return false;
        const yearNum = Number(value);
        return yearNum >= minYear && yearNum <= maxYear;
      }
    )
    .required("กรุณากรอกปีการศึกษา"),
});

export const ScheduleSchema = yup.object().shape({
  startDate: yup
    .date()
    .required("กรุณาเลือกวันที่เริ่มต้น")
    .typeError("รูปแบบวันที่ไม่ถูกต้อง"),
  endDate: yup
    .date()
    .required("กรุณาเลือกวันที่สิ้นสุด")
    .typeError("รูปแบบวันที่ไม่ถูกต้อง")
    .min(yup.ref("startDate"), "วันที่สิ้นสุดต้องไม่ก่อนวันที่เริ่มต้น"),
});
