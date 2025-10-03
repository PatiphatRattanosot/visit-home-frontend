import React from "react";
import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";
import useYearSelectStore from "../../../stores/year_select.store";

const Other = ({ page, setPage, otherInfo, personalInfo }) => {
  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "จากผู้ปกครอง" },
  ];

  const { selectedYear } = useYearSelectStore();

  // Mapping ความช่วยเหลือจากหน่วยงาน
  const organizeSupportMap = {
    0: "เบี้ยผู้สูงอายุ",
    1: "เบี้ยพิการ",
  };

  // Mapping ความช่วยเหลือจากโรงเรียน
  const schoolSupportMap = {
    0: "ด้านการเรียน",
    1: "ด้านพฤติกรรม",
    2: "ด้านเศรษฐกิจ (เช่น ขอรับทุน)",
  };

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
            ความต้องการจากผู้ปกครอง
          </h3>

          {/* Year Selector */}
          <div className="flex justify-center md:justify-end mt-6">
            <YearSelector />
          </div>

          {/* Add / Edit button */}
          <div className="mt-2 flex justify-center md:justify-end">
            {personalInfo ? (
              <a
                href={`/student/visiting-info/update/${selectedYear}`}
                className="text-white btn btn-warning"
              >
                แก้ไขข้อมูลการเยี่ยมบ้าน
              </a>
            ) : (
              <a
                href={`/student/visiting-info/add/${selectedYear}`}
                className="text-white btn btn-success"
              >
                เพิ่มข้อมูลการเยี่ยมบ้าน
              </a>
            )}
          </div>

          {/* Grid */}
          {!otherInfo ? (
            <div className="mt-6 text-center text-red-600 flex items-center justify-center text-lg h-[35vh]">
              ยังไม่มีการกรอกข้อมูลในปีนี้
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* ความช่วยเหลือจากหน่วยงาน */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความช่วยเหลือที่ต้องการจากหน่วยงาน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {otherInfo?.support_from_organize?.length
                    ? otherInfo?.support_from_organize
                        .map((o) => organizeSupportMap[o] || "-")
                        .join(", ")
                    : "-"}
                </p>
              </div>

              {/* ความช่วยเหลือจากโรงเรียน */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความช่วยเหลือที่ต้องการจากโรงเรียน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {otherInfo?.support_from_school?.length
                    ? otherInfo?.support_from_school
                        .map((s) => schoolSupportMap[s] || "-")
                        .join(", ")
                    : "-"}
                </p>
              </div>

              {/* ข้อกังวลของผู้ปกครอง */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ข้อกังวล / ความห่วงใยของผู้ปกครอง
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {otherInfo?.parent_concern || "-"}
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-start mt-10 space-x-2">
            <button
              className="btn btn-soft w-1/2"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              ย้อนกลับ{` (${page - 1})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Other;
