
import {
  faClosedCaptioning,
  faHome,
  faHotel,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <div className="border-t-2 mt-[80px]">
      <div className="flex justify-center text-center space-x-8 p-4 font-bold gap-10">
        <button
          className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-800"
          onClick={() => navigate("/funactivities")} // Navigate to activities page
        >
         <span className=" flex gap-2 items-center">
            <FontAwesomeIcon icon={faHome} />
            Home
          </span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-800"
          onClick={() => navigate("/tours")} // Navigate to tours page
        >
        <span className=" flex gap-2 items-center">
            <FontAwesomeIcon icon={faClosedCaptioning} />
            Tours
          </span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-800"
          onClick={() => navigate("/hotels")} // Navigate to hotels page
        >
         <span className=" flex gap-2 items-center">
            <FontAwesomeIcon icon={faHotel} />
            Khách sạn
          </span>
        </button>
        <button
          className="flex flex-col items-center space-y-1 text-gray-600 hover:text-blue-800"
          onClick={() => navigate("/restaurants")} // Navigate to restaurants page
        >
           <span className=" flex gap-2 items-center">
            <FontAwesomeIcon icon={faUtensils} />
            Nhà hàng
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
