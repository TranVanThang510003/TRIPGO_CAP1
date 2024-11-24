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
    <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-blue-600 mb-4">
        Lịch khởi hành
      </h3>
      <div className="flex flex-row  items-center justify-between gap-4 mb-6">
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
            Số người lớn
          </label>
          <input
            type="number"
            value={availableAdultCount}
            onChange={(e) => setAvailableAdultCount(e.target.value)}
            placeholder="Số người lớn"
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
              Số người lớn
            </th>
            <th className="border p-3 text-center text-sm font-semibold text-gray-600">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 transition duration-150"
            >
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
                {schedule.availableAdultCount}
              </td>
              <td className="border p-3 text-center">
                <button
                  type="button"
                  onClick={() => editSchedule(index)}
                  className="text-blue-500 hover:underline mx-2"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => removeSchedule(index)}
                  className="text-red-500 hover:underline mx-2"
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
