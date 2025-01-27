import React, { useState } from "react";
import { transactionsData } from "../data/Transaction";
import { Transaction } from "../types/generalTypes";

const TransactionHistory: React.FC = () => {
  const [transactions] = useState<Transaction[]>(transactionsData);
  const [loading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [filterType, setFilterType] = useState<"All" | "Debit" | "Credit">(
    "All"
  );

  // Mask account number to show only the last 4 digits
  const maskAccount = (accountNumber: string): string => {
    return accountNumber.replace(/(\d{4})-(\d{4})-(\d{4})/, "****-****-$3");
  };

  // Sorting function (for date or amount)
  const sortTransactions = (
    data: Transaction[],
    sortBy: "date" | "amount"
  ): Transaction[] => {
    return data.sort((a, b) => {
      if (sortBy === "amount") {
        return a.amount - b.amount;
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  };

  // Filter transactions by type
  const filterTransactions = (
    data: Transaction[],
    filterType: "All" | "Debit" | "Credit"
  ): Transaction[] => {
    if (filterType === "All") return data;
    return data.filter((transaction) => transaction.type === filterType);
  };

  // Paginate the transactions
  const paginateTransactions = (data: Transaction[]): Transaction[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  // Get filtered, sorted, and paginated transactions
  const getFilteredSortedTransactions = (): Transaction[] => {
    const filteredData = filterTransactions(transactions, filterType);
    const sortedData = sortTransactions(filteredData, sortBy);
    return paginateTransactions(sortedData);
  };

  // Handle sorting change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSortBy(e.target.value as "date" | "amount");
  };

  // Handle filter change
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFilterType(e.target.value as "All" | "Debit" | "Credit");
  };

  // Handle page navigation
  const handlePageChange = (newPage: number): void => {
    const totalPages = Math.ceil(transactions.length / pageSize);
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(transactions.length / pageSize);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg py-20 ">
      <div>
        <h1 className="text-2xl font-semibold text-center">The Bank</h1>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 text-center my-6">
        Transaction History
      </h2>

      {/* Sorting and Filtering Controls */}
      <div className="flex flex-wrap justify-between mb-4">
        <div className="flex flex-row sm:space-x-4 mb-4 sm:mb-0">
          <select
            className="px-4 py-2 border rounded-md border-gray-200 text-gray-500"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-200 text-gray-500 rounded-md"
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="All">All Types</option>
            <option value="Debit">Debits</option>
            <option value="Credit">Credits</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center text-gray-500">Loading transactions...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-100">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-100">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-100">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-100">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-100">
                  Account
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-100">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-100">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 bg-gray-100">
                  Method
                </th>
              </tr>
            </thead>
            <tbody>
              {getFilteredSortedTransactions().map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.description}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-medium ${
                      transaction.type === "Debit"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    ₦{transaction.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {maskAccount(transaction.account)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {transaction.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-gray-500 text-sm hover:text-blue-500"
        >
          Prev
        </button>
        <span className="text-sm text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-gray-500 text-sm hover:text-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
