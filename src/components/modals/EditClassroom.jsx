import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { ClassroomSchema } from "../../schemas/classroom";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";
import { toast } from "react-hot-toast";
import ClassroomService from "../../services/class/class.service";
import UsersServices from "../../services/users/users.service";
import { usePersonnelStore, useClassroomStore } from "../../stores/admin.store"; // ใช้ store ที่สร้างขึ้นมา

const EditClassroom = ({ id, onUpdateSuccess }) => {
  // ใช้ Zustand store เพื่อจัดการข้อมูลชั้นเรียน
  const { getClassroomById, updateClassroom } = useClassroomStore();
  const { data: personnel, fetchData } = usePersonnelStore();
  const [update, setUpdate] = useState(0);
  const [classrooms, setClassrooms] = useState({
    room: 0,
    number: 0,
    teacher: "",
  });

  const selectTeacherOptions = personnel.map((teacher) => ({
    value: teacher._id,
    label: `${teacher.first_name} ${teacher.last_name}`,
  }));
  console.log(classrooms);

  useEffect(() => {
    fetchData(); // ดึงข้อมูลครูที่ปรึกษา
  }, []);

  // ดึงข้อมูลชั้นเรียนและครูที่ปรึกษา
  useEffect(() => {
    getClassroomById(id).then((classroomData) => {
      setClassrooms(classroomData);
      formik.setValues({
        room: classroomData.room,
        number: classroomData.number,
         teacherId: classrooms.teacher_id?._id || "",
      });
    });
  }, [id, update]);

  // useEffect(() => {
  //   const fetchClassroom = async () => {
  //     const data = await getClassroomById(id); // รอให้ค่าถูกส่งกลับมาจาก store
  //     if (data) {
  //       setClassrooms({
  //         room: data.room,
  //         number: data.number,
  //         teacher: data.teacher_id?._id
  //       });
  //     }
  //   };
  //   fetchClassroom();
  // }, [id, update]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setClassrooms((prevClassrooms) => ({
  //     ...prevClassrooms,
  //     [name]: value,
  //   }));
  // };

  const formik = useFormik({
    initialValues: {
      
      room: parseInt(classrooms.room),
      number: parseInt(classrooms.number),
     teacherId: classrooms.teacher_id?._id || "",
    },
    enableReinitialize: true, // ให้ Formik อัปเดตค่าเมื่อ initialValues เปลี่ยน
    validationSchema: ClassroomSchema,
    onSubmit: async (values, actions) => {
      await updateClassroom(id, values);
      await onUpdateSuccess();
      setUpdate((prev) => prev + 1);
    },
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await ClassroomService.updateClass({
  //       class_id: id,
  //       room: parseInt(classrooms.room),
  //       number: parseInt(classrooms.number),
  //       teacher_id: classrooms.teacher,
  //     });
  //     if (response.status === 200) {
  //       toast.success(response.data.message || "แก้ไขชั้นเรียนสำเร็จ");

  //       onUpdateSuccess();
  //       document.getElementById(`edit_classroom_${id}`).close();
  //     }
  //   } catch (error) {
  //     console.log("Error in handleSubmit:", error);

  //     toast.error(
  //       error.response?.data?.message || "เกิดข้อผิดพลาดในการแก้ไขชั้นเรียน"
  //     );
  //   }
  // };
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
      values: {
        room: classrooms.room,
        number: classrooms.number,
        teacherId: classrooms.teacher_id?._id || "", // ✅ คืนค่าครู
      },
    });
                      document.getElementById(`edit_classroom_${id}`).close();
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
