import React, { useState } from "react";
import { useExpenseContext } from "../context/ExpenseContext";
import { LineChart, PieChart, Radar, BarChart3 } from "lucide-react";
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

const StatisticsSectionSimple = () => {
  const { getWeeklyData, getExpensesByCategory } = useExpenseContext();
  const [activeChart, setActiveChart] = useState("line");

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
    console.error("Error in StatisticsSectionSimple:", error);
  }

  return (
    <div className="bg-[#252033] rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Statistics</h2>

        {/* Chart Toggle - 4 options */}
        <div className="flex gap-2 bg-[#1a1625] p-1 rounded-lg">
          <button
            onClick={() => setActiveChart("line")}
            className={`p-2 rounded-md transition-all ${
              activeChart === "line"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Line Chart"
          >
            <LineChart size={16} />
          </button>
          <button
            onClick={() => setActiveChart("pie")}
            className={`p-2 rounded-md transition-all ${
              activeChart === "pie"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Pie Chart"
          >
            <PieChart size={16} />
          </button>
          <button
            onClick={() => setActiveChart("radar")}
            className={`p-2 rounded-md transition-all ${
              activeChart === "radar"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Radar Chart"
          >
            <Radar size={16} />
          </button>
          <button
            onClick={() => setActiveChart("bar")}
            className={`p-2 rounded-md transition-all ${
              activeChart === "bar"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            title="Bar Chart"
          >
            <BarChart3 size={16} />
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="min-h-[400px] flex items-center justify-center">
        {activeChart === "line" && weeklyData?.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
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
        )}

        {activeChart === "pie" && formattedCategoryData?.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Pie
                data={formattedCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                outerRadius={120}
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
        )}

        {activeChart === "radar" && weeklyData?.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
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
        )}

        {activeChart === "bar" && formattedCategoryData?.length > 0 && (
          <ResponsiveContainer width="100%" height={400}>
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
        )}

        {/* No Data Messages */}
        {activeChart === "line" && (!weeklyData || weeklyData.length === 0) && (
          <p className="text-gray-400">No data available for line chart</p>
        )}
        {activeChart === "pie" && (!formattedCategoryData || formattedCategoryData.length === 0) && (
          <p className="text-gray-400">No category data available</p>
        )}
        {activeChart === "radar" && (!weeklyData || weeklyData.length === 0) && (
          <p className="text-gray-400">No data available for radar chart</p>
        )}
        {activeChart === "bar" && (!formattedCategoryData || formattedCategoryData.length === 0) && (
          <p className="text-gray-400">No category data available</p>
        )}
      </div>
    </div>
  );
};

export default StatisticsSectionSimple;
