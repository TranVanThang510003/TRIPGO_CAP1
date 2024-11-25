/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { useState, useEffect } from "react";
import StatsCardForStaff from "./StatsCardForStaff";

const ShowCardForStaff = ({ selectedYear }) => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/dashboard/staff/totalrevenue/${selectedYear}`
        );
        const data = await response.json();

        if (data && typeof data === "object") {
          setStatsData(data);
        } else {
          throw new Error("Dữ liệu API không hợp lệ");
        }
        
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu từ API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]); // Gọi lại API khi selectedYear thay đổi

  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className=" ml-[100px] flex p-4 h-[200px] m-3 relative gap-[120px]">
      {statsData && (
        <>
          <StatsCardForStaff
            title="Tổng khách du lịch"
            value={statsData.Total_Unique_Users || "N/A"}
          />
          <StatsCardForStaff
            title="Tổng thu nhập của năm"
            value={`${statsData.Total_Revenue.toLocaleString()} VNĐ` || "N/A"}
          />
          <StatsCardForStaff
            title="Tổng tour trong năm"
            value={statsData.Total_Tours || "N/A"}
          />
        </>
      )}
    </div>
  );
};

export default ShowCardForStaff;
