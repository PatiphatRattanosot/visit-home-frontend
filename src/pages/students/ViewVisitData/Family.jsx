import React from "react";
import Stepper from "../../../components/Stepper";
import BreadcrumbsLoop from "../../../components/Breadcrumbs";
import YearSelector from "../../../components/YearSelector";
import useYearSelectStore from "../../../stores/year_select.store";

const Family = ({ page, setPage, familyInfo }) => {
  const breadcrumbsOptions = [
    { link: "/student/visiting-info", label: "ข้อมูลการเยี่ยมบ้าน" },
    { label: "สถานะครัวเรือน" },
  ];

  const { selectedYear } = useYearSelectStore();

  const getDailyGiver = (giver) => {
    switch (giver) {
      case "0":
        return "บิดา";
      case "1":
        return "มารดา";
      case "2":
        return "พี่ชาย";
      case "3":
        return "พี่สาว";
      case "4":
        return "ลุง";
      case "5":
        return "ป้า";
      case "6":
        return "น้า";
      case "7":
        return "อา";
      case "8":
        return "ปู่";
      case "9":
        return "ย่า";
      case "10":
        return "ตา";
      case "11":
        return "ยาย";
      default:
        return "-";
    }
  };

  const getHouseType = (type) => {
    switch (type) {
      case "0":
        return "บ้านของตนเอง";
      case "1":
        return "บ้านเช่า";
      case "2":
        return "อาศัยอยู่กับผู้อื่น";
      default:
        return "-";
    }
  };

  const getHousingCondition = (condition) => {
    switch (condition) {
      case "0":
        return "สภาพบ้านปกติ";
      case "1":
        return "ไม่มีห้องส้วมในที่อยู่อาศัยและบริเวณ";
      case "2":
        return "สภาพบ้านชำรุดทรุดโทรม หรือ บ้านทำจากวัสดุพื้นบ้าน เช่น ไม้ไผ่ ใบจากหรือวัสดุเหลือใช้";
      default:
        return "-";
    }
  };

  return (
    <div className="flex items-center justify-center py-9">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
        {/* Breadcrumbs */}
        <div className="flex justify-start mb-2">
          <BreadcrumbsLoop options={breadcrumbsOptions} />
        </div>

        {/* Stepper */}
        <div className="mb-8 flex justify-center">
          <Stepper page={page} setPage={setPage} />
        </div>

        <div>
          {/* Heading */}
          <h3 className="text-xl font-bold text-center w-full">
            สถานะของครัวเรือน
          </h3>

          {/* Year Selector */}
          <div className="flex justify-center md:justify-end mt-6">
            <YearSelector />
          </div>

          {/* Add / Edit button */}
          <div className="mt-2 flex justify-center md:justify-end">
            {familyInfo ? (
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

          {/* Family Info Section */}
          {!familyInfo ? (
            <div className="mt-6 text-center text-red-600 flex items-center justify-center text-lg h-[35vh]">
              ยังไม่มีการกรอกข้อมูลในปีนี้
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* รายได้รวมครัวเรือน */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รายได้รวมครัวเรือน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {familyInfo?.total_household_income || 0} บาท
                </p>
              </div>

              {/* รายได้รายวัน */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ได้รับค่าใช้จ่ายรายวันจาก
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getDailyGiver(familyInfo?.received_daily_from) || "-"}
                </p>
              </div>

              {/* ค่าใช้จ่ายไปโรงเรียน */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ค่าใช้จ่ายไปโรงเรียนต่อวัน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {familyInfo?.daily_total_to_school || 0} บาท
                </p>
              </div>

              {/* รายได้จากการทำงานพิเศษ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  งานพิเศษของนักเรียน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {familyInfo?.student_part_time || "-"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รายได้จากการทำงานพิเศษ
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {familyInfo?.student_part_time === ""
                    ? "-"
                    : familyInfo?.student_income + " บาท" || 0 + " บาท"}
                </p>
              </div>

              {/* ภาระพึ่งพิงของครัวเรือน */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ภาระพึ่งพิงของครัวเรือน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {familyInfo?.household_burdens?.length
                    ? familyInfo?.household_burdens.map((item, index) => {
                        let text = "";
                        switch (item) {
                          case "0":
                            text = "มีผู้สูงอายุเกิน 60 ปี";
                            break;
                          case "1":
                            text = "มีผู้พิการ";
                            break;
                          case "2":
                            text = "เป็นพ่อ/แม่เลี้ยงเดี่ยว";
                            break;
                          case "3":
                            text =
                              "มีคนอายุ 15-65 ปี ว่างงาน (ที่ไม่ใช่นักเรียน/นักศึกษา)";
                            break;
                          default:
                            text = "-";
                        }
                        return (
                          <span key={index}>
                            {text}
                            {index < familyInfo?.household_burdens.length - 1
                              ? ", "
                              : ""}
                          </span>
                        );
                      })
                    : "-"}
                </p>
              </div>

              {/* ประเภทบ้าน */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ประเภทบ้าน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getHouseType(familyInfo?.housing_type) || "-"}
                </p>
              </div>

              {/* สภาพบ้าน */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  สภาพบ้าน
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {getHousingCondition(familyInfo?.housing_condition) || "-"}
                </p>
              </div>

              {/* ยานพาหนะ */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ยานพาหนะที่ครอบครัวมี
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {familyInfo?.family_vehicles?.length
                    ? familyInfo?.family_vehicles.map((item, index) => {
                        let text = "";
                        switch (item) {
                          case "0":
                            text = "รถมอเตอร์ไซค์";
                            break;
                          case "1":
                            text = "รถยนต์ส่วนบุคคล";
                            break;
                          case "2":
                            text = "รถบรรทุกเล็ก/รถตู้";
                            break;
                          case "3":
                            text =
                              "รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆ ประเภทเดียวกัน";
                            break;
                          default:
                            text = "-";
                        }
                        return (
                          <span key={index}>
                            {text}
                            {index < familyInfo?.family_vehicles.length - 1
                              ? ", "
                              : ""}
                          </span>
                        );
                      })
                    : "-"}
                </p>
              </div>

              {/* ที่ดิน */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ที่ดินที่ครอบครัวเป็นเจ้าของ
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {familyInfo?.owned_land || 0} ไร่
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ที่ดินที่เช่า
                </label>
                <p className="w-full p-2 rounded-md text-gray-900">
                  {familyInfo?.rented_land || 0} ไร่
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
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

export default Family;
