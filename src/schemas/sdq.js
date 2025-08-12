import * as yup from "yup";

const choiceOptions = /^[0-2]$/;

export const SDQInitValues = {
  question_1: "",
  question_2: "",
  question_3: "",
  question_4: "",
  question_5: "",
  question_6: "",
  question_7: "",
  question_8: "",
  question_9: "",
  question_10: "",
  question_11: "",
  question_12: "",
  question_13: "",
  question_14: "",
  question_15: "",
  question_16: "",
  question_17: "",
  question_18: "",
  question_19: "",
  question_20: "",
  question_21: "",
  question_22: "",
  question_23: "",
  question_24: "",
  question_25: "",
};

export const SDQValidations = yup.object().shape({
  question_1: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_2: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_3: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_4: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_5: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_6: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_7: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_8: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_9: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_10: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_11: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_12: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_13: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_14: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_15: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_16: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_17: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_18: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_19: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_20: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_21: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_22: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_23: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_24: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
  question_25: yup
    .string()
    .matches(choiceOptions, "กรุณาเลือกคำตอบ")
    .required("กรุณาเลือกคำตอบ"),
});
