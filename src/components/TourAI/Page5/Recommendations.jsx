import React, { useState, useEffect } from "react";
import mapboxgl from "@goongmaps/goong-js";
import "@goongmaps/goong-js/dist/goong-js.css";
import "../style.scss";
import { FiCheck } from "react-icons/fi";
import HeaderAI from "../headerai";
import { IoStar } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Tùy chỉnh icon Marker
const markerIconUrl = "https://cdn-icons-png.flaticon.com/512/252/252025.png";

const Card = ({ option, isSelected, onClick, onMouseEnter }) => (
  <div
    className={`food-card ${isSelected ? "selected" : ""}`}
    onClick={() => onClick(option.id)}
    onMouseEnter={() => {
      onMouseEnter(option.location);
    }}
    style={{
      position: "relative",
      borderRadius: "10px",
      width: "226px",
      height: "324px",
      cursor: "pointer",
    }}
  >
    <img
      src={option.image}
      alt={option.title}
      style={{
        width: "100%",
        height: "225px",
        objectFit: "cover",
        borderRadius: "10px",
      }}
    />
    <h4>{option.title}</h4>
    <p>{option.description}</p>
    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <IoStar style={{ color: "gold" }} /> {option.rating}
    </span>
    {isSelected && <FiCheck className="fi-check-icon" />}
  </div>
);

