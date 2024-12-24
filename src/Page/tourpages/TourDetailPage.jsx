import React, { useEffect, useState , useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Footer from '../../layout/Footer';
import ImageGallery from '../../components/common/ImageGallery';
import TourTitleAndRating from '../../components/common/TitleAndRating';
import HighlightSection from '../../components/common/HighlightSection';
import DetailSection from '../../components/common/DetailSection';
import BookingCard from '../../components/common/BookingCard';
import BookingForm from '../../components/Tour/TourDetail/BookingForm';
import ReturnButton from '../../components/common/returnButton';
import ReviewCard from '../../components/common/ReviewCard';
import { Icon } from '@iconify/react/dist/iconify.js';
import UpdateTourForm from '../../components/services/updateService/updateTour/UpdateTourForm';
import { fetchTourDetails, fetchTourReviews } from '../../components/services/api'; // Gọi API từ backend

const TourDetailPage = () => {
  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]); // State lưu danh sách đánh giá từ API
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái hiển thị form chỉnh sửa
  const { tourId } = useParams();

  const [userRole, setUserRole] = useState(
      JSON.parse(localStorage.getItem("user"))?.role || null
  );
  const [userId, setUserId] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? parseInt(JSON.parse(user).id, 10) : null;
  });

  const bookingFormRef = useRef(null); // Tham chiếu đến Booking Form

  // Hàm cuộn xuống Booking Form
  const scrollToBookingForm = () => {
    const offset = 100; // Thêm khoảng đệm để tránh bị che bởi header
    const bookingFormPosition = bookingFormRef.current?.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: bookingFormPosition - offset, // Cuộn đến vị trí trừ đi khoảng đệm
      behavior: 'smooth', // Thêm hiệu ứng cuộn mượt
    });
  };


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

    const loadTourReviews = async () => {
      try {
        const response = await fetchTourReviews(tourId); // Gọi API lấy đánh giá từ backend
        setReviews(response.reviews || []);
      } catch (error) {
        console.error('Error fetching tour reviews:', error.message);
      }
    };

    loadTourDetails();
    loadTourReviews();
  }, [tourId]);

  if (loading) return <p>Loading...</p>;
  if (!tour) return <p>Không tìm thấy thông tin tour.</p>;

  const canEdit = userRole === 'staff' && tour?.createdBy === userId;

  const today = new Date();

// Tìm lịch trình có ngày khởi hành gần nhất lớn hơn hoặc bằng ngày hiện tại (tương lai)
  const nearestFutureSchedule = tour.schedules
      ?.filter(schedule => new Date(schedule.departureDate) >= today) // Lọc những lịch trình trong tương lai
      .sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate))[0]; // Sắp xếp và lấy lịch trình gần nhất

// Nếu không có lịch trình tương lai, tìm lịch trình gần nhất trong quá khứ
  const nearestPastSchedule = !nearestFutureSchedule && tour.schedules
      ?.filter(schedule => new Date(schedule.departureDate) < today) // Lọc những lịch trình trong quá khứ
      .sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate))[0]; // Sắp xếp và lấy lịch trình gần nhất trong quá khứ

// Quyết định sử dụng lịch trình nào (tương lai ưu tiên, sau đó đến quá khứ)
  const finalSchedule = nearestFutureSchedule || nearestPastSchedule;

// Lấy giá người lớn từ lịch trình đã chọn
  const priceAdult = finalSchedule?.priceAdult || tour.priceAdult || 0; // Nếu không có lịch trình, lấy giá mặc định từ tour

  console.log("Giá người lớn:", priceAdult);

  return (
      <div className="bg-[#F8F8F8]">
        <div className="w-4/5 mx-auto mt-[80px]">

          {isEditing ? (
              // Hiển thị form chỉnh sửa
              <UpdateTourForm
                  tourData={tour}
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-3">
                    <TourTitleAndRating
                        title={tour.name}
                        rating={tour.averageRating}
                        reviewsCount={tour.reviewCount}
                        location={tour.location}
                        serviceType={tour.serviceType}
                        language={tour.language}
                        tourType={tour.tourType}
                    />
                    <HighlightSection highlights={tour.highlights}/>
                    <DetailSection details={tour.services}/>
                    <div ref={bookingFormRef}>
                      <BookingForm
                          priceAdult={priceAdult}
                          priceChild={tour.priceChild}
                          tour_id={tour.id}
                          schedules={tour.schedules}
                      />
                    </div>
                  </div>

                  {/* Booking Card */}
                  <div className="md:col-span-1">
                    <div className="sticky top-28">
                      <BookingCard price={priceAdult} onBookingClick={scrollToBookingForm}/>
                    </div>
                  </div>
                  <div className="p-4 col-span-3">
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                      Đánh giá
                      <span className="flex items-center gap-1 text-yellow-500">
      {/* Hiển thị sao trung bình */}
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                className={index < Math.round(tour.averageRating) ? "text-yellow-500" : "text-gray-300"}
                            >
          ★
        </span>
                        ))}
    </span>
                      {/* Hiển thị số lượt đánh giá */}
                      <span className="text-gray-600 text-lg">({tour.reviewCount || 0} lượt đánh giá)</span>
                    </h1>

                    {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review}/>
                    ))}
                  </div>


                </div>

                {canEdit && (
                    <button
                        className="text-6xl fixed bottom-20 right-20 text-blue-500 bg-white rounded-full shadow-lg p-4 hover:bg-blue-700 hover:text-white transition"
                        onClick={() => setIsEditing(true)} // Kích hoạt trạng thái chỉnh sửa
                    >
                      <Icon icon="game-icons:feather"/>
                    </button>
                )}
              </>
          )}

        </div>
        <Footer/>
      </div>
  );
};

export default TourDetailPage;
