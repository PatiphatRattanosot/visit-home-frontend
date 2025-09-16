import { useState } from "react";
import { CiSearch } from "react-icons/ci";
const SearchClassroom = ({
  classroom,
  setFilteredClassroom,
  setCurrentPage,
}) => {
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    if (value === "") {
      setFilteredClassroom(classroom);
      return;
    }
    const result = classroom.filter((classroom) => {
      return (
        String(classroom.room).toLowerCase().includes(value.toLowerCase()) ||
        String(classroom.number).toLowerCase().includes(value.toLowerCase()) ||
        String(classroom.room + "/" + classroom.number).toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredClassroom(result);
    setCurrentPage(1);
  };
  return (
    <div>
      <div className="w-full max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="ค้นหาเลขชั้นเรียนหรือเลขห้อง..."
          value={keyword}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white border border-gray-300 shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
        />
        <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchClassroom;
