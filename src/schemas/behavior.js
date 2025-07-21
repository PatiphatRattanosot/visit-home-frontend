import * as yup from "yup";

const onlyThaiLang = /^[\u0E00-\u0E7F\s]+$/;

export const BehaviorSchema = yup.object().shape({
  health_risk: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  welfare_and_safety: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  distance_to_school: yup.number().min(0, "ระยะทางไม่ควรเป็นลบ"),
  time_used: yup.number().min(0, "เวลาเดินทางไม่ควรเป็นลบ"),
  school_transport: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  student_resp: yup
    .array()
    .of(yup.string().matches(/^[0-1]$/, "กรุณาเลือกคำตอบ")),
  student_resp_other: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  hobbies: yup.array().of(yup.string().matches(/^[0-1]$/, "กรุณาเลือกคำตอบ")),
  other_hobbies: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  drugs_behav: yup
    .array()
    .of(yup.string().matches(/^[0-1]$/, "กรุณาเลือกคำตอบ")),
  violent_behav: yup
    .array()
    .of(yup.string().matches(/^[0-1]$/, "กรุณาเลือกคำตอบ")),
  other_violent_behav: yup
    .string()
    .matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  sexual_behav: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  gaming_behav: yup
    .array()
    .of(yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย")),
  other_gaming_behav: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
  computer_internet_access: yup.string().matches(/^[0-1]$/, "กรุณาเลือกคำตอบ"),
  tech_use_behav: yup.string().matches(/^[0-1]$/, "กรุณาเลือกคำตอบ"),
  information_giver: yup.string().matches(onlyThaiLang, "กรุณาตอบเป็นภาษาไทย"),
});

export const BehaviorInitialValues = {
  health_risk: [],
  welfare_and_safety: [],
  distance_to_school: 0,
  time_used: 0,
  school_transport: "",
  student_resp: [],
  student_resp_other: "",
  hobbies: [],
  other_hobbies: "",
  drugs_behav: [],
  violent_behav: [],
  other_violent_behav: "",
  sexual_behav: [],
  gaming_behav: [],
  other_gaming_behav: "",
  computer_internet_access: "",
  tech_use_behav: "",
  information_giver: "",
};
