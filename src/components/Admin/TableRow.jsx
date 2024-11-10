import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const TableRow = ({ index, account, onRoleChange }) => {
  const [role, setRole] = useState(account.role === "customer" ? "C" : "S");

  const handleRoleChange = async (e) => {
    const newRole = e.target.value;

    // Hiển thị hộp thoại xác nhận
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn thay đổi vai trò của người dùng này không?");
    if (!isConfirmed) {
      return; // Nếu người dùng chọn "Hủy", dừng việc thay đổi
    }

    try {
      // Cập nhật role tạm thời trong state
      setRole(newRole);

      // Gọi hàm `onRoleChange` để cập nhật vai trò trong cơ sở dữ liệu
      await onRoleChange(account.userId, newRole);

      // Hiển thị thông báo thành công
      alert("Vai trò đã được thay đổi thành công!");
    } catch (error) {
      // Nếu xảy ra lỗi, hiển thị thông báo thất bại và quay về vai trò ban đầu
      setRole(account.role === "customer" ? "C" : "S");
      alert("Đã xảy ra lỗi khi thay đổi vai trò. Vui lòng thử lại.");
    }
  };

  return (
    <tr className="border-b">
      <td className="py-3 px-4">{index}</td>
      <td className="py-3 px-4">{account.username || "N/A"}</td>
      <td className="py-3 px-4">{account.email || "N/A"}</td>
      <td className="py-3 px-4">{account.phone || "N/A"}</td>
      <td className="py-3 px-4">
        <select value={role} onChange={handleRoleChange} className="p-1 border rounded">
          <option value="C">C</option>
          <option value="S">S</option>
        </select>
      </td>
      <td className="py-3 px-4 text-center">
        <button className="bg-yellow-400 text-white px-4 py-2 text-xl rounded-lg mr-2 hover:bg-yellow-500">
          <Icon icon="fluent:edit-48-filled" />
        </button>
        <button className="bg-red-500 text-xl text-white px-4 py-2 rounded-lg hover:bg-red-600">
          <Icon icon="mingcute:delete-fill" />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
