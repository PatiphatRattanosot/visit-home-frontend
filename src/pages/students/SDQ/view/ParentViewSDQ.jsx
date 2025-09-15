import React from "react";
import YearSelector from "../../../../components/YearSelector";
import useYearSelectStore from "../../../../stores/year_select.store";
import SDQServices from "../../../../services/sdq/sdq.service";
import { useAuthStore } from "../../../../stores/auth.store";
import SDQScoreCard from "../../../../components/SDQScoreCard";

const ParentViewSDQ = () => {
  const [sdq, setSdq] = React.useState(null);
  const { selectedYear } = useYearSelectStore();
  const { userInfo } = useAuthStore();

  const overallScore = sdq
    ? (sdq?.emotional?.total_score || 0) +
      (sdq?.behavioral?.total_score || 0) +
      (sdq?.hyperactivity?.total_score || 0) +
      (sdq?.friendship?.total_score || 0) +
      (sdq?.social?.total_score || 0)
    : 0;

  React.useEffect(() => {
    setSdq(null); // Reset state when selectedYear changes
    const fetchData = async () => {
      try {
        const res = await SDQServices.getSDQByYearAndAssessor({
          year_id: selectedYear,
          student_id: userInfo?._id,
          assessor: "Parent",
        });
        if (res.status === 200) {
          const sdqData = res.data?.sdq;
          if (sdqData) {
            setSdq(sdqData);
          } else {
            setSdq(null);
          }
        } else {
          setSdq(null);
        }
      } catch (err) {
        setSdq(null);
        console.error("Failed to fetch SDQ data:", err);
      }
    };
    fetchData();
  }, [selectedYear, userInfo?._id]);

  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50">
      <div className="space-y-8">
        <div className="flex items-center justify-center py-9">
          <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md">
            <div>
              {/* Heading */}
              <h3 className="text-xl font-bold text-center w-full">
                ผลการประเมิน SDQ ส่วนของผู้ปกครอง
              </h3>

              {/* Year Selector */}
              <div className="flex justify-center md:justify-end mt-6">
                <YearSelector />
              </div>

              <div className="mt-2 flex justify-center md:justify-end">
                {!sdq && (
                  <a
                    href={`/student/sdq-parent/${selectedYear}`}
                    className="text-white btn btn-success"
                  >
                    ประเมิน SDQ
                  </a>
                )}
              </div>

              {sdq ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <SDQScoreCard
                    title="ด้านอารมณ์"
                    score={sdq?.emotional?.total_score}
                    operator={sdq?.emotional?.total_score > 5}
                  />
                  <SDQScoreCard
                    title="ด้านความประพฤติ/เกเร"
                    score={sdq?.behavioral?.total_score}
                    operator={sdq?.behavioral?.total_score > 4}
                  />
                  <SDQScoreCard
                    title="ด้านพฤติกรรมอยู่ไม่นิ่ง/สมาธิสั้น"
                    score={sdq?.hyperactivity?.total_score}
                    operator={sdq?.hyperactivity?.total_score > 5}
                  />
                  <SDQScoreCard
                    title="ด้านความสัมพันธ์กับเพื่อน"
                    score={sdq?.friendship?.total_score}
                    operator={sdq?.friendship?.total_score > 3}
                  />
                  <SDQScoreCard
                    title="ด้านสัมพันธภาพทางสังคม"
                    score={sdq?.social?.total_score}
                    operator={sdq?.social?.total_score < 4}
                  />
                  <SDQScoreCard
                    title="ผลรวม"
                    score={overallScore}
                    operator={overallScore > 16}
                  />
                </div>
              ) : (
                <div className="mt-6 h-[65vh] flex items-center justify-center">
                  <p className="text-center text-red-600">
                    ยังไม่มีการประเมินในปีนี้
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              {/* <div className="flex justify-start mt-10 space-x-2">
            <button className="btn btn-soft w-1/2" type="button">
              ย้อนกลับ
            </button>
          </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentViewSDQ;
