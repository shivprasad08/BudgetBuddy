import { createContext, useContext, useEffect, useReducer } from "react";
import { supabase } from "../config/supabase";

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id
        ),
      };
    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load expenses from Supabase on mount
  useEffect(() => {
    const loadExpenses = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const { data, error } = await supabase
          .from("expenses")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        dispatch({ type: "SET_EXPENSES", payload: data || [] });
      } catch (error) {
        console.error("Error loading expenses:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadExpenses();
  }, []);

  const value = {
    ...state,
    addExpense: async (expense) => {
      try {
        const newExpense = {
          description: expense.description,
          amount: expense.amount,
          category: expense.category,
          type: expense.type,
          date: expense.date,
        };

        console.log('💰 Adding expense to Supabase:', newExpense);
        
        const { data, error } = await supabase
          .from("expenses")
          .insert([newExpense])
          .select()
          .single();

        console.log('📊 Supabase response:', { data, error });

        if (error) {
          console.error('❌ Supabase error details:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          
          // If schema cache issue, provide helpful message
          if (error.message?.includes('schema cache')) {
            throw new Error('Database schema not synced. Please refresh your Supabase dashboard and wait 30 seconds, then try again.');
          }
          
          throw error;
        }
        if (!data) throw new Error("No data returned from insert");
        dispatch({ type: "ADD_EXPENSE", payload: data });
        return { success: true, data };
      } catch (error) {
        console.error("Error adding expense:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
        return { success: false, error: error.message };
      }
    },
    deleteExpense: async (id) => {
      try {
        const { error } = await supabase
          .from("expenses")
          .delete()
          .eq("id", id);

        if (error) throw error;
        dispatch({ type: "DELETE_EXPENSE", payload: { id } });
        return { success: true };
      } catch (error) {
        console.error("Error deleting expense:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
        return { success: false, error: error.message };
      }
    },
    updateExpense: async (expense) => {
      try {
        const { error } = await supabase
          .from("expenses")
          .update({
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
            type: expense.type,
            date: expense.date,
          })
          .eq("id", expense.id);

        if (error) throw error;
        dispatch({ type: "UPDATE_EXPENSE", payload: expense });
        return { success: true };
      } catch (error) {
        console.error("Error updating expense:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
        return { success: false, error: error.message };
      }
    },
    calculateTotals: () => {
      const totalIncome = state.expenses
        .filter(e => e.type === 'income')
        .reduce((sum, e) => sum + e.amount, 0);
      const totalExpense = state.expenses
        .filter(e => e.type === 'expense')
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      };
    },
    getExpensesByCategory: () => {
      const categoryMap = {};
      state.expenses
        .filter(e => e.type === 'expense')
        .forEach(expense => {
          if (!categoryMap[expense.category]) {
            categoryMap[expense.category] = 0;
          }
          categoryMap[expense.category] += expense.amount;
        });
      return Object.entries(categoryMap).map(([category, total]) => ({
        category,
        total
      }));
    },
    getWeeklyData: () => {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days.map(day => {
        const dayExpenses = state.expenses.filter(e => {
          const expenseDay = new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' });
          return expenseDay === day && e.type === 'expense';
        });
        const dayIncome = state.expenses.filter(e => {
          const incomeDay = new Date(e.date).toLocaleDateString('en-US', { weekday: 'short' });
          return incomeDay === day && e.type === 'income';
        });
        return {
          day,
          expense: dayExpenses.reduce((sum, e) => sum + e.amount, 0),
          income: dayIncome.reduce((sum, e) => sum + e.amount, 0)
        };
      });
    }
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
};

export const useExpenseContext = useExpenses;
