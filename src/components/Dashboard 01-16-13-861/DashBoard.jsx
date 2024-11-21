import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import StatsCard from "./StatsCard";
import YearlyChart from "./YearlyChart";
import RevenueChart from "./RevenueChart";
import "./style.scss";
import VisitCity from "./VisitCity";

const DashBoard = () => {
  const USD_TO_VND = 23000;

  const initialData = {
    Tour: [
      {
        id: 1,
        name: "Tour Hà Nội",
        category: "Tour",
        price: "$200",
        sold: 50,
        profit: "$400",
      },
      {
        id: 2,
        name: "Tour Đà Nẵng",
        category: "Tour",
        price: "$300",
        sold: 40,
        profit: "$600",
      },
      {
        id: 3,
        name: "Tour Sài Gòn",
        category: "Tour",
        price: "$150",
        sold: 30,
        profit: "$450",
      },
      {
        id: 4,
        name: "Tour Huế",
        category: "Tour",
        price: "$250",
        sold: 25,
        profit: "$375",
      },
      {
        id: 5,
        name: "Tour Phú Quốc",
        category: "Tour",
        price: "$400",
        sold: 20,
        profit: "$800",
      },
    ],
    "Khách Sạn": [
      {
        id: 6,
        name: "Khách sạn Hà Nội",
        category: "Khách Sạn",
        price: "$80",
        sold: 100,
        profit: "$800",
      },
      {
        id: 7,
        name: "Khách sạn Đà Nẵng",
        category: "Khách Sạn",
        price: "$100",
        sold: 70,
        profit: "$700",
      },
      {
        id: 8,
        name: "Khách sạn Huế",
        category: "Khách Sạn",
        price: "$90",
        sold: 50,
        profit: "$450",
      },
      {
        id: 9,
        name: "Khách sạn Nha Trang",
        category: "Khách Sạn",
        price: "$120",
        sold: 60,
        profit: "$720",
      },
      {
        id: 10,
        name: "Khách sạn Sài Gòn",
        category: "Khách Sạn",
        price: "$110",
        sold: 80,
        profit: "$880",
      },
    ],
    "Địa điểm vui chơi": [
      {
        id: 11,
        name: "Công viên Hà Nội",
        category: "Địa điểm vui chơi",
        price: "$50",
        sold: 200,
        profit: "$1000",
      },
      {
        id: 12,
        name: "Bãi biển Đà Nẵng",
        category: "Địa điểm vui chơi",
        price: "$30",
        sold: 150,
        profit: "$450",
      },
      {
        id: 13,
        name: "Thảo Cầm Viên",
        category: "Địa điểm vui chơi",
        price: "$20",
        sold: 180,
        profit: "$360",
      },
      {
        id: 14,
        name: "Phố cổ Hội An",
        category: "Địa điểm vui chơi",
        price: "$40",
        sold: 120,
        profit: "$480",
      },
      {
        id: 15,
        name: "Chợ Bến Thành",
        category: "Địa điểm vui chơi",
        price: "$25",
        sold: 100,
        profit: "$250",
      },
    ],
    "Nhà hàng": [
      {
        id: 16,
        name: "Nhà hàng Hà Nội",
        category: "Nhà hàng",
        price: "$70",
        sold: 90,
        profit: "$630",
      },
      {
        id: 17,
        name: "Nhà hàng Đà Nẵng",
        category: "Nhà hàng",
        price: "$75",
        sold: 80,
        profit: "$600",
      },
      {
        id: 18,
        name: "Nhà hàng Huế",
        category: "Nhà hàng",
        price: "$65",
        sold: 70,
        profit: "$455",
      },
      {
        id: 19,
        name: "Nhà hàng Sài Gòn",
        category: "Nhà hàng",
        price: "$85",
        sold: 60,
        profit: "$510",
      },
      {
        id: 20,
        name: "Nhà hàng Phú Quốc",
        category: "Nhà hàng",
        price: "$90",
        sold: 50,
        profit: "$450",
      },
    ],
  };

  const [category, setCategory] = useState("All");
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (category === "All") {
      const allItems = Object.values(initialData).flat();
      const topItems = allItems.sort((a, b) => b.sold - a.sold).slice(0, 5);
      setDisplayData(topItems);
    } else {
      setDisplayData(initialData[category]);
    }
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const convertToVND = (priceInUSD) => {
    const price = parseFloat(priceInUSD.replace("$", "").trim());
    return price * USD_TO_VND;
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard">
          <div className="stats-section">
            <StatsCard
              title="Khách du lịch mới"
              value="34567"
              change="+2.00%"
            />
            <StatsCard
              title="Tổng thu nhập của năm"
              value="74.567.000 VNĐ"
              change="+5.45%"
            />
            <StatsCard
              title="Tổng tour trong năm"
              value="123"
              change="-2.00%"
            />
          </div>
          <div className="charts-section">
            <YearlyChart />
            <RevenueChart />
          </div>
        </div>
        <div
          style={{
            padding: "10px",
            maxWidth: "100%",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <div className="table-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h2>Địa điểm phổ biến nhất</h2>
              <select
                value={category}
                onChange={handleCategoryChange}
                style={{
                  padding: "5px",
                  fontSize: "14px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="All">Tất cả</option>
                <option value="Tour">Tour</option>
                <option value="Khách Sạn">Khách Sạn</option>
                <option value="Địa điểm vui chơi">Địa điểm vui chơi</option>
                <option value="Nhà hàng">Nhà hàng</option>
              </select>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Tên dịch vụ</th>
                  <th>Loại</th>
                  <th>Giá (VND)</th>
                  <th>Đã bán</th>
                  <th>Lợi nhuận</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{convertToVND(item.price).toLocaleString()} VND</td>
                    <td>{item.sold}</td>
                    <td>{convertToVND(item.profit).toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <VisitCity />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
