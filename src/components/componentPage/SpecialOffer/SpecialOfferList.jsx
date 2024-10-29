import { useState } from "react";
import SpecialOfferCard from "./SpecialOfferCard";
const specialOfferData = [
  {
    status: "Flex",
    days: 3,
    name: "Vĩnh Hạ Long",
    location: "Quảng Ninh",
    ratings: 4.5,
    reviews: "5K",
    booked: "10K",
    price: "800.000đ",
  },
];
const SpecialOfferList = () => {
  // Trạng thái quản lý trang hiện tại
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const currentSpecialOffer =
  return (
    <div className="flex gap-10">
      <SpecialOfferCard />
      <SpecialOfferCard />
      <SpecialOfferCard />
    </div>
  );
};

export default SpecialOfferList;
