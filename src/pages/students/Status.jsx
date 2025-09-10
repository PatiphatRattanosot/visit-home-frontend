import useYearSelectStore from "../../stores/year_select.store";
import YearSelector from "../../components/YearSelector";
import StudentService from "../../services/student/student.service";
import SDQServices from "../../services/sdq/sdq.service";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/auth.store";

const Status = () => {
  const { selectedYear } = useYearSelectStore();
  const { userInfo } = useAuthStore();
  const [homeVisitData, setHomeVisitData] = useState(null);
  const [sdqStudentData, setSdqStudentData] = useState(null);
  const [sdqTeacherData, setSdqTeacherData] = useState(null);
  const [sdqParentData, setSdqParentData] = useState(null);

  useEffect(() => {
    setHomeVisitData(null);
    const fetchData = async () => {
      try {
        const homeVisitResponse = await StudentService.getYearlyData(
          selectedYear
        );
        if (homeVisitResponse.status === 200) {
          setHomeVisitData(homeVisitResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    setSdqParentData(null);
    const fetchData = async () => {
      try {
        const sdqParentResponse = await SDQServices.getSDQByYearAndAssessor({
          year_id: selectedYear,
          assessor: "Parent",
          student_id: userInfo?._id,
        });
        if (sdqParentResponse.status === 200) {
          setSdqParentData(sdqParentResponse.data?.sdq?.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedYear, userInfo?._id]);

  useEffect(() => {
    setSdqStudentData(null);
    const fetchData = async () => {
      try {
        const sdqStudentResponse = await SDQServices.getSDQByYearAndAssessor({
          year_id: selectedYear,
          assessor: "Student",
          student_id: userInfo?._id,
        });

        if (sdqStudentResponse.status === 200) {
          setSdqStudentData(sdqStudentResponse.data?.sdq?.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedYear, userInfo?._id]);

  useEffect(() => {
    setSdqTeacherData(null);
    const fetchData = async () => {
      try {
        const sdqTeacherResponse = await SDQServices.getSDQByYearAndAssessor({
          year_id: selectedYear,
          assessor: "Teacher",
          student_id: userInfo?._id,
        });
        if (sdqTeacherResponse.status === 200) {
          setSdqTeacherData(sdqTeacherResponse.data?.sdq?.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedYear, userInfo?._id]);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 min-h-[60vh] flex flex-col gap-8">
        <h3 className="text-2xl font-bold text-center mt-6 mb-2">
          สถานะการกรอกข้อมูล
        </h3>

        <div className="flex justify-center md:justify-end mb-10">
          <YearSelector />
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* การ์ดสถานะ */}
          <div className="rounded-lg border border-gray-100 px-6 flex flex-col items-center bg-gray-50 min-h-[200px] py-12">
            <span className="text-lg font-semibold text-gray-700 mb-3">
              ข้อมูลการเยี่ยมบ้าน
            </span>
            <span
              className={`text-xl font-bold ${
                homeVisitData ? "text-green-600" : "text-red-600"
              }`}
            >
              {homeVisitData ? "กรอกข้อมูลเรียบร้อย" : "ยังไม่ได้กรอกข้อมูล"}
            </span>
          </div>
          {/* การ์ดสถานะ */}
          <div className="rounded-lg border border-gray-100 px-6 flex flex-col items-center bg-gray-50 min-h-[200px] py-12">
            <span className="text-lg font-semibold text-gray-700 mb-3">
              แบบประเมิน SDQ
            </span>
            <span
              className={`text-xl font-bold ${
                sdqStudentData && sdqParentData && sdqTeacherData
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {sdqStudentData && sdqParentData && sdqTeacherData
                ? "ประเมินครบเรียบร้อย"
                : !sdqStudentData && !sdqParentData && !sdqTeacherData
                ? "ยังไม่ประเมิน"
                : !sdqStudentData && sdqParentData && sdqTeacherData
                ? "รอนักเรียนทำแบบประเมิน"
                : sdqStudentData && !sdqParentData && sdqTeacherData
                ? "รอผู้ปกครองทำแบบประเมิน"
                : sdqStudentData && sdqParentData && !sdqTeacherData
                ? "รอครูทำแบบประเมิน"
                : !sdqStudentData && !sdqParentData && sdqTeacherData
                ? "รอนักเรียนและผู้ปกครองทำแบบประเมิน"
                : !sdqStudentData && sdqParentData && !sdqTeacherData
                ? "รอนักเรียนและครูทำแบบประเมิน"
                : sdqStudentData && !sdqParentData && !sdqTeacherData
                ? "รอผู้ปกครองและครูทำแบบประเมิน"
                : "สถานะไม่ชัดเจน"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
