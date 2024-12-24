
import SearchBarTransaction from "./SearchBarTransaction.jsx";
import Sidebar from "../Sidebar.jsx";
import Transaction from "./Transaction.jsx";
import  {useState} from "react";
const MainTransactionDetails = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar/>
      <div className="flex-1 p-6 lg:p-8">
        <h1 className="text-3xl font-semibold text-blue-600">
          Chi Tiết Giao dịch
        </h1>
          <SearchBarTransaction searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          <Transaction searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default MainTransactionDetails;
