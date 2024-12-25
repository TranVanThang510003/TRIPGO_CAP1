import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import { FiCheck } from "react-icons/fi";
import "../style.scss";
import datamonth from "../datamoth";
import HeaderAI from "../headerai";

const ScheduleAIExpand = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { city } = location.state || {};

  const [selectedCity] = useState(city || { name: "", imageUrl: "" });
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (id) => {
    setActiveButton(id);
  };

  const handleNavigateToSchedule = () => {
    navigate("/scheduleai", { state: { city: selectedCity } }); // Pass the selected city as state
  };

  const handleBack = () => {
    navigate("/tourai"); // Navigate back to the TourAI page
  };

  let [count, setCount] = useState(0);

  function incrementCount() {
    if (count < 7) {
      // Check if count is less than 7
      setCount(count + 1); // Increment count
    } else {
      alert("Số ngày không được vượt quá 7!"); // Optional: Alert for exceeding limit
    }
  }

  function decrementCount() {
    if (count > 0) {
      // Prevent count from going below 0
      setCount(count - 1); // Decrease count only if greater than zero
    }
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HeaderAI /> {/* Render the HeaderAI component */}
      <div
        className="header"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <h1>Khi nào bạn đi?</h1>
        <p>Chọn tháng và thời gian chuyến đi.</p>
      </div>
      {/* Flex container for month buttons */}
      <div
        className="main-options"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          // maxWidth: "80%",
        }}
      >
        {datamonth.map((item) => (
          <div
            className="product_item"
            key={item.id}
            style={{
              flex: "0 0 21%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="continue-button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "85%", // Full width for each button
                padding: "10px",
                border: "1px solid #000",
                backgroundColor: activeButton === item.id ? "#35e0a1" : "",
                color: activeButton === item.id ? "#000" : "#000",
                borderRadius: "999px", // Rounded button shape
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => handleButtonClick(item.id)}
            >
              {activeButton === item.id && (
                <FiCheck style={{ marginRight: "8px" }} />
              )}
              {item.name}
            </button>
          </div>
        ))}
      </div>
      <div className="quality">
        <p>Bao nhiêu ngày?</p>
        <div className="btn_icredes">
          <button onClick={decrementCount}>-</button>
          <div className="count-display">{count}</div>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
      <p
        style={{ textAlign: "center", cursor: "pointer", marginTop: "50px" }} // Change cursor to pointer
        onClick={handleNavigateToSchedule} // Add onClick handler
      >
        <u>Nhập ngày chính xác</u>
      </p>
      <div
        className="btn_navigate"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "40px",
          width: "100%",
        }}
      >
        <p
          style={{ cursor: "pointer" }} // Change cursor to pointer
          onClick={handleBack} // Call handleBack on click
        >
          <u>Trở về</u>
        </p>
        <button className="continue-button btn">Tiếp tục</button>
      </div>
    </div>
  );
};

export default ScheduleAIExpand;
