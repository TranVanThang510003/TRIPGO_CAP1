import React from 'react';

const Location = ({ address, airportDistance }) => {
  // Function to calculate walking time based on distance (assumes an average walking speed)
  const calculateWalkingTime = (distance) => {
    const walkingSpeed = 5; // average walking speed in km/h
    const timeInMinutes = (distance / walkingSpeed) * 60; // convert hours to minutes
    return Math.round(timeInMinutes);
  };

  const walkingTime = calculateWalkingTime(airportDistance); // Calculate walking time

  return (
    <div className="flex flex-col justify-center border rounded-xl p-2 bg-white col-span-1">
      <p className="text-gray-600 mb-2 flex">
        <span className="mr-2">📍</span> {address}
      </p>
      <p className="text-gray-600 flex">
        <span className="mr-2">✈️</span> Sân bay quốc tế Đà Nẵng, {airportDistance} km, cách khách sạn khoảng {walkingTime} phút đi bộ.
      </p>
      <a href="#" className="text-gray-600 underline mt-4">Xem bản đồ</a>
    </div>
  );
};

export default Location;
