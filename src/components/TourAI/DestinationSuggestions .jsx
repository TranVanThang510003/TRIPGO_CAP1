import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const DestinationSuggestions = () => {
  const suggestions = [
    {
      id: 1,
      name: "Tràng An",
      location: "Ninh Bình",
      rating: 3.4,
      imageUrl:
        "https://ik.imagekit.io/tvlk/blog/2024/07/canh-dep-viet-nam-3.jpg?tr=dpr-2,w-675",
    },
    {
      id: 2,
      name: "Ruộng Bậc Thang",
      location: "Sapa",
      rating: 4.5,
      imageUrl:
        "https://danviet.mediacdn.vn/upload/2-2015/images/2015-04-13/1434178305-xgjjanh1_rdya.jpg",
    },
    {
      id: 3,
      name: "Biển Mỹ Khê",
      location: "Đà Nẵng",
      rating: 4.2,
      imageUrl:
        "https://bcp.cdnchinhphu.vn/thumb_w/640/344443456812359680/2023/3/9/mykhe-16783491546921642441300.jpg",
    },
    {
      id: 4,
      name: "Động Phong Nha",
      location: "Quảng Bình",
      rating: 3.5,
      imageUrl:
        "https://ehgtravel.com/wp-content/uploads/2018/04/0001479_phong-nha-cave-1-day-tour.jpeg",
    },
  ];

  return (
    <div className="w-full py-12 mt-[100px]">
      <h2 className="text-center text-3xl font-bold">Đề xuất điểm đến</h2>
      <div className="flex justify-center space-x-8 mt-8">
        {suggestions.map((destination) => (
          <div
            key={destination.id}
            className="relative rounded-xl overflow-hidden shadow-lg max-w-xs"
          >
            <img
              src={destination.imageUrl}
              alt={destination.name}
              className="w-[280px] h-48 object-cover"
            />
            <div className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded-full text-sm flex items-center">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
              {destination.rating}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-lg">{destination.name}</h4>
              <p className="text-gray-500 text-sm flex items-center">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="text-red-500 mr-1"
                />
                {destination.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationSuggestions;
