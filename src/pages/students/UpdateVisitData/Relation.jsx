import React from "react";
import Stepper from "../../../components/Stepper";
import Text from "../../../components/Text";
import Select from "../../../components/Select";
import Radio from "../../../components/Radio";
import LabelCheck from "../../../components/LabelCheck";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";

const Relation = ({ page, setPage, formik }) => {
  const [bigBrotherCheck, setBigBrotherCheck] = React.useState(false);
  const [lilBrotherCheck, setLilBrotherCheck] = React.useState(false);
  const [bigSisterCheck, setBigSisterCheck] = React.useState(false);
  const [lilSisterCheck, setLilSisterCheck] = React.useState(false);
  const [grandparentCheck, setGrandparentCheck] = React.useState(false);
  const [relativeCheck, setRelativeCheck] = React.useState(false);

  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "แก้ไขข้อมูลความสัมพันธ์" },
  ];

  const family_relation_status_options = [
    { value: "0", label: "อยู่ด้วยกัน" },
    { value: "1", label: "แยกกันอยู่" },
    { value: "2", label: "หย่าร้าง" },
    { value: "3", label: "บิดาเสียชีวิต" },
    { value: "4", label: "มารดาเสียชีวิต" },
  ];

  const relation_choice = [
    {
      value: "0",
      label: "สนิทสนม",
    },
    {
      value: "1",
      label: "เฉยๆ",
    },
    {
      value: "2",
      label: "ห่างเหิน",
    },
    {
      value: "3",
      label: "ขัดแย้ง",
    },
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
            ความสัมพันธ์ในครอบครัว
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* ความสัมพันธ์ของครอบครัว */}
            <div className="md:col-span-2">
              <Radio
                name="family_relation_status"
                label="ความสัมพันธ์ของครอบครัว"
                options={family_relation_status_options}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.family_relation_status}
                error={formik.errors.family_relation_status}
                touched={formik.touched.family_relation_status}
              />
            </div>
            {/* จำนวนสมาชิกในครอบครัว */}
            <Text
              label="จำนวนสมาชิกในครอบครัว (รวมตัวนักเรียนด้วย)"
              name="family_member"
              onChange={formik.handleChange}
              value={formik.values.family_member}
              onBlur={formik.handleBlur}
              error={formik.errors.family_member}
              touched={formik.touched.family_member}
              type="number"
              maxLength={20}
              minLength={1}
            />
            {/* เวลาร่วมกัน */}
            <Text
              name="family_time"
              label="สมาชิกในครอบครัวมีเวลาอยู่ร่วมกันประมาณกี่ชั่วโมงต่อวัน"
              onChange={formik.handleChange}
              value={formik.values.family_time}
              placeholder="เวลาร่วมกัน"
              onBlur={formik.handleBlur}
              error={formik.errors.family_time}
              touched={formik.touched.family_time}
              type="number"
              maxLength={24}
            />
            {/* ความสัมพันธ์ */}
            <Select
              name="father_relation"
              options={relation_choice}
              label="ความสัมพันธ์ระหว่างบิดา"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.father_relation}
              error={formik.errors.father_relation}
              touched={formik.touched.father_relation}
            />
            <Select
              name="mother_relation"
              options={relation_choice}
              label="ความสัมพันธ์ระหว่างมารดา"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mother_relation}
              error={formik.errors.mother_relation}
              touched={formik.touched.mother_relation}
            />
            <div className="flex flex-col">
              <LabelCheck
                value={bigBrotherCheck}
                set={setBigBrotherCheck}
                label="มีพี่ชาย"
                name="bigBrotherCheck"
              />
            </div>
            <div className="flex flex-col">
              <LabelCheck
                value={lilBrotherCheck}
                set={setLilBrotherCheck}
                label="มีน้องชาย"
                name="lilBrotherCheck"
              />
            </div>
            <div className="flex flex-col">
              <LabelCheck
                value={bigSisterCheck}
                set={setBigSisterCheck}
                label="มีพี่สาว"
                name="bigSisterCheck"
              />
            </div>
            <div className="flex flex-col">
              <LabelCheck
                value={lilSisterCheck}
                set={setLilSisterCheck}
                label="มีน้องสาว"
                name="lilSisterCheck"
              />
            </div>
            <div className="flex flex-col">
              <LabelCheck
                value={grandparentCheck}
                set={setGrandparentCheck}
                label="มีปู่ย่าตายาย"
                name="grandparentCheck"
              />
            </div>
            <div className="flex flex-col">
              <LabelCheck
                value={relativeCheck}
                set={setRelativeCheck}
                label="มีญาติ"
                name="relativeCheck"
              />
            </div>
            {bigBrotherCheck && (
              <Select
                value={formik.big_brother_relation}
                name="big_brother_relation"
                options={relation_choice}
                label="ความสัมพันธ์ระหว่างพี่ชาย"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.big_brother_relation}
                touched={formik.touched.big_brother_relation}
              />
            )}
            {lilBrotherCheck && (
              <Select
                value={formik.lil_brother_relation}
                name="lil_brother_relation"
                options={relation_choice}
                label="ความสัมพันธ์ระหว่างน้องชาย"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.lil_brother_relation}
                touched={formik.touched.lil_brother_relation}
              />
            )}
            {bigSisterCheck && (
              <Select
                value={formik.big_sister_relation}
                name="big_sister_relation"
                options={relation_choice}
                label="ความสัมพันธ์ระหว่างพี่สาว"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.big_sister_relation}
                touched={formik.touched.big_sister_relation}
              />
            )}
            {lilSisterCheck && (
              <Select
                value={formik.lil_sister_relation}
                name="lil_sister_relation"
                options={relation_choice}
                label="ความสัมพันธ์ระหว่างน้องสาว"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.lil_sister_relation}
                touched={formik.touched.lil_sister_relation}
              />
            )}
            {grandparentCheck && (
              <Select
                value={formik.grandparent_relation}
                name="grandparent_relation"
                options={relation_choice}
                label="ความสัมพันธ์ระหว่างปู่ย่าตายาย"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.grandparent_relation}
                touched={formik.touched.grandparent_relation}
              />
            )}
            {relativeCheck && (
              <Select
                value={formik.relative_relation}
                name="relative_relation"
                options={relation_choice}
                label="ความสัมพันธ์ระหว่างญาติ"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.relative_relation}
                touched={formik.touched.relative_relation}
              />
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

export default Relation;
