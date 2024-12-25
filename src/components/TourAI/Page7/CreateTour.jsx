import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { FiUserPlus, FiShare2, FiSettings } from "react-icons/fi";
import { MdOutlinePlace } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import HeaderAI from "../headerai";
import { IoStar } from "react-icons/io5";
import MapComponent from "./MapComponent"; // Import MapComponent
import "../style.scss";

const CreateTour = () => {
  const [openDay, setOpenDay] = useState(null); // Lưu ngày đang mở
  const [hoveredLocation, setHoveredLocation] = useState(null); // Lưu vị trí đang hover
  const location = useLocation();
  const navigate = useNavigate();

  // City and options data
  const {
    city = { name: "Da Nang", imageUrl: "", coordinates: [108.2022, 16.0544] },
    dates = [],
    dayDifference = 5,
  } = location.state || {};

  const options = [
    // Ngày 1
    {
      id: 1,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/cf/4e/4b/caption.jpg?w=800&h=-1&s=1",
      title: "Lớp học nấu ăn tại Đà Lạt",
      description: "Từ 500.000đ mỗi khách",
      rating: "4.8 (1.2K đánh giá)",
      location: [108.441934, 11.940419],
    },
    {
      id: 2,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/cho-da-lat.jpg",
      title: "Chợ đêm Đà Lạt",
      description: "Chợ trời & ẩm thực đường phố",
      rating: "4.6 (3K đánh giá)",
      location: [108.440704, 11.940674],
    },
    {
      id: 3,
      image:
        "https://media.mia.vn/uploads/blog-du-lich/ho-tuyen-lam-da-lat-mia.vn-1.jpg",
      title: "Hồ Tuyền Lâm",
      description: "Thư giãn giữa thiên nhiên",
      rating: "4.7 (2K đánh giá)",
      location: [108.422998, 11.903115],
    },
    // Ngày 2
    {
      id: 4,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/5c/4e/8e/dalat-train-villa.jpg?w=800&h=-1&s=1",
      title: "Ga Đà Lạt",
      description: "Khám phá nhà ga cổ kính",
      rating: "4.5 (1.8K đánh giá)",
      location: [108.449487, 11.942402],
    },
    {
      id: 5,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/doi-chet-xanh-da-lat.jpg",
      title: "Đồi chè Cầu Đất",
      description: "Tham quan vườn chè xanh bát ngát",
      rating: "4.7 (1.5K đánh giá)",
      location: [108.531476, 11.789927],
    },
    {
      id: 6,
      image:
        "https://media.mia.vn/uploads/blog-du-lich/thung-lung-tinh-yeu.jpg",
      title: "Thung lũng tình yêu",
      description: "Kỳ quan lãng mạn tại Đà Lạt",
      rating: "4.6 (2K đánh giá)",
      location: [108.455357, 11.950883],
    },
    // Ngày 3
    {
      id: 7,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/59/8b/99/da-lat-market.jpg?w=800&h=-1&s=1",
      title: "Chợ Đà Lạt",
      description: "Thưởng thức ẩm thực địa phương",
      rating: "4.4 (2.5K đánh giá)",
      location: [108.437828, 11.946479],
    },
    {
      id: 8,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/06/vuon-hoa-thanh-pho.jpg",
      title: "Vườn hoa thành phố",
      description: "Điểm đến lý tưởng cho gia đình",
      rating: "4.7 (1.7K đánh giá)",
      location: [108.440617, 11.947116],
    },
    {
      id: 9,
      image: "https://media.mia.vn/uploads/blog-du-lich/cung-nu-hoang.jpg",
      title: "Dinh Bảo Đại",
      description: "Tham quan lịch sử thời vua Bảo Đại",
      rating: "4.3 (1.3K đánh giá)",
      location: [108.442564, 11.932089],
    },
    // Ngày 4
    {
      id: 10,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/ho-than-tho-da-lat.jpg",
      title: "Hồ Than Thở",
      description: "Ngắm cảnh hồ thiên nhiên",
      rating: "4.5 (1.6K đánh giá)",
      location: [108.466799, 11.934018],
    },
    {
      id: 11,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/59/8b/99/linh-phuoc-pagoda.jpg?w=800&h=-1&s=1",
      title: "Chùa Linh Phước",
      description: "Khám phá ngôi chùa đặc biệt",
      rating: "4.8 (2.1K đánh giá)",
      location: [108.523225, 11.921814],
    },
    {
      id: 12,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/thac-datanla.jpg",
      title: "Thác Datanla",
      description: "Thưởng ngoạn thác nước hùng vĩ",
      rating: "4.6 (2.2K đánh giá)",
      location: [108.421263, 11.880647],
    },
    // Ngày 5
    {
      id: 13,
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/59/8b/99/crazy-house.jpg?w=800&h=-1&s=1",
      title: "Crazy House",
      description: "Ngôi nhà kỳ dị ở Đà Lạt",
      rating: "4.7 (1.9K đánh giá)",
      location: [108.432761, 11.938512],
    },
    {
      id: 14,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/bao-tang-lam-dong.jpg",
      title: "Bảo tàng Lâm Đồng",
      description: "Tham quan bảo tàng văn hóa",
      rating: "4.4 (1.2K đánh giá)",
      location: [108.440032, 11.930582],
    },
    {
      id: 15,
      image:
        "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/06/thac-pongour.jpg",
      title: "Thác Pongour",
      description: "Kỳ quan thiên nhiên nổi bật",
      rating: "4.6 (1.8K đánh giá)",
      location: [108.394296, 11.698428],
    },
  ];
  const daysWithCards = [...Array(dayDifference)].map((_, i) => {
    const startIndex = i * 3;
    return {
      day: i + 1,
      cards: options.slice(startIndex, startIndex + 3),
    };
  });

  const handleToggleDay = (day) => {
    setOpenDay((prev) => (prev === day ? null : day)); // Toggle trạng thái mở ngày
  };

  const handleNext = () => {
    navigate("/", { state: { city, dates } });
  };

  const handleCardHover = (location) => {
    setHoveredLocation(location); // Cập nhật vị trí đang hover
  };

  return (
    <div>
      <div className="recommendation-container" style={{ display: "flex" }}>
        <div
          className="content-section"
          style={{
            flex: "2",
            padding: "0 0 0 80px",
          }}
        >
          <HeaderAI />
          <div>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "984px",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                margin: "auto",
              }}
            >
              <img
                src={city.imageUrl || "https://via.placeholder.com/800x300"}
                alt={city.name}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "20px", // Adjust top position
                  right: "20px", // Align to the right
                  display: "flex",
                  gap: "10px",
                  zIndex: "10", // Ensure buttons are above the image
                }}
              >
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "8px 16px",
                    borderRadius: "24px",
                    border: "none",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  <FiUserPlus /> Invite
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    cursor: "pointer",
                  }}
                >
                  <FiShare2 />
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    cursor: "pointer",
                  }}
                >
                  <FiSettings />
                </button>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  padding: "20px",
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                  color: "#fff",
                }}
              >
                <h2
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    margin: "0",
                    color: "#fff",
                  }}
                >
                  {city.name} cho {dayDifference} ngày
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "10px",
                    fontSize: "16px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <i className="material-icons">
                      <FaCalendarAlt />
                    </i>{" "}
                    23 Tháng 11 → 25 Tháng 11
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <i className="material-icons">
                      <MdOutlinePlace />
                    </i>{" "}
                    {city.name}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #ddd",
                padding: "10px 20px",
              }}
            ></div>
            <div className="edit-button">Edit</div>
            {daysWithCards.map(({ day, cards }) => (
              <div key={day} style={{ marginTop: "30px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    padding: "12px 20px",
                    background: "#ffffff",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    marginBottom: "12px",
                    color: "#333",
                  }}
                  onClick={() => handleToggleDay(day)}
                  onMouseOver={(e) => {
                    e.target.style.borderColor = "#ccc";
                    e.target.style.boxShadow =
                      "0px 6px 12px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.borderColor = "#e0e0e0";
                    e.target.style.boxShadow =
                      "0px 4px 10px rgba(0, 0, 0, 0.05)";
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#4CAF50",
                        borderRadius: "50%",
                      }}
                    ></span>
                    Ngày {day}
                  </span>
                  <div>
                    <IoMdArrowDropdown />
                  </div>
                </h3>
                {openDay === day && (
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                      paddingLeft: "50px", // Dịch card sang phải
                      width: "100%",
                    }}
                  >
                    {/* Thanh timeline */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "25px", // Căn chỉnh thanh timeline
                        width: "4px",
                        height: "100%",
                        backgroundColor: "#e0e0e0", // Màu trung tính cho timeline
                        borderRadius: "2px",
                      }}
                    ></div>

                    {cards.map((card) => (
                      <div
                        key={card.id}
                        onMouseEnter={() => handleCardHover(card.location)} // Xử lý hover
                        onMouseLeave={() => handleCardHover(null)} // Xóa hover khi rời chuột
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          padding: "20px",
                          backgroundColor: "#ffffff", // Màu nền trắng
                          border: "1px solid #ddd", // Đường viền nhẹ
                          borderRadius: "15px",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Đổ bóng nhẹ
                          transition: "transform 0.2s ease",
                        }}
                      >
                        {/* Chấm tròn trên thanh timeline */}
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "-31px", // Căn chỉnh chấm tròn trên timeline
                            width: "14px",
                            height: "14px",
                            backgroundColor: "#0BB783", // Màu xanh nổi bật
                            borderRadius: "50%",
                            border: "2px solid #ffffff", // Viền trắng để nổi bật hơn
                            transform: "translateY(-50%)",
                            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Hiệu ứng chiều sâu
                          }}
                        ></div>
                        <img
                          src={card.image}
                          alt={card.title}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid #ddd",
                          }}
                        />
                        <div style={{ flex: "1" }}>
                          <h4
                            style={{
                              fontSize: "18px",
                              fontWeight: "bold",
                              color: "#333",
                              margin: "0 0 5px 0",
                            }}
                          >
                            {card.title}
                          </h4>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "#666",
                              margin: "0 0 10px 0",
                            }}
                          >
                            {card.description}
                          </p>
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#0BB783", // Đồng bộ màu với chấm tròn
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                          >
                            <IoStar style={{ color: "gold" }} /> {card.rating}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            flex: "1.5",
            height: "100vh", // Đặt bản đồ luôn cố định chiều cao
            position: "sticky", // Giữ bản đồ cố định khi cuộn
            top: "0", // Gắn với phía trên màn hình
            borderRadius: "10px",
            marginLeft: "20px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MapComponent
            city={city}
            options={options}
            hoveredLocation={hoveredLocation} // Truyền vị trí đang hover
          />
        </div>
      </div>
      {/* Button Kế tiếp */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "sticky",
          bottom: "20px",
          padding: "10px 20px",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          backgroundColor: "#fff",
          zIndex: "1",
          width: "80%",
          margin: "0 auto",
        }}
      >
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

export default CreateTour;
