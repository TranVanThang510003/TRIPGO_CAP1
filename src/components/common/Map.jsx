import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Fuse from "fuse.js";
import axios from "axios";

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// FlyTo helper component
const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

const Map = () => {
  const [tourLocations, setTourLocations] = useState([]); // Danh sách tour với tọa độ
  const [filteredTours, setFilteredTours] = useState([]); // Danh sách tour đã được lọc
  const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
  const [selectedProvince, setSelectedProvince] = useState(""); // Tỉnh được chọn
  const [focusedTour, setFocusedTour] = useState(null); // Vị trí tour cần tập trung
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const coordinateCache = {}; // Lưu cache tọa độ

  const fuse = new Fuse(tourLocations, {
    keys: ["name", "description", "location"],
    threshold: 0.3,
  });

  // Fetch coordinates from OpenStreetMap
  const fetchCoordinates = async (location) => {
    try {
        const API_KEY = "39d7dc112d3c437a846692b915cd488a"; // API Key của bạn
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          location
        )}&key=${API_KEY}`;
    
        const response = await axios.get(url);
    
        if (response.data && response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry;
          return { lat, lng };
        } else {
          throw new Error(`Không tìm thấy tọa độ cho địa điểm: ${location}`);
        }
      } catch (error) {
        console.error("Lỗi khi gọi OpenCage API:", error);
        throw error;
      }
  };

  // Load tours with coordinates on mount
  useEffect(() => {
    const loadLocations = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/public-tours");
        const tours = response.data.tours;

        const toursWithCoordinates = await Promise.all(
          tours.map(async (tour) => {
            try {
              const coordinates = await fetchCoordinates(tour.location);
              return { ...tour, ...coordinates }; // Thêm tọa độ vào tour
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );

        const validTours = toursWithCoordinates.filter((tour) => tour !== null);
        setTourLocations(validTours);
        setFilteredTours(validTours);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tour:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    let filtered = [...tourLocations];
    if (selectedProvince) {
      filtered = filtered.filter((tour) => tour.location === selectedProvince);
    }
    if (searchQuery) {
      const fuzzyResults = fuse.search(searchQuery).map((result) => result.item);
      filtered = filtered.filter((tour) =>
        fuzzyResults.some((fuzzyTour) => fuzzyTour.name === tour.name)
      );
    }
    setFilteredTours(filtered);
    if (filtered.length > 0) {
      setFocusedTour([filtered[0].lat, filtered[0].lng]); // Di chuyển đến tour đầu tiên
    }
  };

  if (isLoading) {
    return <div>Loading tours...</div>;
  }

  return (
    <div>
      {/* Search controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search for tours"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", flex: 1 }}
        />
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          <option value="">All Provinces</option>
          {Array.from(new Set(tourLocations.map((tour) => tour.location))).map(
            (province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            )
          )}
        </select>
        <button onClick={handleSearch} style={{ padding: "10px", fontSize: "16px" }}>
          Search
        </button>
      </div>

      {/* Map display */}
      <MapContainer center={[21.028511, 105.804817]} zoom={6} style={{ height: "70vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {focusedTour && <FlyToLocation position={focusedTour} />}
        {filteredTours.map((tour, index) => (
          <Marker
            key={index}
            position={[tour.lat, tour.lng]}
            icon={customIcon}
            eventHandlers={{
              mouseover: (e) => {
                const marker = e.target;
                if (!marker.isPopupOpen()) {
                  marker
                    .bindPopup(
                      `<b>${tour.name}</b><br>${tour.description}<br><i>${tour.location}</i>`
                    )
                    .openPopup();
                }
              },
              mouseout: (e) => {
                const marker = e.target;
                marker.closePopup();
              },
            }}
          >
            <Popup>
              <b>{tour.name}</b>
              <br />
              {tour.description}
              <br />
              <i>{tour.location}</i>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Tour list */}
      <div style={{ padding: "10px", background: "#f9f9f9", maxHeight: "150px", overflowY: "auto" }}>
        <ul>
          {filteredTours.map((tour, index) => (
            <li key={index}>
              <b>{tour.name}</b> ({tour.location}) - {tour.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;
