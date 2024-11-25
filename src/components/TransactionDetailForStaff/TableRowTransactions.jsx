/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import TransactionDetailModal from "./TransactionDetailModal";
import { useState } from "react";

const TableRowTransactions = ({ transactions, onDeleteSuccess = () => {} }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleViewClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  const handleDeleteClick = async (bookingId) => {
    if (!bookingId) {
      alert("Không tìm thấy BOOKING_ID để xóa.");
      return;
    }

    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa giao dịch này không?"
    );
    if (!isConfirmed) return;

    try {
      console.log(
        `URL: http://localhost:3000/dashboard/deletetransaction/${bookingId}`
      );
      const response = await fetch(
        `http://localhost:3000/dashboard/deletetransaction/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Xóa giao dịch thành công!");
        onDeleteSuccess();
        window.location.reload(); // Gọi callback để component cha tự tải lại danh sách
      } else {
        const errorMessage = await response.text();
        console.error("Lỗi từ server:", errorMessage);
        alert("Xóa giao dịch thất bại. Chi tiết lỗi: " + errorMessage);
      }
    } catch (error) {
      console.error("Lỗi khi xóa giao dịch:", error.message);
      alert("Không thể kết nối đến server. Vui lòng kiểm tra kết nối.");
    }
  };
console.log(transactions)
  if (!transactions || !Array.isArray(transactions)) {
    console.error("Transactions prop is not valid or undefined.");
    return (
      <tr>
        <td colSpan="6" className="text-center text-red-500">
          Không có giao dịch nào.
        </td>
      </tr>
    );
  }

  return (
    <>
      {transactions.map((transaction, index) => (
        <tr
          key={transaction.BOOKING_ID || index}
          className="border-b hover:bg-gray-50"
        >
          <td className="py-3 px-6 text-left">{index + 1}</td>
          <td className="py-3 px-6 text-left">
            {transaction.USERNAME || "N/A"}
          </td>
          <td className="py-3 px-6 text-left">
            {transaction.TOUR_NAME || "N/A"}
          </td>
          <td className="py-3 px-6 text-left">
            {transaction.TOTAL_PRICE ? `${transaction.TOTAL_PRICE} VNĐ` : "N/A"}
          </td>
          <td className="py-3 px-6 text-left">{transaction.DATE || "N/A"}</td>
          <td className="py-3 px-6 text-center">
            <button
              className="bg-blue-400 text-white px-3 py-2 text-lg rounded-lg mr-2 hover:bg-blue-500"
              onClick={() => handleViewClick(transaction)}
            >
              <Icon icon="ion:eye" />
            </button>
            <button
              className="bg-red-500 text-lg text-white px-3 py-2 rounded-lg hover:bg-red-600"
              onClick={() => handleDeleteClick(transaction.BOOKING_ID)}
            >
              <Icon icon="mingcute:delete-fill" />
            </button>
          </td>
        </tr>
      ))}
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default TableRowTransactions;
