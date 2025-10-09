import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import StudentService from "../services/student/student.service";
import { useState, useRef } from "react";
import { useClassroomStore } from "../stores/classroom.store";

const ImportStudentBtn = ({ classId }) => {
  const { getClassroomById } = useClassroomStore();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const REQUIRED_COLS = [
    "prefix",
    "first_name",
    "last_name",
    "user_id",
    "class_id",
  ];

  const COLUMN_HEADER_MAP = {
    prefix: "prefix",
    คำนำหน้า: "prefix",
    first_name: "first_name",
    ชื่อ: "first_name",
    last_name: "last_name",
    นามสกุล: "last_name",
    user_id: "user_id",
    เลขที่ประจำตัว: "user_id",
    class_id: "class_id",
    รหัสชั้นเรียน: "class_id",
  };

  const importStudents = async (students) => {
    try {
      const response = await StudentService.uploadStudentsByExcel(students);

      if (response.status === 201) {
        toast.success("นำเข้าข้อมูลนักเรียนสำเร็จ");
        getClassroomById(classId);
      } else if (response.status === 200) {
        toast.success("นำเข้าข้อมูลนักเรียนบางคนในระบบแล้วสำเร็จ");
      } else if (response.status === 400) {
        const { existing_students, added_students } = response.data;
        if (existing_students.length > 0) {
          toast.error(`มีข้อมูลนักเรียนบางคนในระบบแล้ว`);
        }
        if (added_students.length > 0) {
          toast.success(`นำเข้าข้อมูลนักเรียนสำเร็จ`);
          getClassroomById(classId);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("เกิดข้อผิดพลาดในการนำเข้าข้อมูลนักเรียน");
    }
  };

  const handleFileChange = (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];

      //.endsWith() ใช้ตรวจสอบนามสกุลไฟล์
      if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        toast.error(
          "ระบบไม่รองรับไฟล์ประเภทนี้ กรุณาเลือกไฟล์ Excel (.xlsx หรือ .xls)"
        );
        setLoading(false);
        return;
      }

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonStudents = XLSX.utils.sheet_to_json(worksheet);

          const students = jsonStudents.map((student) => {
            const normalized = Object.entries(student).reduce(
              (acc, [key, value]) => {
                const trimmedKey = key.trim();
                const mappedKey = COLUMN_HEADER_MAP[trimmedKey];
                if (mappedKey) {
                  acc[mappedKey] = value;
                }
                return acc;
              },
              {}
            );

            return {
              ...normalized,
              class_id: classId,
              user_id: normalized.user_id?.toString?.() ?? "",
            };
          });

          const firstStudent = students[0] ?? {};

          const hasAllRequiredCols = REQUIRED_COLS.every((col) =>
            Object.prototype.hasOwnProperty.call(firstStudent, col) &&
            firstStudent[col] !== undefined &&
            firstStudent[col] !== ""
          );
          if (!hasAllRequiredCols) {
            toast.error("ไฟล์ Excel ต้องมีข้อมูลในคอลัมน์ที่จำเป็นทั้งหมด");
            setLoading(false);
            return;
          }
          importStudents(students);
        };
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการอ่านไฟล์ Excel");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        id="upload_excel"
        type="file"
        accept=".xlsx,.xls,.csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={loading}
      />
      <button
        disabled={loading}
        onClick={() => document.getElementById("upload_excel").click()}
        className="btn-blue hover:pointer-coarse hover:underline"
      >
        {loading ? "กำลังอัปโหลด..." : "อัปโหลด Excel"}
      </button>
    </>
  );
};

export default ImportStudentBtn;
