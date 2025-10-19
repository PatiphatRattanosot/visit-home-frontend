import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { AppointmentSchema } from "../../schemas/appointment";
import { useScheduleStore } from "../../stores/schedule.store";
import { useAuthStore } from "../../stores/auth.store";
import useYearSelectStore from "../../stores/year_select.store";
import DateField from "../DateField";
import Textarea from "../Textarea";
import toast from "react-hot-toast";


const Appointment = ({ student, studentId, onScheduleUpdate, currentYearData }) => {
  const [hasSchedule, setHasSchedule] = useState(false);
  const { userInfo } = useAuthStore();
  const {
    createSchedule,
    updateSchedule,
    deleteSchedule,
    fetchSchedule,
    schedule,
  } = useScheduleStore();
  const { selectedYear } = useYearSelectStore();
  const [scheduleId, setScheduleId] = useState(null);

  const fetchAndSet = async () => {
    if (studentId && selectedYear) {
      const schedules = await fetchSchedule(selectedYear, studentId);
      if (schedules) {
        const s = schedules;
        formik.setValues({
          appointment_date: s.appointment_date
            ? new Date(s.appointment_date).toISOString().split("T")[0]
            : "",
          comment: s.comment || "",
          teacher_id: userInfo._id,
          year_id: selectedYear,
          student_id: studentId,
          schedule_id: s._id,
        });
        setHasSchedule(true);
        setScheduleId(s._id);
      } else {
        formik.resetForm();
        setHasSchedule(false);
        setScheduleId(null);
      }
    } else {
      formik.resetForm();
      setHasSchedule(false);
      setScheduleId(null);
    }
  };

  // Fetch schedule when studentId or selectedYear changes
  useEffect(() => {
    fetchAndSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId, selectedYear]);

  const formik = useFormik({
    initialValues: {
      appointment_date: null,
      comment: "",
      teacher_id: userInfo._id,
      year_id: selectedYear,
      student_id: studentId,
      schedule_id: null,
    },
    // enableReinitialize: true,
    validationSchema: AppointmentSchema,
    onSubmit: async (values) => {
      // ตรวจสอบว่าวันที่ที่เลือกอยู่ในช่วงที่กำหนดหรือไม่
      if (currentYearData?.start_schedule_date && currentYearData?.end_schedule_date) {
        const selectedDate = new Date(values.appointment_date);
        const startDate = new Date(currentYearData.start_schedule_date);
        const endDate = new Date(currentYearData.end_schedule_date);
        
        // เซ็ตเวลาเป็น 00:00:00 เพื่อเปรียบเทียบแค่วันที่
        selectedDate.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        
        if (selectedDate < startDate || selectedDate > endDate) {
          toast.error(`กรุณาเลือกวันที่ในช่วง ${startDate.toLocaleDateString("th-TH", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} - ${endDate.toLocaleDateString("th-TH", {
            day: "numeric", 
            month: "long",
            year: "numeric",
          })}`);
          return;
        }
      }

      if (hasSchedule) {
        await updateSchedule({
          schedule_id: values.schedule_id || scheduleId,
          appointment_date: new Date(values.appointment_date),
          comment: values.comment,
          status: "Been-set",
        });
      } else {
        await createSchedule({
          teacher_id: userInfo._id,
          year_id: selectedYear,
          student_id: studentId,
          appointment_date: new Date(values.appointment_date),
          comment: values.comment,
        });
      }
      // Refetch after submit
      await fetchAndSet();
      // Refresh parent component data
      if (onScheduleUpdate) {
        await onScheduleUpdate();
      }
      document
        .getElementById(`add_appointment_schedule_${student._id}`)
        ?.close();
    },
  });

  // fetchSchedule function is now handled by the store and useEffect above

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
                onClick={async () => {
                  await deleteSchedule(formik.values.schedule_id || scheduleId);
                  formik.resetForm();
                  setHasSchedule(false);
                  setScheduleId(null);
                  await fetchSchedule(selectedYear, studentId);
                  // Refresh parent component data
                  if (onScheduleUpdate) {
                    await onScheduleUpdate();
                  }
                  document
                    .getElementById(`add_appointment_schedule_${student._id}`)
                    ?.close();
                }}
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
