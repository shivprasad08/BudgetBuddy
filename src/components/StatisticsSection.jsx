import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import toast from "react-hot-toast";
import { useExpenses } from "../context/ExpenseContext";

const StatisticsSection = () => {
  const { expenses, getWeeklyData } = useExpenses();
  const [chartType, setChartType] = useState("bar");
  const [activeRange, setActiveRange] = useState("week");

  // Generate chart data based on range
  const chartData = useMemo(() => {
    if (activeRange === "week") {
      return getWeeklyData();
    } else if (activeRange === "month") {
      // Group by weeks in a month
      const monthData = Array.from({ length: 4 }, (_, i) => ({
        week: `Week ${i + 1}`,
        expense: Math.floor(Math.random() * 3000) + 500,
        income: Math.floor(Math.random() * 5000) + 2000,
      }));
      return monthData;
    } else {
      // Yearly data
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const yearData = months.map((month) => ({
        day: month,
        expense: Math.floor(Math.random() * 10000) + 2000,
        income: Math.floor(Math.random() * 15000) + 5000,
      }));
      return yearData;
    }
  }, [activeRange, expenses, getWeeklyData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#252033] border border-[#2d2640] rounded-lg p-4 shadow-lg">
          <p className="text-white font-semibold">Expense: ${payload[0].value.toLocaleString()}</p>
          {payload[1] && (
            <p className="text-white font-semibold">Income: ${payload[1].value.toLocaleString()}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const handleRangeChange = (range) => {
    setActiveRange(range);
    toast.success(`Viewing statistics for this ${range}`);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
    toast.success(`Switched to ${type} view`);
  };

  // Find max expense for highlight
  const maxExpense = Math.max(...chartData.map(d => d.expense));
  const maxExpenseDay = chartData.find(d => d.expense === maxExpense);

  return (
    <div className="bg-[#252033] rounded-2xl p-8 border border-[#2d2640]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-white">Statistics</h3>
          <p className="text-gray-400 text-sm mt-2">Track your spending patterns</p>
        </div>

        {/* Range Toggle */}
        <div className="flex items-center gap-2 bg-[#2d2640] rounded-lg p-1">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => handleRangeChange(range)}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 capitalize active:scale-95 ${
                activeRange === range
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              This {range}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity duration-300">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-gray-400 font-medium">Expense</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity duration-300">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 font-medium">Income</span>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="flex gap-4 mb-8 border-b border-[#2d2640]">
        <button
          onClick={() => handleChartTypeChange("bar")}
          className={`pb-4 px-2 font-semibold transition-all duration-300 ${
            chartType === "bar"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Bar Graph
        </button>
        <button
          onClick={() => handleChartTypeChange("line")}
          className={`pb-4 px-2 font-semibold transition-all duration-300 ${
            chartType === "line"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Line Graph
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-80">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2640" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="expense"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
              />
              <Bar
                dataKey="income"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2640" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Highlight Info */}
      <div className="mt-6 p-4 bg-[#2d2640] rounded-lg border border-purple-500 border-opacity-30 cursor-pointer hover:border-opacity-60 transition-all duration-300">
        <p className="text-gray-400 text-sm">
          <span className="text-purple-400 font-semibold">{maxExpenseDay?.day}</span> shows peak
          expense of{" "}
          <span className="text-red-400 font-semibold">${maxExpense.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};

export default StatisticsSection;

