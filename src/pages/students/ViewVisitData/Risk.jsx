import React from "react";
import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";
import useYearSelectStore from "../../../stores/year_select.store";

const Risk = ({ page, setPage, riskInfo }) => {
  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "ความเสี่ยง" },
  ];

  const { selectedYear } = useYearSelectStore();

  // Mapping สำหรับ health_risk
  const healthRiskMap = {
    0: "ร่างกายไม่แข็งแรง",
    1: "สมรรถภาพทางร่างกายต่ำ",
    2: "มีภาวะทุพโภชนาการ",
    3: "มีโรคประจำตัวหรือเจ็บป่วยบ่อย",
    4: "ป่วยเป็นโรคร้ายแรง/เรื้อรัง",
  };

  // Mapping สำหรับ welfare_and_safety
  const welfareSafetyMap = {
    0: "ไม่มีความเสี่ยง",
    1: "พ่อแม่แยกทางกัน หรือ แต่งงานใหม่",
    2: "มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้าย",
    3: "บุคคลในครอบครัวเล่นการพนัน",
    4: "เล่นการพนัน",
    5: "พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์",
    6: "บุคคลในครอบครัวติดสารเสพติดแรง/เรื้อรัง/ติดต่อ",
    7: "มีความขัดแย้งและมีการใช้ความรุนแรงในครอบครัว",
    8: "ถูกทารุณ/ทำร้ายจากบุคคลในครอบครัว/เพื่อนบ้าน",
    9: "ไม่มีผู้ดูแล",
    10: "ถูกล่วงละเมิดทางเพศ",
  };

  const getWhenAlone = (giver) => {
    switch (giver) {
      case "0":
        return "ญาติ";
      case "1":
        return "เพื่อนบ้าน";
      case "2":
        return "อยู่บ้านด้วยตนเอง";
      default:
        return "-";
    }
  };

  const getHowToGoToSchool = (giver) => {
    switch (giver) {
      case "0":
        return "ผู้ปกครองมาส่ง";
      case "1":
        return "รถโรงเรียน";
      case "2":
        return "รถโดยสารประจำทาง";
      case "3":
        return "รถจักรยานยนต์";
      case "4":
        return "รถจักรยาน";
      case "5":
        return "รถยนต์";
      case "6":
        return "เดิน";
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
            ความเสี่ยงต่าง ๆ
          </h3>

          {/* Year Selector */}
          <div className="flex justify-center md:justify-end mt-6">
            <YearSelector />
          </div>

          {/* Add / Edit button */}
          <div className="mt-2 flex justify-center md:justify-end">
            {riskInfo ? (
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

          {/* Risk info grid */}
          {!riskInfo ? (
            <div className="mt-6 text-center text-red-600 flex items-center justify-center text-lg h-[35vh]">
              ยังไม่มีการกรอกข้อมูลในปีนี้
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* เมื่ออยู่ลำพัง */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เมื่อนักเรียนอยู่ลำพัง
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getWhenAlone(riskInfo?.when_student_alone) || "-"}
                </p>
              </div>

              {/* ความเสี่ยงด้านสุขภาพ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ความเสี่ยงด้านสุขภาพ
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {riskInfo?.health_risk?.length
                    ? riskInfo?.health_risk
                        .map((r) => healthRiskMap[r] || "-")
                        .join(", ")
                    : "-"}
                </p>
              </div>

              {/* สวัสดิการและความปลอดภัย */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สวัสดิการและความปลอดภัย
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {riskInfo?.welfare_and_safety?.length
                    ? riskInfo?.welfare_and_safety
                        .map((w) => welfareSafetyMap[w] || "-")
                        .join(", ")
                    : "-"}
                </p>
              </div>

              {/* ระยะทางไปโรงเรียน */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ระยะทางจากบ้านไปโรงเรียน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {riskInfo?.distance_to_school || "-"} กม.
                </p>
              </div>

              {/* เวลาในการเดินทาง */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เวลาเดินทางไปโรงเรียน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {riskInfo?.time_used || "-"} นาที
                </p>
              </div>

              {/* วิธีเดินทางไปโรงเรียน */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  วิธีการเดินทางไปโรงเรียน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getHowToGoToSchool(riskInfo?.school_transport) || "-"}
                </p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
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

export default Risk;
