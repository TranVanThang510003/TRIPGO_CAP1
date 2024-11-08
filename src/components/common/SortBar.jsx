import { useState } from 'react';

const SortBar = ({ onSortChange }) => {
    const [priceOrder, setPriceOrder] = useState('low-to-high');
    const [ratingOrder, setRatingOrder] = useState('high-to-low');

    const handlePriceChange = (e) => {
        const selectedValue = e.target.value;
        setPriceOrder(selectedValue);
        onSortChange(selectedValue, ratingOrder);
    };

    const handleRatingChange = (e) => {
        const selectedValue = e.target.value;
        setRatingOrder(selectedValue);
        onSortChange(priceOrder, selectedValue);
    };

    return (
        <div className="w-full float-right flex justify-center items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 gap-12">
            <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-medium">Sắp xếp:</span>
                <button className="text-customBlue font-semibold hover:underline focus:outline-none">Được đề xuất</button>
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center">
                    <label className="text-gray-500 font-medium mr-2">Giá</label>
                    <select 
                        value={priceOrder} 
                        onChange={handlePriceChange} 
                        className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none"
                    >
                        <option value="low-to-high">Từ thấp đến cao</option>
                        <option value="high-to-low">Từ cao đến thấp</option>
                    </select>
                </div>

                <span className="border-r border-gray-300 h-6"></span>

                <div className="flex items-center">
                    <label className="text-gray-500 font-medium mr-2">Đánh giá</label>
                    <select 
                        value={ratingOrder} 
                        onChange={handleRatingChange} 
                        className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none"
                    >
                        <option value="high-to-low">Từ cao đến thấp</option>
                        <option value="low-to-high">Từ thấp đến cao</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SortBar;
