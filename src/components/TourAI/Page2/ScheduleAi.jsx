import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import HeaderAI from "../headerai";
import "../style.scss";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import { Progress } from "flowbite-react";

const ScheduleAI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {};

  const [selectedCity] = useState(city || { name: "", imageUrl: "" });
  const [value, setValue] = useState([null, null]);
  const [error, setError] = useState("");

  const handleNavigateToExpand = () => {
    navigate("/scheduleaiexpand", { state: { city: selectedCity } });
  };

  const handleBack = () => {
    navigate("/tourai");
  };

  const handleContinue = () => {
    if (value[0] && value[1]) {
      navigate("/typetourai", { state: { city: selectedCity, dates: value } });
    } else {
      setError("Please select a valid date range.");
    }
  };

  const handleDateChange = (newValue) => {
    // Check if the new value exceeds 7 days
    if (newValue[0] && newValue[1]) {
      const startDate = dayjs(newValue[0]);
      const endDate = dayjs(newValue[1]);
      if (endDate.diff(startDate, "day") > 7) {
        setError("The date range cannot exceed 7 days.");
        setValue([null, null]); // Reset selection or you can handle it differently
      } else {
        setError(""); // Clear error if valid
        setValue(newValue);
      }
    } else {
      setValue(newValue); // Allow setting null values
    }
  };

  return (
    <div className="container">
      <HeaderAI />
      <div className="header" style={{ textAlign: "center" }}>
        <h1>Khi nào bạn đi?</h1>
        <p>Chọn phạm vi ngày, tối đa 7 ngày.</p>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          className="calendar-container"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <DemoContainer components={["DateRangeCalendar"]}>
            <DateRangeCalendar
              value={value}
              onChange={handleDateChange} // Use the new date change handler
            />
          </DemoContainer>
        </div>
      </LocalizationProvider>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <p
        style={{ textAlign: "center", cursor: "pointer", marginTop: "35px" }}
        onClick={handleNavigateToExpand}
      >
        <u>Tôi vẫn chưa biết ngày của mình</u>
      </p>
      <div
        className="btn_navigate"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <p
          style={{ cursor: "pointer", marginRight: "auto" }}
          onClick={handleBack}
        >
          <u>Trở về</u>
        </p>
        <button className="continue-button btn" onClick={handleContinue}>
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default ScheduleAI;
