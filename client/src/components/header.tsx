import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/lib/i18n";

export default function Header() {
  const [location] = useLocation();
  const { locale, t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: t('nav.rankings'), href: `/${locale}`, current: location === `/${locale}` || location === '/' },
    { name: t('nav.reviews'), href: `/${locale}/reviews`, current: false },
    { name: t('nav.guides'), href: `/${locale}/guides`, current: false },
    { name: t('nav.news'), href: `/${locale}/news`, current: false },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-40 backdrop-blur-md bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <Link href={`/${locale}`} className="flex items-center" data-testid="logo-link">
              <div className="bg-primary-500 text-white p-2 rounded-lg mr-3">
                <i className="fas fa-chart-line text-xl"></i>
              </div>
              <span className="text-2xl font-bold text-foreground">PropFirmMentor</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'text-gray-900 font-medium border-b-2 border-primary-500 pb-1'
                      : 'text-gray-600 hover:text-gray-900 transition-colors'
                  }`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search & Language Switcher */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:block relative">
              <Input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                data-testid="search-input"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </form>

            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              <i className="fas fa-bars text-gray-600"></i>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4" data-testid="mobile-menu">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    item.current
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4 px-3">
              <Input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                data-testid="mobile-search-input"
              />
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
