import { useState, useEffect } from 'react';
import axios from 'axios';

const InvoiceManagement = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transactions'); // API URL
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Quản Lý Thông Tin Hóa Đơn</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Transaction ID</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Booking ID</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">ZP Trans ID</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.TRANSACTION_ID}>
              <td className="py-2 px-4 border-b">{transaction.TRANSACTION_ID}</td>
              <td className="py-2 px-4 border-b">{transaction.USER_ID}</td>
              <td className="py-2 px-4 border-b">{transaction.BOOKING_ID}</td>
              <td className="py-2 px-4 border-b">{transaction.AMOUNT.toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{transaction.STATUS}</td>
              <td className="py-2 px-4 border-b">{transaction.ZP_TRANS_ID || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{new Date(transaction.CREATED_AT).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{new Date(transaction.UPDATED_AT).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{transaction.DESCRIPTION}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceManagement;
