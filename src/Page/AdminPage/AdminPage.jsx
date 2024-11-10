import SearchBar from "../../components/Admin/SearchBar";
import AccountTable from "../../components/Admin/AccountTable";
import Sidebar from "../../components/Admin/Sidebar";

const AdminPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <div className="flex-1 p-6 lg:p-8 ">
        <div className="text-sm text-blue-600  mb-4">Trang chủ &gt; Quản lý tài khoản</div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Quản lý tài khoản</h1>
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Add+
          </button>
        </div>
        <SearchBar />
        <AccountTable />

      </div>
    </div>
  );
};

export default AdminPage;
