import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  Settings,
  Bell,
  Edit2,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

const Header = ({ onAddTransaction }) => {
  const [activeMonth, setActiveMonth] = useState("February");
  const [activeYear, setActiveYear] = useState("2026");
  const [searchQuery, setSearchQuery] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = ["2024", "2025", "2026"];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast.success(`Searching for: ${searchQuery}`);
    }
  };

  const handleSettings = () => {
    toast.success("Opening Settings");
  };

  const handleNotifications = () => {
    toast.success("You have 3 new notifications");
  };

  const handleEdit = () => {
    toast.success("Edit mode enabled");
  };

  const handleMonthChange = (month) => {
    setActiveMonth(month);
    toast.success(`Viewing ${month}`);
  };

  const handleYearChange = (year) => {
    setActiveYear(year);
    toast.success(`Viewing year ${year}`);
  };

  return (
    <div className="bg-[#1a1625] border-b border-[#2d2640] py-6 px-8">
      <div className="flex items-center justify-between gap-8">
        {/* Left Side - Search and Icons */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button
              onClick={handleSearch}
              className="p-2 hover:bg-[#252033] rounded-lg transition-all duration-300"
            >
              <Search size={20} className="text-gray-400 hover:text-white" />
            </button>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="absolute left-0 top-full mt-2 w-64 px-4 py-2 bg-[#252033] border border-[#2d2640] text-white placeholder-gray-500 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
            />
          </div>
          <button
            onClick={handleSettings}
            className="p-2 hover:bg-[#252033] rounded-lg transition-all duration-300 active:scale-95"
          >
            <Settings size={20} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Center - Title */}
        <h1 className="text-3xl font-bold text-white">My Dashboard</h1>

        {/* Right Side - Dropdowns and Controls */}
        <div className="flex items-center gap-4">
          {/* Month Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#252033] hover:bg-[#2d2640] text-gray-300 rounded-lg transition-all duration-300 active:scale-95">
              <span className="font-medium text-sm">{activeMonth}</span>
              <ChevronDown size={18} />
            </button>
            <div className="absolute right-0 mt-0 w-40 bg-[#252033] rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-[#2d2640] max-h-60 overflow-y-auto">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => handleMonthChange(month)}
                  className={`w-full text-left px-4 py-2 transition-colors duration-300 ${
                    month === activeMonth
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-[#2d2640] hover:text-purple-400"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Year Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#252033] hover:bg-[#2d2640] text-gray-300 rounded-lg transition-all duration-300 active:scale-95">
              <span className="font-medium text-sm">{activeYear}</span>
              <ChevronDown size={18} />
            </button>
            <div className="absolute right-0 mt-0 w-32 bg-[#252033] rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-[#2d2640]">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`w-full text-left px-4 py-2 transition-colors duration-300 ${
                    year === activeYear
                      ? "bg-purple-600 text-white"
                      : "text-gray-300 hover:bg-[#2d2640] hover:text-purple-400"
                  } first:rounded-t-lg last:rounded-b-lg`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="p-2 hover:bg-[#252033] rounded-lg transition-all duration-300 active:scale-95"
          >
            <Edit2 size={20} className="text-gray-400 hover:text-purple-400" />
          </button>

          {/* Notifications Button */}
          <button
            onClick={handleNotifications}
            className="p-2 hover:bg-[#252033] rounded-lg transition-all duration-300 active:scale-95 relative"
          >
            <Bell size={20} className="text-gray-400 hover:text-purple-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Add New Button */}
          <button
            onClick={onAddTransaction}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 text-sm"
          >
            <Plus size={18} />
            <span>Add New</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
