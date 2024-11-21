import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="user-info">
        <img
          src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
          alt="User Avatar"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <span>Adam Joe</span>
          <span style={{ fontWeight: "normal", fontSize: "12px" }}>Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
