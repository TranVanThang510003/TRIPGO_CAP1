/* eslint-disable react/prop-types */

const TransactionDetailModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // Đóng modal khi nhấn vào nền
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleBackgroundClick} // Lắng nghe sự kiện nhấn vào nền
    >
      <div className="bg-white p-10 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-8">Chi Tiết Giao Dịch</h2>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td className="font-bold  ">Tên Khách Hàng:</td>
              <td>{transaction.USERNAME || "N/A"}</td>
            </tr>
            <tr>
              <td className="font-bold">Tên Tour:</td>
              <td>{transaction.TOUR_NAME || "N/A"}</td>
            </tr>
            <tr>
              <td className="font-bold">Tổng tiền:</td>
              <td>{transaction.TOTAL_PRICE ? `${transaction.TOTAL_PRICE} VNĐ` : "N/A"}</td>
            </tr>
            <tr>
              <td className="font-bold">Ngày đặt:</td>
              <td>{transaction.DATE || "N/A"}</td>
            </tr>
            <tr>
              <td className="font-bold">Mô tả:</td>
              <td>{transaction.DESCRIPTION || "N/A"}</td>
            </tr>
            <tr>
              <td className="font-bold">Chi tiết:</td>
              <td>{transaction.HIGHLIGHTS || "N/A"}</td>
            </tr>
            <tr>
              <td className="font-bold">Số lượng vé người lớn:</td>
              <td>{transaction.ADULT_COUNT || "0"}</td>
            </tr>
            <tr>
              <td className="font-bold">Số lượng vé trẻ em:</td>
              <td>{transaction.CHILD_COUNT || "0"}</td>
            </tr>
            <tr>
              <td className="font-bold">Địa chỉ:</td>
              <td>{transaction.ADDRESS || "N/A"}</td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
