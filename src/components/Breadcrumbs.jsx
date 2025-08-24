import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router";

const BreadcrumbsLoop = ({ options = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li
          className="hover:bg-base-200 p-2 rounded-full flex items-center mb-0.5"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack size={20} />
        </li>
        {options.map((option, index) => (
          <li key={index}>
            {option.link ? (
              <a href={option.link}>{option.label}</a>
            ) : (
              <span>{option.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreadcrumbsLoop;
