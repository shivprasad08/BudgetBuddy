import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useExpenses } from "../context/ExpenseContext";

const SummaryCards = () => {
  const { calculateTotals } = useExpenses();
  
  const totals = calculateTotals() || { balance: 0, totalExpense: 0, totalIncome: 0 };
  
  // Ensure values are valid numbers
  const balance = isNaN(totals.balance) ? 0 : totals.balance;
  const totalExpense = isNaN(totals.totalExpense) ? 0 : totals.totalExpense;
  const totalIncome = isNaN(totals.totalIncome) ? 0 : totals.totalIncome;

  const cards = [
    {
      id: 1,
      title: "Balance",
      amount: balance,
      percentage: totalIncome > 0 ? Math.min(Math.abs((balance / totalIncome) * 100), 100) : 72,
      bgColor: "from-blue-600 to-blue-400",
      borderColor: "border-blue-500",
      trend: balance >= 0 ? "up" : "down",
      trendValue: balance >= 0 ? `+${Math.round((balance / 100) * 10)}%` : `-${Math.round((Math.abs(balance) / 100) * 10)}%`,
    },
    {
      id: 2,
      title: "Expense",
      amount: totalExpense,
      percentage: totalIncome > 0 ? Math.min((totalExpense / totalIncome) * 100, 100) : 0,
      bgColor: "from-red-600 to-red-400",
      borderColor: "border-red-500",
      isNegative: true,
      trend: "down",
      trendValue: `-${Math.round((totalExpense / totalIncome) * 10) || 0}%`,
    },
    {
      id: 3,
      title: "Income",
      amount: totalIncome,
      percentage: 100,
      bgColor: "from-green-600 to-green-400",
      borderColor: "border-green-500",
      trend: "up",
      trendValue: `+${Math.round((totalIncome / 100) * 10) || 0}%`,
    },
  ];

  const formatCurrency = (amount) => {
    return Math.abs(amount).toFixed(2) + "$";
  };

  const handleCardClick = (id) => {
    console.log("Card clicked:", id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => handleCardClick(card.id)}
          className={`bg-gradient-to-br ${card.bgColor} rounded-2xl p-6 text-white border-2 ${card.borderColor} backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group`}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm font-medium opacity-80">{card.title}</p>
              <h3 className="text-3xl font-bold mt-2">
                {card.amount < 0 ? "-" : ""}
                {formatCurrency(card.amount)}
              </h3>
              <div className="flex items-center gap-1 mt-2">
                {card.trend === "up" ? (
                  <TrendingUp size={16} className="text-green-300" />
                ) : (
                  <TrendingDown size={16} className="text-red-300" />
                )}
                <span className={`text-xs font-semibold ${card.trend === "up" ? "text-green-300" : "text-red-300"}`}>
                  {card.trendValue}
                </span>
              </div>
            </div>
          </div>

          {/* Circular Progress Chart */}
          <div className="flex items-center justify-center mt-4">
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox="0 0 120 120"
              fill="none"
            >
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(Math.abs(card.percentage) / 100) * 2 * Math.PI * 50} ${2 * Math.PI * 50}`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
              {/* Percentage text */}
              <text
                x="60"
                y="60"
                textAnchor="middle"
                dy="0.3em"
                className="text-2xl font-bold"
                fill="rgba(255, 255, 255, 0.95)"
                fontSize="24"
                fontWeight="bold"
              >
                {Math.abs(Math.round(card.percentage))}%
              </text>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
