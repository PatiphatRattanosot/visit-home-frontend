import { useEffect } from "react";
import { useFormik } from "formik";
import { ClassroomSchema } from "../../schemas/classroom";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";

const EditClassroom = () => {
  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true, // ให้ Formik อัปเดตค่าเมื่อ initialValues เปลี่ยน
    validationSchema: ClassroomSchema,
    onSubmit: async (values, actions) => {},
  });

  return (
    <div>
      <div>
        <dialog id={`edit_classroom_${id}`} className="modal">
          <div className="modal-box flex flex-col items-center justify-center w-11/12">
            <h3 className="font-bold text-lg text-center">
              แก้ไขข้อมูลชั้นเรียน
            </h3>

            <form action="" onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-center justify-center space-y-2">
                <TextInputInModal
                  type="number"
                  name="room"
                  placeholder="เลขชั้น"
                  disabled={false}
                  value={formik.values.room}
                  onChange={formik.handleChange}
                  error={formik.errors.room}
                  touched={formik.touched.room}
                  onBlur={formik.handleBlur}
                  className="w-64 md:w-72"
                  label="ชั้น"
                />
                <TextInputInModal
                  type="number"
                  className="w-64 md:w-72"
                  label="ห้อง"
                  placeholder="เลขห้อง"
                  disabled={false}
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  error={formik.errors.number}
                  touched={formik.touched.number}
                  onBlur={formik.handleBlur}
                  name="number"
                />
                <SelectInputInModal
                  className="w-64 md:w-72"
                  label="ครูที่ปรึกษา"
                  name="teacherId"
                  value={formik.values.teacherId}
                  onChange={formik.handleChange}
                  error={formik.errors.teacherId}
                  touched={formik.touched.teacherId}
                  onBlur={formik.handleBlur}
                  options={selectTeacherOptions}
                  defaultOpt="เลือกครูที่ปรึกษา"
                />
                <div className="flex gap-6 justify-center mt-4">
                  <button type="submit" className="btn-green">
                    แก้ไขข้อมูล
                  </button>
                  <button
                    type="button"
                    className="btn-red"
                    onClick={() => {
                      formik.resetForm({
                        values: {},
                      });
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
    </div>
  );
};
export default EditClassroom;
