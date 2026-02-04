import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const ExpenseForm = ({ onClose, expense = null }) => {
  const { addExpense, updateExpense } = useExpenses();
  const [type, setType] = useState(expense?.type || "expense");
  const [description, setDescription] = useState(expense?.description || "");
  const [amount, setAmount] = useState(expense?.amount || "");
  const [category, setCategory] = useState(expense?.category || "Food");
  const [date, setDate] = useState(expense?.date || new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: "Food", label: "Food & Dining" },
    { value: "Bills", label: "Bills & Utilities" },
    { value: "Shopping", label: "Shopping" },
    { value: "Home", label: "Home & Garden" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Salary", label: "Salary" },
    { value: "Freelance", label: "Freelance" },
    { value: "Other", label: "Other" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (!description.trim()) {
        throw new Error("Please enter a description");
      }

      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      const transactionData = {
        description: description.trim(),
        amount: Number(amount),
        category,
        type,
        date,
      };

      if (expense) {
        updateExpense({ ...transactionData, id: expense.id });
        toast.success("Transaction updated successfully");
      } else {
        addExpense(transactionData);
        toast.success("Transaction added successfully");
      }

      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to save transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#252033] rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {expense ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type Toggle */}
          <div className="flex gap-2 p-1 bg-[#1a1625] rounded-lg">
            <button
              type="button"
              onClick={() => setType("expense")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                type === "expense"
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setType("income")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                type === "income"
                  ? "bg-green-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Income
            </button>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              placeholder="What did you spend on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                type="number"
                id="amount"
                placeholder="0.00"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-[#1a1625] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              disabled={isSubmitting}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1625] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 font-medium transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium transition-all shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : expense ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
