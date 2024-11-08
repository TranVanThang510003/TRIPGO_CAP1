import { useState } from 'react';
import SortBar from "../../components/common/SortBar";
import Sub from "../../components/common/Sub";
import BannerTour from "../../components/Tour/BannerTour";
import FilterSideBarTour from "../../components/Tour/FilterSideBarTuor";
import TourList from "../../components/Tour/TourList";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

const TourPage = () => {
  const [priceOrder, setPriceOrder] = useState('low-to-high');
  const [ratingOrder, setRatingOrder] = useState('high-to-low');

  const handleSortChange = (newPriceOrder, newRatingOrder) => {
    setPriceOrder(newPriceOrder);
    setRatingOrder(newRatingOrder);
  };

  return (
    <div>
      <Header />
      <BannerTour />
      <div className="flex w-4/5 mx-auto mt-[65px]">
        <FilterSideBarTour />
        <div className="flex-1 ml-6 w-full">
          <SortBar onSortChange={handleSortChange} />
          <div className="mt-[100px]">
            <TourList priceOrder={priceOrder} ratingOrder={ratingOrder} />
          </div>
        </div>
      </div>
      <Sub />
      <Footer />
    </div>
  );
};

export default TourPage;
