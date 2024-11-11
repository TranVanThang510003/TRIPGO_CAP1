import SpecialOfferCard from "./SpecialOfferCard";

const specialOfferData = [
  {
    status: "Flex",
    days: 3,
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2023/07/12/hl1-1689130193-1689130212-5586-1689130358.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JDE3nuzFT6QKZqQ73hmZug",
    name: "Vĩnh Hạ Long",
    location: "Quảng Ninh",
    ratings: 4.5,
    reviews: "5K",
    booked: "10K",
    price: "800.000đ",
  },
  {
    status: "Flex",
    days: 3,
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2023/07/12/hl1-1689130193-1689130212-5586-1689130358.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JDE3nuzFT6QKZqQ73hmZug",
    name: "Vĩnh Hạ Long",
    location: "Quảng Ninh",
    ratings: 4.5,
    reviews: "5K",
    booked: "10K",
    price: "800.000đ",
  },
  {
    status: "Flex",
    days: 3,
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2023/07/12/hl1-1689130193-1689130212-5586-1689130358.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JDE3nuzFT6QKZqQ73hmZug",
    name: "Vĩnh Hạ Long",
    location: "Quảng Ninh",
    ratings: 4.5,
    reviews: "5K",
    booked: "10K",
    price: "800.000đ",
  },
  {
    status: "Flex",
    days: 3,
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2023/07/12/hl1-1689130193-1689130212-5586-1689130358.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JDE3nuzFT6QKZqQ73hmZug",
    name: "Vĩnh Hạ Long",
    location: "Quảng Ninh",
    ratings: 4.5,
    reviews: "5K",
    booked: "10K",
    price: "800.000đ",
  },
  {
    status: "Flex",
    days: 3,
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2023/07/12/hl1-1689130193-1689130212-5586-1689130358.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JDE3nuzFT6QKZqQ73hmZug",
    name: "Vĩnh Hạ Long",
    location: "Quảng Ninh",
    ratings: 4.5,
    reviews: "5K",
    booked: "10K",
    price: "800.000đ",
  },
  {
    status: "Flex",
    days: 3,
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2023/07/12/hl1-1689130193-1689130212-5586-1689130358.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JDE3nuzFT6QKZqQ73hmZug",
    name: "Vĩnh Hạ Long",
    location: "Quảng Ninh",
    ratings: 4.5,
    reviews: "5K",
    booked: "10K",
    price: "800.000đ",
  },
  {
    status: "Flex",
    days: 3,
    imageUrl:
      "https://vcdn1-dulich.vnecdn.net/2023/07/12/hl1-1689130193-1689130212-5586-1689130358.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=JDE3nuzFT6QKZqQ73hmZug",
    name: "Vĩnh Hạ Long",
    location: "Quảng Ninh",
    ratings: 4.5,
    reviews: "5K",
    booked: "10K",
    price: "800.000đ",
  },
  // Thêm các thẻ khác để thử nghiệm nếu cần
];

const SpecialOfferList = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto mt-[100px]">
      <h2 className="text-4xl font-bold text-center mb-6">Ưu đãi đặc biệt</h2>

      {/* Chứa thanh cuộn */}
      <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth p-4">
        {specialOfferData.map((special, index) => (
          <div key={index} className="snap-start shrink-0">
            <SpecialOfferCard special={special} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOfferList;
