// import React, { useState, useEffect } from 'react';
// import MapComponent from '../../common/Map'; // Import Map Component
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Fuse from 'fuse.js';

// const TourListAndMap = () => {
//   const [tourLocations, setTourLocations] = useState([]);
//   const [filteredTours, setFilteredTours] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedTour, setSelectedTour] = useState(null);
//   const [zoomToLocation, setZoomToLocation] = useState(null); // Vị trí zoom
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fetch danh sách tours
//   useEffect(() => {
//     const fetchTours = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('http://localhost:3000/public-tours');
//         const tours = await Promise.all(
//           response.data.tours.map(async (tour) => {
//             const location = `${tour.ward || ''}, ${tour.district || ''}, ${
//               tour.province || ''
//             }`.trim();

//             if (!tour.lat || !tour.lng) {
//               const coordinates = await fetchCoordinates(location);
//               return { ...tour, fullLocation: location, ...coordinates };
//             }
//             return { ...tour, fullLocation: location };
//           })
//         );
//         setTourLocations(tours);
//         setFilteredTours(tours); // Ban đầu hiển thị tất cả tour
//       } catch (error) {
//         console.error('Error fetching tours:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTours();
//   }, []);

//   // Cấu hình Fuse.js
//   const fuseOptions = {
//     keys: ['name', 'description', 'fullLocation'],
//     threshold: 0.4, // Độ chính xác tìm kiếm
//   };

//   // Xử lý khi nhấn nút "Tìm kiếm"
//   const handleSearch = () => {
//     const fuse = new Fuse(tourLocations, fuseOptions);

//     let filtered = tourLocations;

//     if (searchQuery) {
//       filtered = fuse.search(searchQuery).map((result) => result.item);
//     }

//     if (selectedProvince) {
//       filtered = filtered.filter((tour) => tour.province === selectedProvince);
//     }

//     setFilteredTours(filtered);

//     // Zoom đến vị trí đầu tiên của kết quả tìm kiếm
//     if (filtered.length > 0) {
//       setZoomToLocation({ lat: filtered[0].lat, lng: filtered[0].lng });
//     }
//   };

//   if (isLoading) {
//     return <div>Loading tours...</div>;
//   }

//   return (
//     <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
//       {/* Bản đồ */}
//       <div style={{ width: '75%' }}>
//         <MapComponent
//           tourLocations={filteredTours}
//           onMarkerClick={(tour) => setSelectedTour(tour)}
//           zoomToLocation={zoomToLocation} // Truyền vị trí zoom
//         />
//       </div>
//       {/* Danh sách tour */}
//       <div style={{ width: '25%', overflowY: 'auto', background: '#f9f9f9' }}>
//         <div style={{ padding: '10px', background: '#f1f1f1' }}>
//           <input
//             type="text"
//             placeholder="Tìm kiếm tour..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '10px',
//               fontSize: '16px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               marginBottom: '10px',
//             }}
//           />
//           <select
//             value={selectedProvince}
//             onChange={(e) => setSelectedProvince(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '10px',
//               fontSize: '16px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               marginBottom: '10px',
//             }}
//           >
//             <option value="">Chọn tỉnh/thành phố</option>
//             {Array.from(
//               new Set(tourLocations.map((tour) => tour.province))
//             ).map((province, index) => (
//               <option key={index} value={province}>
//                 {province}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleSearch}
//             style={{
//               width: '100%',
//               padding: '10px',
//               fontSize: '16px',
//               background: '#007bff',
//               color: 'white',
//               border: 'none',
//               borderRadius: '4px',
//               cursor: 'pointer',
//             }}
//           >
//             Tìm kiếm
//           </button>
//         </div>
//         {selectedTour ? (
//           <div style={{ padding: '10px' }}>
//             <h3>{selectedTour.name}</h3>
//             <p>{selectedTour.description}</p>
//             <p>
//               <strong>Địa điểm:</strong> {selectedTour.fullLocation}
//             </p>
//             <p>
//               <strong>Giá:</strong>{' '}
//               {selectedTour.priceAdult
//                 ? `${selectedTour.priceAdult} VND`
//                 : 'Chưa cập nhật'}
//             </p>
//             <button
//               style={{
//                 padding: '8px 16px',
//                 background: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//               onClick={() => navigate(`/tour/${selectedTour.id}`)}
//             >
//               Xem chi tiết
//             </button>
//           </div>
//         ) : (
//           <div style={{ padding: '10px', color: '#777' }}>
//             Nhấp vào một địa điểm trên bản đồ để xem thông tin
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TourListAndMap;

// // Hàm gọi OpenCage API để lấy tọa độ
// const fetchCoordinates = async (location) => {
//   try {
//     const API_KEY = '39d7dc112d3c437a846692b915cd488a'; // Thay bằng API key của bạn
//     const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//       location
//     )}&key=${API_KEY}`;
//     const response = await axios.get(url);

//     if (response.data && response.data.results.length > 0) {
//       const { lat, lng } = response.data.results[0].geometry;
//       return { lat, lng };
//     } else {
//       console.warn(`Không tìm thấy tọa độ cho địa điểm: ${location}`);
//       return null;
//     }
//   } catch (error) {
//     console.error('Lỗi khi gọi OpenCage API:', error);
//     return null;
//   }
// };
import React, { useState, useEffect } from 'react';
import MapComponent from '../../common/Map'; // Import MapComponent
import axios from 'axios';
import Fuse from 'fuse.js';

