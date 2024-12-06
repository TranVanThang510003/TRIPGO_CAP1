
import ErrorMessage from './ErrorMessage.jsx';
import moment from 'moment';

const ScheduleList = ({
                        schedules,
                        addSchedule,
                        removeSchedule,
                        departureDate,
                        setDepartureDate,
                        priceAdult,
                        setPriceAdult,
                        priceChild,
                        setPriceChild,
                        availableAdultCount,
                        setAvailableAdultCount,
                        editSchedule,


                      }) => {
    if (!Array.isArray(schedules)) {
        schedules = []; // Nếu schedules không phải là mảng, gán nó thành một mảng rỗng
    }

    const formatDate = (dateString) => {
    return moment(dateString).format('DD/MM/YYYY');
  };

  // Hàm tính trạng thái dựa trên ngày khởi hành và ngày kết thúc
  const getStatus = (departureDate, endDate) => {
    const currentDate = moment().startOf('day'); // Ngày hiện tại, không có giờ

    if (moment(departureDate).isAfter(currentDate)) {
      return "Sắp bắt đầu"; // Ngày khởi hành chưa đến
    } else if (moment(endDate).isAfter(currentDate)) {
      return "Đang diễn ra"; // Ngày kết thúc chưa qua
    } else {
      return "Đã kết thúc"; // Ngày kết thúc đã qua
    }
  };

  return (
      <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-blue-600 mb-4">
          Lịch khởi hành
        </h3>
        <div className="flex flex-row items-center justify-between gap-4 mb-6">
          {/* Ngày khởi hành */}
            <div className="w-full sm:w-1/5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày khởi hành
                </label>
                <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    min={
                        new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] // Nếu không có lịch trình, chọn từ ngày mai
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Ngày khởi hành"
                />

            </div>
            {/* Giá người lớn */}
            <div className="w-full sm:w-1/5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá người lớn
                </label>
                <input
                    type="number"
                    value={priceAdult}
                    onChange={(e) => setPriceAdult(e.target.value)}
                    placeholder="Giá người lớn"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
            </div>
            {/* Giá trẻ em */}
            <div className="w-full sm:w-1/5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá trẻ em
            </label>
            <input
                type="number"
                value={priceChild}
                onChange={(e) => setPriceChild(e.target.value)}
                placeholder="Giá trẻ em"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* Số người lớn */}
          <div className="w-full sm:w-1/5">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng
            </label>
            <input
                type="number"
                value={availableAdultCount}
                onChange={(e) => setAvailableAdultCount(e.target.value)}
                placeholder="Số lượng"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          {/* Nút thêm lịch */}
          <div className="w-full sm:w-1/5 flex justify-start items-end bottom-0">
            <button
                type="button"
                onClick={addSchedule}
                className="w-full mt-6 sm:w-auto text-xl bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Thêm
            </button>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">
              Ngày khởi hành
            </th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">
              Giá người lớn
            </th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">
              Giá trẻ em
            </th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">
              Số lượng
            </th>
            <th className="border p-3 text-left text-sm font-semibold text-gray-600">
              Trạng thái
            </th>
            <th className="border p-3 text-center text-sm font-semibold text-gray-600">
              Thao tác
            </th>
          </tr>
          </thead>
          <tbody>
          {schedules.map((schedule, index) => {
            const status = getStatus(schedule.departureDate, schedule.endDate);

            return (
                <tr key={index} className="hover:bg-gray-100 transition duration-150">
                  <td className="border p-3 text-gray-700 text-sm">
                    {formatDate(schedule.departureDate)}
                  </td>
                  <td className="border p-3 text-gray-700 text-sm">
                    {schedule.priceAdult}
                  </td>
                  <td className="border p-3 text-gray-700 text-sm">
                    {schedule.priceChild}
                  </td>
                  <td className="border p-3 text-gray-700 text-sm">
                      {schedule.totalBooked}/{schedule.availableAdultCount}
                  </td>
                  <td className="border p-3 text-gray-700 text-sm">
                    {/* Hiển thị trạng thái */}
                    <span className={`font-semibold ${status === "Sắp bắt đầu" ? 'text-yellow-500' : status === "Đang diễn ra" ? 'text-green-500' : 'text-gray-500'}`}>
                    {status}
                  </span>
                  </td>
                  <td className="border p-3 text-center">
                    {/* Kiểm tra trạng thái và không cho phép sửa khi đã kết thúc */}
                    {status !== "Đã kết thúc" && (
                        <button
                            type="button"
                            onClick={() => editSchedule(index)}
                            className="text-blue-500 hover:underline mx-2"
                        >
                          Sửa
                        </button>
                    )}
                    {status === "Đã kết thúc" && (
                        <button
                            type="button"
                            className="text-gray-500 cursor-not-allowed mx-2"
                            disabled
                        >
                          Sửa
                        </button>
                    )}
                      {/* Kiểm tra trạng thái và không cho phép xóa khi đã kết thúc */}
                      {status !== "Đã kết thúc" && (
                          <button
                              type="button"
                              onClick={() => removeSchedule(index)}
                              className="text-red-500 hover:underline mx-2"
                          >
                              Xóa
                          </button>
                          )}
                      {status === "Đã kết thúc" && (
                          <button
                              type="button"
                              className="text-gray-500 hover:underline mx-2"
                              disabled
                          >
                              xóa
                          </button>
                      )}

                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>
      </div>
  );
};

export default ScheduleList;
