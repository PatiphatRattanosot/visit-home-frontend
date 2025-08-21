import { useState, useEffect } from "react";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import StudentPicture from "../../../components/students/StudentPicture";
import { useAuthStore } from "../../../stores/auth.store";
import { useFormik } from "formik";
import {
  PersonalInfoSchema,
  PersonalInfoInitialValues,
} from "../../../schemas/personalInfo";
import Stepper from "../../../components/Stepper";
import { useNavigate, useParams } from "react-router";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import { useStudentFormStore } from "../../../stores/student.store";
import RadioInput from "../../../components/RadioInput";
import { useStudentStore } from "../../../stores/student.store";
import MapComponent from "../../../components/students/MapComponent";

const UpdatePersonalInfoForm = () => {
  const { userInfo } = useAuthStore();
  const [parentToggle, setParentToggle] = useState(true);
  const [parentFetch, setParentFetch] = useState("dad");

  const { setFormData } = useStudentFormStore();
  const { getYearlyData } = useStudentStore();
  const { year } = useParams();

  const navigate = useNavigate();

  const {
    initialValues,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: PersonalInfoInitialValues,
    validationSchema: PersonalInfoSchema,
    onSubmit: async (values, actions) => {
      setFormData({ personal_info: values ,file_image: image });
      actions.resetForm();
      navigate(`/student/relation/${year}/update`);
    },
  });

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      const data = await getYearlyData(year);
      setValues(data?.students[0].yearly_data[0]?.personal_info);
      setImage(data?.students[0]?.image_url);
    };
    fetchPersonalInfo();
  }, [year]);

  useEffect(() => {
    if (!parentToggle) {
      const parentData =
        parentFetch === "dad"
          ? {
              parent_prefix: values.father_prefix,
              parent_name: values.father_name,
              parent_last_name: values.father_last_name,
              parent_job: values.father_job,
              parent_phone: values.father_phone,
            }
          : {
              parent_prefix: values.mother_prefix,
              parent_name: values.mother_name,
              parent_last_name: values.mother_last_name,
              parent_job: values.mother_job,
              parent_phone: values.mother_phone,
            };

      Object.entries(parentData).forEach(([key, val]) =>
        setFieldValue(key, val)
      );
    }
  }, [parentToggle, parentFetch]);

  const [image, setImage] = useState(null);

  const prefixOptions = ["นาย", "นาง", "นางสาว"];

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  // stepper path
  const stepperPath = {
    stepOne: `/student/personal-info/${year}/update`,
    stepTwo: `/student/relation/${year}/update`,
    stepThree: `/student/family-status/${year}/update`,
    stepFour: `/student/behavior/${year}/update`,
  };

  console.log(values);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <BreadcrumbsLoop
          options={[
            {
              link: `/student/personal-info`,
              label: "ข้อมูลส่วนตัว",
            },
            { label: "แก้ไขข้อมูลส่วนตัว" },
          ]}
        />
        <div className="flex justify-center mb-9">
          <Stepper step={1} path={stepperPath} />
        </div>

        <form onSubmit={handleSubmit}>
          <h3 className="text-center text-xl font-bold text-gray-600">
            ข้อมูลส่วนตัวของ{" "}
            <span className="text-black">{`${userInfo?.prefix} ${userInfo?.first_name} ${userInfo?.last_name}`}</span>
          </h3>

          <div className="mt-8 flex justify-center">
            <StudentPicture
              studentPic={image}
              handleChange={handlePictureChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* ชื่อและคำนำหน้า */}
            <div className="flex space-x-2">
              {/* คำนำหน้า บิดา */}
              <SelectInput
                name={"father_prefix"}
                value={values.father_prefix}
                onChange={handleChange}
                label={"คำนำหน้า"}
                disabled={false}
                defaultOpt={"คำนำหน้า"}
                options={prefixOptions}
                error={errors.father_prefix}
                touched={touched.father_prefix}
                onBlur={handleBlur}
              />
              {/* ชื่อ บิดา */}
              <TextInput
                name={"father_name"}
                placeholder={"กรอกชื่อบิดา"}
                disabled={false}
                value={values.father_name}
                onChange={handleChange}
                label={"ชื่อบิดา"}
                className={"w-3/4"}
                error={errors.father_name}
                touched={touched.father_name}
                onBlur={handleBlur}
              />
            </div>
            {/* นามสกุลบิดา */}
            <TextInput
              name={"father_last_name"}
              placeholder={"กรอกนาสกุลบิดา"}
              disabled={false}
              value={values.father_last_name}
              onChange={handleChange}
              label={"นามสกุลบิดา"}
              error={errors.father_last_name}
              touched={touched.father_last_name}
              onBlur={handleBlur}
            />
            {/* อาชีพบิดา */}
            <TextInput
              name={"father_job"}
              placeholder={"กรอกอาชีพของบิดา"}
              disabled={false}
              value={values.father_job}
              onChange={handleChange}
              label={"อาชีพ"}
              error={errors.father_job}
              touched={touched.father_job}
              onBlur={handleBlur}
            />
            {/* เบอร์โทรศัพท์ */}
            <TextInput
              name={"father_phone"}
              placeholder={"กรอกเบอร์โทรศัพท์ของบิดา"}
              disabled={false}
              value={values.father_phone}
              onChange={handleChange}
              label={"เบอร์โทรศัพท์"}
              error={errors.father_phone}
              touched={touched.father_phone}
              onBlur={handleBlur}
            />
            {/* ชื่อและคำนำหน้า */}
            <div className="flex space-x-2">
              {/* คำนำหน้า มารดา */}
              <SelectInput
                name={"mother_prefix"}
                value={values.mother_prefix}
                onChange={handleChange}
                label={"คำนำหน้า"}
                disabled={false}
                defaultOpt={"คำนำหน้า"}
                options={prefixOptions}
                error={errors.mother_prefix}
                touched={touched.mother_prefix}
                onBlur={handleBlur}
              />
              {/* ชื่อ มารดา */}
              <TextInput
                name={"mother_name"}
                placeholder={"กรอกชื่อมารดา"}
                disabled={false}
                value={values.mother_name}
                onChange={handleChange}
                label={"ชื่อมารดา"}
                className={"w-3/4"}
                error={errors.mother_name}
                touched={touched.mother_name}
                onBlur={handleBlur}
              />
            </div>
            {/* นามสกุลมารดา */}
            <TextInput
              name={"mother_last_name"}
              placeholder={"กรอกนาสกุลมารดา"}
              disabled={false}
              value={values.mother_last_name}
              onChange={handleChange}
              label={"นามสกุลมารดา"}
              error={errors.mother_last_name}
              touched={touched.mother_last_name}
              onBlur={handleBlur}
            />
            {/* อาชีพมารดา */}
            <TextInput
              name={"mother_job"}
              placeholder={"กรอกอาชีพของมารดา"}
              disabled={false}
              value={values.mother_job}
              onChange={handleChange}
              label={"อาชีพ"}
              error={errors.mother_job}
              touched={touched.mother_job}
              onBlur={handleBlur}
            />
            {/* เบอร์โทรศัพท์ */}
            <TextInput
              name={"mother_phone"}
              placeholder={"กรอกเบอร์โทรศัพท์ของมารดา"}
              disabled={false}
              value={values.mother_phone}
              onChange={handleChange}
              label={"เบอร์โทรศัพท์"}
              error={errors.mother_phone}
              touched={touched.mother_phone}
              onBlur={handleBlur}
            />
            <div className="md:col-span-2">
              <RadioInput
                label={"ความสัมพันธ์ของครอบครัว"}
                name={"family_relation_status"}
                value={values.family_relation_status}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.family_relation_status}
                error={errors.family_relation_status}
                options={[
                  "อยู่ด้วยกัน",
                  "แยกกันอยู่",
                  "หย่าร้าง",
                  "บิดาเสียชีวิต",
                  "มารดาเสียชีวิต",
                ]}
              />
            </div>
            {/* ดึงข้อมูลจากบิดาหรือมารดา */}
            <div className="flex space-x-2 items-center">
              <input
                type="checkbox"
                className="checkbox"
                id="parentToggle"
                name="parentToggle"
                onChange={() => setParentToggle(!parentToggle)}
                onBlur={handleBlur}
              />
              <span className="text-sm">ใช้ข้อมูลของบิดาหรือมารดา</span>
            </div>
            <div className="flex justify-center">
              <select
                className="select-input"
                id="parentFetch"
                name="parentFetch"
                value={parentFetch}
                onChange={(e) => setParentFetch(e.target.value)}
                onBlur={handleBlur}
                disabled={parentToggle}
              >
                <option value="dad">บิดา</option>
                <option value="mom">มารดา</option>
              </select>
            </div>
            {/* ชื่อและคำนำหน้า */}
            <div className="flex space-x-2">
              {/* คำนำหน้า ผู้ปกครอง */}
              <SelectInput
                name={"parent_prefix"}
                value={values.parent_prefix}
                onChange={handleChange}
                label={"คำนำหน้า"}
                disabled={!parentToggle}
                defaultOpt={"คำนำหน้า"}
                options={prefixOptions}
                error={errors.parent_prefix}
                touched={touched.parent_prefix}
                onBlur={handleBlur}
              />
              {/* ชื่อ ผู้ปกครอง */}
              <TextInput
                name={"parent_name"}
                placeholder={"กรอกชื่อผู้ปกครอง"}
                disabled={!parentToggle}
                value={values.parent_name}
                onChange={handleChange}
                label={"ชื่อผู้ปกครอง"}
                className={"w-3/4"}
                error={errors.parent_name}
                touched={touched.parent_name}
                onBlur={handleBlur}
              />
            </div>
            {/* นามสกุลผู้ปกครอง */}
            <TextInput
              name={"parent_last_name"}
              placeholder={"กรอกนาสกุลผู้ปกครอง"}
              disabled={!parentToggle}
              value={values.parent_last_name}
              onChange={handleChange}
              label={"นามสกุลผู้ปกครอง"}
              error={errors.parent_last_name}
              touched={touched.parent_last_name}
              onBlur={handleBlur}
            />
            {/* อาชีพผู้ปกครอง */}
            <TextInput
              name={"parent_job"}
              placeholder={"กรอกอาชีพของผู้ปกครอง"}
              disabled={!parentToggle}
              value={values.parent_job}
              onChange={handleChange}
              label={"อาชีพ"}
              error={errors.parent_job}
              touched={touched.parent_job}
              onBlur={handleBlur}
            />
            {/* เบอร์โทรศัพท์ */}
            <TextInput
              name={"parent_phone"}
              placeholder={"กรอกเบอร์โทรศัพท์ของผู้ปกครอง"}
              disabled={!parentToggle}
              value={values.parent_phone}
              onChange={handleChange}
              label={"เบอร์โทรศัพท์"}
              error={errors.parent_phone}
              touched={touched.parent_phone}
              onBlur={handleBlur}
            />
            {/* lat */}
            <TextInput
              name={"lat"}
              placeholder={"0.00"}
              disabled={false}
              value={values.lat}
              onChange={handleChange}
              label={"ละติจูด"}
              error={errors.lat}
              touched={touched.lat}
              onBlur={handleBlur}
            />
            {/* lng */}
            <TextInput
              name={"lng"}
              placeholder={"0.00"}
              disabled={false}
              value={values.lng}
              onChange={handleChange}
              label={"ลองจิจูด"}
              error={errors.lng}
              touched={touched.lng}
              onBlur={handleBlur}
            />
            {/* Map Component */}
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <button
                className="btn-blue"
                type="button"
                onClick={() => document.getElementById("map_modal").showModal()}
              >
                เลือกตำแหน่ง
              </button>
            </div>
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn-red w-1/2"
              type="button"
              onClick={() => {
                setValues(initialValues);
                setFormData({ personal_info: values });
                navigate(`/student/personal-info`);
              }}
            >
              ยกเลิก
            </button>
            <button type="submit" className="btn-gray w-1/2">
              ถัดไป
            </button>
          </div>
        </form>
        <MapComponent
          setFieldValue={setFieldValue}
          latValue={values.lat}
          lngValue={values.lng}
        />
      </div>
    </div>
  );
};

export default UpdatePersonalInfoForm;
