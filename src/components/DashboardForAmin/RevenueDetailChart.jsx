/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RevenueDetailChart = ({ selectedYear }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/dashboard/admin/totaltourandhotel/${selectedYear}`
        );
        const responseData = await response.json();

        if (!responseData || !Array.isArray(responseData.Total_Tours)) {
          console.error("Dữ liệu API không hợp lệ hoặc rỗng:", responseData);
          setChartData(null);
          setLoading(false);
          return;
        }

        const apiData = responseData.Total_Tours;

        const months = Array.from(
          new Set(apiData.map((item) => item.Month))
        ).sort((a, b) => a - b);

        const hotelRevenue = months.map((month) => {
          const dataForMonth = apiData.find(
            (item) => item.Month === month && item.Type === "Hotel"
          );
          return dataForMonth ? dataForMonth.Total_Revenue : 0;
        });

        const tourRevenue = months.map((month) => {
          const dataForMonth = apiData.find(
            (item) => item.Month === month && item.Type === "Tour"
          );
          return dataForMonth ? dataForMonth.Total_Revenue : 0;
        });

        const formattedData = {
          labels: months.map((month) => `Tháng ${month}`),
          datasets: [
            {
              label: "Doanh thu Khách sạn",
              data: hotelRevenue,
              backgroundColor: "rgba(192, 75, 192, 0.6)",
              borderColor: "rgba(192, 75, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Doanh thu Tour",
              data: tourRevenue,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        };

        setChartData(formattedData);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]); // Gọi lại API khi selectedYear thay đổi

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
      x: { grid: { display: false } },
    },
  };

  return (
    <div
      className="bg-slate-100 "
      style={{ width: "100%", height: "450px", padding: "20px" }}
    >
      <h3>Doanh thu Tour và Khách sạn</h3>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Không có dữ liệu để hiển thị.</p>
      )}
    </div>
  );
};

export default RevenueDetailChart;
