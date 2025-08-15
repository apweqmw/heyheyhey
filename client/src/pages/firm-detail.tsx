import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { useEffect } from "react";
import Header from "@/components/header";
import CountdownTimer from "@/components/countdown-timer";
import EvaluationSteps from "@/components/evaluation-steps";
import { useClipboard } from "@/hooks/use-clipboard";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import { FirmWithDetails } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function FirmDetail() {
  const [, params] = useRoute("/:locale/firms/:slug");
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();
  const { copyToClipboard } = useClipboard();

  const { data: firm, isLoading, error } = useQuery<FirmWithDetails>({
    queryKey: ['firm', params?.slug, locale],
    queryFn: async () => {
      if (!params?.slug) throw new Error('No slug provided');
      const response = await fetch(`/api/firms/${params.slug}?locale=${locale}`);
      if (!response.ok) {
        throw new Error('Failed to fetch firm details');
      }
      return response.json();
    },
    enabled: !!params?.slug,
  });

  // Set SEO meta tags
  useEffect(() => {
    if (firm) {
      setSEO({
        title: t('firmDetail.seo.title', { firmName: firm.name }),
        description: t('firmDetail.seo.description', { firmName: firm.name }),
        canonical: `/${locale}/firms/${firm.slug}`,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": firm.name,
          "description": firm.descriptionEn,
          "url": firm.websiteUrl,
          "offers": firm.accounts.map(account => ({
            "@type": "Offer",
            "price": account.currentPrice?.toString(),
            "priceCurrency": "USD",
            "description": `$${account.sizeUsd.toLocaleString()} Trading Account`,
          }))
        }
      });
    }
  }, [firm, locale, setSEO, t]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-muted rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-48 bg-muted rounded"></div>
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !firm) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Firm not found</h1>
            <p className="text-muted-foreground">The requested firm could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const activePromotion = firm.promotions[0];
  const getLocalizedDescription = () => {
    switch (locale) {
      case 'ko': return firm.descriptionKo || firm.descriptionEn;
      case 'ja': return firm.descriptionJa || firm.descriptionEn;
      case 'hi': return firm.descriptionHi || firm.descriptionEn;
      default: return firm.descriptionEn;
    }
  };

  const getLocalizedRules = () => {
    switch (locale) {
      case 'ko': return firm.rulesKo || firm.rulesEn;
      case 'ja': return firm.rulesJa || firm.rulesEn;
      case 'hi': return firm.rulesHi || firm.rulesEn;
      default: return firm.rulesEn;
    }
  };

  const handleCopyCoupon = (code: string) => {
    copyToClipboard(code);
  };

  const handleGetChallenge = (account: any) => {
    const url = activePromotion?.landingUrl || firm.referralLink || firm.websiteUrl;
    const utmParams = `?utm_source=proprank&utm_medium=referral&utm_campaign=${firm.slug}&utm_content=${account.sizeUsd}`;
    window.open(`${url}${utmParams}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <a href={`/${locale}`} className="hover:text-foreground">{t('nav.home')}</a>
          <i className="fas fa-chevron-right mx-2 text-xs"></i>
          <a href={`/${locale}`} className="hover:text-foreground">{t('nav.rankings')}</a>
          <i className="fas fa-chevron-right mx-2 text-xs"></i>
          <span className="text-foreground font-medium">{firm.name}</span>
        </div>

        {/* Hero Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Firm Logo */}
              <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl md:text-2xl flex-shrink-0">
                {firm.logoUrl ? (
                  <img src={firm.logoUrl} alt={firm.name} className="w-full h-full object-cover rounded-xl" />
                ) : (
                  firm.name.substring(0, 2).toUpperCase()
                )}
              </div>

              {/* Firm Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="firm-name">
                    {firm.name}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {firm.featured && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        <i className="fas fa-star mr-1"></i>
                        {t('labels.featured')}
                      </Badge>
                    )}
                    {activePromotion && (
                      <Badge variant="destructive">
                        <i className="fas fa-clock mr-1"></i>
                        <CountdownTimer endTime={activePromotion.endsAt} />
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">{firm.payoutSplit}</div>
                    <div className="text-sm text-muted-foreground">{t('labels.payoutSplit')}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">{firm.earliestPayoutDays}d</div>
                    <div className="text-sm text-muted-foreground">{t('labels.payout')}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-bold text-foreground">
                      ⭐ {firm.rating ? Number(firm.rating).toFixed(1) : 'N/A'}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('labels.rating')}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-sm font-bold text-foreground">
                      {firm.platforms?.slice(0, 2).join(', ') || 'MT4/MT5'}
                      {firm.platforms && firm.platforms.length > 2 && '...'}
                    </div>
                    <div className="text-sm text-muted-foreground">{t('labels.platforms')}</div>
                  </div>
                </div>

                <p className="text-muted-foreground" data-testid="firm-description">
                  {getLocalizedDescription()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evaluation Steps */}
        <EvaluationSteps 
          firm={{
            name: firm.name,
            evaluationSteps: firm.evaluationSteps || 2,
            maxDailyLoss: firm.maxDailyLoss || "5%",
            maxTotalLoss: firm.maxTotalLoss || "10%",
            profitTarget: firm.profitTarget || "10%", 
            minTradingDays: firm.minTradingDays || 10,
            consistencyRule: firm.consistencyRule,
            activationFee: Number(firm.activationFee) || 0
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Trading Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-gavel mr-2 text-primary-500"></i>
                  {t('firmDetail.rules.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getLocalizedRules() ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="trading-rules">
                    {Object.entries(getLocalizedRules()!).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-900">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">{t('firmDetail.rules.noRules')}</div>
                )}
              </CardContent>
            </Card>

            {/* Account Sizes & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-calculator mr-2 text-primary-500"></i>
                  {t('firmDetail.pricing.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full" data-testid="pricing-table">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-semibold text-gray-700">{t('table.accountSize')}</th>
                        <th className="text-center py-3 font-semibold text-gray-700">{t('table.basePrice')}</th>
                        <th className="text-center py-3 font-semibold text-gray-700">{t('table.discount')}</th>
                        <th className="text-center py-3 font-semibold text-gray-700">{t('table.finalPrice')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {firm.accounts.map((account) => (
                        <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 font-medium">
                            ${account.sizeUsd.toLocaleString()}
                          </td>
                          <td className="text-center py-4">
                            ${Number(account.basePrice).toLocaleString()}
                          </td>
                          <td className="text-center py-4">
                            {firm.currentDiscount ? (
                              <span className="inline-flex items-center bg-success-100 text-success-800 px-2 py-1 rounded-full text-sm font-medium">
                                {firm.currentDiscount}% OFF
                              </span>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="text-center py-4 font-bold text-primary-600">
                            ${Math.round(account.currentPrice || Number(account.basePrice)).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Funding Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-university mr-2 text-primary-500"></i>
                  {t('firmDetail.fundingAccount.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">
                      <i className="fas fa-check-circle mr-2"></i>
                      What is a Funded Account?
                    </h4>
                    <p className="text-green-700 text-sm leading-relaxed">
                      After passing the evaluation challenges, you receive a funded account with {firm.name}'s capital. 
                      You can trade with larger amounts without risking your own money, keeping {firm.payoutSplit?.split('/')[0] || '80'}% of profits made.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <i className="fas fa-chart-line text-blue-500 mr-2"></i>
                        <h5 className="font-semibold text-foreground">Scaling Process</h5>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Successful traders can scale their accounts up to larger sizes based on consistent performance.
                      </p>
                      <div className="text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Max Scale:</span>
                          <span className="font-medium">Up to $2M+</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Requirements:</span>
                          <span className="font-medium">Consistent profits</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <i className="fas fa-hand-holding-usd text-green-500 mr-2"></i>
                        <h5 className="font-semibold text-foreground">Profit Split</h5>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Keep a significant portion of your trading profits with transparent payout terms.
                      </p>
                      <div className="text-sm">
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">Your Share:</span>
                          <span className="font-bold text-green-600">{firm.payoutSplit?.split('/')[0] || '80'}%</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-muted-foreground">First Payout:</span>
                          <span className="font-medium">{firm.earliestPayoutDays}+ days</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-800 mb-2">
                      <i className="fas fa-lightbulb mr-2"></i>
                      How to Get Funded
                    </h5>
                    <ol className="text-sm text-blue-700 space-y-1 ml-4">
                      <li>1. Purchase an evaluation challenge account</li>
                      <li>2. Pass the {firm.evaluationSteps}-step evaluation process</li>
                      <li>3. Demonstrate consistent, profitable trading</li>
                      <li>4. Receive your funded account with {firm.name}'s capital</li>
                      <li>5. Start earning real profits with their money</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Account vs Evaluation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-exchange-alt mr-2 text-primary-500"></i>
                  {t('firmDetail.liveAccount.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-sm text-muted-foreground mb-4">
                    Understanding the difference between evaluation and live funded accounts:
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Evaluation Phase */}
                    <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <i className="fas fa-clipboard-check text-orange-600 mr-2"></i>
                        <h5 className="font-semibold text-orange-800">Evaluation Phase</h5>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <i className="fas fa-target text-orange-600 mr-2 mt-0.5 text-xs"></i>
                          <div>
                            <div className="font-medium text-orange-800">Profit Target:</div>
                            <div className="text-orange-700">{firm.profitTarget || '10%'} in {firm.minTradingDays || 10}+ trading days</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <i className="fas fa-shield-alt text-orange-600 mr-2 mt-0.5 text-xs"></i>
                          <div>
                            <div className="font-medium text-orange-800">Risk Limits:</div>
                            <div className="text-orange-700">
                              Daily: {firm.maxDailyLoss || '5%'} | Total: {firm.maxTotalLoss || '10%'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <i className="fas fa-dollar-sign text-orange-600 mr-2 mt-0.5 text-xs"></i>
                          <div>
                            <div className="font-medium text-orange-800">Cost:</div>
                            <div className="text-orange-700">One-time evaluation fee + potential activation fee</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Live Funded Account */}
                    <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <i className="fas fa-trophy text-green-600 mr-2"></i>
                        <h5 className="font-semibold text-green-800">Live Funded Account</h5>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-start">
                          <i className="fas fa-money-bill-wave text-green-600 mr-2 mt-0.5 text-xs"></i>
                          <div>
                            <div className="font-medium text-green-800">Real Capital:</div>
                            <div className="text-green-700">Trade with {firm.name}'s money, not yours</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <i className="fas fa-percentage text-green-600 mr-2 mt-0.5 text-xs"></i>
                          <div>
                            <div className="font-medium text-green-800">Profit Share:</div>
                            <div className="text-green-700">Keep {firm.payoutSplit?.split('/')[0] || '80'}% of all profits made</div>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <i className="fas fa-calendar-alt text-green-600 mr-2 mt-0.5 text-xs"></i>
                          <div>
                            <div className="font-medium text-green-800">Payouts:</div>
                            <div className="text-green-700">Regular payouts starting after {firm.earliestPayoutDays} days</div>
                          </div>
                        </div>

                        {firm.activationFee && Number(firm.activationFee) > 0 && (
                          <div className="flex items-start">
                            <i className="fas fa-key text-green-600 mr-2 mt-0.5 text-xs"></i>
                            <div>
                              <div className="font-medium text-green-800">Activation:</div>
                              <div className="text-green-700">${Number(firm.activationFee).toLocaleString()} one-time fee</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {firm.consistencyRule && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <i className="fas fa-balance-scale text-yellow-600 mr-2 mt-0.5"></i>
                        <div>
                          <div className="font-semibold text-yellow-800 mb-1">Consistency Rule:</div>
                          <p className="text-sm text-yellow-700">{firm.consistencyRule}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Referral Section */}
            <Card className="border-primary-200 bg-primary-50">
              <CardHeader>
                <CardTitle className="text-primary-700">
                  <i className="fas fa-gift mr-2"></i>
                  {t('firmDetail.referral.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Coupon Code */}
                {(activePromotion?.couponCode || firm.couponCode) && (
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      {t('firmDetail.referral.couponCode')}:
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-white px-3 py-2 rounded border font-mono text-sm">
                        {activePromotion?.couponCode || firm.couponCode}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyCoupon(activePromotion?.couponCode || firm.couponCode || '')}
                        data-testid="copy-coupon-button"
                      >
                        <i className="fas fa-copy"></i>
                      </Button>
                    </div>
                  </div>
                )}

                {/* Discount Info */}
                {activePromotion && (
                  <div className="bg-warning-100 border border-warning-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-warning-800">
                        {activePromotion.title || t('firmDetail.referral.limitedOffer')}
                      </span>
                      <span className="text-warning-700 font-bold">
                        {Number(activePromotion.discountPct)}% OFF
                      </span>
                    </div>
                    <div className="text-sm text-warning-700">
                      {t('firmDetail.referral.endsIn')}: <CountdownTimer endTime={activePromotion.endsAt} />
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {firm.accounts.map((account) => (
                    <Button
                      key={account.id}
                      className="w-full bg-primary-500 hover:bg-primary-600"
                      onClick={() => handleGetChallenge(account)}
                      data-testid={`get-challenge-${account.sizeUsd}`}
                    >
                      {t('firmDetail.referral.getChallenge')} (${account.sizeUsd.toLocaleString()})
                      <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                    </Button>
                  ))}
                </div>

                <div className="text-xs text-gray-500 text-center">
                  {t('firmDetail.referral.disclosure')}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>{t('firmDetail.stats.title')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('firmDetail.stats.totalSavings')}:</span>
                  <span className="font-bold text-success-600" data-testid="total-savings">
                    ${firm.accounts.reduce((acc, account) => {
                      const savings = Number(account.basePrice) - (account.currentPrice || Number(account.basePrice));
                      return acc + savings;
                    }, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('firmDetail.stats.avgDiscount')}:</span>
                  <span className="font-bold text-primary-600">
                    {firm.currentDiscount || 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('firmDetail.stats.accountSizes')}:</span>
                  <span className="font-bold text-gray-900">
                    {firm.accounts.length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
