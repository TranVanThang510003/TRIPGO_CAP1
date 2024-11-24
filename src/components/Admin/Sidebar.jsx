const Sidebar = () => {
    return (
      <div className="w-64 bg-blue-800 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Trang chủ Admin</h2>
        <nav>
          <ul>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">Phân quyền</li>
            <li className="mb-4 hover:bg-blue-700 p-2 rounded">Quản lý giao dịch</li>
            <li className="mb-4 bg-blue-700 p-2 rounded">Quản lý tài khoản</li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;
  