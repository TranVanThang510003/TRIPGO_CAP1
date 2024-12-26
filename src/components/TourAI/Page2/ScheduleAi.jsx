import * as React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

import HeaderAI from "../headerai";
import "../style.scss";
import dayjs from "dayjs"; // Import dayjs for date manipulation
import "dayjs/locale/vi"; // Import dayjs tiếng Việt

// Cấu hình dayjs với locale tiếng Việt
dayjs.locale("vi");

const ScheduleAI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {};

  const [selectedCity] = useState(city || { name: "", imageUrl: "" });
  const [value, setValue] = useState([null, null]);
  const [error, setError] = useState("");

  const handleNavigateToExpand = () => {
    navigate("/scheduleaiexpand", {
      state: { city: selectedCity },
      dates: value,
    });
  };

  const handleBack = () => {
    navigate("/tourai");
  };

  const handleContinue = () => {
    if (value[0] && value[1]) {
      const startDate = dayjs(value[0]);
      const endDate = dayjs(value[1]);

      // Tính sự khác biệt giữa hai ngày và cộng thêm 1
      const dayDifference = endDate.diff(startDate, "day") + 1;

      if (dayDifference > 7) {
        setError("Phạm vi ngày không được vượt quá 7 ngày.");
        setValue([null, null]);
      } else {
        setError(""); // Clear error
        setValue([startDate, endDate]); // Cập nhật ngày
        navigate("/typetourai", {
          state: {
            city: selectedCity,
            dates: value,
            dayDifference: dayDifference, // Truyền dayDifference đã cộng thêm 1
          },
        });
      }
    } else {
      setError("Vui lòng chọn ngày hợp lệ.");
    }
  };

  const handleDateChange = (newValue) => {
    if (newValue[0] && newValue[1]) {
      const startDate = dayjs(newValue[0]);
      const endDate = dayjs(newValue[1]);

      // Tính sự khác biệt giữa hai ngày
      const dayDifference = endDate.diff(startDate, "day") + 1;

      // Kiểm tra nếu phạm vi ngày vượt quá 7 ngày
      if (dayDifference > 7) {
        // Nếu quá 7 ngày, in lỗi vào console và không thay đổi giá trị
        console.log("Lỗi: Phạm vi ngày không được vượt quá 7 ngày.");
        setError("Phạm vi ngày không được vượt quá 7 ngày.");
        setValue([null, null]); // Reset giá trị để tránh nhập phạm vi ngày không hợp lệ
      } else {
        // Nếu không quá 7 ngày, in ngày đã chọn vào console và hiển thị hiệu số ngày
        const startDateFormatted = startDate.format("dddd, D MMMM YYYY");
        const endDateFormatted = endDate.format("dddd, D MMMM YYYY");
        console.log(
          `Ngày đã chọn: ${startDateFormatted} đến ${endDateFormatted}`
        );
        console.log(`Sự khác biệt giữa hai ngày là: ${dayDifference} ngày`); // Hiển thị hiệu số ngày
        setError(""); // Clear error
        setValue(newValue); // Cập nhật giá trị ngày hợp lệ
      }
    } else {
      console.log("Không có ngày chọn.");
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
          <DemoContainer components={["DateRangePicker"]}>
            <DateRangePicker
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
