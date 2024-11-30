
import SearchBarTransaction from "./SearchBarTransaction.jsx";
import SideBarTransaction from "./SideBarTransaction.jsx";
import Transaction from "./Transaction.jsx";

const MainTransactionDetails = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBarTransaction/>
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
