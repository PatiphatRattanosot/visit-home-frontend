import React from "react";

const LabelCheck = ({ label, name, value, set }) => {
  return (
    <label className="flex items-center text-sm">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={value === true}
        className="mr-3 checkbox checked:bg-white"
        onChange={() => set(!value)}
      />
      {label}
    </label>
  );
};

export default LabelCheck;
