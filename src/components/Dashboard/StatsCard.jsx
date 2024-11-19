/* eslint-disable react/prop-types */

const StatsCard = ({ title, value, change }) => {
  return (
    <div className="stats-card">
      <h3>{title}</h3>
      <p>{value}</p>
      <span>{change}</span>
    </div>
  );
};

export default StatsCard;
