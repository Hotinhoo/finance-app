import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowUpCircle, ArrowDownCircle, LineChart, MoreHorizontal, Home, Banknote, ShoppingCart, Compass as GasPump } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { useTransactions, getCategoryLabel } from "@/contexts/TransactionContext";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  TooltipProps
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

// Mapeamento de ícones por categoria
const categoryIcons: Record<string, React.ReactNode> = {
  housing: <Home className="h-5 w-5" />,
  salary: <Banknote className="h-5 w-5" />,
  food: <ShoppingCart className="h-5 w-5" />,
  transport: <GasPump className="h-5 w-5" />,
};

// Mapeamento de cores de fundo por categoria
const iconBgColors: Record<string, string> = {
  housing: "bg-indigo-100 text-indigo-600",
  salary: "bg-green-100 text-green-600",
  freelance: "bg-green-100 text-green-600", 
  investments: "bg-blue-100 text-blue-600",
  food: "bg-amber-100 text-amber-600",
  transport: "bg-red-100 text-red-600",
  health: "bg-purple-100 text-purple-600",
  education: "bg-cyan-100 text-cyan-600",
  entertainment: "bg-pink-100 text-pink-600",
  shopping: "bg-orange-100 text-orange-600",
  bills: "bg-emerald-100 text-emerald-600",
  other_expense: "bg-gray-100 text-gray-600",
  other_income: "bg-green-100 text-green-600",
};

// Formatador de valores monetários
const formatCurrency = (value: number) => {
  return `R$ ${value.toFixed(2)}`;
};

