import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import { TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react";

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
      value: balance.toFixed(2),
      lastMonth: (balance * 0.95).toFixed(1),
      trend: balance >= 0 ? "up" : "down",
      trendValue: "0.2%",
      bgColor: "#0D0D0D",
    },
    {
      id: 2,
      title: "Expense",
      value: totalExpense.toFixed(2),
      lastMonth: (totalExpense * 1.1).toFixed(1),
      trend: "down",
      trendValue: "1.2%",
      bgColor: "#2F54EB",
    },
    {
      id: 3,
      title: "Income",
      value: totalIncome.toFixed(2),
      lastMonth: (totalIncome * 0.9).toFixed(1),
      trend: "up",
      trendValue: "3.1%",
      bgColor: "#138D75",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="rounded-2xl p-6 text-white shadow-xl transition-all duration-300 hover:scale-[1.02]"
          style={{ backgroundColor: card.bgColor }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <button className="hover:bg-white/10 rounded-full p-1.5 transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Amount and Trend */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <h2 className="text-4xl font-bold">${card.value}</h2>
              <div style={{
                backgroundColor: card.trend === "up" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                color: card.trend === "up" ? "#a7f3d0" : "#fecaca",
              }} className="flex items-center gap-1 px-2.5 py-1 rounded-md text-sm font-medium">
                {card.trend === "up" ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                <span>{card.trend === "up" ? "+" : "-"}{card.trendValue}</span>
              </div>
            </div>
          </div>

          {/* Last Month Comparison */}
          <div className="text-sm opacity-90">
            Vs last month: <span className="font-semibold">${card.lastMonth}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
