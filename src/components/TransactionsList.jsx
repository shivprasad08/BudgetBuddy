import React from "react";
import {
  Home,
  Zap,
  ShoppingCart,
  Wallet,
  Dumbbell,
  Plus,
  Trash2,
  Briefcase,
} from "lucide-react";
import toast from "react-hot-toast";
import { useExpenses } from "../context/ExpenseContext";

const TransactionsList = () => {
  const { expenses, deleteExpense } = useExpenses();

  const categoryIcons = {
    Home: Home,
    Bills: Zap,
    Shopping: ShoppingCart,
    Salary: Wallet,
    Food: ShoppingCart,
    Transportation: Wallet,
    Entertainment: Dumbbell,
  };

  const categoryColors = {
    Home: "#b8860b",
    Bills: "#eab308",
    Shopping: "#10b981",
    Salary: "#3b82f6",
    Food: "#ef4444",
    Transportation: "#a855f7",
    Entertainment: "#8b5cf6",
  };

  const handleViewAll = () => {
    toast.success(`Showing ${expenses.length} transactions`);
  };

  const handleDeleteTransaction = async (id) => {
    const result = await deleteExpense(id);
    if (result?.success) {
      toast.success("Transaction deleted");
    } else {
      toast.error(result?.error || "Failed to delete transaction");
    }
  };

  const handleTransactionClick = (txn) => {
    toast.success(`${txn.description}: $${Math.abs(txn.amount).toFixed(2)}`);
  };

  const formatCurrency = (amount) => {
    const sign = amount < 0 ? "-" : "+";
    return `${sign}${Math.abs(amount).toFixed(2)}$`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-[#252033] rounded-2xl p-8 border border-[#2d2640]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white">Transactions</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleViewAll}
            className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-300 hover:underline"
          >
            See All ({expenses.length})
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {expenses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions yet. Add one to get started!</p>
          </div>
        ) : (
          expenses.slice(0, 5).map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between p-4 bg-[#2d2640] rounded-xl border border-[#3d3650] hover:border-purple-500 hover:bg-[#353048] transition-all duration-300 group"
            >
              {/* Left Side - Icon and Details */}
              <div className="flex items-center gap-4 flex-1">
                {/* Icon Circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0"
                  style={{
                    backgroundColor:
                      categoryColors[txn.category] || "#8b5cf6",
                  }}
                >
                  {React.createElement(categoryIcons[txn.category] || ShoppingCart, {
                    size: 24,
                    color: "white",
                  })}
                </div>

                {/* Transaction Info */}
                <div className="flex-1 cursor-pointer" onClick={() => handleTransactionClick(txn)}>
                  <p className="text-white font-semibold">{txn.description}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-400 text-sm">{txn.category}</p>
                    <span className="text-gray-500 text-xs">•</span>
                    <p className="text-gray-500 text-sm">
                      {formatDate(txn.date)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Amount and Delete Button */}
              <div className="flex items-center gap-4">
                <p
                  className={`font-bold text-lg ${
                    txn.type === "income"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {formatCurrency(txn.type === "income" ? txn.amount : -txn.amount)}
                </p>
                <button
                  onClick={() => handleDeleteTransaction(txn.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500 hover:bg-opacity-10 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View More */}
      <button
        onClick={handleViewAll}
        className="w-full mt-6 py-3 text-purple-400 hover:text-purple-300 font-semibold border-2 border-purple-500 hover:border-purple-400 rounded-lg transition-all duration-300 hover:bg-purple-500 hover:bg-opacity-10 active:scale-95"
      >
        View More Transactions ({expenses.length})
      </button>
    </div>
  );
};

export default TransactionsList;
