import { useEffect } from "react";
import { useFormik } from "formik";
import { ClassroomSchema } from "../../schemas/classroom";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";
import { useClassroomStore } from "../../stores/classroom.store";
import { usePersonnelStore } from "../../stores/admin.store";
const EditClassroom = ({ id, onUpdateSuccess }) => {
  const { data: teachers = [], fetchData: fetchTeachers } = usePersonnelStore();
  const { getClassroomById, updateClassroom } = useClassroomStore();
  const selectTeacherOptions = teachers.map((teacher) => ({
    value: teacher._id,
    label: teacher.first_name + " " + teacher.last_name,
  }));

  useEffect(() => {
    if (!teachers.length) {
      fetchTeachers();
    }
  }, [fetchTeachers, teachers.length]);

  const formik = useFormik({
    initialValues: {
      room: 1,
      number: 1,
      teacherId: "",
    },
    enableReinitialize: true, // ให้ Formik อัปเดตค่าเมื่อ initialValues เปลี่ยน
    validationSchema: ClassroomSchema,
    onSubmit: async (values, actions) => {
      await updateClassroom(id, values);
      await onUpdateSuccess(); // เรียกฟังก์ชัน callback หลังจากอัปเดตสำเร็จ
      document.getElementById(`edit_classroom_${id}`)?.close();
      // ปิด modal หลังจากบันทึกสำเร็จ
    },
  });

  const handleCancel = () => {
    getClassroomById(id).then((data) => {
      formik.setValues({
        room: data.room,
        number: data.number,
        teacherId: data.teacher_id?._id ?? "", //ทำให้เป็น string เราจะแสดงชื่อไม่ใช่ id
      });
    });
    document.getElementById(`edit_classroom_${id}`)?.close();
  };

  useEffect(() => {
    getClassroomById(id).then((data) => {
      formik.setValues({
        room: data.room,
        number: data.number,
        teacherId: data.teacher_id?._id ?? "", //ทำให้เป็น string เราจะแสดงชื่อไม่ใช่ id
      });
    });
  }, [id]);

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
                  maxLength={6}
                  minLength={1}
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
                  maxLength={6}
                  minLength={1}
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
                  value={formik.values.teacherId ?? ""}
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
                      handleCancel();
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
