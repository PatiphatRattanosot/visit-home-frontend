import React from "react";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import SDQRadio from "../../../components/SDQRadio";
import { validateCurrentPage } from "../../../utils/formNavigation";

const Friendship = ({ page, setPage, formik }) => {
  const breadcrumbsOptions = [
    { label: "แบบประเมิน SDQ", link: "/student/sdq-student" },
    { label: "แบบประเมินตนเอง", link: "/student/sdq-student" },
    { label: "หน้า 4" },
  ];

  const page_4 = [
    "question_6",
    "question_11",
    "question_14",
    "question_19",
    "question_23",
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
            <span>หน้า 4/6</span>
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <SDQRadio
              name="question_6"
              label="ค่อนข้างแยกตัว ชอบเล่นคนเดียว"
              options={choiceOptions}
              value={formik.values.question_6}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_6}
              touched={formik.touched.question_6}
            />
            <SDQRadio
              name="question_11"
              label="มีเพื่อนสนิท"
              options={reverseChoiceOptions}
              value={formik.values.question_11}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_11}
              touched={formik.touched.question_11}
            />
            <SDQRadio
              name="question_14"
              label="เป็นที่ชื่นชอบของเพื่อน"
              options={reverseChoiceOptions}
              value={formik.values.question_14}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_14}
              touched={formik.touched.question_14}
            />
            <SDQRadio
              name="question_19"
              label="ถูกเด็กคนอื่นล้อเลียนหรือรังแก"
              options={choiceOptions}
              value={formik.values.question_19}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_19}
              touched={formik.touched.question_19}
            />
            <SDQRadio
              name="question_23"
              label="เข้ากับผู้ใหญ่ได้ดีกว่าเด็กวัยเดียวกัน"
              options={choiceOptions}
              value={formik.values.question_23}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_23}
              touched={formik.touched.question_23}
            />
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-soft w-1/2"
              type="button"
              onClick={() => setPage(page - 1)}
              id="back-button-page4"
            >
              ย้อนกลับ{` (${page - 1})`}
            </button>
            <button
              type="button"
              className="btn btn-soft w-1/2"
              onClick={() =>
                validateCurrentPage({
                  formik,
                  fieldsToValidate: page_4,
                  onSuccess: () => setPage(page + 1),
                })
              }
              id="next-button-page4"
            >
              ถัดไป {` (${page + 1})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friendship;
