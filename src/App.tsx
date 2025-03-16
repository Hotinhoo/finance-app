import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Wallet, PieChart, ArrowDownUp, Target, BarChart, Settings as SettingsIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import { TransactionProvider } from "./contexts/TransactionContext";
import { AppSettingsHandler } from "./components/AppSettingsHandler";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "./hooks/useMediaQuery";

// Pages
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/Transactions";
import BudgetsPage from "./pages/Budgets";
import GoalsPage from "./pages/Goals";
import AnalysisPage from "./pages/Analysis";
import SettingsPage from "./pages/Settings";

// Components
import UserProfileMenu from "./components/UserProfileMenu";

// Tipos
type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  end?: boolean;
  onClick?: () => void;
};

// Componente NavItem
const NavItem = ({ to, icon, label, end, onClick }: NavItemProps) => (
  <NavLink 
    to={to} 
    end={end}
    onClick={onClick}
    className={({ isActive }) => `
      flex items-center px-3 py-2 mb-1 rounded-md text-gray-600 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors
      ${isActive ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' : ''}
    `}
  >
    <div className="w-10 flex justify-center">{icon}</div>
    <span>{label}</span>
  </NavLink>
);

// Componente Navigation
const Navigation = ({ onClick }: { onClick?: () => void }) => {
  const { t } = useTranslation();
  
  return (
    <nav className="space-y-1">
      <NavItem 
        to="/" 
        icon={<Wallet className="h-5 w-5" />}
        label={t('nav.dashboard')}
        end
        onClick={onClick}
      />
      <NavItem 
        to="/transactions" 
        icon={<ArrowDownUp className="h-5 w-5" />}
        label={t('nav.transactions')}
        onClick={onClick}
      />
      <NavItem 
        to="/budgets" 
        icon={<PieChart className="h-5 w-5" />}
        label={t('nav.budgets')}
        onClick={onClick}
      />
      <NavItem 
        to="/goals" 
        icon={<Target className="h-5 w-5" />}
        label={t('nav.goals')}
        onClick={onClick}
      />
      <NavItem 
        to="/analysis" 
        icon={<BarChart className="h-5 w-5" />}
        label={t('nav.analysis')}
        onClick={onClick}
      />
      <NavItem 
        to="/settings" 
        icon={<SettingsIcon className="h-5 w-5" />}
        label={t('nav.settings')}
        onClick={onClick}
      />
    </nav>
  );
};

export default function App() {
  const { t } = useTranslation();
  const isSmall = useMediaQuery("(max-width: 640px)");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fechar menu mobile ao selecionar uma rota
  const handleNavClick = () => {
    if (isSmall) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="finances-theme">
      <AppSettingsProvider>
        <TransactionProvider>
          <Router>
            <AppSettingsHandler />
            
            <div className="flex flex-col min-h-screen md:flex-row w-full bg-gray-50 dark:bg-gray-900">
              {/* Sidebar para desktop */}
              <div className="hidden md:flex md:w-64 p-4 border-r border-gray-200 dark:border-gray-800 flex-col h-screen bg-white dark:bg-gray-950">
                <div className="space-y-2 mb-4">
                  <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{t('app.name')}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('app.description')}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex-1 py-2">
                  <Navigation />
                </div>
                
                <div className="pt-4">
                  <UserProfileMenu />
                </div>
              </div>
              
              {/* Header para mobile */}
              <div className="md:hidden w-full sticky top-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 z-10">
                <div className="p-4 flex justify-between items-center">
                  <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{t('app.name')}</h1>
                  <div className="flex items-center gap-2">
                    <UserProfileMenu />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                      {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>
                
                {/* Menu mobile */}
                {mobileMenuOpen && (
                  <Card className="mt-2 mx-2 mb-2 p-2 absolute w-[calc(100%-1rem)] bg-white dark:bg-gray-950 shadow-lg rounded-md z-20">
                    <Navigation onClick={handleNavClick} />
                  </Card>
                )}
              </div>
              
              {/* Conteúdo principal */}
              <div className="flex-1 p-4 md:p-8 w-full max-w-full overflow-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/budgets" element={<BudgetsPage />} />
                  <Route path="/goals" element={<GoalsPage />} />
                  <Route path="/analysis" element={<AnalysisPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </div>
          </Router>
        </TransactionProvider>
      </AppSettingsProvider>
    </ThemeProvider>
  );
}