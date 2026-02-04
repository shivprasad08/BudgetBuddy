import { createContext, useContext, useEffect, useReducer } from "react";

const ExpenseContext = createContext();

const initialState = {
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
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

  // save expenses to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    } catch (error) {
      console.error("Failed to save expenses to local storage: ", error);
      dispatch({ type: "SET_ERROR", payload: error });
    }
  }, [state.expenses]);

  const value = {
    ...state,
    addExpense: (expense) => {
      const newExpense = {
        ...expense,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: "ADD_EXPENSE", payload: newExpense });
    },
    deleteExpense: (id) => {
      dispatch({ type: "DELETE_EXPENSE", payload: { id } });
    },
    updateExpense: (expense) => {
      dispatch({ type: "UPDATE_EXPENSE", payload: expense });
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
