import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ chartData }) => (
    <div className="bg-white col-span-1 md:col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-10 animate-fade-in">Tỷ lệ doanh thu theo tour</h2>
        <Doughnut data={chartData} options={{ responsive: true }} />
    </div>
);

export default DoughnutChart;
