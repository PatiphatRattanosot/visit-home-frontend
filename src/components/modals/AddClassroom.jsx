import { useEffect, useState } from "react";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";
import { useFormik } from "formik";
import { ClassroomSchema } from "../../schemas/classroom";
import { useParams } from "react-router";
import {usePersonnelStore} from "../../stores/admin.store";
import { useClassroomStore } from "../../stores/classroom.store";

const AddClassroom = ({ addClassroomSuccess }) => {
  const { yearId } = useParams();
  const { addClassroom } = useClassroomStore();
  const { fetchData, data: personnel } = usePersonnelStore();

  const selectTeacherOptions = personnel.map((teacher) => ({
    value: teacher._id,
    label: `${teacher.first_name} ${teacher.last_name}`,
  }));

  const formik = useFormik({
    initialValues: {
      room: 0,
      number: 0,
      teacherId: "",
    },
    validationSchema: ClassroomSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      console.log("Submitting", actions);
      await addClassroom(values, yearId);
      await addClassroomSuccess();
      actions.resetForm();
    },
  });

  // ดึงข้อมูลครูที่ปรึกษา
  // เพื่อใช้ใน SelectInputInModal
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <dialog id="add_classroom" className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">เพิ่มชั้นเรียน</h3>

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
                  เพิ่มข้อมูล
                </button>
                <button
                  type="button"
                  className="btn-red"
                  onClick={() => {
                    formik.resetForm();
                    document.getElementById("add_classroom").close();
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

export default AddClassroom;
