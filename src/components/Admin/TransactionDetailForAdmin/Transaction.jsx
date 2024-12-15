import { useEffect, useState } from "react";
import TableRowTransactions from "./TableRowTransactions.jsx";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]); // State để lưu dữ liệu từ API
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading

  useEffect(() => {
    // Hàm gọi API
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/dashboard/managetransaction"
        ); // Thay bằng API thật của bạn
        const data = await response.json();
        console.log(data); // Kiểm tra cấu trúc dữ liệu trả về để đảm bảo nó không bị giới hạn

        // Kiểm tra nếu data chứa thuộc tính Manage_Transaction và đó là một mảng
        if (data && Array.isArray(data.Manage_Transaction)) {
          setTransactions(data.Manage_Transaction); // Cập nhật state với toàn bộ dữ liệu từ API
        } else {
          console.error(
            "Manage_Transaction not found or is not an array in response"
          );
        }

        setLoading(false); // Tắt trạng thái loading
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false); // Tắt trạng thái loading nếu lỗi
      }
    };

    fetchTransactions();
  }, []); // Chỉ gọi API khi component được mount

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg shadow-md table-fixed">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left w-16">STT</th>
            <th className="py-3 px-6 text-left w-32">Username</th>
            <th className="py-3 px-6 text-left w-48">Tên Tour</th>
            <th className="py-3 px-6 text-left w-32">Giá</th>
            <th className="py-3 px-6 text-left w-48">Ngày đặt</th>

            <th className="py-3 px-6 text-center w-40">Action</th>
          </tr>
        </thead>
        <tbody>
          <TableRowTransactions transactions={transactions} />
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
