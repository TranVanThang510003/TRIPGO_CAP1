const TravelSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-16 bg-gray-50 px-8  mt-[100px]">
      {/* Phần hình ảnh */}
      <div className="relative w-1/2 ">
        <img
          src="https://statics.vinpearl.com/canh-dep-viet-nam-11_1634999614.jpg"
          alt="Du lịch"
          className="object-cover w-[480px] h-[800px] rounded-3xl"
        />

        {/* Nhãn 5000+ du khách */}
        <div className="absolute top-1/2 left-[-80px] bg-white rounded-2xl shadow-lg px-8 py-4">
          <p className="text-blue-600 font-bold text-3xl">5000+</p>
          <p className="text-gray-600 text-sm">Du khách</p>
        </div>

        {/* Nhãn 100+ địa điểm */}
        <div className="absolute top-4 right-[10px] bg-white rounded-2xl shadow-lg px-8 py-4">
          <p className="text-blue-600 font-bold text-3xl">100+</p>
          <p className="text-gray-600 text-sm">Địa điểm</p>
        </div>

        {/* Nhãn 150+ khách sạn */}
        <div className="absolute bottom-4  right-[10px] bg-white rounded-2xl shadow-lg px-8 py-4">
          <p className="text-blue-600 font-bold text-3xl">150+</p>
          <p className="text-gray-600 text-sm">Khách sạn</p>
        </div>
      </div>

      {/* Phần nội dung */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0  ">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Du Lịch Mọi Ngóc Ngách Của Việt Nam Cùng Chúng Tôi
        </h1>
        <p className="text-gray-600 mb-6 text-xl">
          Bạn có muốn khám phá thiên đường thiên nhiên ở Việt Nam không? Hãy
          cùng chúng tôi tìm kiếm điểm đến tốt nhất tại Việt Nam. Từ những bãi
          biển tuyệt đẹp và những ngôi làng cổ với di sản văn hóa độc đáo, chúng
          tôi giúp bạn tìm ra những thiên đường tự nhiên mà bạn luôn mơ ước.
        </p>
        <p className="text-gray-600 mb-6 text-xl">
          Hãy để chúng tôi dẫn bạn qua những cảnh quan tuyệt đẹp như Vịnh Hạ
          Long, bãi biển Đà Nẵng và cánh sắc nguyên sơ của Cát Bà. Chỉ cần nạp
          đủ năng lượng, và chúng tôi sẽ gợi ý những điểm đến lý tưởng cho những
          trải nghiệm du lịch khó quên. Hãy cùng khám phá vẻ đẹp của Việt Nam
          ngay hôm nay!
        </p>
        <button className=" bg-blue-900 text-white font-semibold px-6 py-3 rounded-md shadow-lg hover:bg-blue-600 ">
          Liên hệ với chúng tôi
        </button>
      </div>
    </div>
  );
};

export default TravelSection;
