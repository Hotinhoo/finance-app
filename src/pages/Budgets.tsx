import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PiggyBank } from "lucide-react";

export default function Budgets() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orçamento Mensal</h2>
          <p className="text-muted-foreground mt-1">
            Configure limites de gastos por categoria para controlar melhor suas finanças
          </p>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="text-center py-8 sm:py-12">
          <PiggyBank className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Orçamento Mensal</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Configure limites de gastos por categoria para controlar melhor suas finanças.
          </p>
          <Button>Configurar Orçamento</Button>
        </div>
      </Card>
    </div>
  );
} 