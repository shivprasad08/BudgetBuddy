import React from "react";
import { Plus, Home, Film, Music, Car } from "lucide-react";
import toast from "react-hot-toast";

const UpcomingSection = () => {
  const handleAddUpcoming = () => {
    toast.success("Opening upcoming event creation form");
  };

  const handleItemClick = (name) => {
    toast.success(`Viewing details for ${name}`);
  };
  const upcomingItems = [
    {
      id: 1,
      name: "Home Bills",
      icon: Home,
      color: "#b8860b",
      date: "Friday 30x May",
    },
    {
      id: 2,
      name: "Home Rent",
      icon: Home,
      color: "#10b981",
    },
    {
      id: 3,
      name: "Movie",
      icon: Film,
      color: "#ef4444",
      date: "Friday 30x May",
    },
    {
      id: 4,
      name: "Entertainment Subscription",
      icon: Music,
      color: "#eab308",
    },
    {
      id: 5,
      name: "Transport",
      icon: Car,
      color: "#a855f7",
      date: "Tuesday, 14 June",
    },
  ];

  return (
    <div className="bg-[#252033] rounded-2xl p-6 border border-[#2d2640]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Upcoming</h3>
        <button
          onClick={handleAddUpcoming}
          className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Upcoming Items List */}
      <div className="space-y-3">
        {upcomingItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.name)}
            className="flex items-center gap-3 p-3 bg-[#2d2640] rounded-lg border border-[#3d3650] hover:border-purple-500 transition-all duration-300 group cursor-pointer hover:bg-[#353048] active:scale-95"
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: item.color }}
            >
              <item.icon size={20} className="text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">
                {item.name}
              </p>
              {item.date && (
                <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Button */}
      <button
        onClick={handleAddUpcoming}
        className="w-full mt-6 py-2 text-purple-400 hover:text-purple-300 text-sm font-semibold border border-purple-500 rounded-lg transition-all duration-300 hover:bg-purple-500 hover:bg-opacity-10 active:scale-95"
      >
        + Add Upcoming
      </button>
    </div>
  );
};

export default UpcomingSection;
