import { useState } from "react";
import EvaluateCard from "./EvaluateCard";
import Pagination from "../common/Pagination";

const dataRestaurantDetailes = [
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "11 Oct",
    imageUrlAcc:
      "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
    verification: "verified",
    rating: 1,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "15 Oct",
    imageUrlAcc:
      "https://kenh14cdn.com/203336854389633024/2024/2/27/4286295549671828914307716571424009725047858n-17090418136991839694724.jpeg",
    verification: "verified",
    rating: 4,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "22 Oct",
    imageUrlAcc:
      "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
    verification: "No verification",
    rating: 2,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "11 Oct",
    imageUrlAcc:
      "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
    verification: "verified",
    rating: 1,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "15 Oct",
    imageUrlAcc:
      "https://kenh14cdn.com/203336854389633024/2024/2/27/4286295549671828914307716571424009725047858n-17090418136991839694724.jpeg",
    verification: "verified",
    rating: 4,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "22 Oct",
    imageUrlAcc:
      "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
    verification: "No verification",
    rating: 2,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "11 Oct",
    imageUrlAcc:
      "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
    verification: "verified",
    rating: 1,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "15 Oct",
    imageUrlAcc:
      "https://kenh14cdn.com/203336854389633024/2024/2/27/4286295549671828914307716571424009725047858n-17090418136991839694724.jpeg",
    verification: "verified",
    rating: 4,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
  {
    name: "Tour Đà Nẵng - Hội An",
    day: "22 Oct",
    imageUrlAcc:
      "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
    verification: "No verification",
    rating: 2,
    content:
      "Tôi đã chọn thực đơn năm món và rất thích bữa tối ~ món khai vị với sò điệp rất ngon, và món chính với cá chẽm và wagyu Nhật Bản với sự kết hợp và nước sốt tuyệt vời, nó thực sự xứng đáng được nhận một sao Michelin, rất khuyến khích du khách ghé qua",
  },
];

const EVALUETE_PER_PAGE = 6;
const EvaluateList = () => {
  // Trạng thái quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán số trang
  const totalPages = Math.ceil(
    dataRestaurantDetailes.length / EVALUETE_PER_PAGE
  );

  // Lấy danh sách khách sạn cho trang hiện tại
  const currentEvaluate = dataRestaurantDetailes.slice(
    (currentPage - 1) * EVALUETE_PER_PAGE,
    currentPage * EVALUETE_PER_PAGE
  );

  //   Hàm xử lý khi người dùng chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div>
      {currentEvaluate.map((evaluate, index) => (
        <EvaluateCard key={index} evaluate={evaluate} />
      ))}
      <div className="mt-11">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EvaluateList;
