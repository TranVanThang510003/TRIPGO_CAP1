import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartRevenue = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/db");
        const result = await response.json();

        console.log("API Response:", result); 
        // Kiểm tra nếu result là mảng và có phần tử đầu tiên
        if (Array.isArray(result) && result.length > 0) {
          const { labels, revenue } = result[0]; // Lấy phần tử đầu tiên

          if (!labels || !revenue || !revenue.Tour) {
            throw new Error("API response is missing required data.");
          }

          // Cập nhật dữ liệu biểu đồ
          setData({
            labels,
            datasets: [
              {
                label: "Tour",
                data: revenue.Tour,
                backgroundColor: "#3b82f6", // Màu xanh
              },
              {
                label: "Khách sạn",
                data: revenue["Khách sạn"],
                backgroundColor: "#10b981", // Màu xanh lá
              },
              {
                label: "Hoạt động vui chơi",
                data: revenue["Hoạt động vui chơi"],
                backgroundColor: "#f97316", // Màu cam
              },
            ],
          });
          setLoading(false);
        } else {
          throw new Error("API response is not in the expected format.");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 32, // Chiều rộng của hộp màu
          boxHeight: 18, // Chiều cao của hộp màu
          font: {
            size: 16, // Kích thước chữ
          },
          padding: 20, // Khoảng cách giữa các mục chú thích
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) =>
            value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ",
        },
      },
    },
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6  rounded-lg shadow-lg h-[400px] w-[900px]">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4  ">
        Doanh thu từng quỹ (VNĐ)
      </h2>
      <div className="w-3/4">
        {" "}
        {/* Reduced the width */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default ChartRevenue;
