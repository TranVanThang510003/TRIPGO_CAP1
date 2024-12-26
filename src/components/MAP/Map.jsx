import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Icon marker tùy chỉnh
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 40],
  iconAnchor: [15, 41],
});

// Component xử lý zoom
const ZoomToLocation = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 16); // Zoom đến vị trí
    }
  }, [location, map]);

  return null;
};

// Component hiển thị cluster marker
const ClusteredMarkers = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    const markers = L.markerClusterGroup(); // Tạo cluster marker
    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng], { icon: customIcon });
      const popupContent = `
        <div style="width: 250px; text-align: center;">
          <img 
            src="http://localhost:3000${location.imageUrl}" 
            alt="${location.name}" 
            style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px;" 
          />
          <h3 style="margin: 10px 0; color: #007bff;">${location.name}</h3>
          <p style="font-size: 14px; color: #555;">${location.province}</p>
          <p style="font-size: 14px; color: #777;">${location.duration} ngày | Giá: ${location.priceAdult} đ/Người</p>
          <button 
            style="padding: 8px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;" 
            onclick="window.location.href='/tours/${location.id}'">
            Xem chi tiết
          </button>
        </div>`;
      marker.bindPopup(popupContent);
      markers.addLayer(marker);
    });

    map.addLayer(markers); // Thêm marker cluster vào bản đồ

    return () => {
      map.removeLayer(markers); // Gỡ marker cluster khi component bị hủy
    };
  }, [locations, map]);

  return null;
};

const MapComponent = ({ tourLocations, zoomToLocation }) => {
  // Lọc danh sách tour có tọa độ hợp lệ
  const validTourLocations = tourLocations.filter(
    (tour) => typeof tour.lat === "number" && typeof tour.lng === "number"
  );

  return (
    <MapContainer
      center={[16.047079, 108.20623]} // Tâm bản đồ tại Việt Nam
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ZoomToLocation location={zoomToLocation} />
      <ClusteredMarkers locations={validTourLocations} />
    </MapContainer>
  );
};

export default MapComponent;
