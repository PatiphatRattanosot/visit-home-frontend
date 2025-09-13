import React from "react";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import SDQRadio from "../../../components/SDQRadio";

const Hyperactivity = ({ page, setPage, formik }) => {
  const breadcrumbsOptions = [
    { label: "แบบประเมิน SDQ", link: "/student/sdq-student" },
    { label: "แบบประเมินตนเอง", link: "/student/sdq-student" },
    { label: "หน้า 3" },
  ];
  const choiceOptions = ["0", "1", "2"]; // 0 = ไม่, 1 = ค่อนข้างจริง, 2 = จริง
  const reverseChoiceOptions = ["2", "1", "0"]; // 0 = ไม่, 1 = ค่อนข้างจริง, 2 = จริง
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
            <span>หน้า 3/6</span>
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <SDQRadio
              name="question_2"
              label="อยู่ไม่นิ่ง นั่งนิ่งๆ ไม่ได้"
              options={choiceOptions}
              value={formik.values.question_2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_2}
              touched={formik.touched.question_2}
            />
            <SDQRadio
              name="question_10"
              label="อยู่ไม่สุข วุ่นวายอย่างมาก"
              options={choiceOptions}
              value={formik.values.question_10}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_10}
              touched={formik.touched.question_10}
            />
            <SDQRadio
              name="question_15"
              label="วอกแวกง่าย สมาธิสั้น"
              options={choiceOptions}
              value={formik.values.question_15}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_15}
              touched={formik.touched.question_15}
            />
            <SDQRadio
              name="question_21"
              label="คิดก่อนทำ"
              options={reverseChoiceOptions}
              value={formik.values.question_21}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_21}
              touched={formik.touched.question_21}
            />
            <SDQRadio
              name="question_25"
              label="ทำงานได้จนเสร็จ มีความตั้งใจในการทำงาน"
              options={reverseChoiceOptions}
              value={formik.values.question_25}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_25}
              touched={formik.touched.question_25}
            />
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-soft w-1/2"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              ย้อนกลับ{` (${page - 1})`}
            </button>
            <button
              type="button"
              className="btn btn-soft w-1/2"
              onClick={() => setPage(page + 1)}
            >
              ถัดไป {` (${page + 1})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hyperactivity;
