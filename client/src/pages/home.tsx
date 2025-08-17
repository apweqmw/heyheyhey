import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import FilterSortBar from "@/components/filter-sort-bar";
import FirmListing from "@/components/firm-listing";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import { FirmWithDetails } from "@shared/schema";

export default function Home() {
  const [location] = useLocation();
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();
  
  // Parse URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const [filters, setFilters] = useState({
    sort: urlParams.get('sort') || 'discount_desc',
    accountSize: urlParams.get('size') ? parseInt(urlParams.get('size')!) : undefined,
    platform: urlParams.get('platform') || undefined,
    maxPayoutDays: urlParams.get('maxPayout') ? parseInt(urlParams.get('maxPayout')!) : undefined,
  });

  // Fetch firms data
  const { data: firms = [], isLoading, error } = useQuery<FirmWithDetails[]>({
    queryKey: ['firms', locale, filters.sort, filters.accountSize, filters.platform, filters.maxPayoutDays],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('locale', locale);
      params.set('sort', filters.sort);
      if (filters.accountSize) params.set('size', filters.accountSize.toString());
      if (filters.platform) params.set('platform', filters.platform);
      if (filters.maxPayoutDays) params.set('maxPayoutDays', filters.maxPayoutDays.toString());
      
      const response = await fetch(`/api/firms?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch firms');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.sort !== 'discount_desc') params.set('sort', filters.sort);
    if (filters.accountSize) params.set('size', filters.accountSize.toString());
    if (filters.platform) params.set('platform', filters.platform);
    if (filters.maxPayoutDays) params.set('maxPayout', filters.maxPayoutDays.toString());
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  // Set SEO meta tags
  useEffect(() => {
    setSEO({
      title: t('home.seo.title'),
      description: t('home.seo.description'),
      canonical: `/${locale}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": t('home.seo.title'),
        "description": t('home.seo.description'),
        "itemListElement": firms.map((firm, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Organization",
            "name": firm.name,
            "description": firm.descriptionEn,
            "offers": {
              "@type": "Offer",
              "price": firm.finalPrice?.toString(),
              "priceCurrency": "USD",
            }
          }
        }))
      }
    });
  }, [locale, firms, setSEO, t]);

  // Calculate stats
  const stats = {
    totalFirms: firms.length,
    avgDiscount: Math.round(firms.reduce((acc, firm) => acc + (firm.currentDiscount || 0), 0) / firms.length),
    activePromotions: firms.filter(firm => firm.promotions.length > 0).length,
    avgSavings: Math.round(firms.reduce((acc, firm) => {
      if (!firm.accounts[0]) return acc;
      const basePrice = Number(firm.accounts[0].basePrice);
      const finalPrice = firm.finalPrice || basePrice;
      return acc + (basePrice - finalPrice);
    }, 0) / firms.length),
    bestDiscount: Math.max(...firms.map(firm => firm.currentDiscount || 0)),
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">{t('errors.loadFailed')}</h1>
            <p className="text-muted-foreground">{t('errors.tryAgain')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FilterSortBar filters={filters} onFiltersChange={setFilters} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <a href="#" className="hover:text-foreground">{t('nav.home')}</a>
            <i className="fas fa-chevron-right mx-2 text-xs"></i>
            <span className="text-foreground font-medium">{t('nav.rankings')}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{t('home.title')}</h1>
              <p className="text-muted-foreground">
                {t('home.subtitle', { count: stats.totalFirms })}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="avg-discount">
                  {stats.avgDiscount}%
                </div>
                <div className="text-xs text-muted-foreground">{t('stats.avgDiscount')}</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary" data-testid="active-promotions">
                  {stats.activePromotions}
                </div>
                <div className="text-xs text-muted-foreground">{t('stats.activeDeals')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Firm Listings */}
        <FirmListing firms={firms} isLoading={isLoading} />

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground" data-testid="avg-savings">
                  ${stats.avgSavings}
                </div>
                <div className="text-sm text-muted-foreground">{t('stats.avgSavings')}</div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                  <i className="fas fa-arrow-up mr-1"></i>{t('stats.vsLastMonth')}
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-dollar-sign text-green-600 dark:text-green-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground" data-testid="best-discount">
                  {stats.bestDiscount}%
                </div>
                <div className="text-sm text-muted-foreground">{t('stats.bestDiscount')}</div>
                <div className="text-xs text-orange-600 dark:text-orange-400 font-medium mt-1">
                  <i className="fas fa-clock mr-1"></i>{t('stats.limited')}
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-percent text-orange-600 dark:text-orange-400"></i>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground" data-testid="total-users">
                  2.4K
                </div>
                <div className="text-sm text-muted-foreground">{t('stats.usersThisMonth')}</div>
                <div className="text-xs text-primary font-medium mt-1">
                  <i className="fas fa-users mr-1"></i>{t('stats.activeCommunity')}
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <i className="fas fa-users text-primary"></i>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg text-primary-foreground p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-primary-foreground/80 mb-6">{t('cta.subtitle')}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t('cta.emailPlaceholder')}
                className="flex-1 px-4 py-3 rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-primary"
                data-testid="newsletter-email"
              />
              <button className="bg-background text-primary px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-colors" data-testid="subscribe-button">
                {t('cta.subscribe')}
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-primary-foreground/70">
              <span className="flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                {t('cta.weeklyUpdates')}
              </span>
              <span className="flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                {t('cta.exclusiveDeals')}
              </span>
              <span className="flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                {t('cta.noSpam')}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
