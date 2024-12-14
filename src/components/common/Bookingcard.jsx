import React from 'react';

const BookingCard = ({ price, onBookingClick }) => {
    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <div className='flex gap-2 justify-center'>
                <p className='text-2xl font-medium'>Giá chỉ từ </p>
                <p className="text-2xl font-bold text-customBlue mb-2">{price} đ</p>
            </div>
            <button
                onClick={onBookingClick}
                className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition duration-300">
                Chọn gói dịch vụ
            </button>
        </div>
    );
};

export default BookingCard;
