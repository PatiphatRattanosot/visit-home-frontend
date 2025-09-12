import React from "react";

const SDQScoreCard = ({ title, score, operator }) => {
  return (
    <div className="card bg-base-100 card-md shadow-sm w-full">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          คะแนน: <span className="font-bold">{score}</span>
        </p>
        <p className={operator ? "text-red-600" : "text-green-600"}>
          {operator ? "เสี่ยง/ มีปัญหา" : "ปกติ"}
        </p>
      </div>
    </div>
  );
};

export default SDQScoreCard;
