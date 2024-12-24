import { useEffect, useState } from "react";
import TableRowTransactions from "./TableRowTransactions.jsx";

const Transaction = ({ searchTerm }) => {
  const [transactions, setTransactions] = useState([]); // State để lưu dữ liệu từ API
  const [loading, setLoading] = useState(true); // State để kiểm tra trạng thái loading
  const [sortKey, setSortKey] = useState(""); // Tiêu chí sắp xếp (DATE, TOTAL_PRICE)
  const [sortOrder, setSortOrder] = useState("asc"); // Thứ tự sắp xếp (asc, desc)
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


  // Hàm sắp xếp
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Đổi thứ tự nếu cùng key
    } else {
      setSortKey(key);
      setSortOrder("asc"); // Đặt thứ tự mặc định là tăng dần
    }
  };
  // Lọc giao dịch dựa trên searchTerm
  const filteredTransactions = transactions.filter((transaction) => {
    const term = searchTerm.toLowerCase();
    return (
        transaction.USERNAME?.toLowerCase().includes(term) ||
        transaction.TOUR_NAME?.toLowerCase().includes(term) ||
        transaction.BOOKING_ID?.toString().includes(term)
    );
  });

  // Hàm sắp xếp
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "DATE") {
      const dateA = new Date(a.DATE);
      const dateB = new Date(b.DATE);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortKey === "TOTAL_PRICE") {
      const priceA = parseFloat(a.TOTAL_PRICE) || 0;
      const priceB = parseFloat(b.TOTAL_PRICE) || 0;
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    }
    return 0; // Không sắp xếp nếu không chọn tiêu chí
  });

  if (loading) {
    return <div>Loading...</div>; // Hiển thị trạng thái loading
  }

  return (
      <div className="overflow-x-auto mt-6">
        <div className="flex justify-end mb-4">
          <button
              className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => handleSort("DATE")}
          >
            Sắp xếp theo Ngày {sortKey === "DATE" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => handleSort("TOTAL_PRICE")}
          >
            Sắp xếp theo Giá {sortKey === "TOTAL_PRICE" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
        <table className="min-w-full bg-white rounded-lg shadow-md table-fixed">
          <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-6 text-left w-16">STT</th>
            <th className="py-3 px-6 text-left w-32">Username</th>
            <th className="py-3 px-6 text-left w-48">Tên Tour</th>
            <th className="py-3 px-6 text-left w-32">Giá</th>
            <th className="py-3 px-6 text-left w-48">Ngày khởi hành</th>
            <th className="py-3 px-6 text-left w-48">Ngày đặt</th>

            <th className="py-3 px-6 text-center w-40">Action</th>
          </tr>
          </thead>
          <tbody>
          <TableRowTransactions transactions={sortedTransactions} />
          </tbody>
        </table>
      </div>
  );
};

export default Transaction;
