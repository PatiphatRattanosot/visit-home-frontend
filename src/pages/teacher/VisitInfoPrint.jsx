import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import useYearSelectStore from "../../stores/year_select.store";
import { useStudentStore } from "../../stores/student.store";
import { useVisitInfoStore } from "../../stores/visit.store";
import { useScheduleStore } from "../../stores/schedule.store";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import "./VisitInfoPrint.css";

const CREST_SRC = "/pdfLogo.png";

const Checkbox = ({ label, checked }) => (
  <div className="print-checkbox">
    <span className={`print-checkbox-box${checked ? " checked" : ""}`}>
      {checked ? "✓" : ""}
    </span>
    <span className="print-checkbox-label">{label}</span>
  </div>
);

const formatThaiDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const toThaiNumber = (value) => {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number") {
    return value.toLocaleString("th-TH");
  }
  if (typeof value === "string" && value.trim() === "") return "-";
  return value;
};

const getDailyGiverLabel = (code) => {
  const mapping = {
    0: "บิดา",
    1: "มารดา",
    2: "พี่ชาย",
    3: "พี่สาว",
    4: "ลุง",
    5: "ป้า",
    6: "น้า",
    7: "อา",
    8: "ปู่",
    9: "ย่า",
    10: "ตา",
    11: "ยาย",
  };
  return mapping?.[code] ?? "-";
};

const getHouseTypeLabel = (code) => {
  const mapping = {
    0: "บ้านของตนเอง",
    1: "บ้านเช่า",
    2: "อาศัยอยู่กับผู้อื่น",
  };
  return mapping?.[code] ?? "-";
};

const getHousingConditionLabel = (code) => {
  const mapping = {
    0: "สภาพบ้านปกติ",
    1: "ไม่มีห้องส้วมในที่อยู่อาศัยและบริเวณ",
    2: "สภาพบ้านชำรุดทรุดโทรมหรือทำจากวัสดุพื้นบ้าน",
  };
  return mapping?.[code] ?? "-";
};

const FAMILY_BURDEN_OPTIONS = [
  { value: "0", label: "มีผู้สูงอายุเกิน 60 ปี" },
  { value: "1", label: "มีผู้พิการ" },
  { value: "2", label: "เป็นพ่อ/แม่เลี้ยงเดี่ยว" },
  {
    value: "3",
    label: "มีคนอายุ 15-65 ปี ว่างงาน (ที่ไม่ใช่นักเรียน/นักศึกษา)",
  },
];

const VEHICLE_OPTIONS = [
  { value: "0", label: "รถมอเตอร์ไซค์" },
  { value: "1", label: "รถยนต์ส่วนบุคคล" },
  { value: "2", label: "รถบรรทุกเล็ก/รถตู้" },
  {
    value: "3",
    label: "รถไถ/เกี่ยวข้าว/รถอีแต๋น/รถอื่นๆ ประเภทเดียวกัน",
  },
];

const HOUSE_INCOME_RANGES = [
  { min: 0, max: 3000, label: "ต่ำกว่า 3,000 บาท" },
  { min: 3001, max: 5000, label: "3,001-5,000 บาท" },
  { min: 5001, max: 7000, label: "5,001-7,000 บาท" },
  { min: 7001, max: 9000, label: "7,001-9,000 บาท" },
  { min: 9001, max: Infinity, label: "มากกว่า 9,000 บาท" },
];

const DAILY_ALLOWANCE_RANGES = [
  { min: 0, max: 20, label: "ไม่เกิน 20 บาท" },
  { min: 21, max: 40, label: "21-40 บาท" },
  { min: 41, max: 60, label: "41-60 บาท" },
  { min: 61, max: 80, label: "61-80 บาท" },
  { min: 81, max: 100, label: "81-100 บาท" },
  { min: 101, max: 150, label: "101-150 บาท" },
  { min: 151, max: Infinity, label: "มากกว่า 150 บาท" },
];

const DAILY_TRAVEL_RANGE = [
  { min: 0, max: 5, label: "5-10 นาที" },
  { min: 11, max: 20, label: "11-20 นาที" },
  { min: 21, max: 30, label: "21-30 นาที" },
  { min: 31, max: Infinity, label: "มากกว่า 30 นาที" },
];

