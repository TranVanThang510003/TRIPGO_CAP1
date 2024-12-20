

import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../../layout/Header";
import SideBar from "../../../UserProfile/SideBar";
import HotelDropdown from "./HotelDropdown";
import RoomTable from "./RoomTable";
import AddRoom from "../../../services/createServices/createHotel/addRooms/AddRoom";
import ImageModal from "./ImageModal";
import RoomBedForm from "./RoomBedForm";


const RoomManagementPage = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editForm, setEditForm] = useState({ isOpen: false, roomData: null }); // State cho form sửa
    useEffect(() => {
        const fetchHotels = async () => {
            const response = await axios.get("http://localhost:3000/hotels");
            setHotels(response.data.data);
            setSelectedHotel(response.data.data[0]);
            fetchRooms(response.data.data[0].HOTEL_ID);
        };
        fetchHotels();
    }, []);

    const fetchRooms = async (hotelId) => {
        try {
            const response = await axios.get(`http://localhost:3000/hotels/rooms/${hotelId}`);
            console.log("Dữ liệu phòng từ BE:", response.data); // Kiểm tra dữ liệu trả về

            const processedRooms = response.data.data.flatMap((room) =>
                room.BEDS.map((bed) => ({
                    roomTypeId: room.ROOM_TYPE_ID,
                    roomName: room.ROOM_NAME,
                    bedTypeId: bed.BED_TYPE_MASTER_ID,
                    bedType: bed.BED_TYPE_NAME,
                    roomSize: bed.ROOM_SIZE,
                    price: bed.PRICE,
                    quantity: bed.BED_QUANTITY,
                    facilities: bed.AMENITIES || [],
                    images: room.IMAGES || [],
                }))
            );
            console.log("Danh sách bedTypeId từ API:", processedRooms.map((room) => room.bedTypeId));
            console.log("Phòng đã xử lý:", processedRooms); // Xem dữ liệu sau khi xử lý
            setRooms(processedRooms);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách phòng:", error);
            alert("Không thể tải danh sách phòng.");
        }
    };

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen); // Đóng/mở modal
    };
    const [imageModal, setImageModal] = useState({ isOpen: false, images: [] });

    const handleViewImages = (roomName, images) => {
        if (images && images.length > 0) {
            setImageModal({ isOpen: true, images });
        } else {
            alert(`Phòng ${roomName} không có ảnh.`);
        }
    };
    const handleUpdateImages = (updatedImages) => {
        console.log("Danh sách ảnh sau khi cập nhật:", updatedImages);
        // Gửi dữ liệu cập nhật ảnh lên API nếu cần
    };
    const handleEditRoom = (roomName, bedTypeId) => {
        const roomToEdit = rooms.find(
            (room) => room.roomName === roomName && room.bedTypeId === bedTypeId
        );
        if (roomToEdit) {
            setEditForm({ isOpen: true, roomData: roomToEdit });
        }
    };

    const handleDeleteRoomBed = async (roomName, bedType, roomTypeId) => {
        // Hiển thị hộp thoại xác nhận trước khi xóa
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa giường "${bedType}" trong phòng "${roomName}" không?`);
        if (!confirmDelete) return;

        try {
            // Gửi yêu cầu xóa đến Backend
            const response = await axios.delete(
                `http://localhost:3000/hotels/delete-bed/${roomTypeId}/${bedType}`
            );

            if (response.status === 200) {
                // Xóa thành công, cập nhật lại danh sách phòng
                setRooms((prevRooms) =>
                    prevRooms.filter((room) => !(room.roomName === roomName && room.bedType === bedType))
                );
                alert("Xóa thành công!");
            } else {
                alert("Xóa thất bại! Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa giường:", error);
            alert("Đã xảy ra lỗi khi xóa giường. Vui lòng thử lại.");
        }
    };

    const handleSaveEdit = async (updatedRoom) => {
        const { roomTypeId, bedTypeId: oldBedTypeId } = editForm.roomData; // Lấy bedTypeId cũ

        console.log("Old BedTypeId:", oldBedTypeId); // Log kiểm tra

        const url = `http://localhost:3000/hotels/update-bed/${roomTypeId}/${oldBedTypeId}`;
        console.log("URL gửi đi:", url);

        try {
            const response = await axios.put(url, {
                bedTypeId: updatedRoom.bedTypeId, // Mã giường mới
                roomSize: updatedRoom.roomSize,
                price: updatedRoom.price,
                quantity: updatedRoom.quantity,
            });

            if (response.status === 200) {
                alert("Cập nhật thành công!");
                fetchRooms(selectedHotel.HOTEL_ID); // Reload danh sách phòng
            } else {
                alert("Cập nhật thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật giường:", error);
            alert("Đã xảy ra lỗi khi cập nhật thông tin giường.");
        }
    };




    return (
        <div className="bg-[#f8f8f8] w-full min-h-screen overflow-auto relative">
            <Header />
            <div className="flex flex-col md:flex-row gap-2 h-auto bg-[#f8f8f8] mx-6 mt-4">
                <div className="mr-2 fixed">
                    <SideBar />
                </div>
                <div className="flex-grow bg-white w-full p-4 rounded-xl shadow-md mt-6 md:mt-0 ml-[300px]">
                    <h1 className="text-2xl font-semibold mb-4">Danh Sách Phòng</h1>
                    <div className="flex items-center justify-between w-full">
                        <HotelDropdown
                            hotels={hotels}
                            selectedHotel={selectedHotel}
                            onChange={(hotelId) => {
                                const hotel = hotels.find((h) => h.HOTEL_ID === hotelId);
                                setSelectedHotel(hotel);
                                fetchRooms(hotelId);
                            }}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                            onClick={handleModalToggle}
                        >
                            Thêm phòng
                        </button>
                    </div>

                    <RoomTable
                        rooms={rooms}
                        onViewImages={(roomName, images) => handleViewImages(roomName, images)}
                        onEdit={(roomName,  bedTypeId) => handleEditRoom(roomName,  bedTypeId)}
                        onDelete={(roomName,  bedTypeId,roomTypeId) => handleDeleteRoomBed(roomName,  bedTypeId,roomTypeId)}

                    />

                </div>
            </div>
            {/* Modal thêm phòng */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Thêm phòng mới</h2>

                    <AddRoom hotelName={selectedHotel?.HOTEL_NAME} hotelId={selectedHotel?.HOTEL_ID}
                             onClose={handleModalToggle}/>

                </div>
            )}
            {editForm.isOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">

                        <RoomBedForm
                            bed={editForm.roomData}
                            existingBeds={rooms}
                            onSave={handleSaveEdit}
                            onCancel={() => setEditForm({ isOpen: false, roomData: null })}
                        />

                </div>
            )}
            {imageModal.isOpen && (
                <ImageModal
                    images={imageModal.images}
                    onClose={() => setImageModal({ isOpen: false, images: [] })}
                    onUpdate={handleUpdateImages}
                />
            )}

        </div>

    );
};

export default RoomManagementPage;

