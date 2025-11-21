import React from "react";
import Stepper from "../../../components/Stepper";
import Checkbox from "../../../components/Checkbox";
import Textarea from "../../../components/Textarea";
import LabelCheck from "../../../components/LabelCheck";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";

const Other = ({ page, setPage, formik }) => {
  const [parentConcern, setParentConcern] = React.useState(false);

  React.useEffect(() => {
    if (formik.values.parent_concern !== "") {
      setParentConcern(true);
    } else {
      setParentConcern(false);
    }
  }, [formik.values.parent_concern]);

  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "เพิ่มความต้องการจากผู้ปกครอง" },
  ];

  const support_from_organize = [
    { value: "0", label: "เบี้ยผู้สูงอายุ" },
    { value: "1", label: "เบี้ยพิการ" },
  ];

  const support_from_school = [
    { value: "0", label: "ด้านการเรียน" },
    { value: "1", label: "ด้านพฤติกรรม" },
    { value: "2", label: "ด้านเศรษฐกิจ (เช่น ขอรับทุน)" },
  ];

  return (
    <div className="flex items-center justify-center py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-start mb-2">
          <BreadcrumbsLoop options={breadcrumbsOptions} />
        </div>
        <div className="mb-8 flex justify-center">
          <Stepper page={page} setPage={setPage} />
        </div>
        <div>
          {/* Heading */}
          <h3 className="text-xl font-bold text-center w-full">
            ความต้องการจากผู้ปกครอง
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* ความช่วยเหลือที่ครอบครัวเคยได้รับจากหน่วยงานหรือต้องการได้รับการช่วยเหลือ */}
            <div className="md:col-span-2">
              <Checkbox
                label="ความช่วยเหลือที่ครอบครัวเคยได้รับจากหน่วยงานหรือต้องการได้รับการช่วยเหลือ"
                name="support_from_organize"
                options={support_from_organize}
                value={formik.values.support_from_organize}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.support_from_organize}
                touched={formik.touched.support_from_organize}
                setFieldValue={formik.setFieldValue}
              />
            </div>
            {/* สิ่งที่ผู้ปกครองต้องการให้โรงเรียนช่วยเหลือนักเรียน */}
            <div className="md:col-span-2">
              <Checkbox
                label="สิ่งที่ผู้ปกครองต้องการให้โรงเรียนช่วยเหลือนักเรียน"
                name="support_from_school"
                options={support_from_school}
                value={formik.values.support_from_school}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.support_from_school}
                touched={formik.touched.support_from_school}
                setFieldValue={formik.setFieldValue}
              />
            </div>
            {/* ความต้องการจากผู้ปกครอง */}
            <div className="md:col-span-2 flex flex-col">
              <label
                htmlFor="parentConcern"
                className="text-sm text-start mb-3"
              >
                ความต้องการเพิ่มเติมอื่นๆ
              </label>
              <LabelCheck
                label="มีความต้องการเพิ่มเติมอื่นๆหรือไม่"
                name="parentConcern"
                value={parentConcern}
                set={setParentConcern}
              />
            </div>
            {parentConcern && (
              <div className="md:col-span-2">
                <Textarea
                  label="ความต้องการเพิ่มเติม"
                  name="parent_concern"
                  value={formik.values.parent_concern}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.parent_concern}
                  touched={formik.touched.parent_concern}
                  id="parent_concern"
                />
              </div>
            )}
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-soft w-1/2"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              ย้อนกลับ{` (${page - 1})`}
            </button>
            <button type="submit" className="btn btn-success w-1/2 text-white">
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Other;