const RecommendationPage = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [map, setMap] = useState(null);
  const mapContainer = React.useRef(null);
  const location = useLocation();
  const { city, dates, dayDifference } = location.state || {};
  const [selectedCity] = useState(city || { name: "", imageUrl: "" });

  console.log("Selected Dates:", dates);

  const options = [
    {
      id: 1,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/cf/4e/4b/caption.jpg?w=800&h=-1&s=1",
      title: "Lớp học nấu ăn tại Đà Lạt",
      description: "Từ 500.000đ mỗi khách",
      rating: "4.8 (1.2K đánh giá)",
      location: [108.441934, 11.940419], // Gần trung tâm Đà Lạt
      category: "food",
    },
    {
      id: 2,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/cho-da-lat.jpg",
      title: "Chợ đêm Đà Lạt",
      description: "Chợ trời & ẩm thực đường phố",
      rating: "4.6 (3K đánh giá)",
      location: [108.440704, 11.940674], // Vị trí Chợ Đà Lạt
      category: "food",
    },
    {
      id: 3,
      image:
        "https://media.mia.vn/uploads/blog-du-lich/ho-tuyen-lam-da-lat-mia.vn-1.jpg",
      title: "Hồ Tuyền Lâm",
      description: "Thư giãn giữa thiên nhiên",
      rating: "4.7 (2K đánh giá)",
      location: [108.422998, 11.903115], // Hồ Tuyền Lâm
      category: "adventures",
    },
    {
      id: 4,
      image:
        "https://dulichdalat.pro/wp-content/uploads/2021/01/thien-vien-truc-lam-da-lat.png",
      title: "Thiền Viện Trúc Lâm",
      description: "Địa điểm tâm linh nổi tiếng",
      rating: "4.9 (1K đánh giá)",
      location: [108.424939, 11.901167], // Gần Hồ Tuyền Lâm
      category: "adventures",
    },
    {
      id: 5,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/nha-tho-con-ga-da-lat.jpg",
      title: "Nhà thờ Con Gà",
      description: "Công trình kiến trúc nổi bật",
      rating: "4.5 (1.5K đánh giá)",
      location: [108.439022, 11.947142], // Trung tâm Đà Lạt
      category: "wonders",
    },
    {
      id: 6,
      image:
        "https://dulich3mien.vn/wp-content/uploads/2022/06/dinh-bao-dai-3.jpg",
      title: "Dinh Bảo Đại",
      description: "Công trình lịch sử và nghệ thuật",
      rating: "4.5 (2.5K đánh giá)",
      location: [108.442231, 11.935861], // Gần Dinh III
      category: "wonders",
    },
    {
      id: 7,
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/234328244.jpg?k=cb5277af54aefb4068db2ff78f281cd6df3dfba62f48e4a4c417d2487ef343f8&o=&hp=1",
      title: "Terracotta Hotel & Resort",
      description: "Resort cao cấp gần Hồ Tuyền Lâm",
      rating: "4.8 (2.8K đánh giá)",
      location: [108.426217, 11.900484], // Gần Hồ Tuyền Lâm
      category: "places",
    },
    {
      id: 8,
      image:
        "https://cf.bstatic.com/xdata/images/hotel/max1280x900/234241004.jpg?k=263c903f3b55e7b291be3b9cda8896465c2db53c6eeb5a17c0738c9bb128c8b4&o=&hp=1",
      title: "Dalat Palace Heritage Hotel",
      description: "Khách sạn cao cấp ngay trung tâm",
      rating: "4.7 (3.2K đánh giá)",
      location: [108.436134, 11.944732], // Trung tâm Đà Lạt
      category: "places",
    },
  ];

  const categories = {
    food: {
      title: "Thưởng thức hương vị: Ẩm thực thú vị của chợ đêm Đà Nẵng",
      description: `Bắt tay vào một hành trình hương vị khó quên tại Chợ đêm Đà Nẵng
        sôi động, nơi bạn có thể thưởng thức một loạt các món ăn quốc tế đa dạng
        trong khi tận hưởng bầu không khí sôi động. Bổ sung trải nghiệm của bạn với
        một lớp học nấu ăn Việt Nam đích thực do một gia đình địa phương dẫn dắt,
        đi sâu vào các kỹ thuật nấu ăn truyền thống và thưởng thức những bữa ăn
        ngon mà bạn đã cùng nhau chế biến.`,
    },
    adventures: {
      title: "Cuộc phiêu lưu văn hóa giữa những ngọn núi hùng vĩ",
      description: `Khám phá Ngũ Hành Sơn quyến rũ và vẻ đẹp nên thơ của Núi Khỉ, nơi có
        quang cảnh tuyệt đẹp, nền văn hóa phong phú và những viên ngọc ẩn giấu
        đang chờ đón. Từ việc khám phá các khu bảo tồn Phật giáo cổ xưa đến các
        làng chài địa phương sôi động, cuộc phiêu lưu này kết hợp sự phấn khích
        ngoài trời với việc khám phá sâu vào di sản của khu vực, khiến đây trở
        thành chuyến đi không thể bỏ qua ở Đà Nẵng.`,
    },
    wonders: {
      title: "Hành trình nghệ thuật qua di sản văn hóa Đà Nẵng",
      description: `Khám phá bức tranh nghệ thuật và di sản phong phú tại các bảo tàng nổi tiếng của Đà Nẵng. Từ các tác phẩm điêu khắc Chăm cổ đại và đồ thủ công truyền thống đến trải nghiệm hình ảnh 3D hiện đại, mỗi địa điểm đều mang đến cái nhìn độc đáo về các biểu đạt nghệ thuật và lịch sử văn hóa đa dạng của Việt Nam. Tham gia các cuộc triển lãm tương tác và đắm mình vào di sản nghệ thuật của khu vực, khiến chuyến thăm của bạn vừa khai sáng vừa đáng nhớ.`,
    },
    places: {
      title: "Những nơi để ở",
      description: `Chúng tôi cũng đã đề xuất một số địa điểm lưu trú trong chuyến đi của bạn.`,
    },
  };

  console.log(selectedCity.name);

  console.log(selectedCity.coordinates);

  const navigate = useNavigate();
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const totalItems = options.length;

  useEffect(() => {
    if (mapContainer.current && !map) {
      const initializeMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "https://tiles.goong.io/assets/goong_map_web.json",
        center: selectedCity.name
          ? selectedCity.coordinates
          : [108.277199, 14.058324],
        zoom: 11,
        accessToken: "ITRT2CVavSVxCqbdGAFPnbrWIV2KPtrcjswBjy5O",
      });

      initializeMap.on("load", () => {
        setMap(initializeMap);

        // Add markers for all options
        options.forEach((option) => {
          new mapboxgl.Marker({ icon: markerIconUrl })
            .setLngLat(option.location)
            .setPopup(new mapboxgl.Popup().setText(option.title))
            .addTo(initializeMap);
        });
      });
    }

    return () => map && map.remove();
  }, [map]);

  const handleMouseEnter = (location) => {
    if (map) {
      map.flyTo({ center: location, zoom: 15, essential: true });
    }
  };

  const handleCardClick = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (isAllSelected) {
      setSelectedCards([]);
      setSelectedCount(0);
    } else {
      const allIds = options.map((option) => option.id);
      setSelectedCards(allIds);
      setSelectedCount(allIds.length);
    }
    setIsAllSelected(!isAllSelected);
  };

  // Define the handleNext function
  const handleNext = () => {
    if (selectedCards.length > 0) {
      navigate("/createtourai", { state: { city, dates, selectedCards } });
    } else {
      alert("Vui lòng chọn ít nhất một tùy chọn trước khi tiếp tục!");
    }
  };

  return (
    <div>
      <div className="recommendation-container" style={{ display: "flex" }}>
        <div
          className="content-section"
          style={{ flex: "2", padding: "0 0 0 80px" }}
        >
          <div style={{ margin: "40px 0" }}>
            <HeaderAI />
          </div>
          <h2>
            <p>
              <b>Xem lại các khuyến nghị của chúng tôi cho chuyến đi của bạn</b>
            </p>
          </h2>

          {/* Loop through categories */}
          {Object.entries(categories).map(
            ([category, { title, description }]) => (
              <section key={category} style={{ marginTop: "40px" }}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                  {options
                    .filter((option) => option.category === category)
                    .map((option) => (
                      <Card
                        key={option.id}
                        option={option}
                        isSelected={selectedCards.includes(option.id)}
                        onClick={handleCardClick}
                        onMouseEnter={handleMouseEnter}
                      />
                    ))}
                </div>
              </section>
            )
          )}
        </div>

        {/* Map Section */}
        <section className="map-section" style={{ flex: "1.25" }}>
          <div
            ref={mapContainer}
            style={{ height: "100%", width: "100%", borderRadius: "10px" }}
          />
        </section>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          bottom: "20px",
          padding: "10px 20px",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          backgroundColor: "#fff",
          zIndex: "1", // Ensures this section appears above other content when sticky
          width: "80%", // Full width
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label style={{ fontSize: "16px", fontWeight: "500" }}>
            Chọn tất cả
          </label>
          <div
            onClick={handleToggleAll}
            style={{
              width: "50px",
              height: "25px",
              borderRadius: "15px",
              backgroundColor: isAllSelected ? "#28a745" : "#ccc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "2px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "21px",
                height: "21px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                transform: isAllSelected ? "translateX(25px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
            ></div>
          </div>
          <span style={{ fontSize: "14px" }}>
            ({selectedCards.length}/{totalItems} đã chọn)
          </span>
        </div>
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            backgroundColor: "#023e73",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Kế tiếp
        </button>
      </div>
    </div>
  );
};

export default RecommendationPage;
