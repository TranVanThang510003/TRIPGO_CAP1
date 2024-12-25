import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TestimonialCard = () => {
  return (
    <div className="grid grid-cols-2 gap-8 justify-items-center mt-[100px] border-t">
       {/* Muc  Testimonial */}
      <div className="text-center max-w-md mt-20 ">
        <p className="text-lg">
          Mình vừa dùng TripGo và rất hài lòng. Tính năng AI tạo tour cá nhân
          hóa giúp mình nhanh chóng có lịch trình phù hợp với sở thích. Giao
          diện dễ dùng, tiện lợi, không cần mất thời gian lên kế hoạch. Rất đáng
          thử!
        </p>
        <p className="text-blue-800 font-bold mt-4">- Vand D</p>
        <p className="text-gray-400">Happy Treloo</p>
        <div className="mt-4 flex justify-center relative">
          <img
            className="relative w-24 h-24 rounded-full object-cover"
            src="https://iv1cdn.vnecdn.net/giaitri/images/web/2019/07/01/mv-son-tung-m-tp-dat-47-trieu-luot-xem-sau-50-phut-ra-mat-1561993656.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=Wlie1HpvjMna-99RjddlSw"
            alt="Vand D"
          />
          <div className="absolute w-[45px] h-[20px] bg-white text-black flex items-center rounded-md justify-center ml-12">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 font-bold">4.5</span>
          </div>
        </div>
      </div>

      {/* Muc 2 Testimonial */}
      <div className="text-center max-w-md mt-20">
        <p className="text-lg">
          Trải nghiệm của chúng tôi với TripGo thật tuyệt vời. Trang web giúp
          chúng tôi lên kế hoạch cho chuyến đi một cách suôn sẻ. Quy trình đặt
          chỗ rất dễ. Chúng tôi rất khuyến nghị TripGo cho những ai muốn khám
          phá những điểm đến mới.
        </p>
        <p className="text-blue-800 font-bold mt-4">- Tru Vio</p>
        <p className="text-gray-400">Happy Treloo</p>
        <div className="mt-4 flex justify-center relative">
          <img
            className="relative w-24 h-24 rounded-full object-cover"
            src="https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2023/10/15/base64-1697371188123490553865.png"
            alt="Vand D"
          />
          <div className="absolute w-[45px] h-[20px] bg-white text-black flex items-center rounded-md justify-center ml-12">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="ml-1 font-bold">4.5</span>
          </div>
        </div>
      </div>
      {/* Nút chuyển trang */}
      <div className="col-span-2  flex items-center gap-5 mt-12">
        <button className="border border-blue-900 w-10 h-9 rounded-xl hover:bg-blue-800">
          {<FontAwesomeIcon icon={faChevronLeft} />}
        </button>
        <button className="border border-blue-900 w-10 h-9 rounded-xl hover:bg-blue-800">
          {<FontAwesomeIcon icon={faChevronRight} />}
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;
