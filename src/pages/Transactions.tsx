import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ExpensesTracker from "@/components/ExpensesTracker";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-full max-w-full">
      <div className="mb-6 space-y-2">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Transações</h2>
            <p className="text-gray-500">Gerencie suas receitas e despesas</p>
          </div>
          
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative flex-1 sm:flex-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar transações..."
                className="pl-8 pr-4 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button 
              className="bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova Transação</span>
              <span className="sm:hidden">Nova</span>
            </Button>
          </div>
        </div>
      </div>

      <ExpensesTracker />
    </div>
  );
} 