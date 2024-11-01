import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import UserProfile from './Page/UserProfile'; 
import UserFavourite from './Page/UserFavourite.jsx';
import UserSetting from './Page/UserSetting.jsx';

import HomePage from './Page/HomePage.jsx'; 
import Restaurant from './Page/Restaurant'; 
import HotelPage from './Page/hotelpages/Hotel'; 
import HotelDetails from './Page/hotelpages/HotelDetail'; 
import TourPage from './Page/tourpages/TourPage'; 
import TourDetailPage from './Page/tourpages/TourDetailPage'; 
import FunActivitiesPage from './Page/FunActivitiyPages/FunActivitiesPage'; 
import FunActivityDetail from './Page/FunActivitiyPages/FunActivityDetail'; 
import BookingCheckOutPage from './Page/bookingpage/BookingCheckOutPage';
import WaitingScreen  from './Page/bookingpage/WaitingScreen';
import './index.css';

const Main = () => {
  return (
    <Router>
      <Routes>
        {/* Trang chính */}
        <Route path="/" element={<HomePage />} /> {/* Trang chủ */}
        
        {/* Các trang về khách sạn */}
        <Route path="/hotels" element={<HotelPage />} /> {/* Trang danh sách khách sạn */}
        <Route path="/hotels/:hotelId" element={<HotelDetails />} /> {/* Trang chi tiết khách sạn */}
        
        {/* Các trang về tour */}
        <Route path="/tours" element={<TourPage />} /> {/* Trang danh sách tour */}
        <Route path="/tours/:tourId" element={<TourDetailPage />} /> {/* Trang chi tiết tour */}
        
        {/* Các trang về hoạt động giải trí */}
        <Route path="/funactivities" element={<FunActivitiesPage />} /> {/* Trang hoạt động giải trí */}
        <Route path="/funactivities/:funactivityId" element={<FunActivityDetail />} /> {/* Trang chi tiết hoạt động giải trí */}
        
        {/* Trang về nhà hàng */}
        <Route path="/restaurants" element={<Restaurant />} /> {/* Trang nhà hàng */}
        
        {/* Trang hồ sơ người dùng */}
        <Route path="/profile" element={<UserProfile />} /> {/* Trang hồ sơ người dùng */}
        <Route path="/favourite" element={<UserFavourite/>} /> {/* Trang yêu thích */}
        <Route path="/setting" element={<UserSetting/>} /> {/* Trang cài đặt */}
        
        {/* Trang khác */}
        <Route path="/bookingcheckoutpage" element={<BookingCheckOutPage />} /> 
        <Route path="/waitingscreen" element={<WaitingScreen />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
