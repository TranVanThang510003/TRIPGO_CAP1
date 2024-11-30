import { useState } from "react";
import HeaderDashboard from "./HeaderDashboard.jsx";
import Sidebar from "../Sidebar.jsx";
import RevenueDetailChart from "./RevenueDetailChart.jsx";
import ShowCard from "./ShowCard.jsx";

const HeaderDashboardForStaff = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Năm hiện tại mặc định

  // Hàm xử lý thay đổi năm
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className=" flex bg-slate-100 ">
      {/* Sidebar */}
      <Sidebar  />
      <div className="flex-1 w-5/6">
        <HeaderDashboard />
        <div className="p-4 ">
          <div className="flex items-center justify-between mb-6">
            <div>
              <label htmlFor="year-select" className="mr-2 text-gray-800">
                Chọn năm:
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={handleYearChange}
                className="p-2 bg-gray-100 text-gray-800 rounded"
              >
                {[2023, 2024].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ShowCard selectedYear={selectedYear} />
          <div className="">
            <RevenueDetailChart selectedYear={selectedYear} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDashboardForStaff;
