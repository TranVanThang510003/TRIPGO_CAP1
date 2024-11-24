// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
// import Header from '../../layout/Header';
// import Footer from '../../layout/Footer';
// import ImageGallery from '../../components/common/ImageGallery';
// import TourTitleAndRating from '../../components/common/TitleAndRating';
// import HighlightSection from '../../components/common/HighlightSection';
// import DetailSection from '../../components/common/DetailSection';
// import BookingCard from '../../components/common/BookingCard';
// import LikeButton from '../../components/common/LikeButton';
// import ShareButton from '../../components/common/ShareButton';
// import BookingForm from '../../components/Tour/TourDetail/BookingForm';
// import ReturnButton from '../../components/common/returnButton';
// import { Icon } from '@iconify/react/dist/iconify.js';
// import { fetchTourDetails } from '../../components/services/api';

// const TourDetailPage = () => {
//   const [tour, setTour] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { tourId } = useParams();
//   const navigate = useNavigate(); // Khởi tạo hook navigate

//   // Lấy thông tin người dùng từ localStorage
//   const [userRole, setUserRole] = useState(localStorage.getItem('role'));
//   const [userId, setUserId] = useState(parseInt(JSON.parse(localStorage.getItem("user")).id, 10));

//   useEffect(() => {
//     const loadTourDetails = async () => {
//       try {
//         if (!tourId) {
//           throw new Error('Tour ID is missing in the URL.');
//         }
//         const data = await fetchTourDetails(tourId);
//         setTour(data.tour);
//       } catch (error) {
//         console.error("Lỗi khi lấy thông tin tour:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadTourDetails();
//   }, [tourId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!tour) {
//     return <p>Không tìm thấy thông tin tour.</p>;
//   }

//   const handleBookingClick = () => {
//     console.log("Đã nhấn đặt tour!");
//   };

//   // Điều kiện để hiển thị nút "Chỉnh sửa"
//   const canEdit = userRole === 'staff' && tour?.createdBy === userId;

//   // Tạo danh sách 4 ảnh từ tour.images
//   const images = tour.images && tour.images.length > 0
//     ? Array(4).fill(tour.images[0].imageUrl) // Lặp lại URL ảnh đầu tiên 4 lần
//     : []; // Nếu không có ảnh, trả về mảng rỗng

//   // Lấy ngày hiện tại
//   const today = new Date();

//   // Tìm lịch trình có ngày khởi hành gần nhất lớn hơn hoặc bằng ngày hiện tại
//   const nearestSchedule = tour.schedules
//     ?.filter(schedule => new Date(schedule.departureDate) >= today)
//     ?.sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate))[0]; // Sắp xếp theo ngày khởi hành và lấy ngày gần nhất

//   // Lấy giá người lớn từ lịch trình gần nhất
//   const priceAdult = nearestSchedule?.priceAdult || 0; // Nếu không tìm thấy lịch trình, giá mặc định là 0

//   return (
//     <div className='bg-[#F8F8F8]'>
//       <div className="w-4/5 mx-auto mt-[80px]">
//         <Header />

//         {/* Bộ sưu tập hình ảnh */}
//         <div className='my-3'><ReturnButton/></div>
//         <ImageGallery images={images} />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="md:col-span-2">
//             <TourTitleAndRating
//               title={tour.name}
//               rating={tour.averageRating}
//               reviewsCount={tour.reviewCount}
//               location={tour.location}
//               serviceType={tour.serviceType}
//               language={tour.language}
//               tourType={tour.tourType}
//             />

//             <HighlightSection highlights={tour.highlights} />

//             <DetailSection details={tour.services} />
//             <BookingForm
//               priceAdult={tour.priceAdult}
//               priceChild={tour.priceChild}
//               tour_id={tour.id}
//               schedules={tour.schedules}
//             />
//           </div>

//           <div className="md:col-span-1">
//             <BookingCard price={priceAdult} onBookingClick={handleBookingClick} />
//             <div className='flex justify-between mt-2'>
//               <LikeButton />
//               <ShareButton />
//             </div>
//           </div>
//         </div>

//         {/* Nút "Chỉnh sửa" chỉ hiển thị khi điều kiện canEdit là true */}
//         {canEdit && (
//           <button
//             className="text-6xl fixed bottom-20 right-20 text-blue-500 bg-white rounded-full shadow-lg p-4 hover:bg-blue-700 hover:text-white transition"
//             onClick={() => navigate(`/edit-tour/${tourId}`)} // Sử dụng navigate để chuyển hướng đến trang chỉnh sửa
//           >
//              <Icon icon="game-icons:feather" />
//           </button>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default TourDetailPage;
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
import UpdateTourForm from '../../updateService/updateTour/UpdateTourForm';
import { fetchTourDetails } from '../../components/services/api';

const TourDetailPage = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái hiển thị form chỉnh sửa
  const { tourId } = useParams();

  const [userRole, setUserRole] = useState(
    localStorage.getItem('role') || null
  );
  const [userId, setUserId] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? parseInt(JSON.parse(user).id, 10) : null;
  });

  useEffect(() => {
    const loadTourDetails = async () => {
      try {
        if (!tourId) throw new Error('Tour ID is missing in the URL.');
        const data = await fetchTourDetails(tourId);
        setTour(data.tour);
      } catch (error) {
        console.error('Error fetching tour details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTourDetails();
  }, [tourId]);

  if (loading) return <p>Loading...</p>;
  if (!tour) return <p>Không tìm thấy thông tin tour.</p>;

  const canEdit = userRole === 'staff' && tour?.createdBy === userId;

  return (
    <div className="bg-[#F8F8F8]">
      <div className="w-4/5 mx-auto mt-[80px]">
        <Header />

        {/* Kiểm tra trạng thái isEditing để hiển thị giao diện tương ứng */}
        {isEditing ? (
          // Hiển thị form chỉnh sửa
          <UpdateTourForm
            tourData={tour} // Truyền dữ liệu tour vào form chỉnh sửa
            onCancel={() => setIsEditing(false)} // Hàm để hủy chỉnh sửa
          />
        ) : (
          // Hiển thị chi tiết tour
          <>
            <div className="my-3">
              <ReturnButton />
            </div>
            <ImageGallery
              images={tour.images?.map((img) => img.imageUrl) || []}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <TourTitleAndRating
                  title={tour.name}
                  rating={tour.averageRating}
                  reviewsCount={tour.reviewCount}
                  location={tour.location}
                  serviceType={tour.serviceType}
                  language={tour.language}
                  tourType={tour.tourType}
                />
                <HighlightSection highlights={tour.highlights} />
                <DetailSection details={tour.services} />
                <BookingForm
                  priceAdult={tour.priceAdult}
                  priceChild={tour.priceChild}
                  tour_id={tour.id}
                  schedules={tour.schedules}
                />
              </div>

              <div className="md:col-span-1">
                <BookingCard
                  price={tour.priceAdult}
                  onBookingClick={() => console.log('Đã nhấn đặt tour!')}
                />
                <div className="flex justify-between mt-2">
                  <LikeButton />
                  <ShareButton />
                </div>
              </div>
            </div>

            {canEdit && (
              <button
                className="text-6xl fixed bottom-20 right-20 text-blue-500 bg-white rounded-full shadow-lg p-4 hover:bg-blue-700 hover:text-white transition"
                onClick={() => setIsEditing(true)} // Kích hoạt trạng thái chỉnh sửa
              >
                <Icon icon="game-icons:feather" />
              </button>
            )}
          </>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default TourDetailPage;
