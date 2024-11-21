import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderAI from "../headerai";
import datatype from "../datatype";
import { FiCheck } from "react-icons/fi";
import databudget from "../databudget";
import "../style.scss";

const TypeTourAI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {};

  const [selectedCity] = useState(city || { name: "", imageUrl: "" });
  const [activeButton, setActiveButton] = useState(null);
  const [activeBudgetButton, setActiveBudgetButton] = useState(null); // State for budget buttons

  // Handle button selection for types
  const handleButtonClick = (id) => {
    setActiveButton((prevId) => (prevId === id ? null : id)); // Deselect if already selected
  };

  // Handle button selection for budget
  const handleBudgetButtonClick = (id) => {
    setActiveBudgetButton((prevId) => (prevId === id ? null : id)); // Deselect if already selected
  };

  // Navigate back to the previous page
  const handleBack = () => {
    navigate("/scheduleai");
  };

  // Define colors for budget buttons
  const budgetButtonColors = {
    "Tiết kiệm": "#FCF3EC", // Light color for savings
    "Vừa phải": "#F5FCEC", // Light yellow for moderate
    "Sang trọng": "#D8FAF6", // Light blue for luxury
  };

  // Handle continue button click
  const handleContinue = () => {
    if (activeButton && activeBudgetButton) {
      // Proceed to the next step, navigate to /hobbyai
      console.log("Both buttons selected: Type and Budget");
      navigate("/hobbyai", { state: { city: selectedCity } }); // Navigate to the hobbyai page
    } else {
      alert("Vui lòng chọn cả loại chuyến đi và ngân sách!");
    }
  };

  return (
    <div className="container">
      <HeaderAI />
      <div className="header" style={{ textAlign: "center" }}>
        <h1>Bạn đang lên kế hoạch cho loại chuyến đi nào?</h1>
        <p>Chọn một.</p>
      </div>
      <div className="main-options">
        {datatype.map((item) => (
          <div className="product_item" key={item.id}>
            <button
              className="continue-button"
              style={{
                display: "flex",
                gap: "10px",
                backgroundColor: activeButton === item.id ? "#35e0a1" : "",
                padding: "30px 40px",
                cursor: "pointer",
                minWidth: "180px",
                borderRadius: "20px",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transform:
                  activeButton === item.id ? "scale(1.05)" : "scale(1)", // Scale up if active
                transition: "background-color 0.3s ease, transform 0.3s ease",
              }}
              onClick={() => handleButtonClick(item.id)}
            >
              {item.icon}
              {item.name}
              {activeButton === item.id && (
                <FiCheck style={{ marginLeft: "auto" }} />
              )}
            </button>
          </div>
        ))}
      </div>

      <h2>Ngân sách dự kiến</h2>

      <div className="main-options">
        {databudget.map((item) => (
          <div className="product_item" key={item.id}>
            <button
              className="continue-button"
              style={{
                display: "flex",
                flexDirection: "column", // Stack title and description vertically
                alignItems: "center", // Center items horizontally
                padding: "40px 50px",
                cursor: "pointer",
                minWidth: "180px",
                borderRadius: "20px",
                backgroundColor: budgetButtonColors[item.name] || "#fff", // Set unique background color
                color: "#000", // Set text color
                border:
                  activeBudgetButton === item.id ? "1px solid #000" : "none", // Add border if active
                transform:
                  activeBudgetButton === item.id ? "scale(1.05)" : "scale(1)", // Scale up if active
                transition:
                  "background-color 0.3s ease, transform 0.3s ease, border 0.3s ease",
              }}
              onClick={() => handleBudgetButtonClick(item.id)} // Handle budget button click
            >
              <span style={{ textAlign: "center", fontWeight: "bold" }}>
                {item.name} {/* Title text */}
              </span>
              <span style={{ textAlign: "center", marginTop: "5px" }}>
                {item.des} {/* Description text */}
              </span>
            </button>
          </div>
        ))}
      </div>

      <div
        className="btn_navigate"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <p
          style={{ cursor: "pointer", marginRight: "auto" }}
          onClick={handleBack}
        >
          <u>Trở về</u>
        </p>

        <button
          className="continue-button btn"
          onClick={handleContinue}
          style={{
            backgroundColor:
              activeButton && activeBudgetButton ? "#023e73" : "#ccc", // Disable background if not both selected
            cursor:
              activeButton && activeBudgetButton ? "pointer" : "not-allowed", // Change cursor based on selection
            color: activeButton && activeBudgetButton ? "#fff" : "#666", // Change text color based on selection
          }}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default TypeTourAI;
