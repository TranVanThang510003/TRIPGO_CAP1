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

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = 'http://localhost:3000';

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

  const imageUrl = `${baseURL}${hotel?.imageUrl}`;
  const additionalImages = ensureFourImages(
    [imageUrl, ...(hotel?.roomTypes?.[0]?.bedImages?.map(img => `${baseURL}${img}`) || [])]
  );

  return (
    <div className='bg-[#F8F8F8]'>
      <Header />
      <div className="container mx-auto mt-[80px] w-4/5">
        <SearchBar />
        <div className='pt-[115px]'>
          <ImageGallery images={additionalImages} />
        </div>

        <TitleAndDescription 
          name={hotel?.name || "No Name Available"} 
          rating={hotel?.hotelType || "No Rating"} 
          description={hotel?.description || "No Description Available"} 
          pricePerNight={hotel?.roomTypes?.[0]?.roomPrice || "Liên hệ"} 
        />

        <div className="w-full bg-white mx-auto mt-5 p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <RatingAndComments 
            rating={hotel?.averageRating || 0} 
            comments={hotel?.reviewCount || 0} 
            latestComment={hotel?.latestComment || "No recent comments available"} 
            userName={hotel?.userName || "Anonymous"} 
          />
          <Amenities amenities={hotel?.amenities ? hotel.amenities.split(', ') : []} />
          <Location 
            address={hotel?.location || "No location provided"} 
            airportDistance={hotel?.airportTransfer ? 'Có xe đưa đón sân bay' : 'Không có xe đưa đón sân bay'} 
          />
        </div>

        <h4 className="text-3xl font-medium mb-4 mt-4">Chọn phòng của bạn</h4>
        <div className="flex flex-col w-full">
          {hotel?.roomTypes?.map((type) => (
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
                image: type.bedImages?.[0] ? `${baseURL}${type.bedImages[0]}` : `${baseURL}/default-room.jpg`,
                additionalImages: ensureFourImages(type.bedImages?.slice(0, 2).map(img => `${baseURL}${img}`))
              }} 
            />
          )) || <p>No rooms available</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelDetails;
