import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary elements for Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const YearlyChart = ({ data }) => {
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
        label: "VNĐ",
        data: data || [
          500, 700, 800, 650, 900, 1100, 1200, 950, 1300, 1400, 1250, 1600,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        // borderWidth: 3, // Slightly thicker line for emphasis
        // pointRadius: 5, // Larger points for visibility
        tension: 0.4, // Smooth the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to adapt to container's size
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#000",
          font: { size: 14 }, // Slightly smaller font for compact layout
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "#000",
          font: { size: 14 }, // Matching font size for x-axis
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hides legend for cleaner look
      },
    },
    animation: {
      duration: 500,
      easing: "easeOutQuad",
    },
  };

  return (
    <div
      className="chart-container yearly-chart"
      style={{ width: "100%", padding: "20px 20px 50px 20px" }}
    >
      <h3 className="chart-title" style={{ marginBottom: "5px" }}>
        Thu nhập trong năm
      </h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default YearlyChart;
