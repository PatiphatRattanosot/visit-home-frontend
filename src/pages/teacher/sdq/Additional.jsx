import React from "react";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import Radio from "../../../components/Radio";

const Additional = ({ page, setPage, formik }) => {
  const [additionalQuestions, setAdditionalQuestions] = React.useState(false);
  React.useEffect(() => {
    if (
      formik.values.overall_problem !== "0" &&
      formik.values.overall_problem !== ""
    ) {
      setAdditionalQuestions(true);
    } else {
      setAdditionalQuestions(false);
    }
  }, [formik.values.overall_problem]);

  const breadcrumbsOptions = [
    { label: "แบบประเมิน SDQ", link: "/student/sdq-student" },
    { label: "แบบประเมินตนเอง", link: "/student/sdq-student" },
    { label: "หน้า 6" },
  ];

  const choiceOptions = [
    { label: "ไม่มีปัญหาเลย", value: "0" },
    { label: "ใช่ มีปัญหาเล็กน้อย", value: "1" },
    { label: "ใช่ มีปัญหาชัดเจน", value: "2" },
    { label: "ใช่ มีปัญหาอย่างมาก", value: "3" },
  ];

  const howLongOptions = [
    { label: "น้อยกว่า 1 เดือน", value: "0" },
    { label: "1-5 เดือน", value: "1" },
    { label: "6-12 เดือน", value: "2" },
    { label: "มากกว่า 1 ปี", value: "3" },
  ];

  const additionalQuestionsOptions = [
    { label: "ไม่เลย", value: "0" },
    { label: "เล็กน้อย", value: "1" },
    { label: "ค่อนข้างมาก", value: "2" },
    { label: "มาก", value: "3" },
  ];
  return (
    <div className="flex items-center justify-center py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-start mb-2">
          <BreadcrumbsLoop options={breadcrumbsOptions} />
        </div>

        <div>
          {/* Heading */}
          <h3 className="text-xl font-bold text-center w-full flex flex-col md:flex-row md:space-x-2 md:justify-center">
            <span>แบบประเมิน SDQ ครูประเมิน</span>
            <span>หน้า 6/6</span>
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <Radio
              label="โดยรวมคุณคิดว่าเด็กมีปัญหาในด้านใดด้านหนึ่งต่อไปนี้หรือไม่ : ด้านอารมณ์ ด้านสมาธิ ด้านพฤติกรรม หรือความสามารถเข้ากับผู้อื่น"
              name="overall_problem"
              value={formik.values.overall_problem}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.overall_problem}
              touched={formik.touched.overall_problem}
              options={choiceOptions}
              required
            />
            {additionalQuestions && (
              <Radio
                label="ปัญหานี้เกิดขึ้นมานานเท่าไหร่แล้ว"
                name="problem_time"
                value={formik.values.problem_time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.problem_time}
                touched={formik.touched.problem_time}
                options={howLongOptions}
                required
              />
            )}
            {additionalQuestions && (
              <Radio
                label="ปัญหานี้ทำให้เด็กรู้สึกไม่สบายใจหรือไม่"
                name="is_uneasy_student"
                value={formik.values.is_uneasy_student}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.is_uneasy_student}
                touched={formik.touched.is_uneasy_student}
                options={additionalQuestionsOptions}
                required
              />
            )}
            {additionalQuestions && (
              <Radio
                label="ปัญหานี้รบกวนชีวิตประจำวันของเด็กในด้านต่าง ๆ ต่อไปนี้หรือไม่ : การคบเพื่อน การเรียนในห้องเรียน"
                name="is_annoy_student"
                value={formik.values.is_annoy_student}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.is_annoy_student}
                touched={formik.touched.is_annoy_student}
                options={additionalQuestionsOptions}
                required
              />
            )}
            {additionalQuestions && (
              <Radio
                label="ปัญหานี้ทำให้คุณหรือครอบครัวเกิดความยุ่งยากหรือไม่"
                name="is_difficult_student"
                value={formik.values.is_difficult_student}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.is_difficult_student}
                touched={formik.touched.is_difficult_student}
                options={additionalQuestionsOptions}
                required
              />
            )}
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-soft w-1/2"
              type="button"
              onClick={() => setPage(page - 1)}
              id="back-button-page6"
            >
              ย้อนกลับ{` (${page - 1})`}
            </button>
            <button
              type="submit"
              className="btn btn-success w-1/2 text-white"
              id="submit-button"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Additional;
