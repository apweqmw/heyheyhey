import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LanguageSwitcher from "./language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { useI18n } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { Search, Star } from "lucide-react";

interface Firm {
  id: string;
  name: string;
  slug: string;
  rating: string;
  payoutSplit: string;
  platforms: string[];
  logoUrl?: string;
}

export default function Header() {
  const [location] = useLocation();
  const { locale, t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: t('nav.rankings'), href: `/${locale}`, current: location === `/${locale}` || location === '/' },
    { name: t('nav.reviews'), href: `/${locale}/reviews`, current: false },
    { name: t('nav.guides'), href: `/${locale}/guides`, current: false },
    { name: t('nav.news'), href: `/${locale}/news`, current: false },
  ];

  // Fetch firms for search
  const { data: firmsData } = useQuery({
    queryKey: ["/api/firms"],
    queryFn: async () => {
      const response = await fetch("/api/firms");
      if (!response.ok) throw new Error('Failed to fetch firms');
      return response.json();
    },
  });

  const firms: Firm[] = firmsData || [];

  // Filter firms based on search query
  const filteredFirms = firms.filter(firm =>
    firm.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); // Limit to 5 results

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && filteredFirms.length > 0) {
      // Navigate to first result
      window.location.href = `/${locale}/firms/${filteredFirms[0].slug}`;
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
    console.log('Searching for:', value);
  };

  const handleResultClick = (slug: string) => {
    setSearchQuery("");
    setShowSearchResults(false);
    window.location.href = `/${locale}/firms/${slug}`;
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <div ref={searchRef} className="hidden md:block relative">
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder={t('header.searchPlaceholder')}
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-0 focus:border-border"
                  data-testid="search-input"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </form>
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery.length > 0 && (
                <Card className="absolute top-full mt-1 w-full lg:w-80 max-h-96 overflow-y-auto z-50 shadow-lg">
                  <CardContent className="p-2">
                    {filteredFirms.length > 0 ? (
                      <div className="space-y-1">
                        {filteredFirms.map((firm) => (
                          <div
                            key={firm.id}
                            onClick={() => handleResultClick(firm.slug)}
                            className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                            data-testid={`search-result-${firm.slug}`}
                          >
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                              {firm.logoUrl ? (
                                <img
                                  src={firm.logoUrl}
                                  alt={`${firm.name} logo`}
                                  className="h-8 w-8 rounded-lg object-cover"
                                />
                              ) : (
                                firm.name.substring(0, 2).toUpperCase()
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">{firm.name}</div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{firm.rating}</span>
                                </div>
                                <span>•</span>
                                <span>{firm.payoutSplit} split</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {firm.platforms.slice(0, 2).map((platform) => (
                                <Badge key={platform} variant="outline" className="text-xs">
                                  {platform}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery.length > 0 ? (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No firms found for "{searchQuery}"
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              )}
            </div>

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
            <div className="mt-4 px-3">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder={t('header.searchPlaceholder')}
                    value={searchQuery}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4"
                    data-testid="mobile-search-input"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </form>
              
              {/* Mobile Search Results */}
              {showSearchResults && searchQuery.length > 0 && (
                <Card className="mt-2 max-h-64 overflow-y-auto">
                  <CardContent className="p-2">
                    {filteredFirms.length > 0 ? (
                      <div className="space-y-1">
                        {filteredFirms.map((firm) => (
                          <div
                            key={firm.id}
                            onClick={() => handleResultClick(firm.slug)}
                            className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                            data-testid={`mobile-search-result-${firm.slug}`}
                          >
                            <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                              {firm.logoUrl ? (
                                <img
                                  src={firm.logoUrl}
                                  alt={`${firm.name} logo`}
                                  className="h-6 w-6 rounded object-cover"
                                />
                              ) : (
                                firm.name.substring(0, 1).toUpperCase()
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{firm.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {firm.rating}★ • {firm.payoutSplit} split
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : searchQuery.length > 0 ? (
                      <div className="text-center py-3 text-muted-foreground text-sm">
                        No firms found for "{searchQuery}"
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
