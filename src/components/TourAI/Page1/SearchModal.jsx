import React from "react";
import { FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import "../style.scss"; // Import your SCSS file
import datacity from "../datacity"; // Import your data list

const SearchModal = ({ results, searchValue, onClose, onSelect, onChange }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={onChange} // Use the passed handler to sync with parent
            className="search-input"
          />
          <span
            className="icon"
            style={{ position: "absolute", right: "80px" }}
          >
            <FaSearch />
          </span>
        </div>
        <div className="search-results">
          {results.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>
              Không có kết quả tìm kiếm cho "{searchValue}".
            </p>
          ) : (
            results.map((result, index) => (
              <div
                className="search-result-item"
                key={index}
                onClick={() => onSelect(result)} // Pass the selected result
                style={{ cursor: "pointer" }} // Show pointer cursor
              >
                <div className="icon-container">
                  <CiLocationOn />
                </div>
                <div className="details">
                  <h4>{result.name}</h4>
                  <p>{result.location}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
