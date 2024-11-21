import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style.scss";
import HeaderAI from "../headerai";
import { FiCheck } from "react-icons/fi";

const FoodType = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {};
  const dishes = [
    {
      image:
        "https://cdn.pastaxi-manager.onepas.vn/content/uploads/articles/01-Phuong-Mon%20ngon&congthuc/1.%20pho%20ha%20noi/canh-nau-pho-ha-noi-xua-mang-huong-vi-kinh-do-cua-80-nam-ve-truoc-1.jpg",
      title: "Phở Hà Nội",
      description:
        "Thưởng thức cùng bánh phở mềm, thịt bò hoặc gà, và rau thơm tươi ngon.",
    },
    {
      image:
        "https://nhuminhplazahotel.com/wp-content/uploads/2023/06/bun-bo-hue-da-nang-2.jpg",
      title: "Bún bò Huế",
      description:
        "Cay đậm đà, nổi tiếng với nước dùng nấu từ mắm ruốc, sả và thịt bò.",
    },
    {
      image:
        "https://static.vinwonders.com/production/com-tam-sai-gon-thumb.jpg",
      title: "Cơm tấm Sài Gòn",
      description:
        "Nóng hổi với sườn nướng thơm phức, ăn kèm trứng ốp la, bì, và dưa chua.",
    },
    {
      image:
        "https://drt.danang.vn/content/images/2024/07/quan-cao-lau-ngon-o-hoi-an-1.jpg",
      title: "Cao lầu Hội An",
      description:
        "Sợi mì dai mềm, thịt xá xíu và nước dùng đặc biệt. Dùng cùng rau sống và tóp mỡ giòn tan.",
    },
    {
      image:
        "https://i-giadinh.vnecdn.net/2023/09/19/Buoc-10-Thanh-pham-1-1-5225-1695107554.jpg",
      title: "Bánh xèo miền Tây",
      description:
        "Vàng giòn với nhân tôm, thịt và giá, ăn kèm rau sống và nước chấm pha chua ngọt.",
    },
  ];

  const [preferences, setPreferences] = useState({
    anMan: false,
    anChay: false,
    anKieng: false,
    foodNotes: "",
  });

  const [activeButton, setActiveButton] = useState(null);

  const type = [
    { id: "1", name: "Ăn mặn" },
    { id: "2", name: "Ăn chay" },
    { id: "3", name: "Ăn kiêng" },
  ];

  const handleButtonClick = (id, name) => {
    setActiveButton((prevId) => (prevId === id ? null : id));
    setPreferences((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleNotesChange = (e) => {
    setPreferences((prev) => ({ ...prev, foodNotes: e.target.value }));
  };

  const handleBack = () => {
    navigate("/hobbyai");
  };

  const handleContinue = () => {
    console.log("Proceeding with preferences:", preferences);
  };

  // Enable the "Continue" button if any diet type is selected OR if there's text in the textarea
  const isContinueEnabled =
    preferences.anMan ||
    preferences.anChay ||
    preferences.anKieng ||
    preferences.foodNotes.trim().length > 0;

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <HeaderAI />
      <div className="header">
        <h1>Bạn quan tâm đến điều gì về chế độ ăn uống</h1>
        <p>Chọn tất cả những gì phù hợp.</p>
      </div>
      <div className="main-options" style={{ marginBottom: "20px" }}>
        {type.map((item) => (
          <div
            className="product_item"
            key={item.id}
            style={{ marginBottom: "10px" }}
          >
            <button
              className="continue-button"
              style={{
                backgroundColor:
                  activeButton === item.id ? "#35e0a1" : "#f0f0f0",
                color: activeButton === item.id ? "#fff" : "#333",
                cursor: "pointer",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px 20px",
                transition: "background-color 0.3s ease, color 0.3s ease",
                border:
                  activeButton === item.id
                    ? "2px solid #35e0a1"
                    : "2px solid #ddd",
              }}
              onClick={() =>
                handleButtonClick(item.id, item.name.toLowerCase())
              }
            >
              {item.name}
              {activeButton === item.id && (
                <FiCheck
                  style={{
                    marginLeft: "10px",
                    fontSize: "1.5rem",
                  }}
                />
              )}
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          alignItems: "center",
        }}
      >
        <p>Dị ứng thực phẩm:</p>
        <textarea
          placeholder="Ví dụ: Tùy chọn thực đơn không chứa gluten, sữa, hoặc hải sản"
          value={preferences.foodNotes}
          onChange={handleNotesChange}
          style={{
            width: "30%",
            height: "100px",
            padding: "10px",
            marginTop: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <h2>Thưởng thức đặc sản địa phương</h2>

      <div className="gallery-container">
        <div className="first-row">
          {dishes.slice(0, 3).map((dish, index) => (
            <div className="food-card" key={index}>
              <img src={dish.image} alt={dish.title} />
              <h3>{dish.title}</h3>
              <p>{dish.description}</p>
            </div>
          ))}
        </div>

        <div className="second-row">
          {dishes.slice(3).map((dish, index) => (
            <div className="food-card" key={index + 3}>
              <img src={dish.image} alt={dish.title} />
              <h3>{dish.title}</h3>
              <p>{dish.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="btn_navigate"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
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
            backgroundColor: isContinueEnabled ? "#023e73" : "#ccc",
            cursor: isContinueEnabled ? "pointer" : "not-allowed",
            color: isContinueEnabled ? "#fff" : "#666",
            padding: "10px 20px",
            border: "none",
            borderRadius: "999px",
            fontSize: "16px",
          }}
          disabled={!isContinueEnabled}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default FoodType;
