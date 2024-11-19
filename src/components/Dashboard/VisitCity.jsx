import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./style.scss";

// Đăng ký các thành phần cho biểu đồ
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VisitCity = () => {
  // Dữ liệu các thành phố
  const cityData = [
    { city: "Hà Nội", visitors: 50000 },
    { city: "Hồ Chí Minh", visitors: 48000 },
    { city: "Đà Nẵng", visitors: 35000 },
    { city: "Hạ Long", visitors: 30000 },
    { city: "Đà Lạt", visitors: 28000 },
    { city: "Phú Quốc", visitors: 27000 },
    { city: "Nha Trang", visitors: 26000 },
    { city: "Huế", visitors: 25000 },
    { city: "Hội An", visitors: 23000 },
    { city: "Cần Thơ", visitors: 22000 },
    { city: "Vũng Tàu", visitors: 15000 },
    { city: "Quảng Ninh", visitors: 12000 },
  ];

  // State để lưu loại hiển thị: "most" (nhiều nhất) hoặc "least" (ít nhất)
  const [viewMode, setViewMode] = useState("most");

  // Lọc dữ liệu dựa trên chế độ hiển thị
  const filteredData =
    viewMode === "most"
      ? cityData.sort((a, b) => b.visitors - a.visitors).slice(0, 10) // Top 10 nhiều nhất
      : cityData.sort((a, b) => a.visitors - b.visitors).slice(0, 10); // Top 10 ít nhất

  const chartData = {
    labels: filteredData.map((city) => city.city), // Tên các thành phố
    datasets: [
      {
        label: "Số lượt khách",
        data: filteredData.map((city) => city.visitors), // Số lượt khách của từng thành phố
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 10,
        maxBarThickness: 12,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Biểu đồ ngang
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 10, // Kích thước chữ trên trục Ox
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12, // Kích thước font của tên thành phố
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Ẩn phần chú thích
      },
    },
  };

  const handleChangeViewMode = (e) => {
    setViewMode(e.target.value); // Cập nhật chế độ hiển thị
  };

  return (
    <div
      className="chart-container"
      style={{
        width: "100%",
        height: "300px",
        backgroundColor: "#fff",
        padding: "10px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{}}>
          {viewMode === "most"
            ? "Top Thành phố được tham quan nhiều nhất"
            : "Top Thành phố ít được tham quan nhất"}
        </h3>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <select
            value={viewMode}
            onChange={handleChangeViewMode}
            style={{
              padding: "5px",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="most">Top 10 nhiều nhất</option>
            <option value="least">Top 10 ít nhất</option>
          </select>
        </div>
      </div>
      <Bar
        style={{ position: "relative", top: "-12px" }}
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default VisitCity;
