import { useFormik } from "formik";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";
import { studentSchema } from "../../schemas/student";
import { useStudentStore } from "../../stores/student.store";

const AddStudent = ({ classId, onAddStudentSuccess }) => {
  const { createStudent } = useStudentStore();

  const prefixOptions = [
    { value: "เด็กชาย", label: "เด็กชาย" },
    { value: "เด็กหญิง", label: "เด็กหญิง" },
  ];

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      prefix: "",
      user_id: "",
    },

    validationSchema: studentSchema,

    onSubmit: async (values, actions) => {
      await createStudent({ ...values, class_id: classId });
      await onAddStudentSuccess();
      actions.resetForm();
    },
  });
  return (
    <div>
      <dialog id="add_student_modal" className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3>เพิ่มนักเรียน</h3>

          <form onSubmit={formik.handleSubmit}>
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
                id="add-student-prefix-select"
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
                id="add-student-userid-input"
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
                id="add-student-firstname-input"
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
                id="add-student-lastname-input"
              />


              <div className="flex gap-6 justify-center mt-4">
                <button
                  id="add-student-submit-button"
                  type="submit"
                  className="btn-green"
                >
                  เพิ่มนักเรียน
                </button>
                <button
                  id="add-student-cancel-button"
                  type="button"
                  className="btn-red"
                  onClick={() => {
                    formik.resetForm();
                    document.getElementById("add_student_modal").close();
                  }}
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

export default AddStudent;
