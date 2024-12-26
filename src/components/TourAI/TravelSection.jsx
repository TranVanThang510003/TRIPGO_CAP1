
const TravelSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-16 bg-gray-50 px-8 lg:px-16 mt-[100px]">
      {/* Phần hình ảnh */}
      <div className="relative w-full lg:w-1/5 ml-[150px]">
        <img
          src="https://statics.vinpearl.com/canh-dep-viet-nam-11_1634999614.jpg" 
          alt="Du lịch"
          className="rounded-lg object-cover w-full h-96"
        />

        {/* Nhãn 5000+ du khách */}
        <div className="absolute top-5 left-4 bg-white rounded-2xl shadow-lg px-4 py-2">
          <p className="text-blue-600 font-bold text-lg">5000+</p>
          <p className="text-gray-600 text-sm">Du khách</p>
        </div>

        {/* Nhãn 100+ địa điểm */}
        <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg px-4 py-2">
          <p className="text-blue-600 font-bold text-lg">100+</p>
          <p className="text-gray-600 text-sm">Địa điểm</p>
        </div>

        {/* Nhãn 150+ khách sạn */}
        <div className="absolute bottom-4 left-4 bg-white rounded-2xl shadow-lg px-4 py-2">
          <p className="text-blue-600 font-bold text-lg">150+</p>
          <p className="text-gray-600 text-sm">Khách sạn</p>
        </div>
      </div>

      {/* Phần nội dung */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-12 mr-[130px]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Du Lịch Mọi Ngóc Ngách Của Việt Nam Cùng Chúng Tôi
        </h2>
        <p className="text-gray-600 mb-6">
          Bạn có muốn khám phá thiên đường thiên nhiên ở Việt Nam không? Hãy
          cùng chúng tôi tìm kiếm điểm đến tốt nhất tại Việt Nam. Từ những bãi
          biển tuyệt đẹp và những ngôi làng cổ với di sản văn hóa độc đáo, chúng
          tôi giúp bạn tìm ra những thiên đường tự nhiên mà bạn luôn mơ ước.
        </p>
        <p className="text-gray-600 mb-6">
          Hãy để chúng tôi dẫn bạn qua những cảnh quan tuyệt đẹp như Vịnh Hạ
          Long, bãi biển Đà Nẵng và cánh sắc nguyên sơ của Cát Bà. Chỉ cần nạp
          đủ năng lượng, và chúng tôi sẽ gợi ý những điểm đến lý tưởng cho những
          trải nghiệm du lịch khó quên. Hãy cùng khám phá vẻ đẹp của Việt Nam
          ngay hôm nay!
        </p>
        <button className=" bg-blue-900 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 ">
          Liên hệ với chúng tôi
        </button>
      </div>
    </div>
  );
};

export default TravelSection;
