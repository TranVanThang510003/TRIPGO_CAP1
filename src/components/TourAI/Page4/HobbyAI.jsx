import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderAI from "../headerai";
import { FiCheck } from "react-icons/fi";
import dataactivities from "../dataactivities";
import "../style.scss";

const HobbyAI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {}; // Get city from location state

  const [activeButtons, setActiveButtons] = useState([]); // Allow multiple selections
  const [showModal, setShowModal] = useState(false);
  const [additionalInterest, setAdditionalInterest] = useState("");
  const [customInterests, setCustomInterests] = useState([]); // To store custom interests
  const maxCharCount = 50;
  const maxCustomInterests = 4; // Maximum custom interests allowed

  const handleButtonClick = (id) => {
    // Toggle the selected state of each button
    if (activeButtons.includes(id)) {
      setActiveButtons(activeButtons.filter((btn) => btn !== id));
    } else {
      setActiveButtons([...activeButtons, id]);
    }
  };

  const handleBack = () => {
    navigate("/typetourai");
  };

  const handleContinue = () => {
    if (activeButtons.length > 0) {
      console.log("Selected activity IDs:", activeButtons);
      navigate("/nextStep");
    } else {
      alert("Vui lòng chọn ít nhất một hoạt động trước khi tiếp tục!");
    }
  };

  const handleAddInterest = () => {
    if (additionalInterest) {
      // Split the input by commas and trim spaces around each interest
      const newInterests = additionalInterest
        .split(",")
        .map((interest) => interest.trim())
        .filter((interest) => interest !== ""); // Remove any empty strings

      // Check if adding these interests exceeds the limit
      if (customInterests.length + newInterests.length > maxCustomInterests) {
        alert(
          `Bạn chỉ có thể thêm tối đa ${maxCustomInterests} sở thích khác!`
        );
        return;
      }

      // Add the new interests to the customInterests array and activate them
      setCustomInterests([...customInterests, ...newInterests]);
      setActiveButtons([...activeButtons, ...newInterests]); // Automatically select the new interests
      setShowModal(false);
      setAdditionalInterest("");
    } else {
      alert("Vui lòng nhập ít nhất một sở thích.");
    }
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <HeaderAI />
      <div className="header" style={{ textAlign: "center" }}>
        <h1>Bạn đang lên kế hoạch cho loại chuyến đi nào?</h1>
        <p>Chọn tất cả những gì phù hợp.</p>
      </div>

      <div
        className="main-options"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          margin: "0 auto",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          width: "70%",
        }}
      >
        {dataactivities.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              border: "1px solid #ccc",
              borderRadius: "999px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              backgroundColor: activeButtons.includes(item.id)
                ? "#35e0a1"
                : "#fff",
              color: activeButtons.includes(item.id) ? "#fff" : "#000",
              border: activeButtons.includes(item.id)
                ? "1px solid #000"
                : "1px solid #ccc",
            }}
            onClick={() => handleButtonClick(item.id)}
          >
            {activeButtons.includes(item.id) && (
              <FiCheck style={{ marginRight: "8px" }} />
            )}
            {item.name}
          </div>
        ))}

        {/* Render custom interests as buttons */}
        {customInterests.map((interest, index) => (
          <div
            key={`custom-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              border: "1px solid #ccc",
              borderRadius: "999px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              backgroundColor: activeButtons.includes(interest)
                ? "#35e0a1"
                : "#fff",
              color: activeButtons.includes(interest) ? "#fff" : "#000",
              border: activeButtons.includes(interest)
                ? "1px solid #000"
                : "1px solid #ccc",
            }}
            onClick={() => handleButtonClick(interest)}
          >
            {activeButtons.includes(interest) && (
              <FiCheck style={{ marginRight: "8px" }} />
            )}
            {interest}
          </div>
        ))}

        {/* Button to open the modal */}
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px",
            border: "1px solid #ccc",
            borderRadius: "999px",
            fontSize: "16px",
            cursor:
              customInterests.length < maxCustomInterests
                ? "pointer"
                : "not-allowed",
            display: "flex",
            alignItems: "center",
            backgroundColor:
              customInterests.length < maxCustomInterests ? "#fff" : "#ccc",
            color: "#000",
          }}
          disabled={customInterests.length >= maxCustomInterests}
        >
          + Thêm sở thích khác
        </button>
      </div>

      <div
        className="btn_navigate"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
          width: "100%",
        }}
      >
        <p
          style={{
            cursor: "pointer",
            marginRight: "auto",
            color: "#023e73",
            textDecoration: "underline",
          }}
          onClick={handleBack}
        >
          Trở về
        </p>

        <button
          className="continue-button btn"
          onClick={handleContinue}
          style={{
            backgroundColor: activeButtons.length > 0 ? "#023e73" : "#ccc",
            cursor: activeButtons.length > 0 ? "pointer" : "not-allowed",
            color: activeButtons.length > 0 ? "#fff" : "#666",
            padding: "10px 20px",
            border: "none",
            borderRadius: "999px",
            fontSize: "16px",
          }}
          disabled={activeButtons.length === 0}
        >
          Tiếp tục
        </button>
      </div>

      {/* Modal for adding additional interests */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "500px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "18px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ×
            </button>
            <p style={{ fontSize: "20px", marginBottom: "10px" }}>
              <b>Thêm sở thích khác</b>
            </p>
            <input
              type="text"
              value={additionalInterest}
              onChange={(e) => {
                if (e.target.value.length <= maxCharCount) {
                  setAdditionalInterest(e.target.value);
                }
              }}
              placeholder="Nhập sở thích khác"
              style={{
                width: "100%",
                height: "65px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #000",
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "16px",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ fontSize: "12px", color: "#666" }}>
                Phân cách mỗi mục bằng dấu phẩy
              </p>
              <p style={{ fontSize: "12px", color: "#666" }}>
                {additionalInterest.length}/{maxCharCount} Kí tự tối đa
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <button
                onClick={handleAddInterest}
                style={{
                  marginTop: "20px",
                  padding: "10px 30px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HobbyAI;
