import { Icon } from "@iconify/react/dist/iconify.js";
import starIcon from "@iconify/icons-mdi/star"; // Biểu tượng sao
import IconHeart from "../icon/IconHeart";
const InformationCamping = () => {
  const restaurant = {
    images: [
      "https://image.tienphong.vn/600x315/Uploaded/2024/bzivobpc/2021_04_29/camping-5968.jpeg",
      "https://image.tienphong.vn/600x315/Uploaded/2024/bzivobpc/2021_04_29/camping-5968.jpeg",
      "https://image.tienphong.vn/600x315/Uploaded/2024/bzivobpc/2021_04_29/camping-5968.jpeg",
      "https://image.tienphong.vn/600x315/Uploaded/2024/bzivobpc/2021_04_29/camping-5968.jpeg",
    ],
  };
  return (
    <div className="mt-[80px]">
      <div className="flex ml-[129px] items-center gap-2">
        <Icon icon="weui:back-filled" />
        <span className="text-blue-900">Tìm thêm nhà hàng tại Đà Nẵng</span>
      </div>
      {/* Ảnh nền */}
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row gap-4 mb-4 mt-5 w-[1180px] h-[453px] ">
          <div className="w-full md:w-2/3">
            <img
              src={restaurant.images[0]}
              alt="Khách sạn chính"
              className="w-full h-[470px] object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col w-1/3">
            {restaurant.images.slice(1).map((image, index) => (
              <div key={index} className="relative mb-2 h-[151px]">
                <img
                  src={image}
                  alt={`Khách sạn ${index + 2}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Thông tin và map */}
      <div className="mt-9 flex justify-between">
        {/* Left side: Thông tin nhà hàng */}
        <div className="ml-[129px] flex-1">
          <h1 className="text-4xl font-bold">Nhà Hàng Nhà Bếp Chợ Hàn</h1>
          {/* Đánh giá */}
          <div className="flex items-center gap-2 mt-4">
            <p>4.0</p>
            <div className="flex gap-1">
              <Icon
                icon={starIcon}
                width="18"
                height="18"
                className="text-yellow-500"
              />
              <Icon
                icon={starIcon}
                width="18"
                height="18"
                className="text-yellow-500"
              />
              <Icon
                icon={starIcon}
                width="18"
                height="18"
                className="text-yellow-500"
              />
              <Icon
                icon={starIcon}
                width="18"
                height="18"
                className="text-yellow-500"
              />
            </div>
            <p>(5K đánh giá)</p>
          </div>
          <div className="mt-2 flex gap-4">
            <p>Địa chỉ: Làng Mê, Dọc Sông Cu Đê, Đà Nẵng 550000</p>
          </div>
          {/* Số điện thoại */}
          <p className="mt-2">Số điện thoại: 0236 3966 268</p>
          {/* Giờ hoạt động */}

          {/* Giá mỗi người */}
          <p className="mt-2">Mức giá: 400.000đ/Người</p>
          {/* Loại nhà hàng */}
          <p className="mt-2">Loại hình: Cắm trại nhóm</p>
        </div>

        {/* Right side: Hoạt động trên bản đồ */}
        <div className="mr-[129px] ">
          <div className="w-80 bg-white h-56 rounded-3xl border border-[#ACACAC] ml-7 ">
            <div className="h-44 bg-gray-100 rounded-t-3xl flex justify-center items-center">
              <img
                src="https://www.techtimes.vn/wp-content/uploads/2023/05/google-maps-icon-on-map.jpg"
                alt="Map"
                className="h-full w-full object-cover rounded-t-3xl"
              />
            </div>
            <p className="text-center text-sm font-medium mt-2">
              Hoạt động trên bản đồ
            </p>
          </div>

          {/* Nút yêu thích, gọi, chia sẻ */}
          <div className="flex justify-center gap-6 mt-4">
            <button className="flex items-center gap-1 text-sm text-blue-600 border border-blue-600 px-4 py-1 rounded-lg shadow-md">
              <IconHeart className="stroke-blue-400" />
              Yêu thích
            </button>
            <button className="flex items-center gap-1 text-sm text-blue-600 border border-blue-600 px-4 py-1 rounded-lg shadow-md">
              <Icon
                width="30"
                height="30"
                viewBox="0 0 24 24"
                icon="mdi-light:phone"
              />
              Gọi
            </button>
            <button className="flex items-center gap-1 text-sm text-blue-600 border border-blue-600 px-4 py-1 rounded-lg shadow-md">
              <Icon
                width="30"
                height="30"
                viewBox="0 0 24 24"
                icon="ion:share-outline"
              />
              Chia sẻ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationCamping;
