import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Header from "@/layout/Header.jsx";
import { SnackbarProvider } from "notistack";
// Lazy load your components
const HomePage = lazy(() => import("@/Page/HomePage"));
const Restaurant = lazy(() => import("@/Page/Restaurant"));
const HotelPage = lazy(() => import("@/Page/hotelpages/Hotel"));
const HotelDetails = lazy(() => import("@/Page/hotelpages/HotelDetail"));
const TourPage = lazy(() => import("@/Page/tourpages/TourPage"));
const TourDetailPage = lazy(() => import("@/Page/tourpages/TourDetailPage"));
const FunActivitiesPage = lazy(() =>
  import("@/Page/FunActivitiyPages/FunActivitiesPage")
);
const FunActivityDetail = lazy(() =>
  import("@/Page/FunActivitiyPages/FunActivityDetail")
);
const BookingCheckOutPage = lazy(() =>
  import("@/Page/bookingpage/BookingCheckOutPage")
);
const WaitingScreen = lazy(() => import("@/Page/bookingpage/WaitingScreen"));
const UserProfile = lazy(() => import("@/Page/UserProfile"));
const UserFavourite = lazy(() => import("@/Page/UserFavourite"));
const UserSetting = lazy(() => import("@/Page/UserSetting"));
const OrderInfomation = lazy(() =>
  import("@/components/UserProfile/orderInfo/OrderInformation.jsx")
);
const AccountManagement = lazy(() =>
  import("@/components/Admin/accountManagement/AccountManagement.jsx")
);
const TourManagement = lazy(() => import("@/components/Staff/TourManagement"));
const CreateTour = lazy(() =>
  import("@/components/services/createServices/createTour/createTourForm")
);
const HeaderDashboardForStaff = lazy(() =>
  import("@/components/Admin/DashboardForAmin/MainDashBoard.jsx")
);
const Notification = lazy(() =>
  import("@/components/UserProfile/notification/Notification")
);
const UpdateTourForm = lazy(() =>
  import("@/components/services/updateService/updateTour/UpdateTourForm.jsx")
);
const CreateHoTelForm = lazy(() =>
  import("@components/services/createServices/createHotel/HotelForm.jsx")
);
const ReportDashboard = lazy(() =>
  import("@/components/Staff/reportDashBoard/ReportDashBoard.jsx")
);
const TourOrderList = lazy(() =>
  import("@/components/Staff/TourOrderList.jsx")
);
const RevenueDashboard = lazy(() =>
  import("@/components/Staff/dashBoard/RevenueDashBoard.jsx")
);
const Review = lazy(() =>
  import("@/components/UserProfile/notification/Review.jsx")
);
const LoginForAdmin = lazy(() => import("@/components/auth/LoginForAdmin.jsx"));
const HotelManagement = lazy(() =>
  import("@/components/Staff/hotelMananagement/HotelManagement.jsx")
);
const AddRoom = lazy(() =>
  import(
    "@/components/services/createServices/createHotel/addRooms/AddRoom.jsx"
  )
);
const RoomManagementPage = lazy(() =>
  import(
    "@/components/Staff/hotelMananagement/roomManagement/RoomManagement.jsx"
  )
);
const NotificationAdmin = lazy(() =>
  import("@/components/Admin/Notification/Notification.jsx")
);
const MainTransactionDetails = lazy(() =>
  import(
    "@/components/Admin/TransactionDetailForAdmin/MainTransactionDetails.jsx"
  )
);
const Chat = lazy(() => import("@/components/Chatbot/Chat.jsx"));

import CreateTourAI from "./components/TourAI/Page1/CreateTourAI";
import ScheduleAI from "./components/TourAI/Page2/ScheduleAi";
import ScheduleAIExpand from "./components/TourAI/Page2/ScheduleAI2";
import TypeTourAI from "./components/TourAI/Page3/TypeTourAI";
import HobbyAI from "./components/TourAI/Page4/HobbyAI";
import Recommendations from "./components/TourAI/Page5/Recommendations";
const NotFound = () => <h2>404 - Trang không tồn tại</h2>;
const Loading = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

// Function to conditionally render Header
const ConditionalHeader = () => {
  const location = useLocation();

  // Hide Header on admin routes
  const hideHeaderRoutes = [
    "/admin",
    "/admin/dashboard",
    "/admin/accounts",
    "/admin/notification",
    "/admin/transaction",
  ];
  const isHidden = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!isHidden && (
        <>
          <Header />
          <div className="mt-[80px]"></div>
        </>
      )}
    </>
  );
};

const Main = () => {
  return (
    <Router>
      <ConditionalHeader />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage-tours" element={<TourManagement />} />
          <Route path="/admin" element={<LoginForAdmin />} />
          <Route
            path="/admin/dashboard"
            element={<HeaderDashboardForStaff />}
          />
          <Route path="/admin/accounts" element={<AccountManagement />} />
          <Route path="/admin/notification" element={<NotificationAdmin />} />
          <Route
            path="/admin/transaction"
            element={<MainTransactionDetails />}
          />
          <Route path="/hotels" element={<HotelPage />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/tours" element={<TourPage />} />
          <Route path="/tours/:tourId" element={<TourDetailPage />} />
          <Route path="/funactivities" element={<FunActivitiesPage />} />
          <Route
            path="/funactivities/:funactivityId"
            element={<FunActivityDetail />}
          />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/favourite" element={<UserFavourite />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/setting" element={<UserSetting />} />
          <Route path="/order" element={<OrderInfomation />} />
          <Route
            path="/bookingcheckoutpage"
            element={<BookingCheckOutPage />}
          />
          <Route path="/waitingscreen" element={<WaitingScreen />} />
          <Route path="/create-tour" element={<CreateTour />} />
          <Route path="/update-tour/:tourId" element={<UpdateTourForm />} />
          <Route path="/create-hotel" element={<CreateHoTelForm />} />
          <Route path="/report" element={<ReportDashboard />} />
          <Route path="/order-list" element={<TourOrderList />} />
          <Route path="/revenue" element={<RevenueDashboard />} />
          <Route path="/review/:bookingId" element={<Review />} />
          <Route path="/manage-hotels" element={<HotelManagement />} />
          <Route path="/add-rooms" element={<AddRoom />} />
          <Route path="/manage-rooms" element={<RoomManagementPage />} />
          <Route path="/tourai" element={<CreateTourAI />} />{" "}
          <Route path="/scheduleai" element={<ScheduleAI />} />{" "}
          <Route path="/scheduleaiexpand" element={<ScheduleAIExpand />} />{" "}
          <Route path="/typetourai" element={<TypeTourAI />} />{" "}
          <Route path="/hobbyai" element={<HobbyAI />} />{" "}
          <Route path="/recommendations" element={<Recommendations />} />{" "}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <div
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: 1000,
        }}
      >
        <Chat />
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={3} // Tối đa 3 thông báo xuất hiện cùng lúc
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Main />
    </SnackbarProvider>
  </React.StrictMode>
);
