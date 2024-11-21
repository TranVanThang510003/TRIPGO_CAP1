import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { AiTwotoneEnvironment } from "react-icons/ai";
import "./style.scss";

const HeaderAI = () => {
  const location = useLocation();
  const { city } = location.state || {};

  const [selectedCity] = useState(city || { name: "", imageUrl: "" });

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
        <i style={{ display: "flex", alignItems: "center" }}>
          <AiTwotoneEnvironment />
        </i>
        <span>Powered by AI</span>
      </div>

      <div
        className="cityselect"
        style={{ display: "flex", justifyContent: "center" }}
      >
        {selectedCity.name && (
          <p>
            <b>{selectedCity.name}</b>
          </p>
        )}
      </div>
    </div>
  );
};

export default HeaderAI;
