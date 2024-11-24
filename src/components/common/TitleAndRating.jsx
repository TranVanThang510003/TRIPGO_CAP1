import React from 'react';

const TourTitleAndRating = ({
  title,
  rating,
  reviewsCount,
  location,
  serviceType,
  language,
  tourType,
}) => {
  // Tính toán số sao đầy đủ và nửa sao
  const fullStars = Math.floor(rating); // Số sao đầy đủ
  const hasHalfStar = rating % 1 !== 0; // Nếu có phần thập phân thì có nửa sao
  const totalStars = 5; // Tổng số sao tối đa

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>

      {/* Tabs section */}
      <div className="flex space-x-2 mt-2 mb-2">
        <span className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full">
          {tourType}
        </span>
        <span className="bg-gray-200 text-gray-600 py-1 px-3 rounded-full">
          {language}
        </span>
      </div>

      {/* Hiển thị rating */}
      <div className="mb-2">
        {/* Hiển thị số rating */}
        <div className="flex items-center">
          <p className="text-gray-600 text-lg font-semibold mr-2">{rating}</p>{' '}
          {/* Số rating */}
          {/* Hiển thị số sao */}
          <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
              <span key={index} className="text-yellow-500">
                ★
              </span>
            ))}
            {hasHalfStar && <span className="text-yellow-500">☆</span>}
            {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
              (_, index) => (
                <span key={index} className="text-gray-400">
                  ★
                </span>
              )
            )}
          </div>
          <p className="text-gray-600 ml-2">({reviewsCount} đánh giá)</p>
        </div>
      </div>

      <p className="text-gray-600">Địa điểm: {location}</p>
      <p className="text-gray-600 mt-2 mb-2">Thời lượng: {serviceType} </p>
    </div>
  );
};

export default TourTitleAndRating;
