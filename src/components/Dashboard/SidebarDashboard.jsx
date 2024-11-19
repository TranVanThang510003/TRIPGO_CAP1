/* eslint-disable no-unused-vars */

import {
  FaHome,
  FaChartLine,
  FaFileInvoiceDollar,
  FaTasks,
  FaCalendar,
} from "react-icons/fa";

const SidebarDashboard = () => {
  return (
    <div className="sidebar">
      <h2 className="text-3xl">TripGo</h2>
      <ul>
        <li>
          <FaHome /> Dashboard
        </li>
        <li>
          <FaChartLine /> LogOut
        </li>
      </ul>
    </div>
  );
};

export default SidebarDashboard;
