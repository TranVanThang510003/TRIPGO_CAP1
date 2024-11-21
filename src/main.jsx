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
import CreateTourAI from "./components/TourAI/Page1/CreateTourAI";
import ScheduleAI from "./components/TourAI/Page2/ScheduleAi";
import ScheduleAIExpand from "./components/TourAI/Page2/ScheduleAI2";
import TypeTourAI from "./components/TourAI/Page3/TypeTourAI";
import HobbyAI from "./components/TourAI/Page4/HobbyAI";
import AccountManagement from "./components/Admin/AccountManagement";
import PermissionsTable from "./components/Admin/PermissionsTable";
import Recommendations from "./components/TourAI/Page5/Recommendations";
import DashBoard from "./components/Dashboard 01-16-13-861/DashBoard";
import FoodType from "./components/TourAI/Page6/FoodType";
import "../src/index.css";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home Page */}
        <Route path="/hotels" element={<HotelPage />} /> {/* Hotel Page */}
        <Route path="/restaurants" element={<Restaurant />} />{" "}
        <Route path="/profile" element={<UserProfile />} />{" "}
        <Route path="/tours" element={<TourPage />} /> {/* User Profile Page */}
        <Route path="/tourai" element={<CreateTourAI />} />{" "}
        <Route path="/scheduleai" element={<ScheduleAI />} />{" "}
        <Route path="/scheduleaiexpand" element={<ScheduleAIExpand />} />{" "}
        <Route path="/typetourai" element={<TypeTourAI />} />{" "}
        <Route path="/hobbyai" element={<HobbyAI />} />{" "}
        <Route path="/accountmanage" element={<AccountManagement />} />{" "}
        <Route path="/permissionsmanage" element={<PermissionsTable />} />{" "}
        <Route path="/recommendations" element={<Recommendations />} />{" "}
        <Route path="/dashboard" element={<DashBoard />} />{" "}
        <Route path="/foodtype" element={<FoodType />} />{" "}
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
