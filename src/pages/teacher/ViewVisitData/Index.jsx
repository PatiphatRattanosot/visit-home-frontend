import React from "react";
import Personal from "./Personal";
import Relation from "./Relation";
import Family from "./Family";
import Behavior from "./Behavior";
import Risk from "./Risk";
import Other from "./Other";
import { useParams } from "react-router";
import { useStudentStore } from "../../../stores/student.store";
import useYearSelectStore from "../../../stores/year_select.store";

const Index = () => {
  const { studentId } = useParams();
  const { selectedYear } = useYearSelectStore();
  const [page, setPage] = React.useState(1);
  const [studentInfo, setStudentInfo] = React.useState(null);
  const [personalInfo, setPersonalInfo] = React.useState(null);
  const [relationshipInfo, setRelationshipInfo] = React.useState(null);
  const [familyInfo, setFamilyInfo] = React.useState(null);
  const [behaviorInfo, setBehaviorInfo] = React.useState(null);
  const [riskInfo, setRiskInfo] = React.useState(null);
  const [otherInfo, setOtherInfo] = React.useState(null);
  const { getYearlyData } = useStudentStore();

  React.useEffect(() => {
    setPersonalInfo(null);
    setRelationshipInfo(null);
    setFamilyInfo(null);
    setBehaviorInfo(null);
    setRiskInfo(null);
    setOtherInfo(null);
    setStudentInfo(null);
    // Fetch existing data for the selected year
    if (selectedYear && studentId) {
      getYearlyData({ student_id: studentId, year_id: selectedYear }).then(
        (res) => {
          const yearlyData = res?.students?.[0]?.yearly_data?.[0];
          const studentData = res?.students?.[0];
          if (yearlyData) {
            setPersonalInfo(yearlyData.personal_info || null);
            setRelationshipInfo(yearlyData.relationship_info || null);
            setFamilyInfo(yearlyData.family_info || null);
            setBehaviorInfo(yearlyData.behavior_info || null);
            setRiskInfo(yearlyData.risk_info || null);
            setOtherInfo(yearlyData.additional_info || null);
            setStudentInfo({
              image: studentData?.image_url || null,
              phone: studentData?.phone || null,
              first_name: studentData?.first_name || null,
              last_name: studentData?.last_name || null,
              prefix: studentData?.prefix || null,
            });
          } else {
            setPersonalInfo(null);
            setRelationshipInfo(null);
            setFamilyInfo(null);
            setBehaviorInfo(null);
            setRiskInfo(null);
            setOtherInfo(null);
            setStudentInfo(null);
          }
        }
      );
    }
  }, [selectedYear, studentId]);
  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50">
      <div className="space-y-8">
        {page === 1 && (
          <Personal
            page={page}
            setPage={setPage}
            personalInfo={personalInfo}
            studentInfo={studentInfo}
          />
        )}
        {page === 2 && (
          <Relation
            page={page}
            setPage={setPage}
            relationshipInfo={relationshipInfo}
            studentInfo={studentInfo}
          />
        )}
        {page === 3 && (
          <Family
            page={page}
            setPage={setPage}
            familyInfo={familyInfo}
            studentInfo={studentInfo}
          />
        )}
        {page === 4 && (
          <Behavior
            page={page}
            setPage={setPage}
            behaviorInfo={behaviorInfo}
            studentInfo={studentInfo}
          />
        )}
        {page === 5 && (
          <Risk
            page={page}
            setPage={setPage}
            riskInfo={riskInfo}
            studentInfo={studentInfo}
          />
        )}
        {page === 6 && (
          <Other
            page={page}
            setPage={setPage}
            otherInfo={otherInfo}
            studentInfo={studentInfo}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
