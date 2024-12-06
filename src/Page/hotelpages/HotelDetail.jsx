import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import RatingAndComments from '../../components/Hotels/hoteldetail/RatingAndComments';
import Amenities from '../../components/Hotels/hoteldetail/Amenities';
import Location from '../../components/Hotels/hoteldetail/Location';
import TitleAndDescription from '../../components/Hotels/hoteldetail/TitleAndDescription';
import RoomCard from '../../components/Hotels/hoteldetail/RoomCard';
import ImageGallery from '../../components/common/ImageGallery';
import SearchBar from '../../components/Hotels/hoteldetail/SearchBar';
import { fetchHotelDetails } from '../../components/services/api';
import ReturnButton from '../../components/common/returnButton';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy thông tin người dùng từ localStorage
  const [userRole, setUserRole] =  JSON.parse(localStorage.getItem("user"))?.role || null;

  const [userId, setUserId] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? parseInt(JSON.parse(user).id, 10) : null;
  }); // Lấy ID người dùng từ localStorage và chuyển đổi thành số

  // Fetch hotel details from the API
  useEffect(() => {
    const getHotelDetails = async () => {
      try {
        const data = await fetchHotelDetails(hotelId);
        setHotel(data.hotel);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getHotelDetails();
  }, [hotelId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to ensure there are exactly 4 images (for ImageGallery)
  const ensureFourImages = (images) => {
    if (!images || images.length === 0) return [];
    if (images.length >= 4) return images.slice(0, 4);
    const clonedImages = [...images];
    while (clonedImages.length < 4) {
      clonedImages.push(...images);
    }
    return clonedImages.slice(0, 4);
  };

  const imageUrl = hotel?.imageUrl; 
  const additionalImages = ensureFourImages(
    [imageUrl, ...(hotel?.roomTypes?.[0]?.bedImages?.map(img => img) || [])]
  );

  // Điều kiện để hiển thị nút "Chỉnh sửa"
  const canEdit = userRole === 'staff' && hotel?.createdBy === userId;

  return (
    <div className='bg-[#F8F8F8]'>
      <Header />
      <div className="container mx-auto mt-[80px] w-4/5">
        <SearchBar />
       
        <div className='pt-[115px]'>
          <div className='my-3'><ReturnButton/></div>
           
          <ImageGallery images={additionalImages} />
        </div>

        <TitleAndDescription 
          name={hotel?.name || "Không có tên"} 
          rating={hotel?.hotelType || "Không có xếp hạng"} 
          description={hotel?.description || "Không có mô tả"} 
          pricePerNight={hotel?.roomTypes?.[0]?.roomPrice || "Liên hệ"} 
        />

        <div className="w-full bg-white mx-auto mt-5 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <RatingAndComments 
            rating={hotel?.averageRating || 0} 
            comments={hotel?.reviewCount || 0} 
            latestComment={hotel?.latestComment || "Không có bình luận gần đây"} 
            userName={hotel?.userName || "Vô danh"} 
          />
          <Amenities amenities={hotel?.amenities ? hotel.amenities.split(', ') : []} />
          <Location 
            address={hotel?.location || "Không có địa chỉ"} 
            airportDistance={hotel?.airportTransfer ? 'Có xe đưa đón sân bay' : 'Không có xe đưa đón sân bay'} 
          />
        </div>

        <h4 className="text-3xl font-medium mb-4 mt-4">Chọn phòng của bạn</h4>
        <div className="flex flex-col w-full">
          {hotel?.roomTypes?.length > 0 ? (
            hotel.roomTypes.map((type) => (
              <RoomCard 
                key={type.roomTypeId}
                room={{
                  title: type.roomName,
                  price: type.roomPrice,
                  mealPlans: type.mealPlans,
                  refundPolicy: hotel.isFreeCancellation ? "Hủy miễn phí" : "Không hoàn tiền",
                  availability: type.maxOccupancy,
                  size: type.roomSize,
                  description: type.roomDescription,
                  image: type.bedImages?.[0] || '/default-room.jpg', 
                  additionalImages: ensureFourImages(type.bedImages?.slice(0, 2) || [])
                }} 
              />
            ))
          ) : (
            <p>Không có phòng nào có sẵn.</p> // Hiển thị thông báo nếu không có phòng
          )}
        </div>

        {/* Nút "Chỉnh sửa" chỉ hiển thị khi điều kiện canEdit là true */}
        {canEdit && (
          <button 
            className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
            onClick={() => alert('Đi tới trang chỉnh sửa')} // Thay bằng chức năng điều hướng tới trang chỉnh sửa
          >
            Chỉnh sửa
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HotelDetails;
