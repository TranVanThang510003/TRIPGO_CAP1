/* eslint-disable react/prop-types */
import ErrorMessage from './ErrorMessage';
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
  const formatDate = (dateString) => {
    return moment(dateString).format('DD/MM/YYYY');
  };

  return (
    <div className="col-span-2">
      <h3 className="text-lg font-bold mb-3">Lịch khởi hành</h3>
      <div className="flex items-center gap-4 mb-4">
        {/* Ngày khởi hành */}
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          min={
            schedules.length > 0
              ? new Date(
                  new Date(
                    schedules[schedules.length - 1].departureDate
                  ).getTime() + 86400000
                )
                  .toISOString()
                  .split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Ngày khởi hành"
        />
        <input
          type="number"
          value={priceAdult}
          onChange={(e) => setPriceAdult(e.target.value)}
          placeholder="Giá người lớn"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          value={priceChild}
          onChange={(e) => setPriceChild(e.target.value)}
          placeholder="Giá trẻ em"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          value={availableAdultCount}
          onChange={(e) => setAvailableAdultCount(e.target.value)}
          placeholder="Số người lớn"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="button"
          onClick={addSchedule}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Thêm
        </button>
      </div>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">Ngày khởi hành</th>
            <th className="border p-2">Giá người lớn</th>
            <th className="border p-2">Giá trẻ em</th>
            <th className="border p-2">Số người lớn</th>
            <th className="border p-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr key={index}>
              <td className="border p-2">
                {formatDate(schedule.departureDate)}
              </td>
              <td className="border p-2">{schedule.priceAdult}</td>
              <td className="border p-2">{schedule.priceChild}</td>
              <td className="border p-2">{schedule.availableAdultCount}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => editSchedule(index)}
                  className="text-blue-500 hover:underline"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => removeSchedule(index)}
                  className="text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleList;
