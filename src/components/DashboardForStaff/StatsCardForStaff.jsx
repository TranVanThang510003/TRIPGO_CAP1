/* eslint-disable react/prop-types */

const StatsCardForStaff = ({ title, value, change }) => {
  return (
    <div className="flex flex-col w-[250px] h-[150px] justify-center items-center m-3 bg-white rounded-lg shadow-md p-4s">
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-xl font-bold text-gray-900 mb-1">{value}</p>
      <span>{change}</span>
    </div>
  );
};

export default StatsCardForStaff;
