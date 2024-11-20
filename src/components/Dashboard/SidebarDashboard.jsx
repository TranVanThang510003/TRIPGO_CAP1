import {
  FaHome,
} from "react-icons/fa";

const SidebarDashboard = () => {
  return (
    <div className="bg-blue-200 w-[160px] h-[900px]">
      <h2 className="text-2xl font-bold m-8">TripGo</h2>
      <ul>
        <li className="flex gap-3 mt-7 ml-2">
          <FaHome /> Dashboard
        </li>
        
      </ul>
    </div>
  );
};

export default SidebarDashboard;
