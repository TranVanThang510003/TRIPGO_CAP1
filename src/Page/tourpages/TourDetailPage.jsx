

// export default TourDetailPage;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
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
import ReviewCard from '../../components/common/ReviewCard';
import { Icon } from '@iconify/react/dist/iconify.js';
import UpdateTourForm from '../../components/services/updateService/updateTour/UpdateTourForm';
import { fetchTourDetails } from '../../components/services/api';

const reviews = [
  {
    avatar: "/img/avatar1.jpg",
    username: "Nguyen **",
    date: "27/2",
    rating: 5,
    title: "Rất hài lòng",
    content:
        "Lớp học rất thú vị, ấm cúng; nhân viên thân thiện, nhiệt tình và có thể giao tiếp đồng thời tiếng Anh và tiếng Việt...",
    isLong: true,
    images: [
      "/img/review1.jpg",
      "/img/review2.jpg",
      "/img/review3.jpg",
      "/img/review4.jpg",
      "/img/review5.jpg",
    ],
  },
  // Thêm các đánh giá khác tại đây
];


const TourDetailPage = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái hiển thị form chỉnh sửa
  const { tourId } = useParams();

  const [userRole, setUserRole] = useState(
      JSON.parse(localStorage.getItem("user"))?.role|| null
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

  const today = new Date();

  // Tìm lịch trình có ngày khởi hành gần nhất lớn hơn hoặc bằng ngày hiện tại (tương lai)
  const nearestSchedule = tour.schedules
      ?.filter(schedule => new Date(schedule.departureDate) >= today) // Lọc những lịch trình trong tương lai
      .sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate))[0]; // Sắp xếp và lấy lịch trình gần nhất

// Nếu không có lịch trình trong tương lai, tìm lịch trình có ngày khởi hành gần nhất trong quá khứ
  const finalSchedule = nearestSchedule || tour.schedules
      ?.filter(schedule => new Date(schedule.departureDate) < today) // Lọc những lịch trình trong quá khứ
      .sort((a, b) => new Date(b.departureDate) - new Date(a.departureDate))[0]; // Sắp xếp và lấy lịch trình gần nhất trong quá khứ

// Lấy giá người lớn từ lịch trình cuối cùng (tương lai nếu có, quá khứ nếu không)
  const priceAdult = finalSchedule?.priceAdult || tour.priceAdult || 0; // Nếu không có lịch trình gần nhất, lấy giá mặc định từ tour


  return (
    <div className="bg-[#F8F8F8]">
      <div className="w-4/5 mx-auto mt-[80px]">

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
                <HighlightSection highlights={tour.highlights}/>
                <DetailSection details={tour.services}/>
                <BookingForm
                    priceAdult={tour.priceAdult}
                    priceChild={tour.priceChild}
                    tour_id={tour.id}
                    schedules={tour.schedules}

                />
              </div>

              <div className="md:col-span-1">
                <BookingCard
                    price={priceAdult}
                    onBookingClick={() => console.log('Đã nhấn đặt tour!')}
                />
                <div className="flex justify-between mt-2">
                  <LikeButton/>
                  <ShareButton/>
                </div>
              </div>
              <div className="p-4 col-span-2">
                <h1 className="text-3xl font-bold mb-2">Đánh giá</h1>

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
                <Icon icon="game-icons:feather" />
              </button>
            )}
          </>
        )}

      </div>
        <Footer />
    </div>
  );
};

export default TourDetailPage;
