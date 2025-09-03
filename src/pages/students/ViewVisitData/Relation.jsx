import React from "react";
import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";
import useYearSelectStore from "../../../stores/year_select.store";

const Relation = ({ page, setPage, relationshipInfo }) => {
  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "ความสัมพันธ์" },
  ];

  const { selectedYear } = useYearSelectStore();

  // Helper function for individual relationship status
  const getRelationStatus = (status) => {
    switch (status) {
      case "0":
        return "สนิทสนม";
      case "1":
        return "เฉยๆ";
      case "2":
        return "ห่างเหิน";
      case "3":
        return "ขัดแย้ง";
      default:
        return "-";
    }
  };

  // Helper function for family relation status
  const getFamilyRelationStatus = (status) => {
    switch (status) {
      case "0":
        return "อยู่ร่วมกัน";
      case "1":
        return "แยกกันอยู่";
      case "2":
        return "หย่าร้าง";
      case "3":
        return "บิดาเสียชีวิต";
      case "4":
        return "มารดาเสียชีวิต";
      default:
        return "-";
    }
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
            ความสัมพันธ์ในครอบครัว
          </h3>

          <div className="flex justify-center md:justify-end mt-6">
            <YearSelector />
          </div>

          <div className="mt-2 flex justify-center md:justify-end">
            {relationshipInfo ? (
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

          {/* Conditional Rendering */}
          {!relationshipInfo ? (
            <div className="mt-6 text-center text-red-600 flex items-center justify-center text-lg h-[35vh]">
              ยังไม่มีการกรอกข้อมูลในปีนี้
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Family Relation Status */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สถานะความสัมพันธ์ในครอบครัว
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getFamilyRelationStatus(
                    relationshipInfo?.family_relation_status
                  )}
                </p>
              </div>

              {/* Family Member */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  จำนวนสมาชิกในครอบครัว
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {relationshipInfo?.family_member || "-"}
                </p>
              </div>

              {/* Family Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เวลาที่ใช้ร่วมกันในครอบครัว
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {relationshipInfo?.family_time || "-"}
                </p>
              </div>

              {/* Father Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความสัมพันธ์กับบิดา
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getRelationStatus(relationshipInfo?.father_relation)}
                </p>
              </div>

              {/* Mother Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความสัมพันธ์กับมารดา
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getRelationStatus(relationshipInfo?.mother_relation)}
                </p>
              </div>

              {/* Big Brother Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความสัมพันธ์กับพี่ชาย
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getRelationStatus(relationshipInfo?.big_brother_relation)}
                </p>
              </div>

              {/* Little Brother Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความสัมพันธ์กับน้องชาย
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getRelationStatus(relationshipInfo?.lil_brother_relation)}
                </p>
              </div>

              {/* Big Sister Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความสัมพันธ์กับพี่สาว
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getRelationStatus(relationshipInfo?.big_sister_relation)}
                </p>
              </div>

              {/* Little Sister Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความสัมพันธ์กับน้องสาว
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getRelationStatus(relationshipInfo?.lil_sister_relation)}
                </p>
              </div>

              {/* Grandparent Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความสัมพันธ์กับปู่ย่าตายาย
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getRelationStatus(relationshipInfo?.grandparent_relation)}
                </p>
              </div>

              {/* Relative Relation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความสัมพันธ์กับญาติ
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getRelationStatus(relationshipInfo?.relative_relation)}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-soft w-1/2"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              ย้อนกลับ {` (${page - 1})`}
            </button>
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

export default Relation;
