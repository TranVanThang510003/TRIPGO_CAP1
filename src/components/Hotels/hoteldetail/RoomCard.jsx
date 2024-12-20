import React from 'react';
import { Icon } from '@iconify/react';

const RoomCard = ({ room }) => {
  const baseURL = 'http://localhost:3000';

  return (
      <div className="flex flex-col lg:flex-row rounded-lg shadow-lg mb-6 border border-gray-200 overflow-hidden ">
        {/* Hình ảnh phòng */}
          <div className="w-full lg:w-1/4 bg-gray-100 p-4">
              <img
                  src={room.image ? `${baseURL}/${room.image}` : '/default-room.jpg'}
                  alt={room.title}
                  className="w-full h-[200px] object-cover rounded-md mb-2 hover:scale-105 transition-transform duration-300"
              />
              <div className="grid grid-cols-2 gap-2">
                  {room.additionalImages.slice(0, 2).map((image, index) => (
                      <img
                          key={index}
                          src={`${baseURL}/${image}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-[80px] w-full object-cover rounded-md hover:scale-105 transition-transform duration-300"
                      />
                  ))}
              </div>
              {/* Tiện ích phòng */}
              {/* Tiện ích phòng */}
              <div className="mt-4">
                  <h5 className="font-semibold mb-2 text-gray-700">Tiện nghi phòng:</h5>
                  <div className="grid grid-cols-2 gap-y-2 p-6 gap-x-4 text-gray-600 text-sm">
                      {room.amenities.slice(0, 8).map((amenity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                              <Icon icon="ic:baseline-check-circle" className="text-green-500 w-5 h-5" />
                              <span>{amenity}</span>
                          </div>
                      ))}
                      {room.amenities.length > 8 && (
                          <div className="col-span-2 text-blue-600 font-medium cursor-pointer hover:underline">
                              Xem thêm tiện nghi
                          </div>
                      )}
                  </div>
              </div>


          </div>

          {/* Chi tiết phòng */}
          <div className="w-full lg:w-3/4 p-4">
              <h4 className="text-2xl font-semibold mb-3 text-gray-800 border-b pb-2">{room.title}</h4>

              {/* Danh sách các loại giường */}
              {room.beds.map((bed, index) => (
                  <div
                      key={index}
                      className="border flex flex-col lg:flex-row justify-between items-center p-4 mb-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300"
              >
                {/* Thông tin giường */}
                <div className=" flex flex-col gap-5">
                  <p className="text-xl font-bold text-blue-500 mb-2">
                    {bed.title}
                  </p>
                  <div className="mt-2 flex items-center text-gray-600">
                    <Icon icon="fa-solid:ruler-combined" className="w-5 h-5 mr-2"/>
                    <span className="text-sm">{bed.size}</span>
                  </div>

                </div>

                {/* Giá và nút đặt */}
                <div className="text-right mt-4 lg:mt-0 lg:ml-4">
                  <p className="text-lg font-bold text-blue-600 mb-1">{bed.price.toLocaleString()}₫</p>
                  <p className="text-sm text-gray-500">Giá 1 đêm đã bao gồm thuế</p>
                  <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition duration-300">
                    Đặt
                  </button>
                  <p className="text-sm text-red-500 mt-1">
                    {bed.availability > 0 ? `Còn ${bed.availability} phòng` : 'Hết phòng'}
                  </p>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default RoomCard;
