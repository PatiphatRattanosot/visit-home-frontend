import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { PersonnelSchema } from "../../schemas/personnelUpdate";
import { usePersonnelStore } from "../../stores/admin.store";
import TextInputInModal from "./TexInputInModal";
import SelectInputInModal from "./SelectInputInModal";

const EditPersonnel = ({ id, onSuccesUpdatePerson }) => {
  // ใช้ Zustand store เพื่อจัดการข้อมูลบุคลากร
  const {
    data: personnel,
    getPersonnelById,
    updatePersonnel,
  } = usePersonnelStore();
  const [update, setUpdate] = useState(0);
  const [teacher, setTeacher] = useState(null); 

  const prefixOptions = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];
  const statusOptions = [
    { value: "ใช้งานอยู่", label: "ใช้งานอยู่" },
    { value: "ไม่ได้ใช้งานแล้ว", label: "ไม่ได้ใช้งานแล้ว" },
    
  ];

  const formik = useFormik({
    initialValues: {
      prefix: "",
      first_name: "",
      last_name: "",
      phone: "",
      status: "",
    },

    validationSchema: PersonnelSchema,
    onSubmit: async (values, actions) => {
      console.log("Submitting", values);
      await updatePersonnel(id, values);
      await onSuccesUpdatePerson();
      // ปิด modal หลังจากบันทึกสำเร็จ
      // เพื่อให้ useeffect ดึงข้อมูลใหม่ เพราะมีการ update State มีการเปลี่ยนแปลง
      setUpdate((prev) => prev + 1);
    },
  });

  useEffect(() => {
    getPersonnelById(id).then((teacherData) => {
      setTeacher(teacherData);
      formik.setValues({
        prefix: teacherData.prefix,
        first_name: teacherData.first_name,
        last_name: teacherData.last_name,
        phone: teacherData.phone,
        status: teacherData.status,
      });
    });
  }, [id, update]);
  return (
    <div>
      <dialog id={`edit_personnel_${id}`} className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">แก้ไขข้อมูลบุคลากร</h3>
          <p className="text-base m-2">
            {teacher ? `${teacher.first_name} ${teacher.last_name}` : ""}
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
              />

              <TextInputInModal
                name="phone"
                maxLength={10}
                placeholder="เบอร์โทรศัพท์"
                disabled={false}
                value={formik.values.phone}
                onChange={formik.handleChange}
                label="เบอร์โทรศัพท์"
                error={formik.errors.phone}
                touched={formik.touched.phone}
                onBlur={formik.handleBlur}
              />

              <SelectInputInModal
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                label="สถานะ"
                disabled={false}
                options={statusOptions}
                error={formik.errors.status}
                touched={formik.touched.status}
                onBlur={formik.handleBlur}
                className="w-64 md:w-72"
              />
            </div>

            <div className="modal-action flex justify-center">
              <div className="flex gap-6 ">
                <button type="submit" className="btn-green">
                  บันทึก
                </button>
                <button
                  type="button"
                  className="btn-red"
                  onClick={() => {
                    formik.setValues({
                      prefix: teacher.prefix,
                      first_name: teacher.first_name,
                      last_name: teacher.last_name,
                      phone: teacher.phone,
                      status: teacher.status,
                    });

                    document.getElementById(`edit_personnel_${id}`).close();
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

export default EditPersonnel;