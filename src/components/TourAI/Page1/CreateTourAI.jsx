import React, { useState, useEffect } from "react";
import { AiTwotoneEnvironment } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { FiCheck } from "react-icons/fi"; // Import check icon
import { useNavigate } from "react-router-dom";
import "../style.scss";
import datalist from "../datalist";
import datacity from "../datacity";
import SearchModal from "./SearchModal";

const CreateTourAI = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState({
    name: "",
    imageUrl: "",
    coordinates: [],
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  // Function to shuffle an array
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // Function to get cities based on selected category and shuffle them
  const getShuffledCities = (category) => {
    const cities = datacity.filter((item) => item.category === category);
    return shuffleArray(cities);
  };

  const randomCities = React.useMemo(
    () => shuffleArray(datacity).slice(0, 6), // Shuffle and take random cities
    []
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (value) {
      const results = datacity.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );

      setIsModalOpen(true);
      setSearchResults(results.slice(0, 5)); // Limit results to 5
    } else {
      setIsModalOpen(false);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      setFilteredCities(getShuffledCities(selectedCategory).slice(0, 6)); // Shuffle cities based on selected category
    } else {
      setFilteredCities(randomCities);
    }
  }, [selectedCategory, randomCities]);

  const handleButtonClick = (id, name) => {
    setActiveButton((prevId) => (prevId === id ? null : id)); // Deselect if already selected
    setSelectedCategory(name);
    setFilteredCities(getShuffledCities(name).slice(0, 6)); // Shuffle cities when button is clicked
  };

  const handleImageClick = (name, imageUrl, coordinates) => {
    setSelectedCity({ name, imageUrl, coordinates });
    setSearchValue(name);
    setIsModalOpen(false);
  };

  const handleNextClick = () => {
    if (selectedCity.name) {
      navigate("/scheduleai", { state: { city: selectedCity } });
    }
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
        <i style={{ display: "flex", alignItems: "center" }}>
          <AiTwotoneEnvironment />
        </i>
        <span>Powered by AI</span>
      </div>

      <div className="header" style={{ textAlign: "center" }}>
        <h1>Bạn muốn đi đâu?</h1>
        <p>Tìm kiếm hoặc lấy cảm hứng từ các điểm đến phổ biến.</p>
      </div>

      <div className="main-options">
        {datalist.map((item) => (
          <div className="product_item" key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <button
              className="continue-button"
              style={{
                backgroundColor:
                  activeButton === item.id ? "rgb(53, 224, 161)" : "",
                cursor: "pointer",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => handleButtonClick(item.id, item.name)}
            >
              {item.name}
              {activeButton === item.id && (
                <FiCheck
                  style={{
                    marginLeft: "10px",
                    fontSize: "1.5rem",
                    display: "inline-flex",
                    verticalAlign: "middle",
                  }}
                />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="search-item">
        <div
          className="bg-white rounded-lg shadow-lg flex items-center w-full max-w-[35rem] border border-gray-300"
          style={{ marginTop: "15px" }}
        >
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-l-full text-gray-700 focus:outline-none text-xl ml-3"
          />
          <button
            onClick={handleNextClick}
            style={{ backgroundColor: "#023E73" }}
            className="text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 whitespace-nowrap"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <h2>Bắt đầu với một điểm đến phổ biến</h2>

      <div className="suggestions">
        {filteredCities.map((item) => (
          <div
            className="product_item"
            key={item.id}
            onClick={() =>
              handleImageClick(item.name, item.imageUrl, item.coordinates)
            }
            style={{ cursor: "pointer" }}
          >
            <img src={item.imageUrl} alt={item.name} />
            <div>{item.name}</div>
          </div>
        ))}
      </div>

      {/* Display search results in a modal */}
      {isModalOpen && (
        <SearchModal
          results={searchResults}
          searchValue={searchValue}
          onChange={handleInputChange}
          onSelect={(result) => {
            setSelectedCity({
              name: result.name,
              imageUrl: result.imageUrl,
              coordinates: result.coordinates,
            });
            navigate("/scheduleai", { state: { city: result } }); // Navigate directly to scheduleai
            setIsModalOpen(false); // Close modal
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <button className="continue-button btn" onClick={handleNextClick}>
        Tiếp tục
      </button>
    </div>
  );
};

export default CreateTourAI;
