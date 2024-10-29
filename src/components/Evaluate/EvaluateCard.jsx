/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react/dist/iconify.js";
const EvaluateCard = ({ evaluate }) => {
  return (
    // Thẻ card
    <div className="w-[1005.77px] h-[329.56px] ml-[129px] shadow-xl border-2 border-[03387E] rounded-xl mt-10 bg-slate-100 ">
      {/* Thông tin acc */}
      <div className="flex items-center gap-5 ml-8 ">
        <img
          width={54}
          height={54}
          src={evaluate.imageUrlAcc}
          alt={evaluate.name}
          className="rounded-full mt-8"
        />
        <h3 className="mt-8">{evaluate.name}</h3>
        <p className="mt-8 w-[60px]">{evaluate.day}</p>
        <p className="w-[81px] h-[36px] bg-[#DDDAED] rounded-lg flex justify-center items-center mt-8   ">
          {evaluate.verification}
        </p>
        {/* Sao đánh giá */}
        <div className="flex mt-8 ml-[430px]">
          {Array.from({ length: evaluate.rating }).map((_, index) => (
            <Icon
              key={index}
              icon="solar:star-bold"
              width="41"
              height="41"
              className="text-blue-900"
            />
          ))}
        </div>
      </div>
      {/* Nội dung */}
      <p className="w-[951px] h-[147px] ml-8 mt-[50px]">{evaluate.content}</p>
      <span className="ml-[890px]">Read More</span>
    </div>
  );
};

export default EvaluateCard;
