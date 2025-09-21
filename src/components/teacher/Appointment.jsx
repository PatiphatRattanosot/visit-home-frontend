import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { AppointmentSchema } from "../../schemas/appointment";
import { useScheduleStore } from "../../stores/schedule.store";
import { useAuthStore } from "../../stores/auth.store";
import useYearSelectStore from "../../stores/year_select.store";
import DateField from "../DateField";
import Textarea from "../Textarea";
import ScheduleServices from "../../services/schedule/schedule.service";

const Appointment = ({ student, studentId }) => {
  const [hasSchedule, setHasSchedule] = useState(false);
  const { userInfo } = useAuthStore();
  const { createSchedule, updateSchedule, deleteSchedule } = useScheduleStore();
  const { selectedYear } = useYearSelectStore();
  const [scheduleId, setScheduleId] = useState(null);

  useEffect(() => {
    fetchSchedule(userInfo._id, selectedYear, studentId);
    formik.setValues({ student_id: studentId, teacher_id: userInfo._id, year_id: selectedYear });
  }, [userInfo._id, selectedYear, studentId]);



 

  const formik = useFormik({
    initialValues: {
      appointment_date: null,
      comment: "",
      teacher_id: userInfo._id,
      year_id: selectedYear,
      student_id: studentId,
    },
    enableReinitialize: true,
    validationSchema: AppointmentSchema,
    onSubmit: async (values) => {
      if (hasSchedule) {
        await updateSchedule({
          schedule_id: values.schedule_id || scheduleId,
          appointment_date: new Date(values.appointment_date),
          comment: values.comment,
          status: "Been-set", // หรือใช้ค่าจาก schedule เดิม ถ้ามี
        });
      } else {
        await createSchedule({
          teacher_id: userInfo._id,
          year_id: selectedYear,
          student_id: studentId,
          appointment_date: new Date(values.appointment_date),
          comment: values.comment,
        });
        fetchSchedule();
      }
      document
        .getElementById(`add_appointment_schedule_${student._id}`)
        ?.close();
    },
  });

  const fetchSchedule = async () => {
    setHasSchedule(false);
    setScheduleId(null);
    formik.setValues(formik.initialValues);
    if (studentId && userInfo?._id && selectedYear) {
      const schedules = await ScheduleServices.getSchedule(
        userInfo._id,
        selectedYear,
        studentId
      );
      if (schedules.status === 200 && schedules.data.schedules.length > 0) {
        const schedule = schedules.data.schedules[0];
        formik.setValues({
          appointment_date: schedule.appointment_date
            ? new Date(schedule.appointment_date).toISOString().split("T")[0]
            : "",
          comment: schedule.comment || "",
          teacher_id: userInfo._id,
          year_id: selectedYear,
          student_id: studentId,
        });
        setHasSchedule(true);
        setScheduleId(schedule._id);
      } else {
        formik.resetForm();
        setHasSchedule(false);
        setScheduleId(null);
      }
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [studentId, userInfo?._id, selectedYear, formik.handleSubmit]);

  return (
    <dialog id={`add_appointment_schedule_${student._id}`} className="modal">
      <div className="modal-box max-w-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-xl mb-4 text-center">📅 นัดเยี่ยมบ้าน</h3>
        <p className="text-lg text-center">
          {student.first_name} {student.last_name}
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <DateField
              label="เลือกวันที่นัดเยี่ยมบ้าน"
              name="appointment_date"
              value={formik.values.appointment_date || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.appointment_date}
              error={formik.errors.appointment_date}
              required={true}
              className="w-full"
              id="appointment-date-input"
            />
            <label className="form-control w-full">
              <Textarea
                name="comment"
                label="หมายเหตุ (ถ้ามี)"
                value={formik.values.comment || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched.comment}
                error={formik.errors.comment}
                id="appointment-comment-textarea"
                placeholder="หมายเหตุเพิ่มเติม..."
              />
            </label>
          </div>
          <div className="modal-action flex justify-between">
            {!hasSchedule && (
              <button
                type="button"
                className="btn-red"
                onClick={() => {
                  document
                    .getElementById(`add_appointment_schedule_${student._id}`)
                    ?.close();
                  formik.resetForm();
                }}
              >
                ยกเลิก
              </button>
            )}
            {hasSchedule && (
              <button
                className="btn-red"
                type="button"
                onClick={() =>
                  deleteSchedule(formik.values.schedule_id || scheduleId).then(
                    () => {
                      formik.setValues(formik.initialValues);
                      setHasSchedule(false);
                      setScheduleId(null);
                      document
                        .getElementById(
                          `add_appointment_schedule_${student._id}`
                        )
                        ?.close();
                    }
                  )
                }
              >
                ยกเลิกวันนัดเยี่ยมบ้าน
              </button>
            )}
            <button
              type="submit"
              className={hasSchedule ? "btn-yellow" : "btn-green"}
            >
              {hasSchedule ? "แก้ไขนัดหมาย" : "บันทึก"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Appointment;