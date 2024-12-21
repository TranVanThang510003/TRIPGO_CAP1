import React, { useState, useEffect } from "react";
import TableRow from "./TableRow.jsx";
import { fetchUserAccounts, updateUserRole } from "../../services/api.js";

const AccountTable = () => {
  const [accounts, setAccounts] = useState([]); // Danh sách tài khoản ban đầu
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [selectedRole, setSelectedRole] = useState("All"); // Vai trò được chọn (S, C, hoặc All)
  const [sortOrder, setSortOrder] = useState("asc"); // Thứ tự sắp xếp (asc hoặc desc)

  // Fetch danh sách tài khoản từ API
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

  const filteredAccounts = accounts
      .filter((account) => {
        // Lọc theo vai trò
        if (selectedRole !== "All" && account.role !== (selectedRole === "C" ? "customer" : "staff")) {
          return false;
        }

        // Lọc theo từ khóa
        const keyword = searchTerm.toLowerCase();
        return (
            (account.username?.toLowerCase().includes(keyword) || "") || // Kiểm tra username
            (account.email?.toLowerCase().includes(keyword) || "") || // Kiểm tra email
            (account.phone?.includes(keyword) || "") // Kiểm tra phone
        );
      })
      .sort((a, b) => {
        // Sắp xếp theo joinDate
        const dateA = new Date(a.joinDate);
        const dateB = new Date(b.joinDate);

        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });

  // Hàm thay đổi vai trò người dùng
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole); // Cập nhật vai trò trong DB
      // Cập nhật vai trò trong state
      setAccounts((prevAccounts) =>
          prevAccounts.map((account) =>
              account.userId === userId
                  ? { ...account, role: newRole === "C" ? "customer" : "staff" }
                  : account
          )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật vai trò người dùng", error);
    }
  };

  // Thay đổi vai trò được chọn
  const handleRoleFilterChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // Thay đổi thứ tự sắp xếp
  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
      <div className="overflow-x-auto mt-6">
        {/* Thanh tìm kiếm */}
        <div className="flex gap-8 mb-4">
          <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 p-2 border rounded-lg"
          />
          <select
              value={selectedRole}
              onChange={handleRoleFilterChange}
              className="p-2 border rounded-lg"
          >
            <option value="All">Tất cả vai trò</option>
            <option value="C">Khách hàng (C)</option>
            <option value="S">Nhân viên (S)</option>
          </select>
          <button
              onClick={handleSortOrderChange}
              className="p-2 border bg-white rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Sắp xếp theo ngày: {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
          </button>
        </div>

        {/* Bảng danh sách tài khoản */}
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
          {filteredAccounts.map((account, index) => (
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
