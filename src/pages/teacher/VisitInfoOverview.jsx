import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import BreadcrumbsLoop from "../../components/Breadcrumbs";
import YearSelector from "../../components/YearSelector";
import useYearSelectStore from "../../stores/year_select.store";
import { useStudentStore } from "../../stores/student.store";
import { useVisitInfoStore } from "../../stores/visit.store";
import { useScheduleStore } from "../../stores/schedule.store";

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

const VisitInfoOverview = () => {
  const { studentId } = useParams();

  const fetchYears = useYearSelectStore((state) => state.fetchYears);
  const years = useYearSelectStore((state) => state.years);
  const selectedYear = useYearSelectStore((state) => state.selectedYear);

  const getStudentById = useStudentStore((state) => state.getStudentById);
  const student = useStudentStore((state) => state.student);

  const getVisitInfoByStudentId = useVisitInfoStore(
    (state) => state.getVisitInfoByStudentId
  );
  const visitInfo = useVisitInfoStore((state) => state.visitInfo);

  const fetchSchedule = useScheduleStore((state) => state.fetchSchedule);
  const schedule = useScheduleStore((state) => state.schedule);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  useEffect(() => {
    if (studentId) {
      getStudentById(studentId);
    }
  }, [studentId, getStudentById]);

  useEffect(() => {
    if (!studentId || !selectedYear) return;

    const load = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          getVisitInfoByStudentId(studentId, selectedYear),
          fetchSchedule(selectedYear, studentId),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [studentId, selectedYear, getVisitInfoByStudentId, fetchSchedule]);

  const currentYearLabel = useMemo(() => {
    if (!selectedYear) return "-";
    const targetYear = years.find((year) => year?._id === selectedYear);
    return targetYear?.year ?? "-";
  }, [years, selectedYear]);

  const currentYearlyData = useMemo(() => {
    if (!student?.yearly_data || !selectedYear) return null;

    return (
      student.yearly_data.find((item) => {
        const yearValue = item.year;
        if (!yearValue) return false;
        if (typeof yearValue === "string") return yearValue === selectedYear;
        if (typeof yearValue === "object") {
          if (yearValue?._id) return yearValue._id === selectedYear;
          if (typeof yearValue.toString === "function")
            return yearValue.toString() === selectedYear;
        }
        return false;
      }) ?? null
    );
  }, [student, selectedYear]);

  const studentFullName = useMemo(() => {
    if (!student) return "";
    const prefix = student.prefix ? `${student.prefix} ` : "";
    return `${prefix}${student.first_name ?? ""} ${student.last_name ?? ""}`.trim();
  }, [student]);

  const studentInitials = useMemo(() => {
    if (!student) return "-";
    const first = student.first_name?.[0] ?? "";
    const last = student.last_name?.[0] ?? "";
    return (first + last || "N").toUpperCase();
  }, [student]);

  const appointmentDate = schedule?.appointment_date;

  const summaryCards = useMemo(
    () => [
      {
        title: "สถานะการเยี่ยมบ้าน",
        value: visitInfo ? "บันทึกเรียบร้อย" : "รอดำเนินการ",
        helper: visitInfo
          ? `อัปเดตล่าสุดเมื่อ ${formatThaiDate(visitInfo.updatedAt)}`
          : "ยังไม่มีข้อมูลเยี่ยมบ้านในปีนี้",
        badge: visitInfo ? "badge-success" : "badge-warning",
      },
      {
        title: "กำหนดการเยี่ยมบ้าน",
        value: appointmentDate ? formatThaiDate(appointmentDate) : "ยังไม่กำหนด",
        helper: schedule?.comment
          ? schedule.comment
          : appointmentDate
          ? "มีการนัดหมายในปฏิทินแล้ว"
          : "ยังไม่มีการบันทึกนัดหมาย",
        badge: appointmentDate ? "badge-info" : "badge-outline",
      },
      {
        title: "ปีการศึกษา",
        value: currentYearLabel,
        helper: currentYearLabel !== "-" ? "ข้อมูลตามปีการศึกษาที่เลือก" : "กำลังโหลดปีการศึกษา",
        badge: "badge-primary",
      },
    ],
    [visitInfo, appointmentDate, schedule, currentYearLabel]
  );

  const timelineSteps = useMemo(
    () => [
      {
        title: "สร้างนัดหมาย",
        description: appointmentDate
          ? `เยี่ยมบ้านวันที่ ${formatThaiDate(appointmentDate)}`
          : "ตั้งเวลานัดหมายเพื่อเริ่มกระบวนการ",
        meta: appointmentDate ? "สถานะ: Been-set" : "สถานะ: Not-scheduled",
        state: appointmentDate ? "done" : "pending",
      },
      {
        title: "เก็บข้อมูลสภาพบ้าน",
        description: visitInfo?.home_description
          ? visitInfo.home_description
          : "อัปโหลดรูปและบันทึกคำอธิบาย",
        meta: visitInfo?.home_img ? "มีรูปภาพสภาพบ้านแล้ว" : "ยังไม่มีรูปภาพ",
        state: visitInfo?.home_img ? "done" : "active",
      },
      {
        title: "บันทึกความคิดเห็น",
        description: visitInfo?.comment
          ? visitInfo.comment
          : "สรุปประเด็นที่พบในระหว่างการเยี่ยมบ้าน",
        meta: visitInfo?.comment ? "ครบถ้วน" : "รอการเติมเต็ม",
        state: visitInfo?.comment ? "done" : "active",
      },
      {
        title: "สรุปและส่งข้อมูล",
        description: visitInfo
          ? "ข้อมูลพร้อมสำหรับการส่งให้ผู้บริหารตรวจสอบ"
          : "ตรวจสอบให้ครบก่อนทำการส่ง",
        meta: visitInfo ? "พร้อมส่ง" : "ตรวจสอบอีกครั้งก่อนส่ง",
        state: visitInfo ? "done" : appointmentDate ? "active" : "pending",
      },
    ],
    [appointmentDate, visitInfo]
  );

  const attachments = useMemo(
    () => [
      {
        key: "home_img",
        title: "รูปภาพสภาพบ้าน",
        url: visitInfo?.home_img,
        description: visitInfo?.home_description,
      },
      {
        key: "family_img",
        title: "รูปภาพครอบครัว",
        url: visitInfo?.family_img,
        description: visitInfo?.family_description,
      },
    ],
    [visitInfo]
  );

  const parentInfo = currentYearlyData?.personal_info;

  const relationshipInfo = currentYearlyData?.relationship_info;

  const generalInfoEntries = [
    {
      label: "รหัสนักเรียน",
      value: student?.user_id ?? "-",
    },
    {
      label: "อีเมล",
      value: student?.email ?? "-",
    },
    {
      label: "เบอร์โทรศัพท์",
      value: student?.phone ?? "-",
    },
    {
      label: "จำนวนสมาชิกในครอบครัว",
      value: relationshipInfo?.family_member ?? "-",
    },
    {
      label: "เวลาที่ใช้ร่วมกับครอบครัว (ชม./วัน)",
      value: relationshipInfo?.family_time ?? "-",
    },
    {
      label: "สถานะครอบครัว",
      value: relationshipInfo?.family_relation_status ?? "-",
    },
  ];

  const parentEntries = [
    {
      label: "ผู้ปกครอง",
      value: parentInfo
        ? `${parentInfo.parent_prefix ?? ""}${parentInfo.parent_name ?? ""} ${parentInfo.parent_last_name ?? ""}`.trim() || "-"
        : "-",
    },
    {
      label: "เบอร์ติดต่อผู้ปกครอง",
      value: parentInfo?.parent_phone ?? "-",
    },
    {
      label: "อาชีพผู้ปกครอง",
      value: parentInfo?.parent_job ?? "-",
    },
  ];

  return (
    <div className="section-container space-y-6">
      <BreadcrumbsLoop
        options={[
          { label: "หน้าหลัก", link: "/" },
          { label: "รายชื่อนักเรียน", link: "/teacher" },
          { label: "ภาพรวมการเยี่ยมบ้าน", link: "#" },
        ]}
      />

      <div className="bg-base-100 border border-base-200/70 shadow-lg rounded-3xl p-6 md:p-8 space-y-8">
        <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold">
              ภาพรวมการเยี่ยมบ้าน
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">
              {studentFullName || "ข้อมูลนักเรียน"}
            </h1>
            <p className="text-base text-base-content/70 max-w-xl">
              ตรวจสอบกำหนดการ ข้อมูลภาพรวม และสถานะการเยี่ยมบ้านของนักเรียนในปีการศึกษา {currentYearLabel}
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col gap-4 items-start md:items-end">
            <YearSelector />
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-ghost btn-sm md:btn-md">บันทึกเป็นร่าง</button>
              <button
                onClick={() => window.print()}
                className="btn btn-outline btn-sm md:btn-md"
              >
                พิมพ์รายงาน
              </button>
              <button className="btn-green btn-sm md:btn-md">ส่งข้อมูล</button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summaryCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-base-200 bg-base-200/40 p-5 flex flex-col gap-3"
            >
              <span className={`badge ${card.badge} badge-lg w-fit`}>{card.title}</span>
              <p className="text-2xl font-bold text-base-content">{card.value}</p>
              <p className="text-sm text-base-content/70">{card.helper}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary-focus text-primary-content flex items-center justify-center text-2xl font-semibold">
                  {studentInitials}
                </div>
                <div>
                  <p className="text-sm text-base-content/60">รหัสนักเรียน</p>
                  <p className="text-lg font-semibold text-base-content">
                    {student?.user_id ?? "-"}
                  </p>
                  <p className="text-sm text-base-content/70">
                    สถานะข้อมูล: {currentYearlyData?.isCompleted ?? "-"}
                  </p>
                </div>
              </div>
              <dl className="space-y-2 text-sm text-base-content/80">
                {generalInfoEntries.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between border-b border-dashed border-base-200 pb-2 last:border-b-0"
                  >
                    <dt className="font-medium">{item.label}</dt>
                    <dd className="font-semibold text-base-content/90">
                      {item.value || "-"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-primary">
                  ข้อมูลผู้ปกครองหลัก
                </h3>
                <span className="badge badge-primary badge-outline">
                  อัปเดต {formatThaiDate(student?.updatedAt)}
                </span>
              </div>
              <dl className="space-y-2 text-sm text-base-content/80">
                {parentEntries.map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <dt className="font-medium">{item.label}</dt>
                    <dd className="font-semibold text-base-content/90">
                      {item.value || "-"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="xl:col-span-2 space-y-6">
            <div className="rounded-2xl border border-base-200 bg-base-200/40 p-6">
              <div className="flex flex-col gap-2 mb-4">
                <h3 className="text-lg font-semibold text-base-content">
                  สถานะการดำเนินการเยี่ยมบ้าน
                </h3>
                <p className="text-sm text-base-content/60">
                  ติดตามความคืบหน้าของการเยี่ยมบ้านและกิจกรรมที่เกี่ยวข้องในปีการศึกษานี้
                </p>
              </div>
              <ol className="grid gap-4 sm:grid-cols-2">
                {timelineSteps.map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-base-200 bg-base-100 p-4 flex gap-4"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        step.state === "done"
                          ? "bg-success text-success-content"
                          : step.state === "active"
                          ? "bg-warning text-warning-content"
                          : "bg-base-200 text-base-content/60"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="space-y-1">
                      <p className="font-semibold text-base-content">
                        {step.title}
                      </p>
                      <p className="text-sm text-base-content/70">
                        {step.description}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-base-content/50">
                        {step.meta}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-base-200 bg-base-100 p-6 space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">กิจกรรมถัดไป</h3>
                  <p className="text-sm text-base-content/60">
                    เตรียมตัวก่อนการเยี่ยมบ้านครั้งต่อไป หรืออัปเดตหมายเหตุเพิ่มเติม
                  </p>
                </div>
                <span className="badge badge-outline badge-lg">
                  {appointmentDate ? "นัดหมาย" : "ยังไม่ระบุ"}
                </span>
              </div>

              <div className="rounded-2xl border border-dashed border-base-200 bg-base-200/40 p-4">
                <p className="text-sm text-base-content/70">
                  {schedule?.comment ||
                    "ยังไม่มีหมายเหตุเพิ่มเติมจากครูที่ปรึกษา"}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button className="btn btn-outline btn-sm">เพิ่มหมายเหตุ</button>
                  <button className="btn btn-ghost btn-sm">
                    จัดการเวลานัดหมาย
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-base-200 bg-base-200/40 p-6 space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-base-content">
                สภาพความเป็นอยู่และหลักฐานประกอบ
              </h3>
              <p className="text-sm text-base-content/70">
                รวมรูปภาพและหมายเหตุที่บันทึกจากการเยี่ยมบ้าน
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-ghost btn-sm">อัปโหลดรูปเพิ่ม</button>
              <button className="btn btn-outline btn-sm">เพิ่มบันทึก</button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {attachments.map((item) => (
              <article
                key={item.key}
                className="rounded-2xl border border-base-200 bg-base-100 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-base font-semibold text-base-content">
                      {item.title}
                    </h4>
                    <p className="text-sm text-base-content/70">
                      {item.description || "ยังไม่มีคำอธิบาย"}
                    </p>
                  </div>
                  <span className="badge badge-outline">ไฟล์</span>
                </div>
                {item.url ? (
                  <div className="space-y-3">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-40 w-full rounded-xl object-cover border border-base-200"
                    />
                    <a
                      className="btn btn-outline btn-sm w-full"
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      เปิดรูปภาพ
                    </a>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-base-200 bg-base-200/60 p-4 text-sm text-base-content/70">
                    ยังไม่ได้อัปโหลดรูปภาพ
                  </div>
                )}
              </article>
            ))}

            <article className="lg:col-span-2 xl:col-span-3 rounded-2xl border border-base-200 bg-base-100 p-5 space-y-3">
              <h4 className="text-base font-semibold text-base-content">
                บันทึกเพิ่มเติมจากครูผู้เยี่ยมบ้าน
              </h4>
              <p className="text-sm leading-relaxed text-base-content/70">
                {visitInfo?.comment ||
                  "ยังไม่มีบันทึกจากการเยี่ยมบ้านในปีการศึกษานี้"}
              </p>
            </article>
          </div>
        </section>

        {isLoading && (
          <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4 text-center text-sm text-base-content/60">
            กำลังโหลดข้อมูลล่าสุด...
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitInfoOverview;
