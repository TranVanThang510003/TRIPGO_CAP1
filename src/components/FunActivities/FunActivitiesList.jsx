import { useEffect, useState } from "react";
import FunActivitiesCard from "./FunActivitiesCard";
import Pagination from "../common/Pagination";
// const activitiesData = [
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
//   {
//     name: "BaNa Hill",
//     imageUrl:
//       "https://cdn3.ivivu.com/2024/04/sun-world-ba-na-hills-ivivu45.jpg",
//     best_seller: "Bán chạy",
//     confirm: "Xác thực tức thời",
//     rating: 4.5,
//     reviews: "5K đánh giá",
//     nub_booking: "5k+",
//     price: "330.000đ",
//   },
// ];
const ACTIVITIES_PER_PAGE = 9;
const FunActivitiesList = () => {
  // Goi API
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFunActivities, setDataFunActivities] = useState();
  useEffect(() => {
    try {
      const fetchTour = async () => {
        const response = await fetch("http://localhost:8000/funactivities");
        const result = await response.json();
        console.log({ result });
        setDataFunActivities(result);
      };
      fetchTour();
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  // Tính toán số trang
  const totalPages = Math.ceil(dataFunActivities?.length / ACTIVITIES_PER_PAGE);

  // Lấy danh sách khách sạn cho trang hiện tại
  const currentFunActivities = (dataFunActivities || []).slice(
    (currentPage - 1) * ACTIVITIES_PER_PAGE,
    currentPage * ACTIVITIES_PER_PAGE
  );

  //   Hàm xử lý khi người dùng chuyển trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-wrap justify-between">
      {currentFunActivities.map((activity, index) => (
        <FunActivitiesCard key={index} activity={activity} />
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

export default FunActivitiesList;
