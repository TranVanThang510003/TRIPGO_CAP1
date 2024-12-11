import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Lazy load your components
const HomePage = lazy(() => import('./Page/HomePage'));
const Restaurant = lazy(() => import('./Page/Restaurant'));
const HotelPage = lazy(() => import('./Page/hotelpages/Hotel'));
const HotelDetails = lazy(() => import('./Page/hotelpages/HotelDetail'));
const TourPage = lazy(() => import('./Page/tourpages/TourPage'));
const TourDetailPage = lazy(() => import('./Page/tourpages/TourDetailPage'));
const FunActivitiesPage = lazy(() => import('./Page/FunActivitiyPages/FunActivitiesPage'));
const FunActivityDetail = lazy(() => import('./Page/FunActivitiyPages/FunActivityDetail'));
const BookingCheckOutPage = lazy(() => import('./Page/bookingpage/BookingCheckOutPage'));
const WaitingScreen = lazy(() => import('./Page/bookingpage/WaitingScreen'));
const UserProfile = lazy(() => import('./Page/UserProfile'));
const UserFavourite = lazy(() => import('./Page/UserFavourite'));
const UserSetting = lazy(() => import('./Page/UserSetting'));
const OrderInfomation = lazy(() => import('./components/UserProfile/orderInfo/OrderInformation.jsx'));
const AdminPage = lazy(() => import('./Page/AdminPage/AdminPage'));
const  TourManagement= lazy(() => import('../src/components/Staff/TourManagement'));
const  CreateTour= lazy(() => import('./components/services/createServices/createTour/createTourForm'));
const  HeaderDashboardForStaff = lazy(() => import('./components/Admin/DashboardForAmin/MainDashBoard.jsx'));
const Notification = lazy(() => import('../src/components/UserProfile/notification/Notification'));
const NotFound = () => <h2>404 - Trang không tồn tại</h2>;
const UpdateTourForm = lazy(() => import('./components/services/updateService/updateTour/UpdateTourForm.jsx'));
import Header from './layout/Header.jsx';
import  CreateHoTelForm from './components/services/createServices/createHotel/CreateHoTelForm';
import ReportDashboard from "./components/Staff/reportDashBoard/ReportDashBoard.jsx";
import TourOrderList from "./components/Staff/TourOrderList.jsx";
import RevenueDashboard from "./components/Staff/RevenueDashBoard.jsx";


const Loading = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

const Main = () => {
  return (
    <Router>
      <Header/>
      <div className='mt-[80px]'></div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage-tours" element={<TourManagement />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/dashboard" element={< HeaderDashboardForStaff />} />
          <Route path="/hotels" element={<HotelPage />} />
          <Route path="/hoteldetails/:hotelId" element={<HotelDetails />} />
          <Route path="/tours" element={<TourPage />} />
          <Route path="/tours/:tourId" element={<TourDetailPage />} />
          <Route path="/funactivities" element={<FunActivitiesPage />} />
          <Route path="/funactivities/:funactivityId" element={<FunActivityDetail />} />
          <Route path="/restaurants" element={<Restaurant />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/favourite" element={<UserFavourite />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/setting" element={<UserSetting />} />
          <Route path="/order" element={<OrderInfomation />} />
          <Route path="/bookingcheckoutpage" element={<BookingCheckOutPage />} />
          <Route path="/waitingscreen" element={<WaitingScreen />} />
          <Route path="/create-tour" element={< CreateTour />} />
          <Route path="/update-tour/:tourId" element={<UpdateTourForm />} />
          CreateHoTelForm
          <Route path="/create-hotel" element={<  CreateHoTelForm />} />
          <Route path="/report" element={<  ReportDashboard />} />
          <Route path="/order-list" element={<  TourOrderList />} />
          <Route path="/revenue" element={<  RevenueDashboard />} />


          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
