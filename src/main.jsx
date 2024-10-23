import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Restaurant from './Page/Restaurant'; // Import Restaurant Page
import HomePage from './Page/HomePage'; // Import Home Page
import HotelPage from './Page/Hotel'; // Import Hotel Page
import UserProfile from './Page/UserProfile'; // Import User Profile Page
import TourPage from './Page/TourPage';
import FunActivitiesPage from './Page/FunActivitiesPage';
import HotelDetails from './Page/HotelDetail';
import '../src/index.css'; 


const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/hotels" element={<HotelPage />} /> 
        <Route path="/hoteldetails" element={<HotelDetails />} /> 
        <Route path="/restaurants" element={<Restaurant />} /> 
        <Route path="/profile" element={<UserProfile />} /> 
        <Route path="/tours" element={<TourPage />} />
        <Route path="/funactivities" element={<FunActivitiesPage />} /> 
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
