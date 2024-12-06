const TourTypeSelector = ({
  tourType,
  setTourType,
  numDays,
  setNumDays,
  scheduleDetails,
  setScheduleDetails,
  multiDaySchedules,
  setMultiDaySchedules,
  addScheduleDetail,
  resetSchedules,
}) => {
  const handleTourTypeChange = (e) => {
    const newType = e.target.value;
    setTourType(newType);

    // Reset dữ liệu dựa vào loại tour
    if (newType === 'day') {
      setNumDays(1); // Tour trong ngày chỉ có 1 ngày
      setMultiDaySchedules([]); // Xóa lịch trình nhiều ngày
      resetSchedules(); // Reset lịch khởi hành
    } else if (newType === 'multi') {
      setNumDays(2); // Tour nhiều ngày mặc định có 2 ngày
      setScheduleDetails([]); // Xóa lịch trình chi tiết trong ngày
      resetSchedules(); // Reset lịch khởi hành
    }
  };

  const handleNumDaysChange = (e) => {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue, 10);

    // Cho phép xóa hoàn toàn để nhập giá trị mới
    if (inputValue === '') {
      setNumDays('');
      return;
    }

    // Đảm bảo số ngày hợp lệ
    if (parsedValue >= 1) {
      if (parsedValue < numDays) {
        // Giảm số ngày -> cắt bớt mảng multiDaySchedules
        setMultiDaySchedules((prev) => prev.slice(0, parsedValue));
      } else {
        // Tăng số ngày -> thêm ngày trống vào multiDaySchedules
        setMultiDaySchedules((prev) => {
          const updated = [...prev];
          for (let i = prev.length; i < parsedValue; i++) {
            updated.push({ title: '', description: '' });
          }
          return updated;
        });
      }
      setNumDays(parsedValue);
    }
  };

  return (
    <div className="col-span-2">
      <h4 className="font-bold mb-3">Chọn loại tour</h4>
      <select
        value={tourType}
        onChange={handleTourTypeChange}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="day">Tour trong ngày</option>
        <option value="multi">Tour nhiều ngày</option>
      </select>

      {tourType === 'multi' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số ngày
          </label>
          <input
            type="number"
            value={numDays}
            onChange={handleNumDaysChange}
            min="1"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {/* Tour Trong Ngày */}
      {tourType === 'day' && (
        <div className="col-span-2">
          <h4 className="font-bold mb-3">Chi tiết lịch trình trong ngày</h4>
          {scheduleDetails.map((detail, index) => (
            <div key={index} className="mb-4 border p-4 rounded-md">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thời gian
                  </label>
                  <input
                    type="time"
                    value={detail.time}
                    onChange={(e) =>
                      setScheduleDetails((prev) => {
                        const updated = [...prev];
                        updated[index].time = e.target.value;
                        return updated;
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    value={detail.title}
                    onChange={(e) =>
                      setScheduleDetails((prev) => {
                        const updated = [...prev];
                        updated[index].title = e.target.value;
                        return updated;
                      })
                    }
                    placeholder="Ví dụ: Giờ khởi hành"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    value={detail.description}
                    onChange={(e) =>
                      setScheduleDetails((prev) => {
                        const updated = [...prev];
                        updated[index].description = e.target.value;
                        return updated;
                      })
                    }
                    placeholder="Nhập mô tả chi tiết"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              <div className="mt-2 text-right">
                <button
                  type="button"
                  onClick={() =>
                    setScheduleDetails((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                  className="text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addScheduleDetail}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Thêm Mục
          </button>
        </div>
      )}

      {/* Tour Nhiều Ngày */}
      {tourType === 'multi' && (
        <div className="col-span-2">
          <h4 className="font-bold mb-3">Chi tiết lịch trình cho nhiều ngày</h4>
          {[...Array(numDays).keys()].map((dayIndex) => (
            <div key={dayIndex} className="mb-6 border p-4 rounded-md">
              <h5 className="text-md font-semibold mb-2">
                Ngày {dayIndex + 1}
              </h5>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tiêu đề
                  </label>
                  <input
                    type="text"
                    value={multiDaySchedules[dayIndex]?.title || ''}
                    onChange={(e) =>
                      setMultiDaySchedules((prev) => {
                        const updated = [...prev];
                        if (!updated[dayIndex]) updated[dayIndex] = {};
                        updated[dayIndex].title = e.target.value;
                        return updated;
                      })
                    }
                    placeholder="Nhập tiêu đề cho ngày này"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    value={multiDaySchedules[dayIndex]?.description || ''}
                    onChange={(e) =>
                      setMultiDaySchedules((prev) => {
                        const updated = [...prev];
                        if (!updated[dayIndex]) updated[dayIndex] = {};
                        updated[dayIndex].description = e.target.value;
                        return updated;
                      })
                    }
                    placeholder="Nhập mô tả chi tiết cho ngày này"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourTypeSelector;
