import React, { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';
import Tags from './Tags';

// Icon marker tùy chỉnh
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [30, 40],
  iconAnchor: [15, 41],
});

// Red Icon for Current Location
// const currentLocationIcon = new L.Icon({
//   iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
//   iconSize: [40, 41],
//   iconAnchor: [20, 41],
// });

// Component xử lý zoom
const ZoomToLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 13); // Zoom đến vị trí
    }
  }, [location, map]);

  return null;
};

const MapComponent = ({
  tourLocations,
  zoomToLocation,
  selectedPath,
  // currentLocation,
  // distance, // Truyền thông tin độ dài đường đi
  // handleGetDirections,
}) => {
  // Lọc danh sách tour có tọa độ hợp lệ
  const validTourLocations = tourLocations.filter(
    (tour) => typeof tour.lat === 'number' && typeof tour.lng === 'number'
  );

  return (
    <MapContainer
      center={[16.047079, 108.20623]} // Tâm bản đồ tại Việt Nam
      zoom={6}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Zoom đến vị trí tìm kiếm */}
      <ZoomToLocation location={zoomToLocation} />
      {/* Hiển thị đường đi */}
      {/* {selectedPath && selectedPath.length > 1 && (
        <>
          <Polyline positions={selectedPath} color="blue" /> */}
      {/* Hiển thị thông tin độ dài đường đi */}
      {/* <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              zIndex: 1000,
            }}
          >
            <strong>Độ dài đường đi:</strong> {distance} km
          </div>
        </>
      )} */}
      {/* Vị trí hiện tại */}
      {/* {currentLocation && (
        <Marker position={currentLocation} icon={currentLocationIcon}>
          <Popup>Vị trí hiện tại của bạn</Popup>
        </Marker>
      )} */}
      <MarkerClusterGroup maxClusterRadius={50}>
        {validTourLocations.map((tour, index) => {
          const isZoomedLocation =
            zoomToLocation &&
            Math.abs(zoomToLocation.lat - tour.lat) < 0.0001 &&
            Math.abs(zoomToLocation.lng - tour.lng) < 0.0001;

          return (
            <Marker
              key={tour.id}
              position={[tour.lat, tour.lng]}
              icon={customIcon}
            >
              <Popup autoOpen={isZoomedLocation}>
                <div style={{ width: '250px', textAlign: 'center' }}>
                  <img
                    src={`http://localhost:3000${tour.imageUrl}`}
                    alt={tour.name}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                  <h3 style={{ margin: '10px 0', color: '#007bff' }}>
                    {tour.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#555' }}>
                    {tour.province}
                  </p>
                  <p style={{ fontSize: '14px', color: '#777' }}>
                    {tour.duration} ngày | Giá: {tour.priceAdult} đ/Người
                  </p>
                  <div>
                    <button
                      style={{
                        padding: '8px',
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '8px',
                      }}
                      onClick={() =>
                        (window.location.href = `/tours/${tour.id}`)
                      }
                    >
                      Xem chi tiết
                    </button>
                    {/* <button
                      style={{
                        padding: '8px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleGetDirections(tour)}
                    >
                      Hiển thị đường đi
                    </button> */}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComponent;
