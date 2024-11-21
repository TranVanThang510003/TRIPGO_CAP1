import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "../style.scss";
import { FiCheck } from "react-icons/fi";
import HeaderAI from "../headerai";

// Tùy chỉnh icon Marker
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32], // Tâm dưới cùng của marker
  popupAnchor: [0, -32], // Vị trí popup tương đối với marker
});

// Component để di chuyển bản đồ đến vị trí cụ thể
const MapFlyTo = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 15, { duration: 1.2 });
  }
  return null;
};

// Component FoodCard
const FoodCard = ({ option, isSelected, onClick, onMouseEnter }) => (
  <div
    className={`food-card ${isSelected ? "selected" : ""}`}
    onClick={() => onClick(option.id)}
    onMouseEnter={() => onMouseEnter(option.location)} // Bắt sự kiện di chuột
    style={{
      position: "relative",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      padding: "15px",
      borderRadius: "10px",
      width: "300px",
      cursor: "pointer",
    }}
  >
    <img
      src={option.image}
      alt={option.title}
      style={{
        width: "100%",
        height: "150px",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
    <h3>{option.title}</h3>
    <p>{option.description}</p>
    <span>{option.rating}</span>
    {isSelected && (
      <FiCheck
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "#35e0a1",
          fontSize: "1.5rem",
        }}
      />
    )}
  </div>
);

const RecommendationPage = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [hoveredLocation, setHoveredLocation] = useState(null); // Lưu tọa độ khi di chuột vào card

  const foodOptions = [
    {
      id: 1,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/cf/4e/4b/caption.jpg?w=800&h=-1&s=1",
      title: "Home Cooking Class",
      description: "Từ 700.000đ mỗi khách",
      rating: "4.5 (1K đánh giá)",
      location: [16.06778, 108.22083], // Tọa độ
    },
    {
      id: 2,
      image: "https://example.com/night-market.jpg",
      title: "Danang Night Market",
      description: "Chợ trời & đường phố",
      rating: "4.5 (2K đánh giá)",
      location: [16.06103, 108.22324],
    },
  ];

  const dinnerOptions = [
    {
      id: 3,
      image: "https://example.com/madame-lan.jpg",
      title: "Madame Lân",
      description: "Đồ ăn Việt Nam, Châu Á",
      rating: "4.5 (5K đánh giá)",
      location: [16.07378, 108.20956], // Tọa độ
    },
    {
      id: 4,
      image: "https://example.com/cardi-pizzeria.jpg",
      title: "Cardi Pizzeria",
      description: "Nhà hàng bít tết Mỹ",
      rating: "4.5 (5K đánh giá)",
      location: [16.07556, 108.20833],
    },
  ];

  const handleCardClick = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="recommendation-container"
      style={{ display: "flex", padding: "20px" }}
    >
      {/* Content Section */}
      <div
        className="content-section"
        style={{ flex: "2", paddingRight: "20px" }}
      >
        <HeaderAI />
        <section className="food-recommendations">
          <h2>Thưởng thức hương vị: Ẩm thực thú vị của chợ đêm Đà Nẵng</h2>
          <p>Tại Đà Nẵng, bạn có thể thưởng thức ẩm thực địa phương...</p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {foodOptions.map((option) => (
              <FoodCard
                key={option.id}
                option={option}
                isSelected={selectedCards.includes(option.id)}
                onClick={handleCardClick}
                onMouseEnter={setHoveredLocation} // Gọi khi di chuột
              />
            ))}
          </div>
        </section>

        <section className="dinner-options">
          <h2>Lựa chọn bữa tối cho bạn</h2>
          <p>
            Dưới đây là một số địa phương yêu thích mà bạn có thể chọn cho bữa
            tối.
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {dinnerOptions.map((option) => (
              <FoodCard
                key={option.id}
                option={option}
                isSelected={selectedCards.includes(option.id)}
                onClick={handleCardClick}
                onMouseEnter={setHoveredLocation} // Gọi khi di chuột
              />
            ))}
          </div>
        </section>
      </div>

      {/* Map Section */}
      <section
        className="map-section"
        style={{ flex: "1", paddingLeft: "20px" }}
      >
        <MapContainer
          center={[16.06778, 108.22083]}
          zoom={13}
          style={{ height: "500px", borderRadius: "10px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {foodOptions.concat(dinnerOptions).map((option) => (
            <Marker
              key={option.id}
              position={option.location}
              icon={markerIcon}
            >
              <Popup>{option.title}</Popup>
            </Marker>
          ))}
          {hoveredLocation && <MapFlyTo position={hoveredLocation} />}
        </MapContainer>
      </section>
    </div>
  );
};

export default RecommendationPage;
