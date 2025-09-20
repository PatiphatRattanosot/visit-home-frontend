import { useFormik } from "formik";
import { AppointmentSchema } from "../../schemas/appointment";
import { useScheduleStore } from "../../stores/schedule.store";
import { useAuthStore } from "../../stores/auth.store";
import useYearSelectStore from "../../stores/year_select.store";
import DateField from "../DateField";
import Textarea from "../Textarea";
const Appointment = ({ student, studentId }) => {
  const { userInfo } = useAuthStore();
  const { createSchedule } = useScheduleStore();
  const { selectedYear } = useYearSelectStore();

  const formik = useFormik({
    initialValues: {
      appointment_date: "",
      comment: "",
      teacher_id: userInfo._id,
      year_id: selectedYear,
      student_id: studentId,
    },
    validationSchema: AppointmentSchema,
    onSubmit: async (values, actions) => {
      await createSchedule({
        appointment_date: new Date(values.appointment_date),
        comment: values.comment,
        teacher_id: userInfo._id,
        year_id: selectedYear,
        student_id: studentId,
      });
      await document
        .getElementById(`add_appointment_schedule_${student._id}`)
        ?.close();
      actions.resetForm();
    },
  });

  return (
    <dialog id={`add_appointment_schedule_${student._id}`} className="modal">
      <div className="modal-box max-w-lg">
        <form method="dialog">
          {/* ปุ่มปิด */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl mb-4 text-center">📅 นัดเยี่ยมบ้าน</h3>
        <p className="text-lg text-center">
          {student.first_name} {student.last_name}
        </p>
        {/* ฟอร์มเพิ่มข้อมูล */}
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            {/* วันที่นัดเยี่ยม */}

            <DateField
              label="เลือกวันที่นัดเยี่ยมบ้าน"
              name="appointment_date"
              value={formik.values.appointment_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.appointment_date}
              error={formik.errors.appointment_date}
              required={true}
              className="w-full"
              id="appointment-date-input"
            />

            {/* หมายเหตุ */}
            <label className="form-control w-full">
              <Textarea
                name="comment"
                label="หมายเหตุ (ถ้ามี)"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.comment}
                error={formik.errors.comment}
                id="appointment-comment-textarea"
                placeholder="หมายเหตุเพิ่มเติม..."
              />
            </label>
          </div>

          {/* ปุ่ม Action */}
          <div className="modal-action flex justify-between">
            <button
              className="btn-red"
              onClick={() =>
                document
                  .getElementById(`add_appointment_schedule_${student._id}`)
                  .close()
              }
            >
              ยกเลิก
            </button>
            <button type="submit" className="btn-green">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Appointment;
