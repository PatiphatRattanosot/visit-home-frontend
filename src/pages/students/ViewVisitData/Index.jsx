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
  const [image, setImage] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [personalInfo, setPersonalInfo] = React.useState(null);
  const [relationshipInfo, setRelationshipInfo] = React.useState(null);
  const [familyInfo, setFamilyInfo] = React.useState(null);
  const [behaviorInfo, setBehaviorInfo] = React.useState(null);
  const [riskInfo, setRiskInfo] = React.useState(null);
  const [otherInfo, setOtherInfo] = React.useState(null);
  const [isCompleted, setIsCompleted] = React.useState(null);

  const { userInfo } = useAuthStore();
  const { selectedYear } = useYearSelectStore();
  const { getYearlyData } = useStudentStore();

  React.useEffect(() => {
    setPersonalInfo(null);
    setRelationshipInfo(null);
    setFamilyInfo(null);
    setBehaviorInfo(null);
    setRiskInfo(null);
    setOtherInfo(null);
    setImage(null);
    setPhone(null);
    setIsCompleted(null);
    // Fetch existing data for the selected year
    if (selectedYear && userInfo?._id) {
      getYearlyData({ student_id: userInfo?._id, year_id: selectedYear }).then(
        (res) => {
          const yearlyData = res?.students?.[0]?.yearly_data?.[0];
          if (yearlyData) {
            setPersonalInfo(yearlyData.personal_info || null);
            setRelationshipInfo(yearlyData.relationship_info || null);
            setFamilyInfo(yearlyData.family_info || null);
            setBehaviorInfo(yearlyData.behavior_info || null);
            setRiskInfo(yearlyData.risk_info || null);
            setOtherInfo(yearlyData.additional_info || null);
            setImage(res?.students?.[0]?.image_url || null);
            setPhone(res?.students?.[0]?.phone || null);
            setIsCompleted(yearlyData?.isCompleted || null);
          } else {
            setPersonalInfo(null);
            setRelationshipInfo(null);
            setFamilyInfo(null);
            setBehaviorInfo(null);
            setRiskInfo(null);
            setOtherInfo(null);
            setImage(null);
            setPhone(null);
            setIsCompleted(null);
          }
        }
      );
    }
  }, [selectedYear, userInfo?._id]);
  return (
    <div className="w-full max-w-screen h-full min-h-screen flex justify-center flex-col bg-gray-50">
      <div className="space-y-8">
        {page === 1 && (
          <Personal
            page={page}
            setPage={setPage}
            personalInfo={personalInfo}
            image={image}
            phone={phone}
            isCompleted={isCompleted}
          />
        )}
        {page === 2 && (
          <Relation
            page={page}
            setPage={setPage}
            relationshipInfo={relationshipInfo}
            personalInfo={personalInfo}
            isCompleted={isCompleted}
          />
        )}
        {page === 3 && (
          <Family
            page={page}
            setPage={setPage}
            familyInfo={familyInfo}
            personalInfo={personalInfo}
            isCompleted={isCompleted}
          />
        )}
        {page === 4 && (
          <Behavior
            page={page}
            setPage={setPage}
            behaviorInfo={behaviorInfo}
            personalInfo={personalInfo}
            isCompleted={isCompleted}
          />
        )}
        {page === 5 && (
          <Risk
            page={page}
            setPage={setPage}
            riskInfo={riskInfo}
            personalInfo={personalInfo}
            isCompleted={isCompleted}
          />
        )}
        {page === 6 && (
          <Other
            page={page}
            setPage={setPage}
            otherInfo={otherInfo}
            personalInfo={personalInfo}
            isCompleted={isCompleted}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
