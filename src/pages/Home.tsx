import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PieChart, CreditCard, BarChart, Bell, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function Home() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
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
            <span className="font-bold text-xl">{t("app.name")}</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            <div className="hidden sm:block space-x-2">
              <Button variant="outline" asChild>
                <Link to="/login">{t("auth.login.loginButton")}</Link>
              </Button>
              <Button asChild>
                <Link to="/register">{t("auth.register.registerButton")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {t("landing.hero.title")}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
          {t("landing.hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Button size="lg" asChild>
            <Link to="/register">{t("landing.hero.getStarted")}</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/login">{t("landing.hero.login")}</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("landing.features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <PieChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.features.feature1.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.feature1.description")}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.features.feature2.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.feature2.description")}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.features.feature3.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.feature3.description")}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.features.feature4.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.feature4.description")}
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t("landing.features.feature5.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.feature5.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          {t("landing.cta.title")}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {t("landing.cta.subtitle")}
        </p>
        <Button size="lg" asChild>
          <Link to="/register">{t("landing.cta.button")}</Link>
        </Button>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span className="font-bold">{t("app.name")}</span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("landing.footer.about")}
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("landing.footer.terms")}
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("landing.footer.privacy")}
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("landing.footer.contact")}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {currentYear} {t("app.name")} — {t("landing.footer.rights")}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 