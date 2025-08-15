'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "./language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/lib/i18n";

export default function Header() {
  const pathname = usePathname();
  const { locale, t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: t('nav.rankings'), href: `/${locale}`, current: pathname === `/${locale}` || pathname === '/' },
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
          {/* Logo - Responsive sizing */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center" data-testid="logo-link">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg mr-2 sm:mr-3">
                <i className="fas fa-chart-line text-lg sm:text-xl"></i>
              </div>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-foreground whitespace-nowrap">
                PropFirmMentor
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex ml-8 space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'text-foreground font-medium border-b-2 border-primary pb-1'
                      : 'text-muted-foreground hover:text-foreground transition-colors'
                  }`}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search - Hidden on mobile */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <Input
                type="text"
                placeholder={t('header.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="search-input"
              />
              <i className="fas fa-search absolute left-3 top-3 text-muted-foreground"></i>
            </form>

            {/* Theme Toggle - Always visible */}
            <ThemeToggle />
            
            {/* Language Switcher - Always visible */}
            <LanguageSwitcher />

            {/* Mobile Menu Button - Only on mobile/tablet */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2 ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center space-y-1">
                <div className="w-4 h-0.5 bg-foreground"></div>
                <div className="w-4 h-0.5 bg-foreground"></div>
                <div className="w-4 h-0.5 bg-foreground"></div>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 bg-card" data-testid="mobile-menu">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    item.current
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
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
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t('header.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4"
                  data-testid="mobile-search-input"
                />
                <i className="fas fa-search absolute left-3 top-3 text-muted-foreground"></i>
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
