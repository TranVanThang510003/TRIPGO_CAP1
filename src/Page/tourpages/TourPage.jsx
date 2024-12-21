import { useState } from 'react';
import SortBar from '../../components/common/SortBar';
import Sub from '../../components/common/Sub';
import BannerTour from '../../components/Tour/BannerTour';
import FilterSideBarTour from '../../components/Tour/FilterSideBarTuor';
import TourList from '../../components/Tour/TourList';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';

const TourPage = () => {
  const [priceOrder, setPriceOrder] = useState('low-to-high');
  const [ratingOrder, setRatingOrder] = useState('high-to-low');
  const [selectedTourTypes, setSelectedTourTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 24000000]); // Khoảng giá
  const [selectedProvince, setSelectedProvince] = useState(''); // Tỉnh/Thành phố
  const [selectedDate, setSelectedDate] = useState(null); // Ngày khởi hành
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);


  const handleSortChange = (newPriceOrder, newRatingOrder) => {
    setPriceOrder(newPriceOrder);
    setRatingOrder(newRatingOrder);
  };
  // Hàm xử lý khi khoảng giá thay đổi
  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    console.log('Price Range:', priceRange); // Log giá trị khoảng giá
  };
  const handleTourTypeChange = (newSelectedTourTypes) => {
    setSelectedTourTypes(newSelectedTourTypes);
  };
  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };

  const handleLanguageChange = (languages) => {
    setSelectedLanguages(languages);
  };

  const handleSearch = (province, date) => {
    setSelectedProvince(province);
    setSelectedDate(date);
  };
  const handleRatingChange = (ratings) => {
    console.log('Rating received in parent (TourPage):', ratings);
    setSelectedRating(ratings);
  };

  return (
    <div>
      <BannerTour
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onSearch={handleSearch}
      />
      <div className="flex w-4/5 mx-auto mt-[65px]">
        <FilterSideBarTour
          onTourTypeChange={handleTourTypeChange}
          onPriceChange={handlePriceChange}
          onDurationChange={handleDurationChange}
          onLanguageChange={handleLanguageChange}
          onRatingChange={handleRatingChange}
        />
        <div className="flex-1 ml-6 w-full">
          <SortBar onSortChange={handleSortChange} />
          <div className="mt-[100px]">
            <TourList
              priceOrder={priceOrder}
              ratingOrder={ratingOrder}
              priceRange={priceRange}
              selectedTourTypes={selectedTourTypes}
              selectedProvince={selectedProvince}
              selectedDate={selectedDate}
              selectedDuration={selectedDuration}
              selectedLanguages={selectedLanguages}
              selectedRating={selectedRating}
            />
          </div>
        </div>
      </div>
      <Sub />
      <Footer />
    </div>
  );
};

export default TourPage;
