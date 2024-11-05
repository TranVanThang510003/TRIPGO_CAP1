import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import DatePicker from 'react-datepicker';  
import 'react-datepicker/dist/react-datepicker.css'; 
import axios from 'axios';
const SearchBar = () => {
    const [destinations, setDestinations] = useState([]); // Lưu danh sách các tỉnh thành
    const [selectedDestination, setSelectedDestination] = useState(''); // Lưu điểm đến đã chọn
    const [checkInDate, setCheckInDate] = useState(null);  
    const [checkOutDate, setCheckOutDate] = useState(null);  
    const [rooms, setRooms] = useState(1); 
    const [adults, setAdults] = useState(1);  
    const [children, setChildren] = useState(0);  
    const [showDropdown, setShowDropdown] = useState(false);  

    // Hàm để tính ngày hôm sau cho ngày trả phòng
    const getNextDay = (date) => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1); // Cộng thêm 1 ngày
        return nextDay;
    };

    // Hàm toggle hiển thị dropdown chọn số lượng phòng
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Hàm để tăng/giảm số phòng, người lớn, trẻ em
    const increment = (setter, value) => setter(value + 1);
    const decrement = (setter, value) => value > 0 && setter(value - 1);

    // Gọi API để lấy danh sách tỉnh thành phố từ endpoint
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('https://provinces.open-api.vn/api/p/');
                setDestinations(response.data); // Lưu danh sách tỉnh/thành vào state
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tỉnh/thành:", error);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <div className="mt-[80px] marker:h-auto w-full flex flex-col justify-center">
            <div className="bg-cover bg-center h-80 flex items-center" 
                style={{
                    backgroundImage: "url('public/img/bannerHotel.jpeg')"
                }}
            >    
                <div className="ml-[10%]">
                    <div className="text-white text-5xl font-bold">Khách Sạn</div> 
                    <div className="text-white text-lg font-normal">Chào mừng đến với thiên đường nghỉ dưỡng</div> 
                </div>
            </div>
            <div 
                className="inline-block max-w-fit h-auto mx-auto rounded-xl bg-customBgInput" 
                style={{
                    marginTop: "-60px"
                }}                    
            >           
                <div className="mx-4 pt-2 flex space-x-2">                       
                    {/* Điểm đến */}
                    <div className="">
                        <div className="text-sm text-slate-600 font-medium">Điểm đến</div>
                        <div className="w-64 h-16 px-6 bg-white rounded-xl text-customBlue font-medium flex justify-between items-center">
                            <Icon icon="mdi:location" className="w-7 h-7" />
                            <select 
                                value={selectedDestination} 
                                onChange={(e) => setSelectedDestination(e.target.value)} 
                                className="px-2 w-full"
                            >
                                <option>Chọn điểm đến</option>
                                {destinations.map((destination) => (
                                    <option key={destination.code} value={destination.name}>{destination.name}</option>
                                ))}
                            </select>   
                        </div>
                    </div>   

                    {/* Nhận phòng */}
                    <div className="">
                        <div className="text-sm text-slate-600 font-medium">Nhận phòng</div>
                        <div className="w-[200px] h-16 px-6 bg-white rounded-xl text-customBlue font-medium flex items-center">
                            <DatePicker
                                selected={checkInDate}
                                onChange={(date) => {
                                    setCheckInDate(date);
                                    // Nếu ngày trả phòng hiện tại nhỏ hơn hoặc bằng ngày nhận phòng, reset lại ngày trả phòng
                                    if (checkOutDate && date >= checkOutDate) {
                                        setCheckOutDate(null);
                                    }
                                }}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Chọn ngày"
                                className="w-full px-2"
                                minDate={new Date()} // Không cho phép chọn ngày quá khứ
                            />
                        </div>
                    </div>  
                    
                    {/* Trả phòng */}
                    <div className="">
                        <div className="text-sm text-slate-600 font-medium">Trả phòng</div>
                        <div className="w-[200px] h-16 px-6 bg-white rounded-xl text-customBlue font-medium flex items-center">
                            <DatePicker
                                selected={checkOutDate}
                                onChange={(date) => setCheckOutDate(date)}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Chọn ngày"
                                className="w-full px-2"
                                // Ngày trả phòng phải lớn hơn ngày nhận phòng 1 ngày
                                minDate={checkInDate ? getNextDay(checkInDate) : new Date()}
                            />
                        </div>
                    </div>  

                    {/* Số phòng, số khách */}
                    <div className="relative">
                        <div className="text-sm text-slate-600 font-medium">Số phòng, số khách</div>
                        <div
                            className="w-72 h-16 px-4 bg-white rounded-xl text-customBlue font-medium flex items-center cursor-pointer"
                            onClick={toggleDropdown}  // Toggle dropdown khi click
                        >
                            <span>{rooms} phòng, {adults} người lớn, {children} trẻ em</span>
                            <Icon icon={showDropdown ? "mdi:chevron-up" : "mdi:chevron-down"} className="w-5 h-5 ml-2" />
                        </div>

                        {/* Dropdown chọn số lượng */}
                        {showDropdown && (
                            <div className="absolute top-[100%] left-0 w-full mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                                {/* Số phòng */}
                                <div className="flex justify-between items-center mb-4">
                                    <span>Phòng</span>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            className="p-2 text-orange-500 border rounded"
                                            onClick={() => decrement(setRooms, rooms)}
                                        >
                                            <Icon icon="mdi:minus" />
                                        </button>
                                        <span>{rooms}</span>
                                        <button 
                                            className="p-2 text-orange-500 border rounded"
                                            onClick={() => increment(setRooms, rooms)}
                                        >
                                            <Icon icon="mdi:plus" />
                                        </button>
                                    </div>
                                </div>

                                {/* Số người lớn */}
                                <div className="flex justify-between items-center mb-4">
                                    <span>Người lớn</span>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            className="p-2 text-orange-500 border rounded"
                                            onClick={() => decrement(setAdults, adults)}
                                        >
                                            <Icon icon="mdi:minus" />
                                        </button>
                                        <span>{adults}</span>
                                        <button 
                                            className="p-2 text-orange-500 border rounded"
                                            onClick={() => increment(setAdults, adults)}
                                        >
                                            <Icon icon="mdi:plus" />
                                        </button>
                                    </div>
                                </div>

                                {/* Số trẻ em */}
                                <div className="flex justify-between items-center">
                                    <span>Trẻ em</span>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            className="p-2 text-orange-500 border rounded"
                                            onClick={() => decrement(setChildren, children)}
                                        >
                                            <Icon icon="mdi:minus" />
                                        </button>
                                        <span>{children}</span>
                                        <button 
                                            className="p-2 text-orange-500 border rounded"
                                            onClick={() => increment(setChildren, children)}
                                        >
                                            <Icon icon="mdi:plus" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>  
                    
                    <button className="mt-5 w-36 h-16 rounded-xl bg-customBlue text-white font-semibold flex justify-center items-center hover:bg-blue-700 duration-300">
                        Tìm kiếm
                    </button> 
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
