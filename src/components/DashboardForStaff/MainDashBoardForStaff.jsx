import { useState } from "react";
import HeaderDashboardForStaff from "./HeaderDashboardForStaff";
import RevenueDetailChartForStaff from "./RevenueDetailChartForStaff";
import ShowCardForStaff from "./ShowCardForStaff";
import SidebarDashboardForStaff from "./SidebarDashboardForStaff";

const MainDashBoardForStaff = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Năm hiện tại mặc định

  // Hàm xử lý thay đổi năm
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className=" flex bg-slate-100 ">
      {/* Sidebar */}
      <SidebarDashboardForStaff />
      <div className="flex-1">
        <HeaderDashboardForStaff />
        <div className="p-4">
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
                {[2021, 2022, 2023, 2024].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ShowCardForStaff selectedYear={selectedYear} />
          <div className="">
            <RevenueDetailChartForStaff selectedYear={selectedYear} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashBoardForStaff;
