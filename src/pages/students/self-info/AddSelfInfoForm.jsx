import { useState, useEffect } from "react";
import TextInput from "../../../components/TextInput";
import SelectInput from "../../../components/SelectInput";
import StudentPicture from "../../../components/students/StudentPicture";
import { useAuthStore } from "../../../stores/auth.store";
import { useFormik } from "formik";
import { SelfInfoSchema } from "../../../schemas/selfInfo";
import Stepper from "../../../components/Stepper";
import { useNavigate, useParams } from "react-router";
import BreadcrumbsLoop from "../../../components/students/Breadcrumbs";
import { useStudentFormStore } from "../../../stores/student.store";
import RadioInput from "../../../components/RadioInput";

const AddSelfInfoForm = () => {
  const { userInfo } = useAuthStore();
  const [parentToggle, setParentToggle] = useState(true);
  const [parentFetch, setParentFetch] = useState("dad");

  const { setFormData } = useStudentFormStore();

  const navigate = useNavigate();
  const { year } = useParams();

  const formik = useFormik({
    initialValues: {
      father_prefix: "",
      father_first_name: "",
      father_last_name: "",
      father_phone: "",
      father_job: "",
      mother_prefix: "",
      mother_first_name: "",
      mother_last_name: "",
      mother_phone: "",
      mother_job: "",
      family_relation_status: "",
      parent_prefix: "",
      parent_first_name: "",
      parent_last_name: "",
      parent_phone: "",
      parent_job: "",
      lat: 0,
      lng: 0,
    },
    validationSchema: SelfInfoSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      setFormData({ personal_info: values });
      actions.resetForm();
      navigate(`/student/visit-info/${year}/relation/add`);
    },
  });

  useEffect(() => {
    if (!parentToggle) {
      const parentData =
        parentFetch === "dad"
          ? {
              parent_prefix: formik.values.father_prefix,
              parent_first_name: formik.values.father_first_name,
              parent_last_name: formik.values.father_last_name,
              parent_job: formik.values.father_job,
              parent_phone: formik.values.father_phone,
            }
          : {
              parent_prefix: formik.values.mother_prefix,
              parent_first_name: formik.values.mother_first_name,
              parent_last_name: formik.values.mother_last_name,
              parent_job: formik.values.mother_job,
              parent_phone: formik.values.mother_phone,
            };

      Object.entries(parentData).forEach(([key, val]) =>
        formik.setFieldValue(key, val)
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
    stepOne: `/student/visit-info/${year}/self-info/add`,
    stepTwo: `/student/visit-info/${year}/relation/add`,
    stepThree: `/student/visit-info/${year}/family-status/add`,
    stepFour: `/student/visit-info/${year}/behavior/add`,
  };

  console.log(formik.values);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <BreadcrumbsLoop
          options={[
            { link: "/student/visit-info/", label: "ข้อมูลเยี่ยมบ้าน" },
            {
              link: `/student/visit-info/${year}/self-info`,
              label: "ข้อมูลส่วนตัว",
            },
            { label: "เพิ่มข้อมูลส่วนตัว" },
          ]}
        />
        <div className="flex justify-center mb-9">
          <Stepper step={1} path={stepperPath} />
        </div>

        <form onSubmit={formik.handleSubmit}>
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
                value={formik.values.father_prefix}
                onChange={formik.handleChange}
                label={"คำนำหน้า"}
                disabled={false}
                defaultOpt={"คำนำหน้า"}
                options={prefixOptions}
                error={formik.errors.father_prefix}
                touched={formik.touched.father_prefix}
                onBlur={formik.handleBlur}
              />
              {/* ชื่อ บิดา */}
              <TextInput
                name={"father_first_name"}
                placeholder={"กรอกชื่อบิดา"}
                disabled={false}
                value={formik.values.father_first_name}
                onChange={formik.handleChange}
                label={"ชื่อบิดา"}
                className={"w-3/4"}
                error={formik.errors.father_first_name}
                touched={formik.touched.father_first_name}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* นามสกุลบิดา */}
            <TextInput
              name={"father_last_name"}
              placeholder={"กรอกนาสกุลบิดา"}
              disabled={false}
              value={formik.values.father_last_name}
              onChange={formik.handleChange}
              label={"นามสกุลบิดา"}
              error={formik.errors.father_last_name}
              touched={formik.touched.father_last_name}
              onBlur={formik.handleBlur}
            />
            {/* อาชีพบิดา */}
            <TextInput
              name={"father_job"}
              placeholder={"กรอกอาชีพของบิดา"}
              disabled={false}
              value={formik.values.father_job}
              onChange={formik.handleChange}
              label={"อาชีพ"}
              error={formik.errors.father_job}
              touched={formik.touched.father_job}
              onBlur={formik.handleBlur}
            />
            {/* เบอร์โทรศัพท์ */}
            <TextInput
              name={"father_phone"}
              placeholder={"กรอกเบอร์โทรศัพท์ของบิดา"}
              disabled={false}
              value={formik.values.father_phone}
              onChange={formik.handleChange}
              label={"เบอร์โทรศัพท์"}
              error={formik.errors.father_phone}
              touched={formik.touched.father_phone}
              onBlur={formik.handleBlur}
            />
            {/* ชื่อและคำนำหน้า */}
            <div className="flex space-x-2">
              {/* คำนำหน้า มารดา */}
              <SelectInput
                name={"mother_prefix"}
                value={formik.values.mother_prefix}
                onChange={formik.handleChange}
                label={"คำนำหน้า"}
                disabled={false}
                defaultOpt={"คำนำหน้า"}
                options={prefixOptions}
                error={formik.errors.mother_prefix}
                touched={formik.touched.mother_prefix}
                onBlur={formik.handleBlur}
              />
              {/* ชื่อ มารดา */}
              <TextInput
                name={"mother_first_name"}
                placeholder={"กรอกชื่อมารดา"}
                disabled={false}
                value={formik.values.mother_first_name}
                onChange={formik.handleChange}
                label={"ชื่อมารดา"}
                className={"w-3/4"}
                error={formik.errors.mother_first_name}
                touched={formik.touched.mother_first_name}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* นามสกุลมารดา */}
            <TextInput
              name={"mother_last_name"}
              placeholder={"กรอกนาสกุลมารดา"}
              disabled={false}
              value={formik.values.mother_last_name}
              onChange={formik.handleChange}
              label={"นามสกุลมารดา"}
              error={formik.errors.mother_last_name}
              touched={formik.touched.mother_last_name}
              onBlur={formik.handleBlur}
            />
            {/* อาชีพมารดา */}
            <TextInput
              name={"mother_job"}
              placeholder={"กรอกอาชีพของมารดา"}
              disabled={false}
              value={formik.values.mother_job}
              onChange={formik.handleChange}
              label={"อาชีพ"}
              error={formik.errors.mother_job}
              touched={formik.touched.mother_job}
              onBlur={formik.handleBlur}
            />
            {/* เบอร์โทรศัพท์ */}
            <TextInput
              name={"mother_phone"}
              placeholder={"กรอกเบอร์โทรศัพท์ของมารดา"}
              disabled={false}
              value={formik.values.mother_phone}
              onChange={formik.handleChange}
              label={"เบอร์โทรศัพท์"}
              error={formik.errors.mother_phone}
              touched={formik.touched.mother_phone}
              onBlur={formik.handleBlur}
            />
            <div className="md:col-span-2">
              <RadioInput
                label={"ความสัมพันธ์ของครอบครัว"}
                name={"family_relation_status"}
                value={formik.values.family_relation_status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.family_relation_status}
                error={formik.errors.family_relation_status}
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
                onBlur={formik.handleBlur}
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
                onBlur={formik.handleBlur}
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
                value={formik.values.parent_prefix}
                onChange={formik.handleChange}
                label={"คำนำหน้า"}
                disabled={!parentToggle}
                defaultOpt={"คำนำหน้า"}
                options={prefixOptions}
                error={formik.errors.parent_prefix}
                touched={formik.touched.parent_prefix}
                onBlur={formik.handleBlur}
              />
              {/* ชื่อ ผู้ปกครอง */}
              <TextInput
                name={"parent_first_name"}
                placeholder={"กรอกชื่อผู้ปกครอง"}
                disabled={!parentToggle}
                value={formik.values.parent_first_name}
                onChange={formik.handleChange}
                label={"ชื่อผู้ปกครอง"}
                className={"w-3/4"}
                error={formik.errors.parent_first_name}
                touched={formik.touched.parent_first_name}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* นามสกุลผู้ปกครอง */}
            <TextInput
              name={"parent_last_name"}
              placeholder={"กรอกนาสกุลผู้ปกครอง"}
              disabled={!parentToggle}
              value={formik.values.parent_last_name}
              onChange={formik.handleChange}
              label={"นามสกุลผู้ปกครอง"}
              error={formik.errors.parent_last_name}
              touched={formik.touched.parent_last_name}
              onBlur={formik.handleBlur}
            />
            {/* อาชีพผู้ปกครอง */}
            <TextInput
              name={"parent_job"}
              placeholder={"กรอกอาชีพของผู้ปกครอง"}
              disabled={!parentToggle}
              value={formik.values.parent_job}
              onChange={formik.handleChange}
              label={"อาชีพ"}
              error={formik.errors.parent_job}
              touched={formik.touched.parent_job}
              onBlur={formik.handleBlur}
            />
            {/* เบอร์โทรศัพท์ */}
            <TextInput
              name={"parent_phone"}
              placeholder={"กรอกเบอร์โทรศัพท์ของผู้ปกครอง"}
              disabled={!parentToggle}
              value={formik.values.parent_phone}
              onChange={formik.handleChange}
              label={"เบอร์โทรศัพท์"}
              error={formik.errors.parent_phone}
              touched={formik.touched.parent_phone}
              onBlur={formik.handleBlur}
            />
            {/* lat */}
            <TextInput
              name={"lat"}
              placeholder={"0.00"}
              disabled={false}
              value={formik.values.lat}
              onChange={formik.handleChange}
              label={"ละติจูด"}
              error={formik.errors.lat}
              touched={formik.touched.lat}
              onBlur={formik.handleBlur}
            />
            {/* lng */}
            <TextInput
              name={"lng"}
              placeholder={"0.00"}
              disabled={false}
              value={formik.values.lng}
              onChange={formik.handleChange}
              label={"ลองจิจูด"}
              error={formik.errors.lng}
              touched={formik.touched.lng}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn-red w-1/2"
              type="button"
              onClick={() => {
                formik.setValues(formik.initialValues);
                navigate(`/student/visit-info/${year}/self-info`);
              }}
            >
              ยกเลิก
            </button>
            <button type="submit" className="btn-gray w-1/2">
              ถัดไป
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSelfInfoForm;
