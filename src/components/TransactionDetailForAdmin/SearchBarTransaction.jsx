/* eslint-disable react/prop-types */

const SearchBarTransaction = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="mt-6">
      <input
        type="text"
        placeholder="Tìm kiếm"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)} // Cập nhật giá trị tìm kiếm
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
};

export default SearchBarTransaction;
