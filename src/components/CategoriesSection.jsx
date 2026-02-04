import React, { useState, useMemo } from "react";
import { Home, ShoppingCart, UtensilsCrossed, Zap, Plane, Music, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { useExpenses } from "../context/ExpenseContext";

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState("expenses");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { getExpensesByCategory } = useExpenses();

  const categoryIcons = {
    Home: { icon: Home, color: "#b8860b" },
    Shopping: { icon: ShoppingCart, color: "#10b981" },
    Bills: { icon: Zap, color: "#14b8a6" },
    Food: { icon: UtensilsCrossed, color: "#ef4444" },
    Transportation: { icon: Plane, color: "#a855f7" },
    Entertainment: { icon: Music, color: "#eab308" },
    Salary: { icon: Briefcase, color: "#3b82f6" },
  };

  // Get dynamic categories from context
  const expensesByCategory = useMemo(() => {
    return getExpensesByCategory();
  }, [getExpensesByCategory]);

  // Get all categories with their data
  const allCategories = useMemo(() => {
    return expensesByCategory.map((cat) => ({
      ...cat,
      iconData: categoryIcons[cat.name] || {
        icon: ShoppingCart,
        color: "#8b5cf6",
      },
    }));
  }, [expensesByCategory]);

  // Get the largest category for the main card
  const mainCategory = allCategories[0] || null;
  const otherCategories = allCategories.slice(1);
  const othersPercentage = Math.max(0, 100 - allCategories.reduce((sum, cat) => sum + cat.percentage, 0));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    toast.success(`Viewing ${tab}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    toast.success(`${category.name}: $${category.total.toFixed(2)}`);
  };

  return (
    <div className="bg-[#252033] rounded-2xl p-8 border border-[#2d2640]">
      {/* Tabs */}
      <div className="flex gap-8 mb-8 border-b border-[#2d2640]">
        <button
          onClick={() => handleTabChange("expenses")}
          className={`pb-4 px-2 font-semibold transition-all duration-300 ${
            activeTab === "expenses"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => handleTabChange("incomes")}
          className={`pb-4 px-2 font-semibold transition-all duration-300 ${
            activeTab === "incomes"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Incomes
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Category Card */}
        {mainCategory && (
          <div
            onClick={() => handleCategoryClick(mainCategory)}
            className="lg:col-span-1 lg:row-span-2 bg-gradient-to-br rounded-2xl p-8 flex flex-col items-center justify-center min-h-80 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${mainCategory.iconData.color}, ${mainCategory.iconData.color}99)`,
            }}
          >
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300 shadow-lg">
                <mainCategory.iconData.icon size={56} className="text-white" />
              </div>
              <p className="text-6xl font-bold text-white mb-2">{Math.round(mainCategory.percentage)}%</p>
              <p className="text-white text-lg font-semibold opacity-90">{mainCategory.name}</p>
              <p className="text-white text-sm opacity-75 mt-2">${mainCategory.total.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Smaller Category Cards */}
        {otherCategories.slice(0, 4).map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category)}
            className="bg-[#2d2640] rounded-2xl p-6 border border-[#3d3650] hover:border-purple-500 hover:bg-[#353048] transition-all duration-300 cursor-pointer group active:scale-95 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-start justify-between mb-6">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg"
                style={{ backgroundColor: category.iconData.color }}
              >
                <category.iconData.icon size={28} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{Math.round(category.percentage)}%</p>
            </div>
            <p className="text-gray-300 font-semibold">{category.name}</p>
            <p className="text-gray-400 text-xs mt-2">${category.total.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Others Label */}
      {othersPercentage > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => toast.success("Other categories: " + othersPercentage.toFixed(1) + "%")}
            className="text-gray-400 hover:text-gray-300 font-medium transition-colors duration-300"
          >
            Others {othersPercentage.toFixed(1)}%
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
