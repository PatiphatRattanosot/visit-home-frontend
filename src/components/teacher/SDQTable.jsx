import React from "react";

const SDQTable = ({ data = [] }) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ผู้ประเมิน</th>
            <th>ด้านอารมณ์</th>
            <th>ด้านความประพฤติ/เกเร</th>
            <th>ด้านพฤติกรรมอยู่ไม่นิ่ง/สมาธิสั้น</th>
            <th>ด้านความสัมพันธ์กับเพื่อน</th>
            <th>ด้านสัมพันธภาพทางสังคม</th>
            <th>คะแนนรวม</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                ไม่มีข้อมูล
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.assessor}</td>
                <td>{item.emotional}</td>
                <td>{item.behavioral}</td>
                <td>{item.hyperactivity}</td>
                <td>{item.friendship}</td>
                <td>{item.social}</td>
                <td>{item.total}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SDQTable;
