import React, { useState, useMemo } from "react";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import toast from "react-hot-toast";
import { useExpenses } from "../context/ExpenseContext";

const BalanceVisualization = () => {
  const [chartType, setChartType] = useState("pie");
  const { calculateTotals } = useExpenses();

  const totals = useMemo(() => {
    return calculateTotals();
  }, [calculateTotals]);

  const chartData = useMemo(() => {
    return [
      { name: "Balance", value: Math.max(0, totals.balance) },
      { name: "Expense", value: totals.expense },
      { name: "Income", value: totals.income },
    ];
  }, [totals]);

  const colors = ["#10b981", "#ef4444", "#3b82f6"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#252033] border border-[#2d2640] rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{payload[0].name}: ${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#252033] rounded-2xl p-8 border border-[#2d2640]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white">Balance</h3>

        {/* Chart Type Toggle */}
        <div className="flex gap-2 bg-[#2d2640] rounded-lg p-1">
          <button
            onClick={() => {
              setChartType("pie");
              toast.success("Switched to pie chart");
            }}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 active:scale-95 ${
              chartType === "pie"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Pie Chart
          </button>
          <button
            onClick={() => {
              setChartType("bar");
              toast.success("Switched to bar chart");
            }}
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 active:scale-95 ${
              chartType === "bar"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Bar Graph
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Chart */}
        <div className="w-full lg:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "pie" ? (
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3d3548" />
                <XAxis dataKey="name" stroke="#9b87f5" />
                <YAxis stroke="#9b87f5" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" fill="#9b87f5" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="p-6 bg-[#2d2640] rounded-xl border border-[#3d3548]">
            <p className="text-gray-300 font-medium text-lg mb-4">Financial Summary</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Income:</span>
                <span className="text-green-400 font-bold">${totals.income.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Expenses:</span>
                <span className="text-red-400 font-bold">${totals.expense.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#3d3548] pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">Net Balance:</span>
                  <span className={`font-bold text-lg ${totals.balance >= 0 ? "text-blue-400" : "text-red-400"}`}>
                    ${totals.balance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => toast.success("Financial overview")}
            className="p-6 bg-gradient-to-r from-purple-600 to-purple-500 rounded-xl cursor-pointer hover:shadow-lg transition-all active:scale-95"
          >
            <p className="text-white text-sm font-medium mb-2">Financial Overview</p>
            <p className="text-white text-lg font-bold">
              Balance Status: <span className={totals.balance >= 0 ? "text-green-300" : "text-red-300"}>{totals.balance >= 0 ? "Surplus" : "Deficit"}</span>
            </p>
            <p className="text-purple-100 text-xs mt-2">Tap to view detailed analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceVisualization;

