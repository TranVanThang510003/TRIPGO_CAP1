import React, { useEffect, useState } from 'react';
import ImageGallery from '../../components/common/ImageGallery';
import TourTitleAndRating from '../../components/common/TitleAndRating';
import HighlightSection from '../../components/common/HighlightSection';
import DetailSection from '../../components/common/DetailSection';
import BookingCard from '../../components/common/BookingCard';
import Header from '../../layout/Header';
import LikeButton from '../../components/common/LikeButton';
import ShareButton from '../../components/common/ShareButton';
import BookingForm from '../../components/Tour/TourDetail/BookingForm';
import Footer from '../../layout/Footer';
import { fetchTourDetails } from '../../components/services/api'; 
import { useParams } from 'react-router-dom'; 
import ReturnButton from '../../components/common/returnButton';
const TourDetailPage = () => {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { tourId } = useParams(); 

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
      </div>
      <Footer />
    </div>
  );
};

export default TourDetailPage;
