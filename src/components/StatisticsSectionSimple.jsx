import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { TrendingUp, TrendingDown, BarChart3, LineChart } from "lucide-react";

const StatisticsSectionSimple = () => {
  const { getWeeklyData } = useExpenseContext();
  const weeklyData = getWeeklyData();
  const [activeChart, setActiveChart] = useState("bar");

  const maxValue = Math.max(...weeklyData.map(d => Math.max(d.income, d.expense)));

  return (
    <div className="bg-[#252033] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Statistics</h2>
        
        <div className="flex items-center gap-4">
          {/* Chart Toggle */}
          <div className="flex gap-2 bg-[#1a1625] p-1 rounded-lg">
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
            <button
              onClick={() => setActiveChart("line")}
              className={`p-2 rounded-md transition-all ${
                activeChart === "line"
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LineChart size={16} />
            </button>
          </div>
          
          {/* Legend */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-400">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-400">Expense</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {weeklyData.map((day, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400 w-16">{day.day}</span>
              <div className="flex-1 mx-4 flex gap-2 items-end h-16">
                {/* Income Bar */}
                <div className="flex-1 bg-[#2d2640] rounded-t relative overflow-hidden">
                  <div
                    className="bg-gradient-to-t from-green-600 to-green-400 rounded-t transition-all duration-300"
                    style={{ height: `${(day.income / maxValue) * 100}%`, minHeight: day.income > 0 ? '4px' : '0' }}
                  ></div>
                </div>
                {/* Expense Bar */}
                <div className="flex-1 bg-[#2d2640] rounded-t relative overflow-hidden">
                  <div
                    className="bg-gradient-to-t from-red-600 to-red-400 rounded-t transition-all duration-300"
                    style={{ height: `${(day.expense / maxValue) * 100}%`, minHeight: day.expense > 0 ? '4px' : '0' }}
                  ></div>
                </div>
              </div>
              <div className="text-right w-28">
                <div className="text-sm font-semibold text-green-400 flex items-center justify-end gap-1">
                  <TrendingUp size={14} />
                  ${day.income}
                </div>
                <div className="text-sm font-semibold text-red-400 flex items-center justify-end gap-1">
                  <TrendingDown size={14} />
                  ${day.expense}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatisticsSectionSimple;
