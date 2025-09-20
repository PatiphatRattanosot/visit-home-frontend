import { useFormik } from "formik";
import useYearSelectStore from "../stores/year_select.store";
import { useEffect } from "react";
import { ScheduleSchema } from "../schemas/year";

const DateInput = ({ yearNumber }) => {
  const { addSchedule, selectedYear, getYearsByYear } = useYearSelectStore();
  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
    validationSchema: ScheduleSchema,
    onSubmit: (values, actions) => {
      console.log("วันที่เริ่มต้นถูกบันทึก:", values.startDate);
      console.log("วันที่สิ้นสุดถูกบันทึก:", values.endDate);
      addSchedule({
        year_id: selectedYear,
        start_schedule_date: new Date(values.startDate),
        end_schedule_date: new Date(values.endDate),
      });
      // reset form
      // actions.resetForm();
    },
  });

  useEffect(() => {
    formik.setValues(formik.initialValues);
    if (yearNumber) {
      getYearsByYear(yearNumber).then((year) => {
        if (year && year.start_schedule_date && year.end_schedule_date) {
          formik.setValues({
            startDate: new Date(year.start_schedule_date)
              .toISOString()
              .substring(0, 10),
            endDate: new Date(year.end_schedule_date)
              .toISOString()
              .substring(0, 10),
          });
        }
      });
    }
  }, [yearNumber, selectedYear, formik.handleSubmit]);

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
        <div className="flex flex-col gap-2 w-full">
          <label className="label">
            <span className="label-text">วันที่เริ่มต้น</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input input-bordered w-full md:w-42"
          />
          {formik.touched.startDate && formik.errors.startDate ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.startDate}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="label">
            <span className="label-text">วันที่สิ้นสุด</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input input-bordered w-full md:w-42"
          />
          {formik.touched.endDate && formik.errors.endDate ? (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.endDate}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex justify-center">
        <button type="submit" className="btn-green">
          บันทึก
        </button>
      </div>
    </form>
  );
};

export default DateInput;
