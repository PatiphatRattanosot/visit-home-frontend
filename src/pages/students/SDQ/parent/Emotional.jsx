import React from "react";
import BreadcrumbsLoop from "../../../../components/Breadcrumbs";
import SDQRadio from "../../../../components/SDQRadio";
import { validateCurrentPage } from "../../../../utils/formNavigation";

const Emotional = ({ page, setPage, formik }) => {
  const breadcrumbsOptions = [
    { label: "แบบประเมิน SDQ", link: "/student/sdq-student" },
    { label: "แบบประเมินตนเอง", link: "/student/sdq-student" },
    { label: "หน้า 1" },
  ];

  const page_1 = [
    "question_3",
    "question_8",
    "question_13",
    "question_16",
    "question_24",
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
            <span>แบบประเมิน SDQ ผู้ปกครองประเมิน</span>
            <span>หน้า 1/6</span>
          </h3>

          <div className="grid grid-cols-1 gap-6 mt-6">
            <SDQRadio
              name="question_3"
              label="มักจะบ่นว่าปวดศีรษะ ปวดท้อง หรือไม่สบาย"
              options={choiceOptions}
              value={formik.values.question_3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_3}
              touched={formik.touched.question_3}
            />
            <SDQRadio
              name="question_8"
              label="กังวลใจหลายเรื่อง ดูวิตกกังวลเสมอ"
              options={choiceOptions}
              value={formik.values.question_8}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_8}
              touched={formik.touched.question_8}
            />
            <SDQRadio
              name="question_13"
              label="ดูไม่มีความสุข ท้อแท้ ร้องไห้บ่อย"
              options={choiceOptions}
              value={formik.values.question_13}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_13}
              touched={formik.touched.question_13}
            />
            <SDQRadio
              name="question_16"
              label="เครียด ไม่ยอมห่างเวลาอยู่ในสถานการณ์ที่ไม่คุ้น และขาดความเชื่อมั่นในตนเอง"
              options={choiceOptions}
              value={formik.values.question_16}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_16}
              touched={formik.touched.question_16}
            />
            <SDQRadio
              name="question_24"
              label="ขี้กลัว รู้สึกหวาดกลัวได้ง่าย"
              options={choiceOptions}
              value={formik.values.question_24}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.question_24}
              touched={formik.touched.question_24}
            />
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-error w-1/2 text-white"
              type="button"
              onClick={() => setPage(1)}
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className="btn btn-soft w-1/2"
              onClick={() =>
                validateCurrentPage({
                  formik,
                  fieldsToValidate: page_1,
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

export default Emotional;
