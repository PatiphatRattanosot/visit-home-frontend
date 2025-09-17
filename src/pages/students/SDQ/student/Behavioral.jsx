import React from "react";
import BreadcrumbsLoop from "../../../../components/Breadcrumbs";
import SDQRadio from "../../../../components/SDQRadio";
import { validateCurrentPage } from "../../../../utils/formNavigation";

const Behavioral = ({ page, setPage, formik }) => {
  const breadcrumbsOptions = [
    { label: "แบบประเมิน SDQ", link: "/student/sdq-student" },
    { label: "แบบประเมินตนเอง", link: "/student/sdq-student" },
    { label: "หน้า 2" },
  ];

  const page_2 = [
    "question_5",
    "question_7",
    "question_12",
    "question_18",
    "question_22",
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
            <span>แบบประเมิน SDQ ประเมินตนเอง</span>
            <span>หน้า 2/6</span>
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <SDQRadio
              name="question_5"
              label="ฉันโกรธแรง และมักอารมณ์เสีย"
              options={choiceOptions}
              value={formik.values.question_5}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_5}
              touched={formik.touched.question_5}
            />
            <SDQRadio
              name="question_7"
              label="ฉันมักทำตามที่คนอื่นบอก"
              options={reverseChoiceOptions}
              value={formik.values.question_7}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_7}
              touched={formik.touched.question_7}
            />
            <SDQRadio
              name="question_12"
              label="ฉันมีเรื่องทะเลาะวิวาทบ่อย ฉันทำให้คนอื่นทำอย่างที่ฉันต้องการได้"
              options={choiceOptions}
              value={formik.values.question_12}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_12}
              touched={formik.touched.question_12}
            />
            <SDQRadio
              name="question_18"
              label="มีคนว่าฉันโกหก หรือขี้โกงบ่อยๆ"
              options={choiceOptions}
              value={formik.values.question_18}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_18}
              touched={formik.touched.question_18}
            />
            <SDQRadio
              name="question_22"
              label="ฉันเอาของคนอื่นในบ้าน ที่โรงเรียน หรือที่อื่น"
              options={choiceOptions}
              value={formik.values.question_22}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_22}
              touched={formik.touched.question_22}
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
              onClick={() =>
                validateCurrentPage({
                  formik,
                  fieldsToValidate: page_2,
                  onSuccess: () => setPage(page + 1),
                })
              }
            >
              ถัดไป {` (${page + 1})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Behavioral;
