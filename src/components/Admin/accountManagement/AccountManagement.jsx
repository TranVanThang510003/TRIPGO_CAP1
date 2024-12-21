
import AccountTable from "./AccountTable.jsx";
import Sidebar from "../Sidebar";

const  AccountManagement= () => {

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar className="w-1/6" />
            {/* Main Content Area */}
            <div className="flex-1 p-4  w-5/6  ">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-semibold text-blue-600">Quản lý tài khoản</h1>

                </div>


                < AccountTable />

            </div>
        </div>
    );
};

export default AccountManagement;