export default function Dashboard() {
  const { 
    totalIncome, 
    totalExpenses, 
    balance, 
    getRecentTransactions, 
    getCategoryBreakdown,
    getMonthlyData
  } = useTransactions();
  
  const { theme } = useTheme();
  
  // Estado para controlar qual tipo de fluxo mostrar no gráfico
  const [activeChart, setActiveChart] = useState<"income" | "expense" | "both">("both");
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Detectar se o tema atual é escuro
  useEffect(() => {
    const isDark = 
      theme === "dark" || 
      (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
  }, [theme]);
  
  const recentTransactions = getRecentTransactions(4);
  const categoryBreakdown = getCategoryBreakdown();
  const monthlyData = getMonthlyData(6);
  
  // Cores para o modo escuro e claro
  const colors = {
    income: {
      light: {
        stroke: "#6366f1", // indigo-500
        gradient: {
          start: "#6366f1", // indigo-500
          end: "rgba(99, 102, 241, 0.1)" // indigo-500 com opacidade reduzida
        }
      },
      dark: {
        stroke: "#818cf8", // indigo-400
        gradient: {
          start: "#818cf8", // indigo-400
          end: "rgba(129, 140, 248, 0.1)" // indigo-400 com opacidade reduzida
        }
      }
    },
    expense: {
      light: {
        stroke: "#ef4444", // red-500
        gradient: {
          start: "#ef4444", // red-500
          end: "rgba(239, 68, 68, 0.1)" // red-500 com opacidade reduzida
        }
      },
      dark: {
        stroke: "#f87171", // red-400
        gradient: {
          start: "#f87171", // red-400
          end: "rgba(248, 113, 113, 0.1)" // red-400 com opacidade reduzida
        }
      }
    },
    text: {
      light: "#6b7280", // gray-500
      dark: "#9ca3af"  // gray-400
    },
    grid: {
      light: "#e5e7eb", // gray-200
      dark: "#374151"  // gray-700
    },
    background: {
      light: "#f9fafb", // gray-50
      dark: "#1f2937"  // gray-800
    }
  };
  
  // Componente personalizado para o tooltip do gráfico com tipagem adequada
  const CustomTooltip = ({ 
    active, 
    payload, 
    label 
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 border rounded-md shadow-md ${
          isDarkMode 
            ? "bg-gray-800 border-gray-700 text-gray-200" 
            : "bg-white border-gray-200 text-gray-800"
        }`}>
          <p className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value as number)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Valor de investimentos fictício (poderia ser calculado a partir de transações)
  const investmentValue = 32450;

  return (
    <div className="w-full max-w-full">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center sm:text-left">Visão Geral Financeira</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Saldo Total</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">R$ {balance.toFixed(2)}</h3>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
              <Wallet className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receitas</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">R$ {totalIncome.toFixed(2)}</h3>
            </div>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
              <ArrowUpCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Despesas</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">R$ {totalExpenses.toFixed(2)}</h3>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
              <ArrowDownCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>

        <Card className="p-5 hover:shadow-lg transition-all duration-300 hover:border-indigo-200 dark:hover:border-indigo-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Investimentos</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">R$ {investmentValue.toFixed(2)}</h3>
            </div>
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
              <LineChart className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-4 sm:p-6 lg:col-span-2 hover:shadow-lg transition-all duration-300 dark:border-gray-700">
          <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-6 gap-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Resumo Mensal</h3>
            <div className="flex gap-2 w-full xs:w-auto">
              <Button 
                variant="secondary" 
                className={`flex-1 xs:flex-initial ${activeChart === "income" || activeChart === "both" 
                  ? isDarkMode 
                    ? "bg-indigo-900/50 text-indigo-300 hover:bg-indigo-900/70"
                    : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200" 
                  : isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveChart(prev => prev === "income" ? "both" : "income")}
              >
                Receitas
              </Button>
              <Button 
                variant="secondary" 
                className={`flex-1 xs:flex-initial ${activeChart === "expense" || activeChart === "both" 
                  ? isDarkMode
                    ? "bg-red-900/50 text-red-300 hover:bg-red-900/70"
                    : "bg-red-100 text-red-600 hover:bg-red-200" 
                  : isDarkMode
                    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveChart(prev => prev === "expense" ? "both" : "expense")}
              >
                Despesas
              </Button>
            </div>
          </div>
          <div className={`h-[250px] sm:h-[300px] rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-gray-50"
          }`}>
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop 
                        offset="5%" 
                        stopColor={isDarkMode ? colors.income.dark.gradient.start : colors.income.light.gradient.start} 
                        stopOpacity={0.8}
                      />
                      <stop 
                        offset="95%" 
                        stopColor={isDarkMode ? colors.income.dark.gradient.end : colors.income.light.gradient.end} 
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop 
                        offset="5%" 
                        stopColor={isDarkMode ? colors.expense.dark.gradient.start : colors.expense.light.gradient.start} 
                        stopOpacity={0.8}
                      />
                      <stop 
                        offset="95%" 
                        stopColor={isDarkMode ? colors.expense.dark.gradient.end : colors.expense.light.gradient.end} 
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    className="opacity-30" 
                    stroke={isDarkMode ? colors.grid.dark : colors.grid.light}
                  />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: isDarkMode ? colors.text.dark : colors.text.light }}
                    tickLine={{ stroke: isDarkMode ? colors.grid.dark : colors.grid.light }}
                    stroke={isDarkMode ? colors.grid.dark : colors.grid.light}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    tick={{ fill: isDarkMode ? colors.text.dark : colors.text.light }}
                    tickLine={{ stroke: isDarkMode ? colors.grid.dark : colors.grid.light }}
                    stroke={isDarkMode ? colors.grid.dark : colors.grid.light}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ 
                      color: isDarkMode ? colors.text.dark : colors.text.light
                    }} 
                  />
                  {(activeChart === "income" || activeChart === "both") && (
                    <Area 
                      type="monotone" 
                      dataKey="income" 
                      name="Receitas"
                      stroke={isDarkMode ? colors.income.dark.stroke : colors.income.light.stroke} 
                      fillOpacity={1} 
                      fill="url(#colorIncome)" 
                    />
                  )}
                  {(activeChart === "expense" || activeChart === "both") && (
                    <Area 
                      type="monotone" 
                      dataKey="expense" 
                      name="Despesas"
                      stroke={isDarkMode ? colors.expense.dark.stroke : colors.expense.light.stroke} 
                      fillOpacity={1} 
                      fill="url(#colorExpense)" 
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <LineChart className={`h-12 w-12 mx-auto mb-2 ${
                    isDarkMode ? "text-indigo-500/30" : "text-indigo-300"
                  }`} />
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    Nenhuma transação registrada para exibir o gráfico
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Categorias de Despesas</h3>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-4">
            {categoryBreakdown.length > 0 ? (
              categoryBreakdown.slice(0, 5).map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                      <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                    </div>
                    <span className="font-medium dark:text-gray-200">R$ {category.value.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div className={`${category.color} h-1.5 rounded-full`} style={{ width: `${category.percentage}%` }}></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                Nenhuma despesa registrada
              </div>
            )}
          </div>
        </Card>
      </div>

      <Card className="mt-6 md:mt-8 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 dark:border-gray-700">
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-6 gap-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Transações Recentes</h3>
          <Link to="/transactions">
            <Button variant="link" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-all duration-300 flex items-center space-x-1 px-0">
              <span>Ver Todas</span>
              <ArrowUpCircle className="h-4 w-4 rotate-90" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b dark:border-gray-700">
                  <TableHead className="font-medium text-gray-500 dark:text-gray-400">Descrição</TableHead>
                  <TableHead className="font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Categoria</TableHead>
                  <TableHead className="font-medium text-gray-500 dark:text-gray-400">Data</TableHead>
                  <TableHead className="font-medium text-gray-500 dark:text-gray-400">Valor</TableHead>
                  <TableHead className="font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Status</TableHead>
                  <TableHead className="font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => {
                    const iconBg = iconBgColors[transaction.category] || "bg-gray-100 text-gray-600";
                    const icon = categoryIcons[transaction.category] || (
                      transaction.type === "income" 
                        ? <Banknote className="h-5 w-5" /> 
                        : <ShoppingCart className="h-5 w-5" />
                    );
                    
                    return (
                      <TableRow key={transaction.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${iconBg} ${isDarkMode ? 'opacity-80' : ''}`}>
                              {icon}
                            </div>
                            <span className="truncate max-w-[120px] sm:max-w-none dark:text-gray-300">{transaction.description}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 hidden sm:table-cell dark:text-gray-300">
                          {getCategoryLabel(transaction.type, transaction.category)}
                        </TableCell>
                        <TableCell className="py-4 dark:text-gray-300">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className={`py-4 font-medium ${
                          transaction.type === "income" 
                            ? "text-green-600 dark:text-green-400" 
                            : "text-red-600 dark:text-red-400"
                        }`}>
                          {transaction.type === "income" ? "+" : "-"} R$ {Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell className="py-4 hidden sm:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            transaction.type === "income" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                          }`}>
                            {transaction.status || "Concluído"}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 hidden sm:table-cell">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Nenhuma transação registrada.{" "}
                      <Link to="/transactions" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        Adicionar transação
                      </Link>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
} 