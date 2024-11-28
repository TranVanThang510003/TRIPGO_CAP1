import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Restaurant from "./Page/Restaurant"; // Import Restaurant Page
import HomePage from "./Page/HomePage"; // Import Home Page
import HotelPage from "./Page/Hotel"; // Import Hotel Page
import UserProfile from "./Page/UserProfile"; // Import User Profile Page
import TourPage from "./Page/TourPage";
import FunActivitiesPage from "./Page/FunActivitiesPage";
import HotelDetails from "./Page/HotelDetail";
import "../src/index.css";
import RestantantDetails from "./Page/RestantantDetails";
import CamPingPage from "./Page/CamPingPage";
import CampingDetail from "./Page/CampingDetail";
import CreateTourForm from "./components/CreateServer/CreateTourForm";
import CreateHotelForm from "./components/CreateServer/CreateHotelForm";

import AdminPage from "./Page/AdminPage/AdminPage";

import MainTransactionDetails from "./components/TransactionDetailForAdmin/MainTransactionDetails";
import MainDashBoard from "./components/DashboardForAmin/MainDashboard";
import MainDashBoardForStaff from "./components/DashboardForStaff/MainDashBoardForStaff";
import TourExpired from "./components/VIewBookedTours/TourExpired";
// eslint-disable-next-line react-refresh/only-export-components
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
        <Route path="/restaurantsdetails" element={<RestantantDetails />} />
        <Route path="/campings" element={<CamPingPage />} />
        <Route path="/campingsdetails" element={<CampingDetail />} />
        <Route path="/createtours" element={<CreateTourForm />} />
        <Route path="/createhotels" element={<CreateHotelForm />} />
        <Route path="/dashboardforadmins" element={<MainDashBoard />} />
        <Route path="/dashboardforstaffs" element={<MainDashBoardForStaff />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/transactiondetails" element={<MainTransactionDetails />} />
        <Route path="/tourexpired" element={<TourExpired />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
