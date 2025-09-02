import React from "react";
import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";

const Relation = ({ page, setPage }) => {
  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "ความสัมพันธ์" },
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
            ความสัมพันธ์ในครอบครัว
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"></div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-soft w-1/2"
              type="button"
              onClick={() => setPage(page - 1)}
            >
              ย้อนกลับ{` (${page - 1})`}
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