const MONTHLY_EXPENSE_RANGES = [
  { min: 0, max: 300, label: "ต่ำกว่า 300 บาท" },
  { min: 301, max: 500, label: "301-500 บาท" },
  { min: 501, max: 700, label: "501-700 บาท" },
  { min: 701, max: 900, label: "701-900 บาท" },
  { min: 901, max: 1100, label: "901-1,100 บาท" },
  { min: 1101, max: 1300, label: "1,101-1,300 บาท" },
  { min: 1301, max: Infinity, label: "มากกว่า 1,300 บาท" },
];

const HEALTH_RISKS = [
  { value: "0", label: "ร่างกายไม่แข็งแรง" },
  { value: "1", label: "สมรรถภาพทางร่างกายต่ำ" },
  { value: "2", label: "มีภาวะทุพโภชนาการ" },
  { value: "3", label: "มีโรคประจำตัวหรือเจ็บป่วยบ่อย" },
  { value: "4", label: "ป่วยเป็นโรคร้ายแรง/เรื้อรัง" },
];

const WELFARE_SAFETY = [
  { value: "0", label: "ไม่มีความเสี่ยง" },
  { value: "1", label: "พ่อแม่แยกทางกัน หรือแต่งงานใหม่" },
  { value: "2", label: "มีบุคคลในครอบครัวเจ็บป่วยด้วยโรคร้าย" },
  { value: "3", label: "บุคคลในครอบครัวเล่นการพนัน" },
  { value: "4", label: "เล่นการพนัน" },
  {
    value: "5",
    label: "พักอาศัยอยู่ในชุมชนแออัดหรือใกล้แหล่งมั่วสุม/สถานเริงรมย์",
  },
  { value: "6", label: "บุคคลในครอบครัวติดสารเสพติดแรง/เรื้อรัง" },
  { value: "7", label: "มีความขัดแย้งและใช้ความรุนแรงในครอบครัว" },
  { value: "8", label: "ถูกทารุณจากบุคคลในครอบครัว/เพื่อนบ้าน" },
  { value: "9", label: "ไม่มีผู้ดูแล" },
  { value: "10", label: "ถูกล่วงละเมิดทางเพศ" },
];

const SUPPORT_ORGANIZE = [
  { value: "0", label: "เบี้ยผู้สูงอายุ" },
  { value: "1", label: "เบี้ยพิการ" },
];

const SUPPORT_SCHOOL = [
  { value: "0", label: "ด้านการเรียน" },
  { value: "1", label: "ด้านพฤติกรรม" },
  { value: "2", label: "ด้านเศรษฐกิจ (เช่น ขอรับทุน)" },
];

const RISK_ALONE_OPTIONS = [
  { value: "0", label: "อยู่คนเดียว" },
  { value: "1", label: "อยู่กับเพื่อน" },
  { value: "2", label: "อยู่กับญาติพี่น้อง" },
  { value: "3", label: "อยู่กับพ่อแม่" },
];

const TRANSPORT_OPTIONS = [
  { value: "0", label: "เดิน" },
  { value: "1", label: "จักรยาน" },
  { value: "2", label: "จักรยานยนต์" },
  { value: "3", label: "รถยนต์" },
  { value: "4", label: "รถรับส่งนักเรียน" },
  { value: "5", label: "รถโดยสารสาธารณะ" },
];

const CheckBoxGroup = ({ title, options, selected }) => (
  <div className="print-section">
    {title && <div className="print-section-title">{title}</div>}
    <div className="print-checkbox-group">
      {options.map((option) => (
        <Checkbox
          key={option.value ?? option.label}
          label={option.label}
          checked={selected?.includes?.(option.value) || false}
        />
      ))}
    </div>
  </div>
);

const CheckBoxRangeGroup = ({ title, options, value }) => (
  <div className="print-section">
    {title && <div className="print-section-title">{title}</div>}
    <div className="print-checkbox-group">
      {options.map((option) => {
        const isChecked =
          typeof value === "number" &&
          value >= option.min &&
          value <= option.max;
        return (
          <Checkbox
            key={option.label}
            label={option.label}
            checked={isChecked}
          />
        );
      })}
    </div>
  </div>
);

