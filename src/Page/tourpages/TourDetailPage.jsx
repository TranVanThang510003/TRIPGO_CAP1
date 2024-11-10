import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import ImageGallery from '../../components/common/ImageGallery';
import TourTitleAndRating from '../../components/common/TitleAndRating';
import HighlightSection from '../../components/common/HighlightSection';
import DetailSection from '../../components/common/DetailSection';
import BookingCard from '../../components/common/BookingCard';
import LikeButton from '../../components/common/LikeButton';
import ShareButton from '../../components/common/ShareButton';
import BookingForm from '../../components/Tour/TourDetail/BookingForm';
import ReturnButton from '../../components/common/returnButton';
import { Icon } from '@iconify/react/dist/iconify.js';
import { fetchTourDetails } from '../../components/services/api';

const TourDetailPage = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tourId } = useParams(); 
  const navigate = useNavigate(); // Khởi tạo hook navigate

  // Lấy thông tin người dùng từ localStorage
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const [userId, setUserId] = useState(parseInt(JSON.parse(localStorage.getItem("user")).id, 10)); 

  useEffect(() => {
    const loadTourDetails = async () => {
      try {
        if (!tourId) {
          throw new Error('Tour ID is missing in the URL.'); 
        }
        const data = await fetchTourDetails(tourId); 
        setTour(data.tour);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin tour:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTourDetails();
  }, [tourId]);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (!tour) {
    return <p>Không tìm thấy thông tin tour.</p>; 
  }

  const handleBookingClick = () => {
    console.log("Đã nhấn đặt tour!");
  };


  console.log("User role:", userRole); // Kiểm tra userRole
  console.log("User ID:", userId, "Tour createdBy:", tour?.createdBy); // Kiểm tra userId và createdBy

  // Điều kiện để hiển thị nút "Chỉnh sửa"
  const canEdit = userRole === 'staff' && tour?.createdBy === userId;
  console.log("Can Edit:", canEdit); // Kiểm tra điều kiện canEdit

  // Truyền vào 4 hình ảnh cho ImageGallery
  const images = tour.imageUrl ? [tour.imageUrl, tour.imageUrl, tour.imageUrl, tour.imageUrl] : [];


  return (
    <div className='bg-[#F8F8F8]'>
      <div className="w-4/5 mx-auto mt-[80px]">
        <Header />

        {/* Bộ sưu tập hình ảnh */}
        <div className='my-3'><ReturnButton/></div>
        <ImageGallery images={images} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <TourTitleAndRating 
              title={tour.name}
              rating={tour.averageRating}
              reviewsCount={tour.reviewCount}
              location={tour.location}
              duration={tour.duration}
            />

            <HighlightSection highlights={tour.highlights} />
  
            <DetailSection details={tour.services} />
            <BookingForm />
          </div>
  
          <div className="md:col-span-1">
            <BookingCard price={tour.price} onBookingClick={handleBookingClick} />
            <div className='flex justify-between mt-2'>
              <LikeButton />
              <ShareButton />
            </div>
          </div>
        </div>

        {/* Nút "Chỉnh sửa" chỉ hiển thị khi điều kiện canEdit là true */}
        {canEdit && (
          <button 
            className=" text-6xl fixed bottom-20 right-20  text-blue-500 bg-white rounded-full shadow-lg p-4 hover:bg-blue-700 hover:text-white transition"
            onClick={() => navigate(`/edit-tour/${tourId}`)} // Sử dụng navigate để chuyển hướng đến trang chỉnh sửa
          >
             <Icon icon="game-icons:feather" /> 
           
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TourDetailPage;
