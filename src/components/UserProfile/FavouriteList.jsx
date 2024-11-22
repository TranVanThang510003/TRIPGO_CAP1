// FavouriteList.js
import React from 'react';
import FavouriteCard from './FavouriteCard';

const FavouriteList = () => {
    // Dữ liệu mẫu để hiển thị
    const sampleActivities = [
        {
            id: 1,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
        {
            id: 2,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
        {
            id: 3,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
        {
            id: 4,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
        {
            id: 5,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
        {
            id: 6,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
        {
            id: 7,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
        {
            id: 8,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
        {
            id: 9,
            name: "Vé Da Nang Downtown (Asia Park)",
            location: "Đà Nẵng",
            rating: 4.5,
            reviewCount: "5K",
            bookingCount: "10K+",
            price: "200.000đ",
            imageUrl: "https://duan-sungroup.com/wp-content/uploads/2022/11/cong-vien-chau-a-ngay-cang-thu-hut-du-khach.jpg",
        },
       
        
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleActivities.length > 0 ? (
                sampleActivities.map((activity) => (
                    <FavouriteCard key={activity.id} activity={activity} />
                ))
            ) : (
                <div className="text-center text-[#818080] text-lg font-normal font-['Baloo 2'] mt-6">
                    Không còn hoạt động yêu thích nào
                </div>
            )}
        </div>
    );
};

export default FavouriteList;
