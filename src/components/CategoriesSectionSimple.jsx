import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { Home, Zap, ShoppingCart, ShoppingBag, Film, DollarSign } from "lucide-react";

const categoryIcons = {
  Home: Home,
  Bills: Zap,
  Food: ShoppingCart,
  Shopping: ShoppingBag,
  Entertainment: Film,
  Other: DollarSign,
};

const categoryColors = {
  Home: "bg-blue-500",
  Bills: "bg-yellow-500",
  Food: "bg-green-500",
  Shopping: "bg-purple-500",
  Entertainment: "bg-pink-500",
  Other: "bg-gray-500",
};

const CategoriesSectionSimple = () => {
  const { getExpensesByCategory, calculateTotals, expenses } = useExpenseContext();
  const categories = getExpensesByCategory();
  const { totalExpense, totalIncome } = calculateTotals();
  const [activeTab, setActiveTab] = useState("expense");

  // Get income categories
  const incomeCategories = expenses
    .filter(e => e.type === 'income')
    .reduce((acc, expense) => {
      const existing = acc.find(item => item.category === expense.category);
      if (existing) {
        existing.total += expense.amount;
      } else {
        acc.push({ category: expense.category, total: expense.amount });
      }
      return acc;
    }, []);

  // Filter categories based on active tab
  const expenseCategories = categories.filter(cat => cat.total > 0);
  const displayCategories = activeTab === "expense" ? expenseCategories : incomeCategories;
  const total = activeTab === "expense" ? totalExpense : totalIncome;
  
  return (
    <div className="bg-[#252033] rounded-xl p-6 border border-gray-800">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Categories</h2>
        
        {/* Tabs */}
        <div className="flex gap-2 bg-[#1a1625] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("expense")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === "expense"
                ? "bg-red-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setActiveTab("income")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeTab === "income"
                ? "bg-green-500 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Income
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayCategories.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-400">No {activeTab} categories yet</p>
          </div>
        ) : (
          displayCategories.map((category) => {
            const Icon = categoryIcons[category.category] || DollarSign;
            const percentage = total > 0 ? ((category.total / total) * 100).toFixed(0) : 0;
            
            return (
              <div
                key={category.category}
                className="bg-[#2d2640] rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${categoryColors[category.category] || "bg-gray-500"} group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-purple-400">{percentage}%</span>
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">{category.category}</h3>
                <p className="text-lg font-bold text-white">${category.total.toFixed(2)}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoriesSectionSimple;
