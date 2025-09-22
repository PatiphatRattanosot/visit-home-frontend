import React from "react";
import Text from "../../../components/Text";
import Select from "../../../components/Select";
import Stepper from "../../../components/Stepper";
import LabelCheck from "../../../components/LabelCheck";
import StudentPicture from "../../../components/students/StudentPicture";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import { useNavigate } from "react-router";
import { validateCurrentPage } from "../../../utils/formNavigation";

const Personal = ({ page, setPage, formik, image, handleSetImage }) => {
  const navigate = useNavigate();
  const personalFields = [
    "phone",
    "father_prefix",
    "father_name",
    "father_last_name",
    "father_job",
    "father_phone",
    "mother_prefix",
    "mother_name",
    "mother_last_name",
    "mother_job",
    "mother_phone",
    "parent_prefix",
    "parent_name",
    "parent_last_name",
    "parent_job",
    "parent_phone",
    "lat",
    "lng",
  ];

  const prefixOptions = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];

  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "แก้ไขข้อมูลส่วนตัว" },
  ];

  const [checkParent, setCheckParent] = React.useState(true);
  const [selectParent, setSelectParent] = React.useState("father");

  React.useEffect(() => {
    if (checkParent === true && selectParent === "father") {
      formik.setFieldValue("parent_prefix", formik.values.father_prefix);
      formik.setFieldValue("parent_name", formik.values.father_name);
      formik.setFieldValue("parent_last_name", formik.values.father_last_name);
      formik.setFieldValue("parent_job", formik.values.father_job);
      formik.setFieldValue("parent_phone", formik.values.father_phone);
    } else if (checkParent === true && selectParent === "mother") {
      formik.setFieldValue("parent_prefix", formik.values.mother_prefix);
      formik.setFieldValue("parent_name", formik.values.mother_name);
      formik.setFieldValue("parent_last_name", formik.values.mother_last_name);
      formik.setFieldValue("parent_job", formik.values.mother_job);
      formik.setFieldValue("parent_phone", formik.values.mother_phone);
    } else {
      formik.setFieldValue("parent_prefix", "");
      formik.setFieldValue("parent_name", "");
      formik.setFieldValue("parent_last_name", "");
      formik.setFieldValue("parent_job", "");
      formik.setFieldValue("parent_phone", "");
    }
  }, [checkParent, selectParent, formik.values]);

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
            ข้อมูลส่วนตัว
          </h3>

          <div className="flex justify-center mt-6">
            <StudentPicture studentPic={image} handleChange={handleSetImage} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* เบอร์โทรศัพท์นักเรียน */}
            <div className="md:col-span-2 md:pr-3 md:w-1/2">
              <Text
                name="phone"
                label="เบอร์โทรศัพท์นักเรียน"
                onChange={formik.handleChange}
                value={formik.values.phone}
                placeholder="เบอร์โทรศัพท์"
                onBlur={formik.handleBlur}
                error={formik.errors.phone}
                touched={formik.touched.phone}
                type="tel"
                maxLength={10}
                minLength={10}
                required
              />
            </div>
            {/* ชื่อและคำนำหน้า */}
            <div className="flex space-x-2">
              {/* คำนำหน้า บิดา */}
              <Select
                name="father_prefix"
                options={prefixOptions}
                onChange={formik.handleChange}
                value={formik.values.father_prefix}
                label="คำนำหน้า"
                onBlur={formik.handleBlur}
                error={formik.errors.father_prefix}
                touched={formik.touched.father_prefix}
                className="w-1/4"
                required
              />
              {/* ชื่อ บิดา */}
              <Text
                name="father_name"
                label="ชื่อบิดา"
                onChange={formik.handleChange}
                value={formik.values.father_name}
                placeholder="ชื่อ"
                onBlur={formik.handleBlur}
                error={formik.errors.father_name}
                touched={formik.touched.father_name}
                className="w-3/4"
                required
              />
            </div>
            {/* นามสกุลบิดา */}
            <Text
              name="father_last_name"
              label="นามสกุลบิดา"
              onChange={formik.handleChange}
              value={formik.values.father_last_name}
              placeholder="นามสกุล"
              onBlur={formik.handleBlur}
              error={formik.errors.father_last_name}
              touched={formik.touched.father_last_name}
              required
            />
            {/* อาชีพบิดา */}
            <Text
              name="father_job"
              label="อาชีพบิดา"
              onChange={formik.handleChange}
              value={formik.values.father_job}
              placeholder="อาชีพ"
              onBlur={formik.handleBlur}
              error={formik.errors.father_job}
              touched={formik.touched.father_job}
              required
            />
            {/* เบอร์โทรศัพท์ */}
            <Text
              name="father_phone"
              label="เบอร์โทรศัพท์"
              onChange={formik.handleChange}
              value={formik.values.father_phone}
              placeholder="เบอร์โทรศัพท์"
              onBlur={formik.handleBlur}
              error={formik.errors.father_phone}
              touched={formik.touched.father_phone}
              type="tel"
              maxLength={10}
              minLength={10}
              required
            />
            {/* ชื่อและคำนำหน้า */}
            <div className="flex space-x-2">
              {/* คำนำหน้า มารดา */}
              <Select
                name="mother_prefix"
                options={prefixOptions}
                onChange={formik.handleChange}
                value={formik.values.mother_prefix}
                label="คำนำหน้า"
                onBlur={formik.handleBlur}
                error={formik.errors.mother_prefix}
                touched={formik.touched.mother_prefix}
                className="w-1/4"
                required
              />
              {/* ชื่อ มารดา */}
              <Text
                name="mother_name"
                label="ชื่อมารดา"
                onChange={formik.handleChange}
                value={formik.values.mother_name}
                placeholder="ชื่อ"
                onBlur={formik.handleBlur}
                error={formik.errors.mother_name}
                touched={formik.touched.mother_name}
                className="w-3/4"
                required
              />
            </div>
            {/* นามสกุลมารดา */}
            <Text
              name="mother_last_name"
              label="นามสกุลมารดา"
              onChange={formik.handleChange}
              value={formik.values.mother_last_name}
              placeholder="นามสกุล"
              onBlur={formik.handleBlur}
              error={formik.errors.mother_last_name}
              touched={formik.touched.mother_last_name}
              required
            />
            {/* อาชีพมารดา */}
            <Text
              name="mother_job"
              label="อาชีพมารดา"
              onChange={formik.handleChange}
              value={formik.values.mother_job}
              placeholder="อาชีพ"
              onBlur={formik.handleBlur}
              error={formik.errors.mother_job}
              touched={formik.touched.mother_job}
              required
            />
            {/* เบอร์โทรศัพท์ */}
            <Text
              name="mother_phone"
              label="เบอร์โทรศัพท์"
              onChange={formik.handleChange}
              value={formik.values.mother_phone}
              placeholder="เบอร์โทรศัพท์"
              onBlur={formik.handleBlur}
              error={formik.errors.mother_phone}
              touched={formik.touched.mother_phone}
              type="tel"
              maxLength={10}
              minLength={10}
              required
            />
            {/* ดึงข้อมูลจากบิดาหรือมารดา */}
            <div
              className={`${checkParent === true ? "" : "md:col-span-2"} my-3`}
            >
              <LabelCheck
                value={checkParent}
                set={setCheckParent}
                label="ใช้ข้อมูลของบิดาหรือมารดา"
                name="checkParent"
              />
            </div>

            {checkParent === true && (
              <div className="flex justify-center my-3">
                <select
                  name="selectParent"
                  id="selectParent"
                  value={selectParent}
                  disabled={checkParent === false}
                  onChange={(e) => setSelectParent(e.target.value)}
                  className="select w-full"
                >
                  <option value="father">ข้อมูลบิดา</option>
                  <option value="mother">ข้อมูลมารดา</option>
                </select>
              </div>
            )}
            {/* ชื่อและคำนำหน้า */}
            <div className="flex space-x-2">
              {/* คำนำหน้า ผู้ปกครอง */}
              <Select
                name="parent_prefix"
                label="คำนำหน้า"
                options={prefixOptions}
                onChange={formik.handleChange}
                value={formik.values.parent_prefix}
                onBlur={formik.handleBlur}
                error={formik.errors.parent_prefix}
                touched={formik.touched.parent_prefix}
                className="w-1/4"
                disabled={checkParent === true}
                required
              />
              {/* ชื่อ ผู้ปกครอง */}
              <Text
                name="parent_name"
                label="ชื่อผู้ปกครอง"
                onChange={formik.handleChange}
                value={formik.values.parent_name}
                placeholder="ชื่อ"
                onBlur={formik.handleBlur}
                error={formik.errors.parent_name}
                touched={formik.touched.parent_name}
                className="w-3/4"
                disabled={checkParent === true}
                required
              />
            </div>
            {/* นามสกุลผู้ปกครอง */}
            <Text
              name="parent_last_name"
              label="นามสกุลผู้ปกครอง"
              onChange={formik.handleChange}
              value={formik.values.parent_last_name}
              placeholder="นามสกุล"
              onBlur={formik.handleBlur}
              error={formik.errors.parent_last_name}
              touched={formik.touched.parent_last_name}
              disabled={checkParent === true}
              required
            />
            {/* อาชีพผู้ปกครอง */}
            <Text
              name="parent_job"
              label="อาชีพผู้ปกครอง"
              onChange={formik.handleChange}
              value={formik.values.parent_job}
              placeholder="อาชีพ"
              onBlur={formik.handleBlur}
              error={formik.errors.parent_job}
              touched={formik.touched.parent_job}
              disabled={checkParent === true}
              required
            />
            {/* เบอร์โทรศัพท์ */}
            <Text
              name="parent_phone"
              label="เบอร์โทรศัพท์"
              onChange={formik.handleChange}
              value={formik.values.parent_phone}
              placeholder="เบอร์โทรศัพท์"
              onBlur={formik.handleBlur}
              error={formik.errors.parent_phone}
              touched={formik.touched.parent_phone}
              type="tel"
              disabled={checkParent === true}
              maxLength={10}
              minLength={10}
              required
            />
            {/* lat */}
            <Text
              name="lat"
              label="ละติจูด"
              onChange={formik.handleChange}
              value={formik.values.lat}
              placeholder="ละติจูด"
              onBlur={formik.handleBlur}
              error={formik.errors.lat}
              touched={formik.touched.lat}
              required
            />
            {/* lng */}
            <Text
              name="lng"
              label="ลองจิจูด"
              onChange={formik.handleChange}
              value={formik.values.lng}
              placeholder="ลองจิจูด"
              onBlur={formik.handleBlur}
              error={formik.errors.lng}
              touched={formik.touched.lng}
              required
            />
            {/* Map Component */}
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <button
                type="button"
                className="btn btn-blue"
                onClick={() => document.getElementById("map_modal").showModal()}
              >
                เลือกตำแหน่งบ้าน
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-error w-1/2 text-white"
              type="button"
              onClick={() => {
                setPage(1);
                navigate("/student/visiting-info");
              }}
            >
              ยกเลิก
            </button>
            <button
              type="button"
              className="btn btn-soft w-1/2"
              onClick={() =>
                validateCurrentPage({
                  formik,
                  fieldsToValidate: personalFields,
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

export default Personal;
