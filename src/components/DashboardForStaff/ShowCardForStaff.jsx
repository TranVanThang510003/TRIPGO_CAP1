/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import StatsCardForStaff from "./StatsCardForStaff";

const ShowCardForStaff = ({ selectedYear }) => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/dashboard/staff/totalrevenue/${selectedYear}`
        );

        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (data && typeof data === "object") {
          setStatsData(data);
        } else {
          throw new Error("Dữ liệu API không hợp lệ");
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu từ API:", err);
        setError("Không thể lấy dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]); // Gọi lại API khi `selectedYear` thay đổi

  // Hiển thị khi đang tải
  if (loading) {
    return <p>Đang tải dữ liệu...</p>;
  }

  // Hiển thị khi có lỗi
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="ml-[100px] flex p-4 h-[200px] m-3 relative gap-[120px]">
      {statsData ? (
        <>
          <StatsCardForStaff
            title="Tổng khách du lịch"
            value={statsData.Total_Unique_Users ?? "N/A"} // Sử dụng nullish coalescing
          />
          <StatsCardForStaff
            title="Tổng thu nhập của năm"
            value={
              statsData.Total_Revenue
                ? `${statsData.Total_Revenue.toLocaleString()} VNĐ`
                : "N/A"
            }
          />
          <StatsCardForStaff
            title="Tổng tour trong năm"
            value={statsData.Total_Tours ?? "N/A"}
          />
        </>
      ) : (
        <p>Không có dữ liệu để hiển thị.</p>
      )}
    </div>
  );
};

export default ShowCardForStaff;
