import React from 'react';
import RevenueReport from './RevenueReport';
import CustomerReport from './CustomerReport';
import CostReport from './CostReport';
import ProfitReport from './ProfitReport';
import BookingFrequencyReport from './BookingFrequencyReport';
import CustomerFeedbackReport    from "./ CustomerFeedbackReport.jsx";
import UpcomingToursReport from './UpcomingToursReport';
import TourStatusReport from './TourStatusReport';
import YearOverYearReport from './YearOverYearReport';
import './style.css'
const ReportDashboard = () => {
    return (
        <div className="report-dashboard w-4/5">
            <h1>Báo cáo tổng quan</h1>

            <RevenueReport />
            <CustomerReport />
            <CostReport />
            <ProfitReport />
            <BookingFrequencyReport />
            <CustomerFeedbackReport />
            <UpcomingToursReport />
            <TourStatusReport />
            <YearOverYearReport />
        </div>
    );
};

export default ReportDashboard;
