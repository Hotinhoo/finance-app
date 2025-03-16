import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Target, Trash2 } from "lucide-react";

interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export default function FinancialPlanning() {
  const [goals, setGoals] = useState<FinancialGoal[]>([]);
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);

  const handleAddGoal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newGoal: FinancialGoal = {
      id: crypto.randomUUID(),
      name: formData.get("name") as string,
      targetAmount: Number(formData.get("targetAmount")),
      currentAmount: Number(formData.get("currentAmount")),
      deadline: formData.get("deadline") as string,
      category: formData.get("category") as string,
    };
    setGoals([...goals, newGoal]);
    setShowNewGoalForm(false);
    e.currentTarget.reset();
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Metas Financeiras</h2>
            <p className="text-muted-foreground">
              Defina e acompanhe suas metas financeiras
            </p>
          </div>
          <Button
            onClick={() => setShowNewGoalForm(!showNewGoalForm)}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus className="h-4 w-4" />
            Nova Meta
          </Button>
        </div>

        {showNewGoalForm && (
          <form onSubmit={handleAddGoal} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Meta</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Comprar um carro"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select name="category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Poupança</SelectItem>
                    <SelectItem value="investment">Investimento</SelectItem>
                    <SelectItem value="property">Imóvel</SelectItem>
                    <SelectItem value="vehicle">Veículo</SelectItem>
                    <SelectItem value="education">Educação</SelectItem>
                    <SelectItem value="travel">Viagem</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Valor Total</Label>
                <Input
                  id="targetAmount"
                  name="targetAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="R$ 0,00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentAmount">Valor Atual</Label>
                <Input
                  id="currentAmount"
                  name="currentAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="R$ 0,00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Data Limite</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewGoalForm(false)}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button type="submit" className="w-full sm:w-auto">Adicionar Meta</Button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Você ainda não tem metas financeiras definidas.
                <br />
                Comece adicionando sua primeira meta!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <Card key={goal.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)} • 
                        Prazo: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>
                        {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(goal.currentAmount / goal.targetAmount) * 100}
                    />
                    <div className="flex justify-between text-sm">
                      <span>R$ {goal.currentAmount.toFixed(2)}</span>
                      <span>R$ {goal.targetAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}