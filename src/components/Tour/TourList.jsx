import { useEffect, useState } from "react";
import TourCard from "./TourCard";
import Pagination from "../common/Pagination";
// const dataTour = [
//   {
//     status: "Relex  ",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "3",
//     imageUrl:
//       "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
//     location: "Khởi hành từ Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "950.000đ",
//   },
//   {
//     status: "s",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "1",
//     imageUrl:
//       "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/03/du-lich-hoi-an-1-1542.jpg",
//     location: " Đà Nẵng",
//     rating: 4.5,
//     reviews: "7K đánh giá",
//     nub_booking: "5k+",
//     price: "110.000đ",
//   },
//   {
//     status: "Relex  ",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "2",
//     imageUrl:
//       "https://vidoco.vn/uploads/news/2019_04/1kinh-doanh-nha-hang_1.jpg",
//     location: "Khởi hành từ Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "950.000đ",
//   },
//   {
//     status: "Relex  ",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "3",
//     imageUrl:
//       "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
//     location: "Khởi hành từ Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "950.000đ",
//   },
//   {
//     status: "s",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "1",
//     imageUrl:
//       "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/03/du-lich-hoi-an-1-1542.jpg",
//     location: " Đà Nẵng",
//     rating: 4.5,
//     reviews: "7K đánh giá",
//     nub_booking: "5k+",
//     price: "110.000đ",
//   },
//   {
//     status: "Relex  ",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "2",
//     imageUrl:
//       "https://vidoco.vn/uploads/news/2019_04/1kinh-doanh-nha-hang_1.jpg",
//     location: "Khởi hành từ Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "950.000đ",
//   },
//   {
//     status: "Relex  ",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "3",
//     imageUrl:
//       "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
//     location: "Khởi hành từ Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "950.000đ",
//   },
//   {
//     status: "s",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "1",
//     imageUrl:
//       "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/03/du-lich-hoi-an-1-1542.jpg",
//     location: " Đà Nẵng",
//     rating: 4.5,
//     reviews: "7K đánh giá",
//     nub_booking: "5k+",
//     price: "110.000đ",
//   },
//   {
//     status: "Relex  ",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "2",
//     imageUrl:
//       "https://vidoco.vn/uploads/news/2019_04/1kinh-doanh-nha-hang_1.jpg",
//     location: "Khởi hành từ Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "950.000đ",
//   },
//   {
//     status: "Relex  ",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "3",
//     imageUrl:
//       "https://sakos.vn/wp-content/uploads/2023/04/song-hoai-5f928a50141ac-1.jpeg",
//     location: "Khởi hành từ Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "950.000đ",
//   },
//   {
//     status: "s",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "1",
//     imageUrl:
//       "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/06/03/du-lich-hoi-an-1-1542.jpg",
//     location: " Đà Nẵng",
//     rating: 4.5,
//     reviews: "7K đánh giá",
//     nub_booking: "5k+",
//     price: "110.000đ",
//   },
//   {
//     status: "Relex  ",
//     name: "Tour Đà Nẵng - Hội An",
//     nub_day: "2",
//     imageUrl:
//       "https://vidoco.vn/uploads/news/2019_04/1kinh-doanh-nha-hang_1.jpg",
//     location: "Khởi hành từ Đà Nẵng",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "950.000đ",
//   },
// ];
const TOUR_PER_PAGE = 9;
const TourList = () => {
  // Trạng thái quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  //Goi API
  const [dataTour, setDataTour] = useState();
  useEffect(() => {
    try {
      const fetchTour = async () => {
        const response = await fetch("http://localhost:8000/tours");
        const result = await response.json();
        console.log({ result });
        setDataTour(result);
      };
      fetchTour();
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  // Tính toán số trang
  const totalPages = Math.ceil(dataTour?.length / TOUR_PER_PAGE);

  // Lấy danh sách khách sạn cho trang hiện tại
  const currentTour = (dataTour || []).slice(
    (currentPage - 1) * TOUR_PER_PAGE,
    currentPage * TOUR_PER_PAGE
  );

  //   Hàm xử lý khi người dùng chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="flex flex-wrap justify-between w-full">
      {currentTour.map((tour, index) => (
        <TourCard key={index} tour={tour} />
      ))}

      <div className="flex ml-[350px]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TourList;
