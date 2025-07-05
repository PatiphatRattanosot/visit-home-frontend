// ArrowBack.jsx
import { useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";

const ArrowBack = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-4 p-2 hover:bg-base-200 rounded-full"
    >
      <IoArrowBack size={20} />
    </button>
  );
};

export default ArrowBack;
