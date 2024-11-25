import SideBarProfile from "../UserProfile/SideBarProfile";
import SearchBarTransaction from "./SearchBarTransaction";
import Transaction from "./Transaction";

const MainTransactionDetails = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBarProfile/>
      <div className="flex-1 p-6 lg:p-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Chi Tiết Giao dịch
        </h1>
        <SearchBarTransaction />
        <Transaction/>
      </div>
    </div>
  );
};

export default MainTransactionDetails;
