import React, { useState, useEffect } from "react";
import { BsHouseFill } from "react-icons/bs";
import { PiGreaterThanBold } from "react-icons/pi";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";

const PermissionsTable = () => {
  const [permissions, setPermissions] = useState([
    {
      name: "Tìm kiếm",
      admin: true,
      staff: true,
      customer: true,
    },
    {
      name: "Quản lý Tour",
      admin: false,
      staff: true,
      customer: false,
    },
    {
      name: "Thống kế doanh thu",
      admin: false,
      staff: true,
      customer: false,
    },
    {
      name: "Phân Quyền",
      admin: false,
      staff: true,
      customer: false,
    },
    // Add more data as needed
  ]);

  const handleCheckboxChange = (index, field) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index][field] = !updatedPermissions[index][field];
    setPermissions(updatedPermissions);
  };

  // This useEffect hook will run each time 'permissions' is updated
  useEffect(() => {
    // Simulate an API call to save changes in real-time
    const savePermissions = async () => {
      try {
        console.log("Saving updated permissions:", permissions);
        // Replace the following line with an actual API call to save changes
        // await api.savePermissions(permissions);
      } catch (error) {
        console.error("Error saving permissions:", error);
      }
    };
    savePermissions();
  }, [permissions]);

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
        <div className="sidebar-item active">Phân quyền</div>
        <div className="sidebar-item">Quản lý giao dịch</div>
        <div className="sidebar-item">Quản lý tài khoản</div>
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
          Phân quyền
        </h2>

        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "30px",
            margin: "20px 0",
          }}
        >
          <div
            className=""
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            <span style={{ fontSize: 20 }}>
              <IoIosCheckbox />
            </span>
            Có quyền truy cập
          </div>
          <div
            className=""
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
          >
            {" "}
            <span style={{ fontSize: 20 }}>
              <MdCheckBoxOutlineBlank />
            </span>
            Không có quyền truy cập
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Phân quyền</th>
              <th>Quản trị viên</th>
              <th>Staff</th>
              <th>Khách hàng</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.admin}
                    onChange={() => handleCheckboxChange(index, "admin")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.staff}
                    onChange={() => handleCheckboxChange(index, "staff")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.customer}
                    onChange={() => handleCheckboxChange(index, "customer")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionsTable;
