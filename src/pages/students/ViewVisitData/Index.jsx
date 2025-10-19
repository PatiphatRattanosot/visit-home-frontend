import React from "react";
import Personal from "./Personal";
import Relation from "./Relation";
import Family from "./Family";
import Behavior from "./Behavior";
import Risk from "./Risk";
import Other from "./Other";
import useYearSelectStore from "../../../stores/year_select.store";
import { useAuthStore } from "../../../stores/auth.store";
import { useStudentStore } from "../../../stores/student.store";

const Index = () => {
  const [page, setPage] = React.useState(1);
  const [studentData, setStudentData] = React.useState({
    image: null,
    phone: null,
    personalInfo: null,
    relationshipInfo: null,
    familyInfo: null,
    behaviorInfo: null,
    riskInfo: null,
    otherInfo: null,
  });

  const { userInfo } = useAuthStore();
  const { selectedYear } = useYearSelectStore();
  const { getYearlyData } = useStudentStore();

  const resetStudentData = () => {
    setStudentData({
      image: null,
      phone: null,
      personalInfo: null,
      relationshipInfo: null,
      familyInfo: null,
      behaviorInfo: null,
      riskInfo: null,
      otherInfo: null,
    });
  };

  React.useEffect(() => {
    resetStudentData();

    if (selectedYear && userInfo?._id) {
      getYearlyData({ student_id: userInfo?._id, year_id: selectedYear }).then(
        (res) => {
          const yearlyData = res?.students?.[0]?.yearly_data?.[0];
          const student = res?.students?.[0];

          setStudentData({
            image: student?.image_url || null,
            phone: student?.phone || null,
            personalInfo: yearlyData?.personal_info || null,
            relationshipInfo: yearlyData?.relationship_info || null,
            familyInfo: yearlyData?.family_info || null,
            behaviorInfo: yearlyData?.behavior_info || null,
            riskInfo: yearlyData?.risk_info || null,
            otherInfo: yearlyData?.additional_info || null,
          });
        }
      );
    }
  }, [selectedYear, userInfo?._id, getYearlyData]);
  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50">
      <div className="space-y-8">
        {page === 1 && (
          <Personal
            page={page}
            setPage={setPage}
            personalInfo={studentData.personalInfo}
            image={studentData.image}
            phone={studentData.phone}
          />
        )}
        {page === 2 && (
          <Relation
            page={page}
            setPage={setPage}
            relationshipInfo={studentData.relationshipInfo}
            personalInfo={studentData.personalInfo}
          />
        )}
        {page === 3 && (
          <Family
            page={page}
            setPage={setPage}
            familyInfo={studentData.familyInfo}
            personalInfo={studentData.personalInfo}
          />
        )}
        {page === 4 && (
          <Behavior
            page={page}
            setPage={setPage}
            behaviorInfo={studentData.behaviorInfo}
            personalInfo={studentData.personalInfo}
          />
        )}
        {page === 5 && (
          <Risk
            page={page}
            setPage={setPage}
            riskInfo={studentData.riskInfo}
            personalInfo={studentData.personalInfo}
          />
        )}
        {page === 6 && (
          <Other
            page={page}
            setPage={setPage}
            otherInfo={studentData.otherInfo}
            personalInfo={studentData.personalInfo}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
