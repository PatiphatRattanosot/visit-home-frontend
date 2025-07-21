import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;

export const FamilyStatusSchema = yup.object().shape({
  household_burdens: yup
    .array()
    .of(yup.string().matches(/^[0-3]$/, "กรุณากรอกเลือกคำตอบ")),
  housing_type: yup.string().matches(/^[0-2]$/, "กรุณากรอกเลือกคำตอบ"),
  housing_condition: yup.string().matches(onlyThaiLang, "กรุณากรอกเป็นภาษาไทย"),
  family_vehicles: yup
    .array()
    .of(yup.string().matches(/^[0-3]$/, "กรุณากรอกเลือกคำตอบ")),
  less_than_one: yup.string().matches(/^[0-1]*$/, "กรุณาเลือกคำตอบ"),
  owned_land: yup.number().min(0, "จำนวนที่ดินไม่ควรน้อยกว่า 0"),
  rented_land: yup.number().min(0, "จำนวนที่ดินไม่ควรน้อยกว่า 0"),
});

export const FamilyStatusInitialValues = {
  household_burdens: [],
  housing_type: "",
  housing_condition: "",
  family_vehicles: [],
  less_than_one: "",
  owned_land: 0,
  rented_land: 0,
};
