import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../../layout/Header";
import SideBar from "../../../UserProfile/SideBar";
import HotelDropdown from "./HotelDropdown";
import RoomTable from "./RoomTable";
import AddRoom from "../../../services/createServices/createHotel/addRooms/AddRoom";
import ImageModal from "./ImageModal";
import RoomBedForm from "./RoomBedForm";
import { useSnackbar } from "notistack";

const RoomManagementPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ isOpen: false, roomData: null }); // State cho form sửa
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const creatorId = JSON.parse(localStorage.getItem("user"))?.id; // Lấy creatorId từ localStorage
        if (!creatorId) {
          console.error("Không tìm thấy creatorId trong localStorage");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/hotels/by-creator/${creatorId}`
        );
        console.log("Danh sách khách sạn từ API:", response.data);

        if (response.data.hotels && response.data.hotels.length > 0) {
          setHotels(response.data.hotels); // Lưu danh sách khách sạn vào state
          setSelectedHotel(response.data.hotels[0]); // Chọn khách sạn đầu tiên làm mặc định
          fetchRooms(response.data.hotels[0].id); // Lấy danh sách phòng của khách sạn đầu tiên
        } else {
          setHotels([]);
          setRooms([]);
          setSelectedHotel(null);
          enqueueSnackbar("Không tìm thấy khách sạn nào.", {
            variant: "warning",
          });
        }
      } catch (error) {
        console.error(
          "Lỗi khi lấy danh sách khách sạn:",
          error.response?.data || error.message
        );
        enqueueSnackbar("Đã xảy ra lỗi khi tải danh sách khách sạn.", {
          variant: "error",
        });
      }
    };

    fetchHotels();
  }, []);

  const fetchRooms = async (hotelId) => {
    try {
      const creatorId = JSON.parse(localStorage.getItem("user"))?.id;
      if (!creatorId) {
        console.error("Không tìm thấy creatorId trong localStorage");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/hotels/rooms/${hotelId}?createdBy=${creatorId}`
      );
      console.log("Dữ liệu phòng từ BE:", response.data);

      if (!response.data.data || response.data.data.length === 0) {
        // Nếu không có phòng, đặt rooms là mảng rỗng và thông báo
        setRooms([]);
        enqueueSnackbar("Không có phòng nào trong khách sạn này.", {
          variant: "info",
        });
        return;
      }

      const processedRooms = response.data.data.flatMap((room) =>
        room.BEDS.map((bed) => ({
          roomTypeId: room.ROOM_TYPE_ID,
          roomName: room.ROOM_NAME,
          bedTypeId: bed.BED_TYPE_MASTER_ID,
          bedTypeIdR: bed.BED_TYPE_ID,
          bedType: bed.BED_TYPE_NAME,
          roomSize: bed.ROOM_SIZE,
          price: bed.PRICE,
          quantity: bed.BED_QUANTITY,
          facilities: bed.AMENITIES || [],
          images: room.IMAGES || [],
        }))
      );
      console.log(
        "Danh sách bedTypeId từ API:",
        processedRooms.map((room) => room.bedTypeId)
      );
      console.log("Phòng đã xử lý:", processedRooms);

      setRooms(processedRooms);
    } catch (error) {
      console.error(
        "Lỗi khi lấy danh sách phòng:",
        error.response?.data || error.message
      );
      enqueueSnackbar("Không thể tải danh sách phòng.", { variant: "error" });
    }
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen); // Đóng/mở modal
  };
  const [imageModal, setImageModal] = useState({ isOpen: false, images: [] });

  const handleViewImages = (roomName, images, roomTypeId) => {
    if (images && images.length > 0) {
      setImageModal({ isOpen: true, images, roomTypeId }); // Thêm roomTypeId vào state
    } else {
      alert(`Phòng ${roomName} không có ảnh.`);
    }
  };

  const handleUpdateImages = async (updatedImages, roomTypeId) => {
    console.log(roomTypeId);

    try {
      const formData = new FormData();

      // Separate existing and new images
      const existingImages = updatedImages.filter(
        (img) => typeof img === "string"
      );
      const newImages = updatedImages.filter((img) => typeof img !== "string");

      formData.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((image) => {
        formData.append("newImages", image);
      });

      // Send the API request
      const response = await axios.put(
        `http://localhost:3000/hotels/update-room-images/${roomTypeId}`, // Use roomTypeId
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        enqueueSnackbar("Cập nhật ảnh phòng thành công!", {
          variant: "success",
        });
        fetchRooms(selectedHotel.id); // Reload rooms
      } else {
        enqueueSnackbar("Cập nhật ảnh phòng thất bại!", { variant: "warning" });
      }
    } catch (error) {
      console.error(
        "Lỗi khi cập nhật ảnh phòng:",
        error.response?.data || error.message
      );
      enqueueSnackbar("Đã xảy ra lỗi khi cập nhật ảnh phòng.", {
        variant: "error",
      });
    }
  };

  const handleEditRoom = (roomName, bedTypeId) => {
    const roomToEdit = rooms.find(
      (room) => room.roomName === roomName && room.bedTypeId === bedTypeId
    );
    if (roomToEdit) {
      setEditForm({ isOpen: true, roomData: roomToEdit });
    }
  };
  const handleCloseEditForm = () => {
    setEditForm({ isOpen: false, roomData: null });
  };

  const handleDeleteRoomBed = async (
    roomName,
    bedType,
    bedTypeIdR,
    roomTypeId
  ) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xóa giường "${bedType}" trong phòng "${roomName}" không?`
    );
    if (!confirmDelete) return;

    try {
      console.log("Xóa giường:", { roomName, bedType, roomTypeId, bedTypeIdR });

      const response = await axios.delete(
        `http://localhost:3000/hotels/delete-bed/${roomTypeId}/${bedTypeIdR}`
      );

      if (response.status === 200) {
        setRooms((prevRooms) =>
          prevRooms.filter(
            (room) =>
              !(
                room.roomTypeId === roomTypeId && room.bedTypeIdR === bedTypeIdR
              )
          )
        );
        enqueueSnackbar("Xóa giường thành công!", { variant: "success" });
      } else {
        enqueueSnackbar("Xóa giường thất bại!", { variant: "warning" });
      }
    } catch (error) {
      console.error(
        "Lỗi khi xóa giường:",
        error.response?.data || error.message
      );
      enqueueSnackbar("Đã xảy ra lỗi khi xóa giường.", { variant: "error" });
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
        fetchRooms(selectedHotel.id); // Reload danh sách phòng
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
                const hotel = hotels.find((h) => h.id === hotelId);
                if (hotel) {
                  setSelectedHotel(hotel); // Cập nhật khách sạn được chọn
                  fetchRooms(hotelId); // Gọi API với `hotelId` trực tiếp
                }
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
            onViewImages={(roomName, images, roomTypeId) =>
              handleViewImages(roomName, images, roomTypeId)
            }
            onEdit={(roomName, bedTypeId) =>
              handleEditRoom(roomName, bedTypeId)
            }
            onDelete={(roomName, bedType, bedTypeIdR, roomTypeId) =>
              handleDeleteRoomBed(roomName, bedType, bedTypeIdR, roomTypeId)
            }
          />
        </div>
      </div>
      {/* Modal thêm phòng */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <AddRoom
            hotelName={selectedHotel?.HOTEL_NAME}
            hotelId={selectedHotel?.id}
            onClose={handleModalToggle}
          />
        </div>
      )}
      {editForm.isOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <RoomBedForm
            bed={editForm.roomData}
            existingBeds={rooms}
            onSave={handleSaveEdit}
            onCancel={() => setEditForm({ isOpen: false, roomData: null })}
            onClose={handleCloseEditForm}
          />
        </div>
      )}
      {imageModal.isOpen && (
        <ImageModal
          images={imageModal.images}
          onClose={() => setImageModal({ isOpen: false, images: [] })}
          onUpdate={(updatedImages) =>
            handleUpdateImages(updatedImages, imageModal.roomTypeId)
          } // Đảm bảo roomTypeId được truyền
        />
      )}
    </div>
  );
};

export default RoomManagementPage;
