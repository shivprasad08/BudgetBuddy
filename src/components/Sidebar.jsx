import React, { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Grid3x3,
  Wallet,
  Building2,
  Target,
  Calendar as CalendarIcon,
  Bell,
  CalendarDays,
  History,
  Crown,
  Moon,
  LogOut,
  Plus,
} from "lucide-react";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: ArrowLeftRight, label: "Transactions" },
    { icon: Grid3x3, label: "Categories" },
    { icon: Wallet, label: "Balance" },
    { icon: Building2, label: "Accounts" },
    { icon: Target, label: "Goals" },
    { icon: CalendarDays, label: "Upcoming" },
    { icon: Bell, label: "Reminders" },
    { icon: CalendarIcon, label: "Calendar" },
    { icon: History, label: "History" },
  ];

  return (
    <div className="w-64 bg-[#252033] border-r border-gray-800 flex flex-col h-full">
      {/* User Profile */}
      <div className="p-6 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">NJ</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">Nick Jenkins</p>
            <p className="text-gray-400 text-xs">User Account</p>
          </div>
        </div>
      </div>

      {/* Add New Button */}
      <div className="px-4 py-3 flex-shrink-0">
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                activeItem === item.label
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-[#2d2640]"
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Pro Account Button */}
      <div className="p-4 border-t border-gray-800 flex-shrink-0 space-y-3">
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm">
          <Crown size={18} />
          <span>Pro Account</span>
        </button>
        
        {/* Settings */}
        <div className="flex items-center justify-around pt-2">
          <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#2d2640] rounded-lg">
            <Moon size={18} />
          </button>
          <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#2d2640] rounded-lg">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
