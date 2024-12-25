import React, { useEffect, useRef } from "react";
import mapboxgl from "@goongmaps/goong-js";
import "@goongmaps/goong-js/dist/goong-js.css";

const MapComponent = ({ city, options, hoveredLocation }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "https://tiles.goong.io/assets/goong_map_web.json",
        center: city.coordinates,
        zoom: 10,
        accessToken: "ITRT2CVavSVxCqbdGAFPnbrWIV2KPtrcjswBjy5O",
      });

      map.on("load", () => {
        options.forEach((option) => {
          new mapboxgl.Marker()
            .setLngLat(option.location)
            .setPopup(new mapboxgl.Popup().setText(option.title))
            .addTo(map);
        });
      });

      mapInstance.current = map;
    }
  }, [city.coordinates, options]);

  useEffect(() => {
    if (hoveredLocation && mapInstance.current) {
      mapInstance.current.flyTo({
        center: hoveredLocation,
        zoom: 14,
        essential: true,
      });
    }
  }, [hoveredLocation]);

  return <div ref={mapContainer} style={{ height: "100%", width: "100%" }} />;
};

export default MapComponent;
