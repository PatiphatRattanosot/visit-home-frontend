import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import ShowPicture from "../../../components/students/ShowPicture";
import YearSelector from "../../../components/YearSelector";
import ViewMap from "../../../components/students/ViewMap";

const Personal = ({ page, setPage, personalInfo, image, phone }) => {
  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "ข้อมูลส่วนตัว" },
  ];

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

          <div className="flex justify-center md:justify-end mt-6">
            <YearSelector />
          </div>

          <div className="flex justify-center mt-6">
            <ShowPicture studentPic={image} />
          </div>

          {/* ดึงชื่อนักเรียนจาก index */}
          {!personalInfo ? (
            <div className="mt-6 text-center text-red-600 flex items-center justify-center text-lg h-[35vh]">
              ยังไม่มีการกรอกข้อมูลในปีนี้
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Student Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อนักเรียน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {userInfo?.prefix + " " + userInfo?.first_name || "-"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  นามสกุล
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {userInfo?.last_name || "-"}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เบอร์โทรศัพท์นักเรียน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {phone || "-"}
                </p>
              </div>

              {/* Father Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อบิดา
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {personalInfo?.father_prefix +
                    " " +
                    personalInfo?.father_name || "-"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  นามสกุล
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
                  ชื่อมารดา
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {personalInfo?.mother_prefix +
                    " " +
                    personalInfo?.mother_name || "-"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  นามสกุล
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
                  ชื่อผู้ปกครอง
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {personalInfo?.parent_prefix +
                    " " +
                    personalInfo?.parent_name || "-"}
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
          )}
          {personalInfo && personalInfo.lat && personalInfo.lng && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ตำแหน่งบ้านนักเรียน
              </label>
              <ViewMap lat={personalInfo.lat} lng={personalInfo.lng} />
            </div>
          )}
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
