import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  Plus,
  Trash2,
  Wallet,
  Home,
  Banknote,
  ShoppingCart,
  MoreHorizontal,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useTransactions, getCategoryLabel } from "@/contexts/TransactionContext";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Definição da interface Transaction (já deve existir no contexto, mas adicionando para resolver erros)
interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  status?: string;
}

const categories = {
  income: [
    { value: "salary", label: "Salário" },
    { value: "freelance", label: "Freelance" },
    { value: "investments", label: "Investimentos" },
    { value: "other_income", label: "Outros" },
  ],
  expense: [
    { value: "housing", label: "Moradia" },
    { value: "food", label: "Alimentação" },
    { value: "transport", label: "Transporte" },
    { value: "health", label: "Saúde" },
    { value: "education", label: "Educação" },
    { value: "entertainment", label: "Lazer" },
    { value: "shopping", label: "Compras" },
    { value: "bills", label: "Contas" },
    { value: "other_expense", label: "Outros" },
  ],
};

// Mapeamento de ícones por categoria
const categoryIcons: Record<string, React.ReactNode> = {
  housing: <Home className="h-5 w-5 shrink-0" />,
  salary: <Banknote className="h-5 w-5 shrink-0" />,
  food: <ShoppingCart className="h-5 w-5 shrink-0" />,
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

export default function ExpensesTracker() {
  const { transactions, addTransaction, deleteTransaction, totalIncome, totalExpenses, balance } = useTransactions();
  const [transactionType, setTransactionType] = useState<"income" | "expense">("expense");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    addTransaction({
      description: formData.get("description") as string,
      amount: Number(formData.get("amount")),
      type: transactionType,
      category: formData.get("category") as string,
      date: formData.get("date") as string,
    });
    
    setIsDialogOpen(false);
    e.currentTarget.reset();
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <ArrowUpCircle className="h-8 w-8 text-green-500 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Receitas</p>
              <p className="text-2xl font-semibold text-green-500">
                R$ {totalIncome.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-4">
            <ArrowDownCircle className="h-8 w-8 text-red-500 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Despesas</p>
              <p className="text-2xl font-semibold text-red-500">
                R$ {totalExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-4">
            <Wallet className="h-8 w-8 text-blue-500 shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Saldo</p>
              <p className={`text-2xl font-semibold ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
                R$ {balance.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="w-full sm:w-auto flex flex-col xs:flex-row gap-4">
          <div className="relative flex-1 xs:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Filtrar transações..."
              className="pl-8 w-full"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full xs:w-60">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="housing">Moradia</SelectItem>
              <SelectItem value="food">Alimentação</SelectItem>
              <SelectItem value="transport">Transporte</SelectItem>
              <SelectItem value="education">Educação</SelectItem>
              <SelectItem value="health">Saúde</SelectItem>
              <SelectItem value="entertainment">Entretenimento</SelectItem>
              <SelectItem value="shopping">Compras</SelectItem>
              <SelectItem value="salary">Salário</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="investments">Investimentos</SelectItem>
              <SelectItem value="other_income">Outras receitas</SelectItem>
              <SelectItem value="other_expense">Outras despesas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Nova Transação</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Adicionar Transação</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={transactionType === "income" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setTransactionType("income")}
                >
                  <ArrowUpCircle className="h-4 w-4 mr-2" />
                  Receita
                </Button>
                <Button
                  type="button"
                  variant={transactionType === "expense" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setTransactionType("expense")}
                >
                  <ArrowDownCircle className="h-4 w-4 mr-2" />
                  Despesa
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Ex: Conta de luz"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select name="category" defaultValue={categories[transactionType][0].value}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories[transactionType].map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 mt-6">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Adicionar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 sm:p-6 w-full">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nenhuma transação registrada</h3>
            <p className="text-muted-foreground">
              {searchFilter || categoryFilter !== "all" 
                ? "Nenhuma transação encontrada com os filtros atuais."
                : "Comece a registrar suas transações para ter um controle melhor do seu dinheiro."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="font-medium text-gray-500">Descrição</TableHead>
                    <TableHead className="font-medium text-gray-500 hidden sm:table-cell">Categoria</TableHead>
                    <TableHead className="font-medium text-gray-500">Data</TableHead>
                    <TableHead className="font-medium text-gray-500">Valor</TableHead>
                    <TableHead className="font-medium text-gray-500 hidden sm:table-cell">Status</TableHead>
                    <TableHead className="font-medium text-gray-500 hidden sm:table-cell"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => {
                    const iconBg = iconBgColors[transaction.category] || "bg-gray-100 text-gray-600";
                    const icon = categoryIcons[transaction.category] || <Wallet className="h-5 w-5 shrink-0" />;
                    
                    return (
                      <TableRow key={transaction.id} className="border-b hover:bg-gray-50 transition-all">
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${iconBg}`}>
                              {icon}
                            </div>
                            <span className="truncate max-w-[120px] sm:max-w-none">{transaction.description}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 hidden sm:table-cell">
                          {getCategoryLabel(transaction.type, transaction.category)}
                        </TableCell>
                        <TableCell className="py-4 whitespace-nowrap">
                          {new Date(transaction.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className={`py-4 font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                          {transaction.type === "income" ? "+" : "-"} R$ {Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell className="py-4 hidden sm:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs ${transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                            {transaction.status || "Concluído"}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 hidden sm:table-cell">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => deleteTransaction(transaction.id)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}