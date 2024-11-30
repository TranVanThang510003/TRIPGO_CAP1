import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import diacritics from 'diacritics';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [data, setData] = useState([]); // Dữ liệu tour từ API
    const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
    const [suggestions, setSuggestions] = useState([]); // Gợi ý tìm kiếm
    const navigate = useNavigate();
    // Lấy dữ liệu từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/public-tours');
                // Kiểm tra dữ liệu trả về
                if (response.data && response.data.tours) {
                    setData(response.data.tours); // Lưu dữ liệu tours từ API vào state
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        fetchData();
    }, []);

    // Hàm chuẩn hóa và lọc dữ liệu (loại bỏ dấu và chuyển thành chữ thường)
    const normalizeString = (str) => {
        return diacritics.remove(str).toLowerCase(); // Loại bỏ dấu và chuyển thành chữ thường
    };

    // Hàm tìm kiếm và lọc dữ liệu
    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        // Nếu không có từ khóa tìm kiếm, ẩn gợi ý
        if (term.trim() === '') {
            setSuggestions([]);
            return;
        }

        // Lọc dữ liệu từ API theo từ khóa tìm kiếm (sử dụng normalizeString để loại bỏ dấu)
        const filtered = data.filter(item =>
            normalizeString(item.name).includes(normalizeString(term)) ||
            normalizeString(item.province).includes(normalizeString(term)) ||
            normalizeString(item.tourType).includes(normalizeString(term))
        );

        // Chỉ lấy tối đa 5 gợi ý
        setSuggestions(filtered.slice(0, 20));
    };    // Hàm khi người dùng click vào một gợi ý
    const handleSuggestionClick = (tourId) => {
        navigate(`/tours/${tourId}`); // Điều hướng đến trang chi tiết của tour
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Tìm kiếm tất cả"
                value={searchTerm}
                onChange={handleSearch} // Cập nhật khi người dùng nhập
                className="bg-[#f7f7f7] w-[367px] px-4 py-2 pl-10 pr-4 rounded-full border border-slate-400 focus:outline-none focus:border-blue-500"
            />
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            />

            {/* Hiển thị gợi ý tìm kiếm */}
            {searchTerm && suggestions.length > 0 && (
                <ul className="absolute bg-white border leading-normal p-8 border-gray-300 rounded-md mt-1 w-[900px] z-20 shadow-lg max-h-[700px] overflow-y-auto">
                    {suggestions.map((item) => (
                        <li
                            key={item.id}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2"
                            onClick={() => handleSuggestionClick(item.id)}
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass} // Biểu tượng bạn muốn thêm
                                className="text-gray-500 text-2xl mx-2"
                            />
                            <span>{item.name} - {item.province} - {item.tourType}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
