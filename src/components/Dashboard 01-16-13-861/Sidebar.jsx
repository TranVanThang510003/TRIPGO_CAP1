import React from "react";
import {
  FaHome,
  FaChartLine,
  FaFileInvoiceDollar,
  FaTasks,
  FaCalendar,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>TripGo</h2>
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

export default Sidebar;
