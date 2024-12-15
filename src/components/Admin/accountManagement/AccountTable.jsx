import TableRow from "./TableRow.jsx";
import { useState, useEffect } from "react";
import { fetchUserAccounts, updateUserRole } from "../../services/api.js";

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        const data = await fetchUserAccounts();
        setAccounts(data.users || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tài khoản người dùng", error);
      }
    };

    loadAccounts();
  }, []);

  // Hàm xử lý thay đổi vai trò
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole); // Cập nhật vai trò trong DB
      // Cập nhật role trong state
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.userId === userId ? { ...account, role: newRole === "C" ? "customer" : "staff" } : account
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò người dùng", error);
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4 text-left">STT</th>
            <th className="py-3 px-4 text-left">Username</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Số điện thoại</th>
            <th className="py-3 px-4 text-left">Vai trò</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <TableRow 
              key={account.userId} 
              index={index + 1} 
              account={account} 
              onRoleChange={handleRoleChange} // Truyền hàm handleRoleChange vào TableRow
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTable;
