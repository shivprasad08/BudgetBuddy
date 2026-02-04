import React, { useState } from "react";
import { Plus, Check } from "lucide-react";
import toast from "react-hot-toast";

const RemindersSection = () => {
  const [reminders, setReminders] = useState([
    { id: 1, text: "Pay Monthly Loan", completed: false },
    { id: 2, text: "Online Meeting with Client", date: "Tuesday 2x May", completed: false },
    { id: 3, text: "Send Money to Amrit", completed: false },
    { id: 4, text: "Cancel Subscription", completed: false },
  ]);

  const toggleReminder = (id) => {
    const reminder = reminders.find((r) => r.id === id);
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
    toast.success(reminder?.completed ? "Reminder unmarked" : "Reminder completed");
  };

  const handleAddReminder = () => {
    toast.success("Opening reminder creation form");
  };

  return (
    <div className="bg-[#252033] rounded-2xl p-6 border border-[#2d2640] h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Reminders</h3>
        <button
          onClick={handleAddReminder}
          className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="flex items-start gap-3 p-3 bg-[#2d2640] rounded-lg border border-[#3d3650] hover:border-purple-500 transition-all duration-300 group cursor-pointer"
            onClick={() => toggleReminder(reminder.id)}
          >
            {/* Checkbox */}
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                reminder.completed
                  ? "bg-purple-600 border-purple-600"
                  : "border-gray-400 group-hover:border-purple-500"
              }`}
            >
              {reminder.completed && <Check size={14} className="text-white" />}
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  reminder.completed
                    ? "text-gray-500 line-through"
                    : "text-gray-300"
                }`}
              >
                {reminder.text}
              </p>
              {reminder.date && (
                <p className="text-xs text-gray-500 mt-1">{reminder.date}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Reminder Button */}
      <button
        onClick={handleAddReminder}
        className="w-full mt-6 py-2 text-purple-400 hover:text-purple-300 text-sm font-semibold border border-purple-500 rounded-lg transition-all duration-300 hover:bg-purple-500 hover:bg-opacity-10 active:scale-95"
      >
        + Add Reminder
      </button>
    </div>
  );
};

export default RemindersSection;
