import React from "react";
import SummaryCards from "./SummaryCards";
import CategoriesSectionSimple from "./CategoriesSectionSimple";
import StatisticsSectionSimple from "./StatisticsSectionSimple";
import BalanceVisualizationSimple from "./BalanceVisualizationSimple";
import TransactionsList from "./TransactionsList";
import RemindersSection from "./RemindersSection";
import UpcomingSection from "./UpcomingSection";
import ExpenseForm from "./ExpenseForm";

const Dashboard = ({ showExpenseForm, setShowExpenseForm }) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Main Content Grid - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Categories Section */}
          <CategoriesSectionSimple />

          {/* Statistics Section */}
          <StatisticsSectionSimple />

          {/* Balance Visualization */}
          <BalanceVisualizationSimple />

          {/* Transactions List */}
          <TransactionsList />
        </div>

        {/* Right Column - Sidebar (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="grid grid-cols-1 gap-6">
            {/* Reminders Section */}
            <RemindersSection />

            {/* Upcoming Section */}
            <UpcomingSection />
          </div>
        </div>
      </div>

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm onClose={() => setShowExpenseForm(false)} />
      )}
    </div>
  );
};

export default Dashboard;
