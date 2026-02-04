import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { Wallet, TrendingUp, TrendingDown, PieChart, BarChart3 } from "lucide-react";

const BalanceVisualizationSimple = () => {
  const { calculateTotals } = useExpenseContext();
  const { balance, totalIncome, totalExpense } = calculateTotals();
  const [activeChart, setActiveChart] = useState("pie");

  const total = totalIncome + totalExpense;
  const incomePercentage = total > 0 ? (totalIncome / total) * 100 : 50;
  const expensePercentage = total > 0 ? (totalExpense / total) * 100 : 50;

  return (
    <div className="bg-[#252033] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Balance</h2>
        
        {/* Chart Toggle */}
        <div className="flex gap-2 bg-[#1a1625] p-1 rounded-lg">
          <button
            onClick={() => setActiveChart("pie")}
            className={`p-2 rounded-md transition-all ${
              activeChart === "pie"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <PieChart size={16} />
          </button>
          <button
            onClick={() => setActiveChart("bar")}
            className={`p-2 rounded-md transition-all ${
              activeChart === "bar"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <BarChart3 size={16} />
          </button>
        </div>
      </div>

      {/* Balance Display */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
            <Wallet size={24} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Balance</p>
            <p className="text-2xl font-bold text-white">${balance.toFixed(2)}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">72%</p>
      </div>

      {/* Chart Visualization */}
      {activeChart === "pie" ? (
        <div className="flex items-center gap-6">
          {/* Simple Pie Chart */}
          <div className="flex-shrink-0">
            <svg width="120" height="120" viewBox="0 0 120 120">
              {/* Expense (Red) */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#ef4444"
                strokeWidth="20"
                strokeDasharray={`${(expensePercentage / 100) * 314} 314`}
                transform="rotate(-90 60 60)"
              />
              {/* Income (Green) */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#10b981"
                strokeWidth="20"
                strokeDasharray={`${(incomePercentage / 100) * 314} 314`}
                strokeDashoffset={`-${(expensePercentage / 100) * 314}`}
                transform="rotate(-90 60 60)"
              />
            </svg>
          </div>
          
          {/* Legend */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-400">Income</span>
              </div>
              <span className="text-sm font-semibold text-white">{incomePercentage.toFixed(0)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-400">Expense</span>
              </div>
              <span className="text-sm font-semibold text-white">{expensePercentage.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-green-500" />
                <span className="text-sm text-gray-400">Income</span>
              </div>
              <span className="text-lg font-bold text-green-500">${totalIncome.toFixed(2)}</span>
            </div>
            <div className="h-3 bg-[#2d2640] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-300"
                style={{ width: `${incomePercentage}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingDown size={18} className="text-red-500" />
                <span className="text-sm text-gray-400">Expense</span>
              </div>
              <span className="text-lg font-bold text-red-500">${totalExpense.toFixed(2)}</span>
            </div>
            <div className="h-3 bg-[#2d2640] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-300"
                style={{ width: `${expensePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceVisualizationSimple;
