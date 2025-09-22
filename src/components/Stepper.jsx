import React from "react";

const Stepper = ({ page, setPage }) => {
  return (
    <ul className="steps steps-horizontal">
      <li
        data-content={page > 1 ? "✓" : "1"}
        className={`step ${page >= 1 ? "step-warning" : ""} cursor-pointer`}
        onClick={() => setPage(1)}
        id="step-1"
      >
        <p className="hidden md:block">ข้อมูลส่วนตัว</p>
      </li>
      <li
        data-content={page > 2 ? "✓" : "2"}
        className={`step ${page >= 2 ? "step-warning" : ""} cursor-pointer`}
        onClick={() => setPage(2)}
        id="step-2"
      >
        <p className="hidden md:block">ความสัมพันธ์</p>
      </li>
      <li
        data-content={page > 3 ? "✓" : "3"}
        className={`step ${page >= 3 ? "step-warning" : ""} cursor-pointer`}
        onClick={() => setPage(3)}
        id="step-3"
      >
        <p className="hidden md:block">สถานะครัวเรือน</p>
      </li>
      <li
        data-content={page > 4 ? "✓" : "4"}
        className={`step ${page >= 4 ? "step-warning" : ""} cursor-pointer`}
        onClick={() => setPage(4)}
        id="step-4"
      >
        <p className="hidden md:block">พฤติกรรม</p>
      </li>
      <li
        data-content={page > 5 ? "✓" : "5"}
        className={`step ${page >= 5 ? "step-warning" : ""} cursor-pointer`}
        onClick={() => setPage(5)}
        id="step-5"
      >
        <p className="hidden md:block">ความเสี่ยง</p>
      </li>
      <li
        data-content={page > 6 ? "✓" : "6"}
        className={`step ${page >= 6 ? "step-warning" : ""} cursor-pointer`}
        onClick={() => setPage(6)}
        id="step-6"
      >
        <p className="hidden md:block">จากผู้ปกครอง</p>
      </li>
    </ul>
  );
};

export default Stepper;
