import React, { useState } from "react";
import { ExpenseProvider } from "../context/ExpenseContext";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../components/Dashboard";

const Index = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  return (
    <ExpenseProvider>
      <DashboardLayout onAddTransaction={() => setShowExpenseForm(true)}>
        <Dashboard 
          showExpenseForm={showExpenseForm}
          setShowExpenseForm={setShowExpenseForm}
        />
      </DashboardLayout>
    </ExpenseProvider>
  );
};

export default Index;
