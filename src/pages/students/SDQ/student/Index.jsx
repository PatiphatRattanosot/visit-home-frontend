import React from "react";
import { useFormik } from "formik";
import Emotional from "./Emotional";
import Behavioral from "./Behavioral";
import Hyperactivity from "./Hyperactivity";
import Friendship from "./Friendship";
import Social from "./Social";
import Additional from "./Additional";
import { useAuthStore } from "../../../../stores/auth.store";
import { SDQInitValues, SDQValidations } from "../../../../schemas/sdq";
import SDQServices from "../../../../services/sdq/sdq.service";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router";

const Index = () => {
  const [page, setPage] = React.useState(1);
  const { userInfo } = useAuthStore();
  const { yearId } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: SDQInitValues,
    validationSchema: SDQValidations,
    onSubmit: async (values) => {
      try {
        const emotional = {
          question_3: Number(values.question_3),
          question_8: Number(values.question_8),
          question_13: Number(values.question_13),
          question_16: Number(values.question_16),
          question_24: Number(values.question_24),
        };
        const behavioral = {
          question_5: Number(values.question_5),
          question_7: Number(values.question_7),
          question_12: Number(values.question_12),
          question_18: Number(values.question_18),
          question_22: Number(values.question_22),
        };
        const hyperactivity = {
          question_2: Number(values.question_2),
          question_10: Number(values.question_10),
          question_15: Number(values.question_15),
          question_21: Number(values.question_21),
          question_25: Number(values.question_25),
        };
        const friendship = {
          question_6: Number(values.question_6),
          question_11: Number(values.question_11),
          question_14: Number(values.question_14),
          question_19: Number(values.question_19),
          question_23: Number(values.question_23),
        };
        const social = {
          question_1: Number(values.question_1),
          question_4: Number(values.question_4),
          question_9: Number(values.question_9),
          question_17: Number(values.question_17),
          question_20: Number(values.question_20),
        };
        const other = {
          additional: values.additional,
          overall_problem: values.overall_problem,
          problem_time: values.problem_time,
          is_uneasy_student: values.is_uneasy_student,
          is_annoy_student: values.is_annoy_student,
          is_difficult_student: values.is_difficult_student,
        };
        const data = {
          emotional,
          behavioral,
          hyperactivity,
          friendship,
          social,
          other,
          student_id: userInfo._id,
          year_id: yearId,
          assessor: "Student",
        };
        const res = await SDQServices.createSDQ(data);
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "SDQ",
            text: res.data.message || "บันทึกข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(`/student/sdq-student`);
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: error.message || "ไม่สามารถบันทึกข้อมูลได้",
        });
      }
    },
  });

  React.useEffect(() => {
    const redirectPath = async () => {
      try {
        const res = await SDQServices.getSDQByYearAndAssessor({
          year_id: selectedYear,
          student_id: userInfo?._id,
          assessor: "Student",
        });
        if (res.status === 200) {
          navigate(`/student/sdq-student`);
        }
      } catch (err) {
        console.error("Failed to fetch SDQ data:", err);
      }
    };
    redirectPath();
  }, [yearId, userInfo?._id]);

  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50">
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {page === 1 && (
          <Emotional setPage={setPage} page={page} formik={formik} />
        )}
        {page === 2 && (
          <Behavioral setPage={setPage} page={page} formik={formik} />
        )}
        {page === 3 && (
          <Hyperactivity setPage={setPage} page={page} formik={formik} />
        )}
        {page === 4 && (
          <Friendship setPage={setPage} page={page} formik={formik} />
        )}
        {page === 5 && <Social setPage={setPage} page={page} formik={formik} />}
        {page === 6 && (
          <Additional setPage={setPage} page={page} formik={formik} />
        )}
      </form>
    </div>
  );
};

export default Index;
