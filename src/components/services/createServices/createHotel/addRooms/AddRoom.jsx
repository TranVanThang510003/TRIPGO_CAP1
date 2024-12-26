import React, { useState } from "react";
import axios from "axios";
import FileUploader from "../FileUploader.jsx";
import RoomTypeForm from "./roomtype/RoomTypeForm.jsx";
import useAddRoomForm from "./useAddRoomForm.jsx";
const AddRoom = ({ hotelName, hotelId, onClose }) => {
  const {
    facilities,
    setFacilities,
    roomSize,
    setRoomSize,

    images,
    updateImages,
    errors,
    setErrors,

    //roomtype
    roomName,
    setRoomName,
    bedTypes,
    setBedTypes,
    bedTypePrices,
    setBedTypePrices,
    bedTypeQuantities,
    setBedTypeQuantities,
    newBedType,
    setNewBedType,
    newBedTypePrice,
    setNewBedTypePrice,
    newBedTypeQuantity,
    setNewBedTypeQuantity,
    roomTypes,
    setRoomTypes,
    newRoomSize,
    setNewRoomSize,
    //image
  } = useAddRoomForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Thêm các thông tin chung vào FormData
    formData.append("hotelId", hotelId);

    let allRoomImages = []; // Mảng lưu tất cả ảnh phòng

    // Duyệt qua từng phòng và thêm dữ liệu
    roomTypes.forEach((room, index) => {
      const roomImages = room.images || [];

      // Tạo JSON cho từng phòng
      const roomData = {
        roomName: room.name,
        availability: room.availability || 1,
        facilities: room.facilities,
        bedTypes: room.bedTypes.map((bed, i) => ({
          type: bed,
          price: room.bedTypePrices[i],
          quantity: room.bedTypeQuantities[i],
          roomSize: room.bedTypeRoomSizes[i],
        })),
      };

      formData.append(`room_${index}`, JSON.stringify(roomData));

      // Gom ảnh vào mảng
      roomImages.forEach((file) => {
        formData.append("newImages", file);
      });
    });

    console.log("FormData to send:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }

    // Gửi dữ liệu lên server
    try {
      const response = await axios.post(
        "http://localhost:3000/hotels/add-room",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);
      alert("Thêm phòng thành công!");
    } catch (error) {
      console.error(
        "Lỗi khi gửi dữ liệu:",
        error.response?.data || error.message
      );
      alert("Gửi dữ liệu thất bại.");
    }
  };

  return (
    <div className="relative overflow-y-auto max-h-screen  p-8 max-w-7xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-y-6 bg-white p-8 rounded-lg shadow-lg"
      >
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold mb-4">
              Thêm hông tin phòng cho khách sạn: {hotelName}{" "}
            </h2>
            <button
              onClick={onClose}
              className="absolute text-2xl top-12 right-14 text-gray-600 hover:text-red-500 transition duration-200"
            >
              &#x2715; {/* Dấu X unicode */}
            </button>
          </div>

          <RoomTypeForm
            roomName={roomName}
            setRoomName={setRoomName}
            bedTypes={bedTypes}
            setBedTypes={setBedTypes}
            bedTypePrices={bedTypePrices}
            setBedTypePrices={setBedTypePrices}
            bedTypeQuantities={bedTypeQuantities}
            setBedTypeQuantities={setBedTypeQuantities}
            newBedType={newBedType}
            setNewBedType={setNewBedType}
            newBedTypePrice={newBedTypePrice}
            setNewBedTypePrice={setNewBedTypePrice}
            newBedTypeQuantity={newBedTypeQuantity}
            setNewBedTypeQuantity={setNewBedTypeQuantity}
            roomTypes={roomTypes}
            setRoomTypes={setRoomTypes}
            facilities={facilities}
            setFacilities={setFacilities}
            roomSize={roomSize}
            setRoomSize={setRoomSize}
            newRoomSize={newRoomSize}
            setNewRoomSize={setNewRoomSize}
            errors={errors}
            setErrors={setErrors}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Thêm phòng
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;
