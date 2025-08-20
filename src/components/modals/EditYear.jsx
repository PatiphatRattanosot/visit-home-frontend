import { YearSchema } from "../../schemas/year";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import useYearSelectStore from "../../stores/year_select.store";
import TextInputInModal from "./TexInputInModal";
import toast from "react-hot-toast";

const EditYear = ({ year, onUpdateSuccess }) => {
  const { getYearsById, updateYear } = useYearSelectStore();
  const [update, setUpdate] = useState(0);

  const formik = useFormik({
    initialValues: {
      year: year.year,
    },
    enableReinitialize: true,
    validationSchema: YearSchema,
    onSubmit: async (values, actions) => {
      await updateYear(year._id, values);
      await onUpdateSuccess();
      setUpdate((prev) => prev + 1);
    },
  });

  useEffect(() => {
    const fetchYear = async () => {
      try {
        const data = await getYearsById(year._id);
        // ป้องกันการ setValues ซ้ำโดยไม่จำเป็น
        // หา data ที่มันตรงกับ year ID แล้วเช็คว่าตรงกับ values formik จากนั้นถ้าไม่ตรงก็เอาไปเซ็ตไว้ใน formik
        if (data && data.year !== formik.values.year) {
          formik.setValues({ year: data.year });
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "เกิดข้อผิดพลาดในการโหลดปีการศึกษา"
        );
      }
    };
    fetchYear();
  }, [year._id, update]); 

  return (
    <div>
      <dialog id={`Edit_year_${year._id}`} className="modal">
        <div className="modal-box flex flex-col items-center justify-center w-11/12">
          <h3 className="font-bold text-lg text-center">แก้ไขปีการศึกษา</h3>
          <form
            onSubmit={formik.handleSubmit}
            method="dialog"
            className="flex flex-col gap-4 mt-4"
          >
            <TextInputInModal
              type="number"
              name="year"
              placeholder="ปีการศึกษา เช่น 2566"
              disabled={false}
              value={formik.values.year}
              onChange={formik.handleChange}
              label="ปีการศึกษา"
              error={formik.errors.year}
              touched={formik.touched.year}
              onBlur={formik.handleBlur}
            />
            <div className="modal-action flex justify-center gap-4">
              <button type="submit" className="btn bg-green-500 text-white">
                บันทึก
              </button>
              <button
                type="button"
                className="btn bg-red-400 text-white"
                onClick={() => {
                  formik.setValues({ year: year.year });
                  document.getElementById(`Edit_year_${year._id}`).close();
                }}
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EditYear;
