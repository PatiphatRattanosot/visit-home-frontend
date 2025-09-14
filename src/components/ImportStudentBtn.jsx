import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import StudentService from "../services/student/student.service";
import { useRef, useState } from "react";

const REQUIRED_COLS = ["prefix", "first_name", "last_name", "user_id"];

const ImportStudentBtn = ({ classId, onImported }) => {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = "";
  };

  const readExcelFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        resolve(jsonData);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileChange = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const rows = await readExcelFile(file);

      // ตรวจสอบว่ามีคอลัมน์ที่ต้องการครบไหม
      const missingCols = REQUIRED_COLS.filter(
        (col) => !Object.keys(rows[0] || {}).includes(col)
      );
      if (missingCols.length) {
        toast.error(`ไฟล์ Excel ขาดคอลัมน์: ${missingCols.join(", ")}`);
        resetInput();
        return;
      }

      // เพิ่ม class_id ให้ทุก row
      const data = rows.map((row) => ({
        ...row,
        class_id: classId,
      }));

      const response = await StudentService.uploadStudentsByExcel(data);

      toast.success(response.data.message || "อัปโหลดไฟล์สำเร็จ");
      if (onImported) onImported();

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "เกิดข้อผิดพลาดในการอัปโหลดไฟล์");
    } finally {
      setLoading(false);
      resetInput();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        id="upload_excel"
        type="file"
        accept=".xlsx,.xls"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <button
        disabled={loading}
        onClick={() => document.getElementById("upload_excel").click()}
        className="hover:pointer-coarse hover:underline"
      >
        {loading ? "กำลังอัปโหลด..." : "อัปโหลด Excel"}
      </button>
    </>
  );
};

export default ImportStudentBtn;
