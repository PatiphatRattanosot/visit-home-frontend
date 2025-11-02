import { useStudentStore } from "../../stores/student.store";
import TextInputInModal from "../Text";
import SelectInputInModal from "../Select";
import { useFormik } from "formik";
import { studentSchema } from "../../schemas/student";
import { useEffect, useState } from "react";
const EditStudent = ({ id, onUpdateStudent, classId, studentId, index }) => {
  const { getStudentById, updateStudent } = useStudentStore();
  const [student, setStudent] = useState(null);
  const prefixOptions = [
    { value: "เด็กชาย", label: "เด็กชาย" },
    { value: "เด็กหญิง", label: "เด็กหญิง" },
    { value: "นาย", label: "นาย" },
    { value: "นางสาว", label: "นางสาว" },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: "",
      last_name: "",
      prefix: "",
      user_id: "",
      phone: "",
      class_id: classId,
    },
    validationSchema: studentSchema,
    onSubmit: async (values) => {
      const submitValues = {
        ...values,
        class_id: classId,
        phone: values.phone,
      };
      console.log("Submitting form with values:", submitValues);
      await updateStudent(id, submitValues);
      await onUpdateStudent();
      document.getElementById(`edit_student_${id}`).close();
    },
  });

  useEffect(() => {
    getStudentById(studentId).then((data) => {

      setStudent(data); //data stroe มันเป็น array เลยต้องมา set เพิ่มเพืมเติมทำให้เป้น object ดึงทีละคน
      formik.setValues({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        prefix: data.prefix || "",
        user_id: data.user_id || "",
        phone: data.phone || "",
      });
    });
  }, [id, studentId]);

  const handleCancel = () => {
    getStudentById(studentId).then((data) => {
      console.log("student data:", data);

      setStudent(data); //data stroe มันเป็น array เลยต้องมา set เพิ่มเพืมเติมทำให้เป้น object ดึงทีละคน
      formik.setValues({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        prefix: data.prefix || "",
        user_id: data.user_id || "",
      });
    });
    document.getElementById(`edit_student_${id}`).close();
  };

  return (
    <div>
      <dialog id={`edit_student_${id}`} className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">แก้ไขข้อมูลนักเรียน</h3>
          <p className="text-base m-2">
            {student ? `${student.first_name} ${student.last_name}` : ""}
          </p>
          <form onSubmit={formik.handleSubmit} className="mt-2">
            <div className="flex flex-col items-center justify-center space-y-2">
              <SelectInputInModal
                name="prefix"
                value={formik.values.prefix}
                onChange={formik.handleChange}
                label="คำนำหน้า"
                disabled={false}
                defaultOpt="คำนำหน้า"
                options={prefixOptions}
                error={formik.errors.prefix}
                touched={formik.touched.prefix}
                onBlur={formik.handleBlur}
                className="w-64 md:w-72"
                id={`prefix_edit_${index}`}
              />
              <TextInputInModal
                name="first_name"
                placeholder="ชื่อ"
                disabled={false}
                value={formik.values.first_name}
                onChange={formik.handleChange}
                label="ชื่อ"
                error={formik.errors.first_name}
                touched={formik.touched.first_name}
                onBlur={formik.handleBlur}
                id={`first_name_edit_${index}`}
                className="w-64 md:w-72"
              />
              <TextInputInModal
                name="last_name"
                placeholder="นามสกุล"
                disabled={false}
                value={formik.values.last_name}
                onChange={formik.handleChange}
                label="นามสกุล"
                error={formik.errors.last_name}
                touched={formik.touched.last_name}
                onBlur={formik.handleBlur}
                id={`last_name_edit_${index}`}
                className="w-64 md:w-72"
              />
              <TextInputInModal
                name="user_id"
                placeholder="เลขที่ประจำตัวนักเรียน"
                disabled={false}
                value={formik.values.user_id}
                onChange={formik.handleChange}
                label="เลขที่ประจำตัวนักเรียน"
                error={formik.errors.user_id}
                touched={formik.touched.user_id}
                onBlur={formik.handleBlur}
                id={`user_id_edit_${index}`}
                className="w-64 md:w-72"
              />
            </div>
            <div className="modal-action flex justify-center">
              <div className="flex gap-6 ">
                <button type="submit" className="btn-green">
                  บันทึก
                </button>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="btn-red"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EditStudent;
