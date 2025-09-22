import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchPersonnel = ({
  searchKeyword,
  setSearchKeyword,
  placeholder,
  className,
}) => {
  const handleChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <label className={`input ${className}`}>
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={searchKeyword}
        onChange={handleChange}
       
      />
    </label>
  );
};

export default SearchPersonnel;
