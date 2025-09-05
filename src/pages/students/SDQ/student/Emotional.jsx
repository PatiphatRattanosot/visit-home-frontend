import React from "react";
import BreadcrumbsLoop from "../../../../components/Breadcrumbs";

const Emotional = ({ page, setPage }) => {
  const breadcrumbsOptions = [
    { label: "แบบประเมิน SDQ", link: "/student/sdq-student" },
    { label: "แบบประเมินตนเอง", link: "/student/sdq-student" },
    { label: "หน้า 1" },
  ];
  return (
    <div className="flex items-center justify-center py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-start mb-2">
          <BreadcrumbsLoop options={breadcrumbsOptions} />
        </div>

        <div>
          {/* Heading */}
          <h3 className="text-xl font-bold text-center w-full flex flex-col md:flex-row md:space-x-2 md:justify-center">
            <span>แบบประเมิน SDQ ประเมินตนเอง</span>
            <span>1/6</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"></div>
          <div className="flex justify-between mt-10 space-x-2">
            <button
              className="btn btn-error w-1/2"
              type="button"
              onClick={() => setPage(1)}
            >
              ยกเลิก
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

export default Emotional;
