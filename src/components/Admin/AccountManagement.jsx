import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import { PiGreaterThanBold } from "react-icons/pi";
import "./styleadmin.scss";

const accountData = [
  { id: 1, email: "abc@gmail.com", phone: "0931951269", role: "S" },
  { id: 2, email: "xyz@gmail.com", phone: "0931951269", role: "C" },
  { id: 3, email: "hhs@gmail.com", phone: "0931951269", role: "S" },
  { id: 4, email: "hahaha@gmail.com", phone: "0931951269", role: "C" },
  { id: 5, email: "user5@gmail.com", phone: "0931951270", role: "S" },
  { id: 6, email: "john.doe@gmail.com", phone: "0931951280", role: "C" },
  { id: 7, email: "admin@example.com", phone: "0931951290", role: "S" },
  { id: 8, email: "jane.doe@gmail.com", phone: "0931951300", role: "C" },
  { id: 9, email: "alice.smith@gmail.com", phone: "0931951310", role: "S" },
  { id: 10, email: "bob.johnson@gmail.com", phone: "0931951320", role: "C" },
  { id: 11, email: "charlie.brown@gmail.com", phone: "0931951330", role: "S" },
  { id: 12, email: "eve.white@gmail.com", phone: "0931951340", role: "C" },
  { id: 13, email: "lucas.miller@gmail.com", phone: "0931951350", role: "S" },
  { id: 14, email: "emily.jones@gmail.com", phone: "0931951360", role: "C" },
  { id: 15, email: "olivia.green@gmail.com", phone: "0931951370", role: "S" },
  {
    id: 16,
    email: "sophia.williams@gmail.com",
    phone: "0931951380",
    role: "C",
  },
  { id: 17, email: "jack.brown@gmail.com", phone: "0931951390", role: "S" },
  { id: 18, email: "mia.taylor@gmail.com", phone: "0931951400", role: "C" },
  { id: 19, email: "ethan.martin@gmail.com", phone: "0931951410", role: "S" },
  { id: 20, email: "william.smith@gmail.com", phone: "0931951420", role: "C" },
  { id: 21, email: "sara.james@gmail.com", phone: "0931951430", role: "S" },
  { id: 22, email: "daniel.white@gmail.com", phone: "0931951440", role: "C" },
  { id: 23, email: "grace.hill@gmail.com", phone: "0931951450", role: "S" },
  { id: 24, email: "oliver.jones@gmail.com", phone: "0931951460", role: "C" },
  { id: 25, email: "amelia.davis@gmail.com", phone: "0931951470", role: "S" },
  { id: 26, email: "lucas.king@gmail.com", phone: "0931951480", role: "C" },
  { id: 27, email: "sophia.clark@gmail.com", phone: "0931951490", role: "S" },
  { id: 28, email: "isabella.scott@gmail.com", phone: "0931951500", role: "C" },
  { id: 29, email: "mason.morris@gmail.com", phone: "0931951510", role: "S" },
  { id: 30, email: "emma.lee@gmail.com", phone: "0931951520", role: "C" },
  { id: 31, email: "logan.evans@gmail.com", phone: "0931951530", role: "S" },
  { id: 32, email: "mia.walker@gmail.com", phone: "0931951540", role: "C" },
  { id: 33, email: "lily.jameson@gmail.com", phone: "0931951550", role: "S" },
  { id: 34, email: "chloe.wright@gmail.com", phone: "0931951560", role: "C" },
  { id: 35, email: "zoe.mitchell@gmail.com", phone: "0931951570", role: "S" },
  { id: 36, email: "liam.carter@gmail.com", phone: "0931951580", role: "C" },
  { id: 37, email: "noah.young@gmail.com", phone: "0931951590", role: "S" },
  { id: 38, email: "ava.brown@gmail.com", phone: "0931951600", role: "C" },
  { id: 39, email: "elijah.harris@gmail.com", phone: "0931951610", role: "S" },
  {
    id: 40,
    email: "charlotte.martinez@gmail.com",
    phone: "0931951620",
    role: "C",
  },
];

const itemsPerPage = 10;

const AccountManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [accounts, setAccounts] = useState(accountData);
  const [showModal, setShowModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    email: "",
    phone: "",
    role: "C",
  });

  const filteredData = accounts.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleEdit = (id) => {
    const account = accounts.find((item) => item.id === id);
    setEditAccount(account);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    setAccountToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setAccounts(accounts.filter((item) => item.id !== accountToDelete));
    setShowModal(false);
  };

  const cancelDelete = () => setShowModal(false);

  const confirmEdit = () => {
    setAccounts(
      accounts.map((item) => (item.id === editAccount.id ? editAccount : item))
    );
    setShowEditModal(false);
  };

  const cancelEdit = () => setShowEditModal(false);

  const handleAddNewAccount = () => {
    setShowAddModal(true);
  };

  const confirmAdd = () => {
    // Check if the email already exists
    const existingAccount = accounts.find(
      (account) => account.email === newAccount.email
    );

    if (existingAccount) {
      alert("Email này đã tồn tại. Vui lòng nhập email khác.");
      // Clear the form fields after showing the alert
      setNewAccount({ email: "", phone: "", role: "C" });
      return; // Prevent adding if the email exists
    }

    // Add new account if validation passes
    setAccounts([...accounts, { id: Date.now(), ...newAccount }]);
    setShowAddModal(false); // Close the add modal after adding
    setNewAccount({ email: "", phone: "", role: "C" }); // Reset the new account form
  };

  const cancelAdd = () => {
    setShowAddModal(false);
    setNewAccount({ email: "", phone: "", role: "C" }); // Reset on cancel
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div
          className="sidebar-item"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <span>
            <BsHouseFill />
          </span>
          <span>Trang chủ Admin</span>
        </div>
        <div className="sidebar-item">Phân quyền</div>
        <div className="sidebar-item">Quản lý giao dịch</div>
        <div className="sidebar-item active">Quản lý tài khoản</div>
        <div className="sidebar-item">Log Out </div>
      </div>

      <div className="content">
        <h2>
          <span style={{ fontSize: 20 }}>
            <BsHouseFill />
          </span>
          <span style={{ fontSize: 10 }}>
            <PiGreaterThanBold />
          </span>
          Quản lý tài khoản
        </h2>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="add-button" onClick={handleAddNewAccount}>
            + Thêm
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th style={{ width: "400px" }}>Email</th>
              <th>Số điện thoại</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.role === "S" ? "Staff" : "Customer"}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(item.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            next &gt;
          </button>
        </div>
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="modal show">
          <div className="modal-content">
            <h4>Xác nhận xóa tài khoản</h4>
            <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
            <div className="btn">
              <button onClick={confirmDelete} className="delete-btn">
                Xác nhận
              </button>
              <button onClick={cancelDelete} className="cancel-btn">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing account */}
      {showEditModal && (
        <div className="modal show">
          <div className="modal-content">
            <h4>Sửa tài khoản</h4>
            <input
              type="email"
              value={editAccount?.email || ""}
              onChange={(e) =>
                setEditAccount({ ...editAccount, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="text"
              value={editAccount?.phone || ""}
              onChange={(e) =>
                setEditAccount({ ...editAccount, phone: e.target.value })
              }
              placeholder="Số điện thoại"
            />
            <select
              value={editAccount?.role || ""}
              onChange={(e) =>
                setEditAccount({ ...editAccount, role: e.target.value })
              }
            >
              <option value="S">Staff</option>
              <option value="C">Customer</option>
            </select>
            <div className="btn">
              <button onClick={confirmEdit} className="edit-btn">
                Lưu
              </button>
              <button onClick={cancelEdit} className="cancel-btn">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding new account */}
      {showAddModal && (
        <div className="modal show">
          <div className="modal-content">
            <h4>Thêm tài khoản mới</h4>
            <input
              type="email"
              value={newAccount.email}
              onChange={(e) =>
                setNewAccount({ ...newAccount, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="text"
              value={newAccount.phone}
              onChange={(e) =>
                setNewAccount({ ...newAccount, phone: e.target.value })
              }
              placeholder="Số điện thoại"
            />
            <select
              value={newAccount.role}
              onChange={(e) =>
                setNewAccount({ ...newAccount, role: e.target.value })
              }
            >
              <option value="S">Staff</option>
              <option value="C">Customer</option>
            </select>
            <div className="btn">
              <button onClick={confirmAdd} className="edit-btn">
                Lưu
              </button>
              <button onClick={cancelAdd} className="cancel-btn">
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;
