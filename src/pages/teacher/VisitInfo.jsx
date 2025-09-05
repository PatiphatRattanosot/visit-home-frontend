import { useEffect, useState } from "react";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import {useStudentStore} from "../../stores/student.store";
import useYearSelectStore from "../../stores/year_select.store";
import {useVisitInfoStore} from "../../stores/visit.store";

const VisitInfo = () => {
  const { visitInfo, getVisitInfoByStudentId } = useVisitInfoStore();
  const { years: year } = useYearSelectStore();
  const { data: student } = useStudentStore();

  useEffect(() => {
    getVisitInfoByStudentId(student._id, year._id);
  }, [student._id, year._id]);

  return (
    <div className="section-container">
      <BreadcrumbsLoop
        options={[
          { label: "หน้าหลัก", link: "/" },
          { label: "ข้อมูลการเยี่ยมบ้าน", link: "/teacher/visitinfo" },
        ]}
      />
      <div className="flex flex-col items-center mt-6">
        <h2 className="font-bold text-xl mb-4">ข้อมูลการเยี่ยมบ้าน</h2>
        <div className="mb-4">
          <span className="font-semibold">นักเรียน:</span>{" "}
          {visitInfo.student?.prefix} {visitInfo.student?.first_name} {visitInfo.student?.last_name}
        </div>
        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div>
            <h3 className="font-semibold mb-2">รูปถ่ายสภาพบ้าน</h3>
            {visitInfo.home_picture && (
              <img
                src={visitInfo.home_picture}
                alt="รูปถ่ายบ้าน"
                className="rounded-lg shadow w-64 h-auto"
              />
            )}
            <div className="mt-2">{visitInfo.desc_home}</div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">รูปถ่ายกับครอบครัว</h3>
            {visitInfo.family_picture && (
              <img
                src={visitInfo.family_picture}
                alt="รูปถ่ายครอบครัว"
                className="rounded-lg shadow w-64 h-auto"
              />
            )}
            <div className="mt-2">{visitInfo.desc_family}</div>
          </div>
        </div>
        <div className="w-full md:w-8/12 mb-4">
          <h3 className="font-semibold mb-2">ความคิดเห็นของอาจารย์</h3>
          <div className="bg-gray-100 p-4 rounded">{visitInfo.teacher_comment}</div>
        </div>
      </div>
    </div>
  );
};

export default VisitInfo;