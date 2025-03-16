import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart4, PieChart } from "lucide-react";

export default function Analysis() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Análise Financeira</h2>
          <p className="text-muted-foreground mt-1">
            Visualize e analise seus padrões de gastos e economias
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <div className="text-center py-8 sm:py-12">
            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Análise de Orçamento</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Visualize como seus gastos se comparam com o orçamento planejado.
            </p>
            <Button>Ver Análise</Button>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <div className="text-center py-8 sm:py-12">
            <PieChart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Distribuição de Gastos</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Veja a distribuição dos seus gastos por categoria em gráficos detalhados.
            </p>
            <Button>Ver Distribuição</Button>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 md:col-span-2">
          <div className="text-center py-8 sm:py-12">
            <BarChart4 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tendências ao Longo do Tempo</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Acompanhe a evolução das suas finanças ao longo do tempo para identificar padrões.
            </p>
            <Button>Ver Tendências</Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 