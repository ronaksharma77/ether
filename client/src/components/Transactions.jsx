import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsTable = ({ transactions }) => (
  <table className="min-w-full bg-[#181918] text-white">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b border-gray-200">From</th>
        <th className="py-2 px-4 border-b border-gray-200">To</th>
        <th className="py-2 px-4 border-b border-gray-200">Amount (ETH)</th>
        <th className="py-2 px-4 border-b border-gray-200">Message</th>
        <th className="py-2 px-4 border-b border-gray-200">Timestamp</th>
      </tr>
    </thead>
    <tbody>
  {transactions.map((transaction, i) => (
    <tr key={i} className="hover:bg-gray-700">
      <td className="py-2 px-4 border-b border-gray-200">
        <a
          href={`https://sepolia.etherscan.io/address/${transaction.addressFrom}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {shortenAddress(transaction.addressFrom)}
        </a>
      </td>
      <td className="py-2 px-4 border-b border-gray-200">
        <a
          href={`https://sepolia.etherscan.io/address/${transaction.addressTo}`}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          {shortenAddress(transaction.addressTo)}
        </a>
      </td>
      <td className="py-2 px-4 border-b border-gray-200">{transaction.amount}</td>
      <td className="py-2 px-4 border-b border-gray-200">{transaction.message || '-'}</td>
      <td className="py-2 px-4 border-b border-gray-200">{transaction.timestamp}</td>
    </tr>
  ))}
</tbody>

  </table>
);

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="mt-10 overflow-x-auto">
          <TransactionsTable transactions={[...dummyData, ...transactions].reverse()} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
