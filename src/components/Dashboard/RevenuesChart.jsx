
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

// Registering components for Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const RevenuesChart = ({ data }) => {
  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Bookinh Tour",
        data: data || [
          500, 700, 800, 650, 900, 1100, 1200, 950, 1300, 1400, 1250, 1600,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        barThickness: 6, // Điều chỉnh độ dày của các cột
        maxBarThickness: 8, // Đặt giới hạn cho độ dày của cột
        barPercentage: 0.45, // Giảm giá trị để các cột gần nhau hơn
        categoryPercentage: 0.6, // Điều chỉnh để giảm khoảng cách giữa các nhóm cộts
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Ẩn label khỏi legend

        position: "top",
      },
    },
    animation: {
      duration: 200,
      easing: "easeOutQuad",
    },
  };

  return (
    <div className="chart-container" style={{ width: "100%" }}>
      <h3 className="chart-title" style={{}}>
        Khách hàng mới
      </h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenuesChart;
