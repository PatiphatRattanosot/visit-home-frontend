import React from "react";
import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import ShowPicture from "../../../components/students/ShowPicture";
import YearSelector from "../../../components/YearSelector";
import useYearSelectStore from "../../../stores/year_select.store";
import { useAuthStore } from "../../../stores/auth.store";
import { useStudentStore } from "../../../stores/student.store";

const Personal = ({ page, setPage, image }) => {
  const [personalInfo, setPersonalInfo] = React.useState(null);

  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "ข้อมูลส่วนตัว" },
  ];

  const { selectedYear } = useYearSelectStore();
  const { userInfo } = useAuthStore();
  const { getYearlyData } = useStudentStore();

  React.useEffect(() => {
    if (selectedYear && userInfo?._id) {
      getYearlyData(selectedYear).then((res) => {
        setPersonalInfo(res);
      });
    }
  }, [selectedYear, userInfo?._id]);

  return (
    <div className="flex items-center justify-center py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-start mb-2">
          <BreadcrumbsLoop options={breadcrumbsOptions} />
        </div>
        <div className="mb-8 flex justify-center">
          <Stepper page={page} setPage={setPage} />
        </div>
        <div>
          {/* Heading */}
          <h3 className="text-xl font-bold text-center w-full">
            ข้อมูลส่วนตัว
          </h3>

          <div className="flex justify-end">
            <YearSelector />
          </div>

          <div className="flex justify-center mt-6">
            <ShowPicture studentPic={image} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* Student Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทรศัพท์นักเรียน
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.phone || "-"}
              </p>
            </div>

            {/* Father Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำนำหน้าชื่อบิดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.father_prefix || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อบิดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.father_name || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                นามสกุลบิดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.father_last_name || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทรศัพท์บิดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.father_phone || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อาชีพบิดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.father_job || "-"}
              </p>
            </div>

            {/* Mother Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำนำหน้าชื่อมารดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.mother_prefix || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อมารดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.mother_name || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                นามสกุลมารดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.mother_last_name || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทรศัพท์มารดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.mother_phone || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อาชีพมารดา
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.mother_job || "-"}
              </p>
            </div>

            {/* Parent/Guardian Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คำนำหน้าชื่อผู้ปกครอง
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.parent_prefix || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อผู้ปกครอง
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.parent_name || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                นามสกุลผู้ปกครอง
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.parent_last_name || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทรศัพท์ผู้ปกครอง
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.parent_phone || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                อาชีพผู้ปกครอง
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.parent_job || "-"}
              </p>
            </div>

            {/* Location Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ละติจูด (Latitude)
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.lat || "-"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ลองจิจูด (Longitude)
              </label>
              <p className="w-full p-2 rounded-md text-gray-900">
                {personalInfo?.lng || "-"}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-10 space-x-2">
            <button
              type="button"
              className="btn btn-soft w-1/2"
              onClick={() => setPage(page + 1)}
            >
              ถัดไป {` (${page + 1})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
