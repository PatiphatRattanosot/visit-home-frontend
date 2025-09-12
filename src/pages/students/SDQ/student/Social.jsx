import React from "react";
import BreadcrumbsLoop from "../../../../components/Breadcrumbs";
import SDQRadio from "../../../../components/SDQRadio";

const Social = ({ page, setPage, formik }) => {
  const breadcrumbsOptions = [
    { label: "แบบประเมิน SDQ", link: "/student/sdq-student" },
    { label: "แบบประเมินตนเอง", link: "/student/sdq-student" },
    { label: "หน้า 5" },
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
            <span>5/6</span>
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <SDQRadio
              name="question_1"
              label="ฉันพยายามจะทำตัวดีกับคนอื่น ฉันใส่ใจความรู้สึกคนอื่น"
              options={choiceOptions}
              value={formik.values.question_1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_1}
              touched={formik.touched.question_1}
            />
            <SDQRadio
              name="question_4"
              label="ฉันเต็มใจแบ่งปันสิ่งของให้คนอื่น (ของกิน เกม ปากกา เป็นต้น)"
              options={choiceOptions}
              value={formik.values.question_4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_4}
              touched={formik.touched.question_4}
            />
            <SDQRadio
              name="question_9"
              label="ใครๆ ก็พึ่งฉันได้ถ้าเขาเสียใจ อารมณ์ไม่ดีหรือไม่สบายใจ"
              options={choiceOptions}
              value={formik.values.question_9}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_9}
              touched={formik.touched.question_9}
            />
            <SDQRadio
              name="question_17"
              label="ฉันใจดีกับเด็กที่เล็กกว่า"
              options={choiceOptions}
              value={formik.values.question_17}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_17}
              touched={formik.touched.question_17}
            />
            <SDQRadio
              name="question_20"
              label="ฉันมักจะอาสาช่วยเหลือคนอื่น (พ่อแม่, ครู, เด็กคนอื่น)"
              options={choiceOptions}
              value={formik.values.question_20}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_20}
              touched={formik.touched.question_20}
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

export default Social;
