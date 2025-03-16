import { createContext, ReactNode, useContext, useState, useEffect } from "react";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  status?: string;
}

export interface MonthlyData {
  name: string;
  income: number;
  expense: number;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  getRecentTransactions: (limit?: number) => Transaction[];
  getCategoryBreakdown: () => Array<{ name: string; value: number; percentage: number; color: string }>;
  getMonthlyData: (months?: number) => MonthlyData[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const categoryColors: Record<string, string> = {
  housing: "bg-indigo-500",
  food: "bg-green-500",
  transport: "bg-amber-500",
  entertainment: "bg-red-500",
  shopping: "bg-purple-500",
  health: "bg-blue-500",
  education: "bg-cyan-500",
  bills: "bg-emerald-500",
  other_expense: "bg-gray-500",
};

const categoryLabels: Record<string, string> = {
  salary: "Salário",
  freelance: "Freelance",
  investments: "Investimentos",
  other_income: "Outros",
  housing: "Moradia",
  food: "Alimentação",
  transport: "Transporte",
  health: "Saúde",
  education: "Educação",
  entertainment: "Lazer",
  shopping: "Compras",
  bills: "Contas",
  other_expense: "Outros",
};

const monthNames = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Tenta carregar transações do localStorage ao inicializar
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Salva as transações no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      status: "Concluído",
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const getRecentTransactions = (limit = 4) => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  const getCategoryBreakdown = () => {
    if (totalExpenses === 0) return [];
    
    const expensesByCategory: Record<string, number> = {};
    
    // Agrupa despesas por categoria
    transactions
      .filter(t => t.type === "expense")
      .forEach(t => {
        if (!expensesByCategory[t.category]) {
          expensesByCategory[t.category] = 0;
        }
        expensesByCategory[t.category] += t.amount;
      });
    
    // Converte para o formato esperado pelo gráfico
    const result = Object.entries(expensesByCategory)
      .map(([category, value]) => {
        const percentage = Math.round((value / totalExpenses) * 100);
        return {
          name: categoryLabels[category] || category,
          value,
          percentage,
          color: categoryColors[category] || "bg-gray-500"
        };
      })
      .sort((a, b) => b.value - a.value);
    
    return result;
  };

  // Função para obter dados financeiros agrupados por mês
  const getMonthlyData = (months = 6): MonthlyData[] => {
    const currentDate = new Date();
    const monthlyData: MonthlyData[] = [];

    // Gerar dados para os últimos 'months' meses
    for (let i = 0; i < months; i++) {
      const targetDate = new Date(currentDate);
      targetDate.setMonth(currentDate.getMonth() - i);
      
      const monthKey = targetDate.getMonth();
      const yearKey = targetDate.getFullYear();
      const monthName = monthNames[monthKey];
      
      // Filtrar transações para este mês e ano
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return (
          transactionDate.getMonth() === monthKey && 
          transactionDate.getFullYear() === yearKey
        );
      });
      
      // Calcular total de receitas e despesas do mês
      const monthlyIncome = monthTransactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
        
      const monthlyExpense = monthTransactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      
      // Adicionar ao array de dados mensais
      monthlyData.push({
        name: `${monthName}/${yearKey}`,
        income: monthlyIncome,
        expense: monthlyExpense
      });
    }
    
    // Inverter para que os meses mais antigos venham primeiro
    return monthlyData.reverse();
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpenses,
        balance,
        getRecentTransactions,
        getCategoryBreakdown,
        getMonthlyData
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
}

export function getCategoryLabel(type: "income" | "expense", value: string): string {
  return categoryLabels[value] || value;
} 