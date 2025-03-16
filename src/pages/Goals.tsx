import FinancialPlanning from "@/components/FinancialPlanning";

export default function Goals() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Metas Financeiras</h2>
          <p className="text-muted-foreground mt-1">
            Defina e acompanhe suas metas financeiras de longo prazo
          </p>
        </div>
      </div>

      <FinancialPlanning />
    </div>
  );
} 