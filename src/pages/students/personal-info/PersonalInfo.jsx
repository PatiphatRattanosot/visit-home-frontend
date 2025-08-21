import { useAuthStore } from "../../../stores/auth.store";
import ShowPicture from "../../../components/students/ShowPicture";
import { useEffect, useState } from "react";
import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";
import { useStudentStore } from "../../../stores/student.store";
import useYearSelectStore from "../../../stores/year_select.store";

const PersonalInfo = () => {
  const { userInfo } = useAuthStore();
  // สร้าง state มาเก็นข้อมูล
  const [personalInfo, setPersonalInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { getYearlyData } = useStudentStore();
  const { selectedYear } = useYearSelectStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      setLoading(true);
      try {
        const data = await getYearlyData(selectedYear);

        const student = data?.students?.[0];
        const yearlyData = student?.yearly_data?.[0];

        if (yearlyData?.personal_info) {
          setPersonalInfo(yearlyData.personal_info);
        } else {
          setPersonalInfo(null);
        }

        if (yearlyData?.image_url) {
          setImageUrl(yearlyData.image_url);
        } else {
          setImageUrl(null);
        }
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
        setPersonalInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, [selectedYear]);

  // stepper path
  const stepperPath = {
    stepOne: `/student/personal-info`,
    stepTwo: `/student/relation`,
    stepThree: `/student/family-status`,
    stepFour: `/student/behavior`,
  };

  return (
    <div className="min-h-screen py-10 bg-gray-100 flex justify-center">
      <div className="bg-white px-6 py-8 w-full max-w-screen-lg rounded-lg shadow-sm">
        <BreadcrumbsLoop options={[{ label: "ข้อมูลส่วนตัว" }]} />
        {/* Year Selector */}
        <div className="flex justify-center md:justify-end items-center mb-6">
          <YearSelector />
        </div>
        {/* Heading */}
        <h3 className="text-xl font-bold text-center w-full">
          ข้อมูลการเยี่ยมบ้าน{" "}
          <span className="text-gray-600 hidden md:block">
            {userInfo?.prefix} {userInfo?.first_name} {userInfo?.last_name}
          </span>
        </h3>
        {/* Manage Info Button */}
        <div className="flex justify-end mt-2">
          <a
            className={personalInfo === null ? "btn-green" : "btn-yellow"}
            href={
              personalInfo === null
                ? `/student/personal-info/${selectedYear}/add`
                : `/student/personal-info/${selectedYear}/update`
            }
          >
            {personalInfo === null ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล"}
          </a>
        </div>
        {/* Stepper */}
        <div className="my-4 flex justify-center">
          <Stepper step={1} path={stepperPath} />
        </div>
        {/* Picture */}
        <div className="flex justify-center mt-8">
          <ShowPicture studentPic={personalInfo?.image} />
        </div>
        {/* Student Info Section */}
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-3xl">
            <div className="bg-gray-50 rounded-lg px-6 py-10">
              <h3 className="text-lg font-bold text-gray-600 text-center mb-6">
                ข้อมูลส่วนตัวของนักเรียน
              </h3>

              {loading ? (
                <div className="text-center text-gray-500">
                  กำลังโหลดข้อมูล...
                </div>
              ) : personalInfo !== null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 text-gray-600 text-left">
                  <div>
                    ชื่อนักเรียน:{" "}
                    <span className="text-black">
                      {userInfo?.prefix} {userInfo?.first_name}
                    </span>
                  </div>
                  <div>
                    นามสกุล:{" "}
                    <span className="text-black">{userInfo?.last_name}</span>
                  </div>

                  <div>
                    ชื่อบิดา:{" "}
                    <span className="text-black">
                      {personalInfo?.father_prefix} {personalInfo?.father_name}
                    </span>
                  </div>
                  <div>
                    นามสกุลบิดา:{" "}
                    <span className="text-black">
                      {personalInfo?.father_last_name}
                    </span>
                  </div>

                  <div>
                    อาชีพบิดา:{" "}
                    <span className="text-black">
                      {personalInfo?.father_job}
                    </span>
                  </div>
                  <div>
                    เบอร์โทรศัพท์บิดา:{" "}
                    <span className="text-black">
                      {personalInfo?.father_phone}
                    </span>
                  </div>

                  <div>
                    ชื่อมารดา:{" "}
                    <span className="text-black">
                      {personalInfo?.mother_prefix} {personalInfo?.mother_name}
                    </span>
                  </div>
                  <div>
                    นามสกุลมารดา:{" "}
                    <span className="text-black">
                      {personalInfo?.mother_last_name}
                    </span>
                  </div>

                  <div>
                    อาชีพมารดา:{" "}
                    <span className="text-black">
                      {personalInfo?.mother_job}
                    </span>
                  </div>
                  <div>
                    เบอร์โทรศัพท์มารดา:{" "}
                    <span className="text-black">
                      {personalInfo?.mother_phone}
                    </span>
                  </div>

                  <div>
                    ชื่อผู้ปกครอง:{" "}
                    <span className="text-black">
                      {personalInfo?.parent_prefix} {personalInfo?.parent_name}
                    </span>
                  </div>
                  <div>
                    นามสกุลผู้ปกครอง:{" "}
                    <span className="text-black">
                      {personalInfo?.parent_last_name}
                    </span>
                  </div>

                  <div>
                    อาชีพผู้ปกครอง:{" "}
                    <span className="text-black">
                      {personalInfo?.parent_job}
                    </span>
                  </div>
                  <div>
                    เบอร์โทรศัพท์ผู้ปกครอง:{" "}
                    <span className="text-black">
                      {personalInfo?.parent_phone}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-red-500 mt-8">
                  ยังไม่มีข้อมูล
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