const VisitInfoPrint = () => {
  const { studentId } = useParams();
  const { selectedYear, years, fetchYears } = useYearSelectStore();

  const { student, getStudentById, getYearlyData } = useStudentStore();

  const { visitInfo, getVisitInfoByStudentId } = useVisitInfoStore();

  const { schedule, fetchSchedule } = useScheduleStore();

  const [yearlyData, setYearlyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasPrinted, setHasPrinted] = useState(false);

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    if (!studentId) return;
    getStudentById(studentId);
  }, [studentId]);

  useEffect(() => {
    if (!studentId || !selectedYear) return;

    const load = async () => {
      setIsLoading(true);
      try {
        const [visitRes, scheduleRes, yearlyRes] = await Promise.all([
          getVisitInfoByStudentId(studentId, selectedYear),
          fetchSchedule(selectedYear, studentId),
          getYearlyData({ student_id: studentId, year_id: selectedYear }),
        ]);

        if (yearlyRes?.students?.length) {
          setYearlyData(yearlyRes.students[0]?.yearly_data?.[0] ?? null);
        } else {
          setYearlyData(null);
        }

        if (!visitRes) {
          // keep previous visitInfo state but ensure hook re-render
        }
        if (!scheduleRes) {
          // same handling
        }
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [studentId, selectedYear]);

  useEffect(() => {
    if (!isLoading && !hasPrinted) {
      const timer = setTimeout(() => {
        window.print();
        setHasPrinted(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isLoading, hasPrinted]);

  const personalInfo = yearlyData?.personal_info ?? {};
  const relationshipInfo = yearlyData?.relationship_info ?? {};
  const familyInfo = yearlyData?.family_info ?? {};
  const behaviorInfo = yearlyData?.behavior_info ?? {};
  const riskInfo = yearlyData?.risk_info ?? {};
  const additionalInfo = yearlyData?.additional_info ?? {};

  const fatherFullName = [
    personalInfo?.father_prefix,
    personalInfo?.father_name,
    personalInfo?.father_last_name,
  ]
    .filter(Boolean)
    .join(" ");
  const motherFullName = [
    personalInfo?.mother_prefix,
    personalInfo?.mother_name,
    personalInfo?.mother_last_name,
  ]
    .filter(Boolean)
    .join(" ");
  const parentFullName = [
    personalInfo?.parent_prefix,
    personalInfo?.parent_name,
    personalInfo?.parent_last_name,
  ]
    .filter(Boolean)
    .join(" ");

  const studentFullName = useMemo(() => {
    if (!student) return "";
    return [student?.prefix, student?.first_name, student?.last_name]
      .filter(Boolean)
      .join(" ");
  }, [student]);

  const completedStatus = yearlyData?.isCompleted ?? "-";

  return (
    <div className="print-root">
      <div className="print-toolbar">
        <BreadcrumbsLoop
          options={[
            { label: "หน้าหลัก", link: "/" },
            { label: "ครู", link: "/teacher" },
            {
              label: "ภาพรวมเยี่ยมบ้าน",
              link: `/teacher/visit-info/overview/${studentId}`,
            },
            { label: "พิมพ์เอกสาร", link: "#" },
          ]}
        />
        <div className="print-toolbar-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => window.print()}
          >
            พิมพ์อีกครั้ง
          </button>
          <Link
            className="btn btn-soft"
            to={`/teacher/visit-info/overview/${studentId}`}
          >
            กลับไปหน้าก่อนหน้า
          </Link>
        </div>
      </div>

      <div className="print-document">
        <section className="print-page">
          <div className="print-header">
            <img src={CREST_SRC} alt="ตรากระทรวง" className="print-logo" />
            <div className="print-title">บันทึกการเยี่ยมบ้าน</div>
            <div className="print-subtitle">
              โรงเรียนบางแพปฐมพิทยา
              สังกัดสำนักงานเขตพื้นที่การศึกษามัธยมศึกษาราชบุรี
            </div>
            <div className="print-subtitle">
              ภาคเรียนที่ 1 ปีการศึกษา{" "}
              {years.find((y) => y?._id === selectedYear)?.year ?? "-"}
            </div>
          </div>

          <div className="print-instruction">
            <p>
              คำชี้แจง :
              แบบบันทึกนี้สำหรับบันทึกการเยี่ยมบ้านของนักเรียนรายบุคคล
              เพื่อเป็นข้อมูลประกอบการพัฒนานักเรียนให้เต็มศักยภาพ
            </p>
            <ul>
              <li>
                การตอบแต่ละข้อหมายความ : ตอบด้วยการทำเครื่องหมาย ✓
                ลงในช่องที่ตรงกับความเป็นจริง
              </li>
              <li>ให้ระบุข้อมูลตามความเป็นจริงเพื่อประโยชน์ของนักเรียน</li>
            </ul>
          </div>

          <div className="print-info-grid">
            <div className="print-info-cell large">
              <span className="label">ชื่อ-สกุล นักเรียน</span>
              <span className="value underline">
                {studentFullName || "........................"}
              </span>
            </div>
            <div className="print-info-cell small">
              <span className="label">เลขที่</span>
              <span className="value underline">
                {student?.user_id ?? "........"}
              </span>
            </div>
            <div className="print-info-cell small">
              <span className="label">เบอร์ติดต่อ</span>
              <span className="value underline">
                {student?.phone ?? "........"}
              </span>
            </div>
            <div className="print-info-cell large">
              <span className="label">ที่อยู่</span>
              <span className="value underline">
                {student?.address ??
                  "................................................"}
              </span>
            </div>
            <div className="print-info-cell medium">
              <span className="label">สถานะข้อมูล</span>
              <span className="value underline">{completedStatus}</span>
            </div>
          </div>

          <CheckBoxRangeGroup
            title="จำนวนเงินในโรงเรียนต่อวัน"
            options={DAILY_ALLOWANCE_RANGES}
            value={Number(familyInfo?.daily_total_to_school ?? -1)}
          />

          <CheckBoxRangeGroup
            title="ค่านิยมในการเดินทางมาโรงเรียนต่อเดือน"
            options={MONTHLY_EXPENSE_RANGES}
            value={Number(familyInfo?.monthly_transport_expense ?? -1)}
          />

          <CheckBoxRangeGroup
            title="ระยะเวลาในการเดินทางมาโรงเรียน"
            options={DAILY_TRAVEL_RANGE}
            value={Number(riskInfo?.time_used ?? -1)}
          />

          <div className="print-section">
            <div className="print-section-title">
              ผู้สนับสนุนค่าใช้จ่ายรายวัน
            </div>
            <div className="print-inline">
              <span>ได้รับจาก</span>
              <span className="underline">
                {getDailyGiverLabel(familyInfo?.received_daily_from)}
              </span>
            </div>
          </div>

          <CheckBoxGroup
            title="รายได้ของครอบครัวต่อเดือน"
            options={HOUSE_INCOME_RANGES.map((item) => ({
              value: item.label,
              label: item.label,
            }))}
            selected={(() => {
              const income = Number(familyInfo?.total_household_income ?? -1);
              const selectedOption = HOUSE_INCOME_RANGES.find(
                (option) => income >= option.min && income <= option.max
              );
              return selectedOption ? [selectedOption.label] : [];
            })()}
          />

          <CheckBoxGroup
            title="ยานพาหนะของครอบครัว"
            options={VEHICLE_OPTIONS}
            selected={familyInfo?.family_vehicles ?? []}
          />

          <div className="print-two-column">
            <div>
              <div className="print-section-title">ที่ดินเป็นของตนเอง</div>
              <div className="underline">
                {toThaiNumber(familyInfo?.owned_land)} ไร่
              </div>
            </div>
            <div>
              <div className="print-section-title">ที่ดินที่เช่า</div>
              <div className="underline">
                {toThaiNumber(familyInfo?.rented_land)} ไร่
              </div>
            </div>
          </div>
        </section>

        <section className="print-page">
          <div className="print-header">
            <img src={CREST_SRC} alt="ตรากระทรวง" className="print-logo" />
            <div className="print-title">บันทึกการเยี่ยมบ้าน</div>
          </div>

          <div className="print-section">
            <div className="print-section-title">ข้อมูลผู้ปกครอง</div>
            <div className="print-table">
              <div className="print-table-row">
                <div className="print-table-cell header">บิดา</div>
                <div className="print-table-cell">{fatherFullName || "-"}</div>
              </div>
              <div className="print-table-row">
                <div className="print-table-cell header">มารดา</div>
                <div className="print-table-cell">{motherFullName || "-"}</div>
              </div>
              <div className="print-table-row">
                <div className="print-table-cell header">ผู้ปกครองหลัก</div>
                <div className="print-table-cell">{parentFullName || "-"}</div>
              </div>
              <div className="print-table-row">
                <div className="print-table-cell header">เบอร์โทรศัพท์</div>
                <div className="print-table-cell">
                  {personalInfo?.parent_phone ?? "-"}
                </div>
              </div>
              <div className="print-table-row">
                <div className="print-table-cell header">อาชีพ</div>
                <div className="print-table-cell">
                  {personalInfo?.parent_job ?? "-"}
                </div>
              </div>
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">สถานะครัวเรือน</div>
            <div className="print-inline">
              <span>สถานะความสัมพันธ์ในครอบครัว:</span>
              <span className="underline">
                {relationshipInfo?.family_relation_status ?? "-"}
              </span>
            </div>
            <div className="print-inline">
              <span>จำนวนสมาชิกครอบครัวรวมทั้งหมด:</span>
              <span className="underline">
                {toThaiNumber(relationshipInfo?.family_member)}
              </span>
              <span>คน</span>
            </div>
            <div className="print-inline">
              <span>เวลาที่ใช้ร่วมกับครอบครัว:</span>
              <span className="underline">
                {toThaiNumber(relationshipInfo?.family_time)}
              </span>
              <span>ชั่วโมง/วัน</span>
            </div>
          </div>

          <CheckBoxGroup
            title="ภาระพึ่งพิงของครอบครัว"
            options={FAMILY_BURDEN_OPTIONS}
            selected={familyInfo?.household_burdens ?? []}
          />

          <div className="print-section">
            <div className="print-section-title">สถานะที่อยู่อาศัย</div>
            <div className="print-inline">
              <span>ประเภทบ้าน:</span>
              <span className="underline">
                {getHouseTypeLabel(familyInfo?.housing_type)}
              </span>
            </div>
            <div className="print-inline">
              <span>สภาพบ้าน:</span>
              <span className="underline">
                {getHousingConditionLabel(familyInfo?.housing_condition)}
              </span>
            </div>
          </div>

          <CheckBoxGroup
            title="ความเสี่ยงด้านสุขภาพ"
            options={HEALTH_RISKS}
            selected={riskInfo?.health_risk ?? []}
          />

          <CheckBoxGroup
            title="ความเสี่ยงด้านสวัสดิการและความปลอดภัย"
            options={WELFARE_SAFETY}
            selected={riskInfo?.welfare_and_safety ?? []}
          />
        </section>

        <section className="print-page">
          <div className="print-header">
            <img src={CREST_SRC} alt="ตรากระทรวง" className="print-logo" />
            <div className="print-title">บันทึกการเยี่ยมบ้าน</div>
          </div>

          <div className="print-section">
            <div className="print-section-title">
              พฤติกรรมและหน้าที่ในครอบครัว
            </div>
            <div className="print-multiline">
              <span>งานที่รับผิดชอบ:</span>
              <span className="underline">
                {behaviorInfo?.student_resp?.length
                  ? behaviorInfo.student_resp
                      .map((value) => {
                        const mapping = {
                          0: "ช่วยงานบ้าน",
                          1: "ช่วยดูแลคนเจ็บป่วย/พิการ",
                          2: "ช่วยงานในนาไร่",
                          3: "ช่วยค้าขายเล็กๆน้อยๆ",
                          4: "ทำงานพิเศษแถวบ้าน",
                        };
                        return mapping[value] ?? "";
                      })
                      .filter(Boolean)
                      .join(", ")
                  : "-"}
              </span>
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">กิจกรรมยามว่าง</div>
            <div className="print-multiline">
              <span>งานอดิเรก:</span>
              <span className="underline">
                {behaviorInfo?.hobbies?.length
                  ? behaviorInfo.hobbies
                      .map((value) => {
                        const mapping = {
                          0: "อ่านหนังสือ",
                          1: "เล่นดนตรี",
                          2: "ดูทีวี/ฟังเพลง",
                          3: "เล่นเกม",
                          4: "ไปสวนสาธารณะ",
                          5: "ไปเที่ยวห้าง/ดูหนัง",
                          6: "ไปหาเพื่อน/แฟน",
                          7: "กิจกรรมแอดเวนเจอร์",
                        };
                        return mapping[value] ?? "";
                      })
                      .filter(Boolean)
                      .join(", ")
                  : "-"}
              </span>
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">การใช้เทคโนโลยีและสื่อ</div>
            <div className="print-inline">
              <span>เข้าถึงอินเทอร์เน็ตจากบ้าน:</span>
              <span className="underline">
                {behaviorInfo?.computer_internet_access === "0"
                  ? "เข้าถึงได้"
                  : behaviorInfo?.computer_internet_access === "1"
                  ? "เข้าถึงไม่ได้"
                  : "-"}
              </span>
            </div>
            <div className="print-inline">
              <span>การใช้สื่อเทคโนโลยี:</span>
              <span className="underline">
                {behaviorInfo?.tech_use_behav === "0"
                  ? "ใช้ไม่เกินวันละ 3 ชั่วโมง"
                  : behaviorInfo?.tech_use_behav === "1"
                  ? "ใช้เกินวันละ 3 ชั่วโมง"
                  : "-"}
              </span>
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">การเดินทางไปโรงเรียน</div>
            <CheckBoxGroup
              title="วิธีการเดินทาง"
              options={TRANSPORT_OPTIONS}
              selected={
                riskInfo?.school_transport ? [riskInfo.school_transport] : []
              }
            />

            <div className="print-inline">
              <span>เมื่ออยู่บ้านตามลำพัง:</span>
              <span className="underline">
                {RISK_ALONE_OPTIONS.find(
                  (item) => item.value === riskInfo?.when_student_alone
                )?.label ?? "-"}
              </span>
            </div>
          </div>
        </section>

        <section className="print-page">
          <div className="print-header">
            <img src={CREST_SRC} alt="ตรากระทรวง" className="print-logo" />
            <div className="print-title">บันทึกการเยี่ยมบ้าน</div>
          </div>

          <div className="print-section">
            <div className="print-section-title">ความช่วยเหลือที่เคยได้รับ</div>
            <CheckBoxGroup
              title="จากหน่วยงาน"
              options={SUPPORT_ORGANIZE}
              selected={additionalInfo?.support_from_organize ?? []}
            />
            <CheckBoxGroup
              title="จากโรงเรียน"
              options={SUPPORT_SCHOOL}
              selected={additionalInfo?.support_from_school ?? []}
            />
            <div className="print-inline">
              <span>ความห่วงใยของผู้ปกครอง:</span>
              <span className="underline">
                {additionalInfo?.parent_concern ?? "-"}
              </span>
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">ข้อมูลการเยี่ยมบ้าน</div>
            <div className="print-inline">
              <span>กำหนดการเยี่ยมบ้าน:</span>
              <span className="underline">
                {formatThaiDate(schedule?.appointment_date)}
              </span>
            </div>
            <div className="print-inline">
              <span>ครูเยี่ยมบ้าน:</span>
              <span className="underline">
                {schedule?.teacher
                  ? [
                      schedule.teacher.prefix,
                      schedule.teacher.first_name,
                      schedule.teacher.last_name,
                    ]
                      .filter(Boolean)
                      .join(" ")
                  : "-"}
              </span>
            </div>
            <div className="print-inline">
              <span>หมายเหตุ:</span>
              <span className="underline">
                {schedule?.comment ??
                  "................................................"}
              </span>
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">สรุปผลจากครูผู้เยี่ยมบ้าน</div>
            <div className="print-textarea">
              {visitInfo?.comment ?? "ยังไม่มีบันทึกจากการเยี่ยมบ้าน"}
            </div>
          </div>

          <div className="print-signature-block">
            <div className="signature-item">
              <div className="signature-label">ครูผู้เยี่ยมบ้าน</div>
              <div className="signature-line" />
            </div>
            <div className="signature-item">
              <div className="signature-label">ผู้ปกครอง/ผู้ให้ข้อมูล</div>
              <div className="signature-line" />
            </div>
          </div>

          <div className="print-photos">
            <div className="photo-frame">
              {visitInfo?.home_img ? (
                <img src={visitInfo.home_img} alt="บ้านนักเรียน" />
              ) : (
                <span>ภาพถ่ายบ้านนักเรียน</span>
              )}
            </div>
            <div className="photo-frame">
              {visitInfo?.family_img ? (
                <img src={visitInfo.family_img} alt="ครอบครัวนักเรียน" />
              ) : (
                <span>ภาพครอบครัวร่วมกับครู</span>
              )}
            </div>
          </div>
        </section>
      </div>

      {isLoading && (
        <div className="print-loading">
          กำลังประมวลผลข้อมูลสำหรับการพิมพ์...
        </div>
      )}
    </div>
  );
};

export default VisitInfoPrint;
