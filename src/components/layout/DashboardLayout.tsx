import { useState, ReactNode } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import UserProfileMenu from "@/components/UserProfileMenu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

// Ícones
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  BarChart3,
  Settings,
  Menu,
  X
} from "lucide-react";

// Props para os itens de navegação
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

// Props para o layout do dashboard
interface DashboardLayoutProps {
  children?: ReactNode;
}

// Componente para item de navegação
function NavItem({ to, icon, label, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Links de navegação com seus ícones
  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: t("nav.dashboard"),
    },
    {
      to: "/transactions",
      icon: <Receipt size={20} />,
      label: t("nav.transactions"),
    },
    {
      to: "/budgets",
      icon: <PieChart size={20} />,
      label: t("nav.budgets"),
    },
    {
      to: "/goals",
      icon: <Target size={20} />,
      label: t("nav.goals"),
    },
    {
      to: "/analysis",
      icon: <BarChart3 size={20} />,
      label: t("nav.analysis"),
    },
    {
      to: "/settings",
      icon: <Settings size={20} />,
      label: t("nav.settings"),
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar para desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r bg-card transform transition-transform duration-200 ease-in-out",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <NavLink to="/dashboard" className="flex items-center gap-2 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>{t("app.name")}</span>
          </NavLink>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              onClick={closeSidebar}
            />
          ))}
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div className={cn("flex flex-col flex-1", isMobile ? "ml-0" : "ml-64")}>
        {/* Header para mobile */}
        {isMobile && (
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-semibold">{t("app.name")}</h1>
            <div className="ml-auto flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
              <UserProfileMenu />
            </div>
          </header>
        )}

        {/* Header para desktop */}
        {!isMobile && (
          <header className="sticky top-0 z-30 flex h-16 items-center justify-end gap-4 border-b bg-background px-6">
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeToggle />
              <UserProfileMenu />
            </div>
          </header>
        )}

        {/* Overlay para fechar a sidebar em mobile */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Conteúdo da página */}
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
} 