const TourListAndMap = () => {
  const [tourLocations, setTourLocations] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [zoomToLocation, setZoomToLocation] = useState(null); // Vị trí zoom
  const [selectedPath, setSelectedPath] = useState([]); // Đường đi
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null); // Vị trí hiện tại
  const [distance, setDistance] = useState(0); // Độ dài đường đi

  // Fetch danh sách tours
  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/public-tours');
        const tours = await Promise.all(
          response.data.tours.map(async (tour) => {
            if (!tour.lat || !tour.lng) {
              const coordinates = await fetchCoordinates(
                `${tour.ward || ''}, ${tour.district || ''}, ${
                  tour.province || ''
                }`.trim()
              );
              return { ...tour, ...coordinates };
            }
            return tour;
          })
        );
        setTourLocations(tours);
        setFilteredTours(tours); // Hiển thị tất cả tours ban đầu
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Cấu hình Fuse.js
  const fuseOptions = {
    keys: ['name', 'description', 'province'],
    threshold: 0.4,
  };

  // Xử lý tìm kiếm
  const handleSearch = () => {
    const fuse = new Fuse(tourLocations, fuseOptions);

    let filtered = tourLocations;

    if (searchQuery) {
      filtered = fuse.search(searchQuery).map((result) => result.item);
    }

    if (selectedProvince) {
      filtered = filtered.filter((tour) => tour.province === selectedProvince);
    }

    setFilteredTours(filtered);

    // Zoom đến địa điểm đầu tiên
    if (filtered.length > 0) {
      setZoomToLocation({
        id: filtered[0].id,
        lat: filtered[0].lat,
        lng: filtered[0].lng,
      });
    } else {
      setZoomToLocation(null);
    }
  };

  // Xử lý click vào tour trong danh sách
  const handleTourClick = (tour) => {
    setZoomToLocation({
      id: tour.id,
      lat: tour.lat,
      lng: tour.lng,
    });
  };

  // Xử lý hiển thị đường đi
  // Updated handleGetDirections to use OpenRouteService API
  const handleGetDirections = async (tour) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const currentLat = position.coords.latitude;
          const currentLng = position.coords.longitude;

          try {
            const API_KEY =
              '5b3ce3597851110001cf62489456cd3985ec404b90e1a5c14c42c924';
            const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${currentLng},${currentLat}&end=${tour.lng},${tour.lat}`;

            const response = await axios.get(url);

            if (response.data && response.data.features.length > 0) {
              const route = response.data.features[0];
              const routeCoordinates = route.geometry.coordinates.map(
                ([lng, lat]) => [lat, lng]
              );

              // Set the path and distance
              setSelectedPath(routeCoordinates);
              setZoomToLocation({ id: tour.id, lat: tour.lat, lng: tour.lng });
              setDistance(
                (route.properties.segments[0].distance / 1000).toFixed(2)
              ); // Convert meters to km
              setCurrentLocation([currentLat, currentLng]); // Set current location
            } else {
              alert('Không tìm thấy đường đi.');
            }
          } catch (error) {
            console.error('Lỗi khi gọi OpenRouteService API:', error);
            alert('Lỗi khi lấy đường đi.');
          }
        },
        (error) => {
          alert('Không thể lấy vị trí của bạn. Vui lòng bật định vị.');
        }
      );
    } else {
      alert('Trình duyệt của bạn không hỗ trợ định vị.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
      }}
    >
      {/* Thanh tìm kiếm */}
      <div
        style={{
          padding: '10px',
          background: '#f1f1f1',
          display: 'flex',
          gap: '10px',
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm tour..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <select
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        >
          <option value="">Chọn tỉnh/thành phố</option>
          {Array.from(new Set(tourLocations.map((tour) => tour.province))).map(
            (province, index) => (
              <option key={index} value={province}>
                {province}
              </option>
            )
          )}
        </select>
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Tìm kiếm
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Bản đồ */}
        <div style={{ flex: 1 }}>
          <MapComponent
            tourLocations={filteredTours}
            zoomToLocation={zoomToLocation}
            selectedPath={selectedPath} // Truyền đường đi vào MapComponent
            currentLocation={currentLocation} // Vị trí hiện tại
            distance={distance} // Độ dài đường đi
            handleGetDirections={handleGetDirections} // Truyền hàm vào MapComponent
          />
        </div>
        {/* Danh sách tour */}
        <div
          style={{ width: '400px', overflowY: 'auto', background: '#f9f9f9' }}
        >
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <div
                key={tour.id}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer',
                }}
                onClick={() => handleTourClick(tour)} // Xử lý click
              >
                <h3 style={{ margin: 0 }}>{tour.name}</h3>
                <p style={{ margin: 0 }}>{tour.fullLocation}</p>
                <button
                  style={{
                    padding: '5px 10px',
                    marginTop: '5px',
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleGetDirections(tour);
                  }}
                >
                  Hiển thị đường đi
                </button>
              </div>
            ))
          ) : (
            <div style={{ padding: '10px', color: '#777' }}>
              Không tìm thấy kết quả.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourListAndMap;

// Hàm gọi OpenCage API để lấy tọa độ
const fetchCoordinates = async (location) => {
  try {
    const API_KEY = '39d7dc112d3c437a846692b915cd488a'; // Thay bằng API key của bạn
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      location
    )}&key=${API_KEY}`;
    const response = await axios.get(url);

    if (response.data && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } else {
      console.warn(`Không tìm thấy tọa độ cho địa điểm: ${location}`);
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi gọi OpenCage API:', error);
    return null;
  }
};
