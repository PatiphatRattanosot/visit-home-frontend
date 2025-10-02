import React from "react";

const SDQTable = ({ data = [] }) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table table-zebra w-full text-xs sm:text-sm">
        {/* head */}
        <thead>
          <tr>
            <th>ผู้ประเมิน</th>
            <th>ด้านอารมณ์</th>
            <th>ด้านความประพฤติ/เกเร</th>
            <th>ด้านพฤติกรรมอยู่ไม่นิ่ง/สมาธิสั้น</th>
            <th>ด้านความสัมพันธ์กับเพื่อน</th>
            <th>ด้านสัมพันธภาพทางสังคม</th>
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
            data.map((item, index) => {
              // Check if all data fields are "ยังไม่มีการประเมิน"
              const isNoData =
                item.emotional === "ยังไม่มีการประเมิน" ||
                item.behavioral === "ยังไม่มีการประเมิน" ||
                item.hyperactivity === "ยังไม่มีการประเมิน" ||
                item.friendship === "ยังไม่มีการประเมิน" ||
                item.social === "ยังไม่มีการประเมิน";
              return (
                <tr key={index}>
                  <td>{item.assessor}</td>
                  {isNoData ? (
                    <td colSpan="6" className="text-center text-red-600">
                      ยังไม่มีการประเมิน
                    </td>
                  ) : (
                    <>
                      <td
                        className={`text-center ${
                          item.emotional > 5 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {item.emotional}
                      </td>
                      <td
                        className={`text-center ${
                          item.behavioral > 4
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {item.behavioral}
                      </td>
                      <td
                        className={`text-center ${
                          item.hyperactivity > 5
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {item.hyperactivity}
                      </td>
                      <td
                        className={`text-center ${
                          item.friendship > 3
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {item.friendship}
                      </td>
                      <td
                        className={`text-center ${
                          item.social < 4 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {item.social}
                      </td>
                    </>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SDQTable;
