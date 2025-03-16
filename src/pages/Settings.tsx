import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Layout, 
  CreditCard, 
  PieChart, 
  Target, 
  BarChart4, 
  Shield, 
  Settings as SettingsIcon,
  Bell,
  Mail,
  Save
} from "lucide-react";
import { useAppSettings } from "@/contexts/hooks/useAppSettings";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";

export default function Settings() {
  const [saveStatus, setSaveStatus] = useState("");
  const { tempSettings, updateTempSettings, saveSettings } = useAppSettings();
  const { setTheme } = useTheme();
  const { t } = useTranslation();
  
  const handleSave = (section: string) => {
    saveSettings();
    setSaveStatus(t('settings.settingsSaved', { section }));
    setTimeout(() => setSaveStatus(""), 3000);
  };

  // Demonstração visual da formatação de números
  const numberFormatExamples: Record<string, string> = {
    dot: "1.234,56",
    comma: "1,234.56",
    space: "1 234,56"
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('settings.title')}</h2>
          <p className="text-muted-foreground mt-1">
            {t('settings.subtitle')}
          </p>
        </div>
      </div>

      {saveStatus && (
        <div className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 p-4 rounded mb-6">
          {saveStatus}
        </div>
      )}

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 w-full mb-8">
          <TabsTrigger value="account" className="flex items-center justify-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.tabs.account')}</span>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="flex items-center justify-center gap-2">
            <Layout className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.tabs.dashboard')}</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.tabs.transactions')}</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center justify-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.tabs.budget')}</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center justify-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.tabs.goals')}</span>
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center justify-center gap-2">
            <BarChart4 className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.tabs.analysis')}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.tabs.security')}</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center justify-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{t('settings.tabs.general')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Configurações da Conta */}
        <TabsContent value="account">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">{t('settings.account.title')}</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('settings.account.fullName')}</Label>
                  <Input id="name" placeholder={t('settings.account.fullName')} defaultValue="Maria Betânia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('settings.account.email')}</Label>
                  <Input id="email" type="email" placeholder={t('settings.account.email')} defaultValue="maria@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('settings.account.phone')}</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">{t('settings.account.defaultCurrency')}</Label>
                  <Select defaultValue="BRL">
                    <SelectTrigger>
                      <SelectValue placeholder={t('common.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                      <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">Libra Esterlina (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">{t('settings.account.notificationPreferences')}</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="notifications" className="font-normal">{t('settings.account.pushNotifications')}</Label>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-notifications" className="font-normal">{t('settings.account.emailNotifications')}</Label>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={() => handleSave(t('settings.tabs.account'))}>
                <Save className="h-4 w-4 mr-2" />
                {t('settings.saveChanges')}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Configurações do Dashboard */}
        <TabsContent value="dashboard">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">Configurações do Dashboard</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">Elementos do Dashboard</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-balance" className="font-normal">Mostrar Saldo Total</Label>
                    <Switch id="show-balance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-income" className="font-normal">Mostrar Receitas</Label>
                    <Switch id="show-income" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-expenses" className="font-normal">Mostrar Despesas</Label>
                    <Switch id="show-expenses" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-investments" className="font-normal">Mostrar Investimentos</Label>
                    <Switch id="show-investments" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-recent-transactions" className="font-normal">Mostrar Transações Recentes</Label>
                    <Switch id="show-recent-transactions" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-period">Período Padrão</Label>
                <Select defaultValue="month">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Semanal</SelectItem>
                    <SelectItem value="month">Mensal</SelectItem>
                    <SelectItem value="quarter">Trimestral</SelectItem>
                    <SelectItem value="year">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={() => handleSave("Dashboard")}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Configurações de Transações */}
        <TabsContent value="transactions">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">Configurações de Transações</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="default-view">Visualização Padrão</Label>
                  <Select defaultValue="list">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma visualização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list">Lista</SelectItem>
                      <SelectItem value="calendar">Calendário</SelectItem>
                      <SelectItem value="category">Por Categoria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="transaction-sort">Ordenar Transações Por</Label>
                  <Select defaultValue="date-desc">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Data (mais recente primeiro)</SelectItem>
                      <SelectItem value="date-asc">Data (mais antiga primeiro)</SelectItem>
                      <SelectItem value="amount-desc">Valor (maior primeiro)</SelectItem>
                      <SelectItem value="amount-asc">Valor (menor primeiro)</SelectItem>
                      <SelectItem value="category">Categoria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">Preferências de Exibição</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-categories" className="font-normal">Mostrar Categorias</Label>
                    <Switch id="show-categories" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-transaction-icons" className="font-normal">Mostrar Ícones de Transações</Label>
                    <Switch id="show-transaction-icons" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="confirm-deletions" className="font-normal">Confirmar Exclusões</Label>
                    <Switch id="confirm-deletions" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={() => handleSave("Transações")}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Configurações de Orçamento */}
        <TabsContent value="budget">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">Configurações de Orçamento</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget-period">Período do Orçamento</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="yearly">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget-start-day">Dia de Início do Orçamento</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um dia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dia 1</SelectItem>
                      <SelectItem value="5">Dia 5</SelectItem>
                      <SelectItem value="10">Dia 10</SelectItem>
                      <SelectItem value="15">Dia 15</SelectItem>
                      <SelectItem value="20">Dia 20</SelectItem>
                      <SelectItem value="25">Dia 25</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">Notificações de Orçamento</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="budget-warnings" className="font-normal">Avisos de Limite de Orçamento</Label>
                    <Switch id="budget-warnings" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="budget-reminder" className="font-normal">Lembrete de Configuração de Orçamento</Label>
                    <Switch id="budget-reminder" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget-notification-threshold">Notificar Quando Atingir</Label>
                <Select defaultValue="80">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma porcentagem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50">50% do Orçamento</SelectItem>
                    <SelectItem value="75">75% do Orçamento</SelectItem>
                    <SelectItem value="80">80% do Orçamento</SelectItem>
                    <SelectItem value="90">90% do Orçamento</SelectItem>
                    <SelectItem value="100">100% do Orçamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={() => handleSave("Orçamento")}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Configurações de Metas Financeiras */}
        <TabsContent value="goals">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">Configurações de Metas Financeiras</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="goal-display">Visualização Padrão</Label>
                  <Select defaultValue="progress">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma visualização" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="progress">Progresso</SelectItem>
                      <SelectItem value="timeline">Linha do Tempo</SelectItem>
                      <SelectItem value="category">Por Categoria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-sort">Ordenar Metas Por</Label>
                  <Select defaultValue="deadline">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deadline">Prazo (mais próximo primeiro)</SelectItem>
                      <SelectItem value="name">Nome</SelectItem>
                      <SelectItem value="amount">Valor</SelectItem>
                      <SelectItem value="progress">Progresso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">Notificações de Metas</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="goal-reminders" className="font-normal">Lembretes de Metas</Label>
                    <Switch id="goal-reminders" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="goal-progress" className="font-normal">Atualizações de Progresso</Label>
                    <Switch id="goal-progress" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="goal-deadline" className="font-normal">Avisos de Prazos</Label>
                    <Switch id="goal-deadline" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={() => handleSave("Metas")}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Configurações de Análises */}
        <TabsContent value="analysis">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">Configurações de Análises</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="analysis-period">Período Padrão de Análise</Label>
                  <Select defaultValue="month">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Última semana</SelectItem>
                      <SelectItem value="month">Último mês</SelectItem>
                      <SelectItem value="quarter">Último trimestre</SelectItem>
                      <SelectItem value="year">Último ano</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chart-type">Tipo de Gráfico Padrão</Label>
                  <Select defaultValue="bar">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Barras</SelectItem>
                      <SelectItem value="line">Linhas</SelectItem>
                      <SelectItem value="pie">Pizza</SelectItem>
                      <SelectItem value="donut">Rosca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">Componentes de Análise</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-trends" className="font-normal">Mostrar Tendências</Label>
                    <Switch id="show-trends" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-comparisons" className="font-normal">Mostrar Comparações</Label>
                    <Switch id="show-comparisons" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-predictions" className="font-normal">Mostrar Previsões</Label>
                    <Switch id="show-predictions" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-analysis-view">Visualização Padrão</Label>
                <Select defaultValue="expense-category">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma visualização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense-category">Gastos por Categoria</SelectItem>
                    <SelectItem value="income-vs-expense">Receitas vs. Despesas</SelectItem>
                    <SelectItem value="monthly-overview">Visão Geral Mensal</SelectItem>
                    <SelectItem value="savings-rate">Taxa de Poupança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={() => handleSave("Análises")}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Configurações de Segurança e Privacidade */}
        <TabsContent value="security">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">Configurações de Segurança e Privacidade</h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">Segurança da Conta</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-notification" className="font-normal">Notificações de Login</Label>
                    <Switch id="login-notification" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="two-factor" className="font-normal">Autenticação de Dois Fatores</Label>
                    <Switch id="two-factor" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="biometric" className="font-normal">Acesso por Biometria</Label>
                    <Switch id="biometric" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">Privacidade</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-balances" className="font-normal">Ocultar Saldos na Tela Inicial</Label>
                    <Switch id="hide-balances" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hide-transactions" className="font-normal">Ocultar Detalhes de Transações</Label>
                    <Switch id="hide-transactions" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="app-lock" className="font-normal">Bloquear Aplicativo ao Minimizar</Label>
                    <Switch id="app-lock" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Tempo de Expiração da Sessão</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutos</SelectItem>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="never">Nunca</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={() => handleSave("Segurança")}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Configurações Gerais */}
        <TabsContent value="general">
          <Card className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">{t('settings.general.title')}</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">{t('settings.general.language')}</Label>
                  <Select 
                    value={tempSettings.language} 
                    onValueChange={(value) => updateTempSettings({ language: value as "pt-br" | "en" | "es" | "fr" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('common.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">{t('settings.general.dateFormat')}</Label>
                  <Select 
                    value={tempSettings.dateFormat}
                    onValueChange={(value) => updateTempSettings({ dateFormat: value as "dd/mm/yyyy" | "mm/dd/yyyy" | "yyyy-mm-dd" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('common.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/AAAA</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/AAAA</SelectItem>
                      <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="theme">{t('settings.general.theme')}</Label>
                  <Select 
                    value={tempSettings.theme} 
                    onValueChange={(value) => {
                      updateTempSettings({ theme: value as "light" | "dark" | "system" });
                      // Previsão temporária do tema para o usuário ver como fica
                      setTheme(value as "light" | "dark" | "system");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('common.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">{t('settings.general.light')}</SelectItem>
                      <SelectItem value="dark">{t('settings.general.dark')}</SelectItem>
                      <SelectItem value="system">{t('settings.general.system')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number-format">{t('settings.general.numberFormat')}</Label>
                  <Select 
                    value={tempSettings.numberFormat}
                    onValueChange={(value) => updateTempSettings({ numberFormat: value as "dot" | "comma" | "space" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('common.select')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dot">1.000,00</SelectItem>
                      <SelectItem value="comma">1,000.00</SelectItem>
                      <SelectItem value="space">1 000,00</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('settings.general.example')}: {numberFormatExamples[tempSettings.numberFormat]}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">{t('settings.general.interfacePreferences')}</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compact-view" className="font-normal">{t('settings.general.compactMode')}</Label>
                    <Switch 
                      id="compact-view" 
                      checked={tempSettings.compactView}
                      onCheckedChange={(checked) => updateTempSettings({ compactView: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations" className="font-normal">{t('settings.general.animations')}</Label>
                    <Switch 
                      id="animations" 
                      checked={tempSettings.animations}
                      onCheckedChange={(checked) => updateTempSettings({ animations: checked })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium dark:text-gray-100">{t('settings.general.exportBackup')}</h4>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1">{t('settings.general.exportData')}</Button>
                  <Button variant="outline" className="flex-1">{t('settings.general.cloudBackup')}</Button>
                </div>
              </div>
              
              <Button className="w-full sm:w-auto" onClick={() => handleSave(t('settings.tabs.general'))}>
                <Save className="h-4 w-4 mr-2" />
                {t('settings.saveChanges')}
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 