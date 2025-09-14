import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import StudentService from "../services/student/student.service";
import {useState } from "react";

const ImportStudentBtn = ({ classId, onImported }) => {
  const REQUIRED_COLS = ["prefix", "first_name", "last_name", "user_id"];
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        id="upload_excel"
        onChange={handleFileChange}
        disabled={loading}
      />
      <button disabled={loading} className={`btn-blue `}></button>
    </div>
  );
};

export default ImportStudentBtn;
