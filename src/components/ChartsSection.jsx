import React from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import {
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart as RechartsBarchart,
  Bar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadarLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ChartsSection = () => {
  const { getWeeklyData, getExpensesByCategory } = useExpenseContext();

  let weeklyData = [];
  let formattedCategoryData = [];

  try {
    const rawWeeklyData = getWeeklyData();
    weeklyData = rawWeeklyData && Array.isArray(rawWeeklyData) ? rawWeeklyData : [];
    
    const categoryData = getExpensesByCategory();
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#a4de6c", "#ff8884", "#8dd1e1"];
    formattedCategoryData = categoryData && Array.isArray(categoryData) ? categoryData.map((cat, index) => ({
      name: cat.category || "Uncategorized",
      value: cat.total || 0,
      fill: COLORS[index % COLORS.length],
    })) : [];
  } catch (error) {
    console.error("Error in ChartsSection:", error);
  }

  const chartContainerClass = "bg-[#252033] rounded-xl p-4 border border-gray-800";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className={chartContainerClass}>
        <h3 className="text-lg font-bold text-white mb-4">Weekly Income vs Expense</h3>
        {weeklyData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1625",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ fill: "#82ca9d", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ff7c7c"
                strokeWidth={2}
                dot={{ fill: "#ff7c7c", r: 4 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>

      {/* Pie Chart */}
      <div className={chartContainerClass}>
        <h3 className="text-lg font-bold text-white mb-4">Expenses by Category</h3>
        {formattedCategoryData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={formattedCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {formattedCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1625",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>

      {/* Radar Chart */}
      <div className={chartContainerClass}>
        <h3 className="text-lg font-bold text-white mb-4">Weekly Comparison Radar</h3>
        {weeklyData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsRadarChart data={weeklyData}>
              <PolarGrid stroke="#444" />
              <PolarAngleAxis dataKey="day" stroke="#888" />
              <PolarRadiusAxis angle={90} domain={[0, "auto"]} stroke="#888" />
              <RadarLine
                type="monotone"
                dataKey="income"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <RadarLine
                type="monotone"
                dataKey="expense"
                stroke="#ff7c7c"
                fill="#ff7c7c"
                fillOpacity={0.6}
              />
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1625",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </RechartsRadarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>

      {/* Bar Chart */}
      <div className={chartContainerClass}>
        <h3 className="text-lg font-bold text-white mb-4">Category Expenses</h3>
        {formattedCategoryData?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarchart data={formattedCategoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1625",
                  border: "1px solid #444",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" fill="#8884d8" radius={[8, 8, 0, 0]}>
                {formattedCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </RechartsBarchart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No data available</p>
        )}
      </div>
    </div>
  );
};

export default ChartsSection;
