import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CountdownTimer from "./countdown-timer";
import { useClipboard } from "@/hooks/use-clipboard";
import { useI18n } from "@/lib/i18n";
import { FirmWithDetails } from "@shared/schema";

interface FirmListingProps {
  firms: FirmWithDetails[];
  isLoading: boolean;
}

export default function FirmListing({ firms, isLoading }: FirmListingProps) {
  const { locale, t } = useI18n();
  const { copyToClipboard } = useClipboard();
  const [loadingMore, setLoadingMore] = useState(false);

  const handleCopyCoupon = (code: string) => {
    copyToClipboard(code);
  };

  const handleGetChallenge = (firm: FirmWithDetails, account: any) => {
    const activePromotion = firm.promotions[0];
    const url = activePromotion?.landingUrl || firm.referralLink || firm.websiteUrl;
    const utmParams = `?utm_source=proprank&utm_medium=referral&utm_campaign=${firm.slug}&utm_content=${account.sizeUsd}`;
    window.open(`${url}${utmParams}`, '_blank', 'noopener,noreferrer');
  };

  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="bg-muted/50 px-6 py-4 border-b border-border">
            <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-3">{t('table.firm')}</div>
              <div className="col-span-2 text-center">{t('table.accountSize')}</div>
              <div className="col-span-2 text-center">{t('table.price')}</div>
              <div className="col-span-2 text-center">{t('table.discount')}</div>
              <div className="col-span-1 text-center">{t('table.payout')}</div>
              <div className="col-span-2 text-center">{t('table.action')}</div>
            </div>
          </div>

          {/* Loading Skeletons */}
          <div className="divide-y divide-border">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="px-6 py-5">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 flex items-center space-x-3">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <Skeleton className="h-6 w-16 mx-auto" />
                  </div>
                  <div className="col-span-2 text-center">
                    <Skeleton className="h-6 w-16 mx-auto" />
                  </div>
                  <div className="col-span-2 text-center">
                    <Skeleton className="h-6 w-20 mx-auto" />
                  </div>
                  <div className="col-span-1 text-center">
                    <Skeleton className="h-6 w-12 mx-auto" />
                  </div>
                  <div className="col-span-2 text-center">
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (firms.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <i className="fas fa-search text-gray-400 text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('listing.noResults')}</h3>
          <p className="text-gray-600">{t('listing.tryDifferentFilters')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table Header - Hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="col-span-3">{t('table.firm')}</div>
                <div className="col-span-2 text-center">{t('table.accountSize')}</div>
                <div className="col-span-2 text-center">{t('table.price')}</div>
                <div className="col-span-2 text-center">{t('table.discount')}</div>
                <div className="col-span-1 text-center">{t('table.payout')}</div>
                <div className="col-span-2 text-center">{t('table.action')}</div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {firms.map((firm) => {
                const activePromotion = firm.promotions[0];
                const primaryAccount = firm.accounts[0];
                const hasDiscount = firm.currentDiscount && firm.currentDiscount > 0;
                const couponCode = activePromotion?.couponCode || firm.couponCode;

                return (
                  <div
                    key={firm.id}
                    className={`px-6 py-5 hover:bg-muted/30 transition-colors ${
                      firm.featured ? 'bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-l-accent' : ''
                    }`}
                    data-testid={`firm-row-${firm.slug}`}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Firm Info */}
                      <div className="col-span-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                            {firm.logoUrl ? (
                              <img src={firm.logoUrl} alt={firm.name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              firm.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          
                          <div>
                            <div className="mb-1">
                              <Link 
                                href={`/${locale}/firms/${firm.slug}`}
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                                data-testid={`firm-name-${firm.slug}`}
                              >
                                {firm.name}
                              </Link>
                            </div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              {firm.featured && (
                                <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                                  <i className="fas fa-star mr-1"></i>
                                  {t('labels.featured')}
                                </Badge>
                              )}
                              {activePromotion && (
                                <Badge variant="destructive" className="text-xs">
                                  <i className="fas fa-clock mr-1"></i>
                                  <CountdownTimer endTime={activePromotion.endsAt} />
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span>⭐ {firm.rating ? Number(firm.rating).toFixed(1) : 'N/A'}</span>
                              <span>{firm.platforms?.join('/') || 'MT4/MT5'}</span>
                              <span>{firm.earliestPayoutDays}d {t('labels.payout')}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Account Size */}
                      <div className="col-span-2 text-center">
                        <div className="text-lg font-bold text-foreground" data-testid={`account-size-${firm.slug}`}>
                          ${primaryAccount?.sizeUsd.toLocaleString() || 'N/A'}
                        </div>
                        <div className="text-sm text-muted-foreground">{t('labels.challenge')}</div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center">
                        {hasDiscount && primaryAccount ? (
                          <>
                            <div className="text-sm text-muted-foreground line-through">
                              ${Number(primaryAccount.basePrice).toLocaleString()}
                            </div>
                            <div className="text-lg font-bold text-foreground" data-testid={`final-price-${firm.slug}`}>
                              ${Math.round(primaryAccount.currentPrice || Number(primaryAccount.basePrice)).toLocaleString()}
                            </div>
                          </>
                        ) : (
                          <div className="text-lg font-bold text-foreground">
                            ${primaryAccount ? Number(primaryAccount.basePrice).toLocaleString() : 'N/A'}
                          </div>
                        )}
                      </div>

                      {/* Discount */}
                      <div className="col-span-2 text-center">
                        {hasDiscount ? (
                          <>
                            <div className="inline-flex items-center bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                              <i className="fas fa-percent mr-1"></i>
                              <span data-testid={`discount-${firm.slug}`}>{firm.currentDiscount}% OFF</span>
                            </div>
                            {activePromotion && (
                              <div className="text-xs text-muted-foreground mt-1">
                                {t('labels.endsIn')} <CountdownTimer endTime={activePromotion.endsAt} />
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-sm text-muted-foreground">{t('labels.noDiscount')}</div>
                        )}
                      </div>

                      {/* Payout */}
                      <div className="col-span-1 text-center">
                        <div className="text-lg font-bold text-foreground" data-testid={`payout-split-${firm.slug}`}>
                          {firm.payoutSplit || 'N/A'}
                        </div>
                        <div className="text-xs text-muted-foreground">{t('labels.split')}</div>
                      </div>

                      {/* Action */}
                      <div className="col-span-2 text-center">
                        <div className="space-y-2">
                          {/* Coupon Code */}
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <span className="text-muted-foreground">{t('labels.code')}:</span>
                            {couponCode ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 px-2 font-mono text-xs"
                                onClick={() => handleCopyCoupon(couponCode)}
                                data-testid={`copy-coupon-${firm.slug}`}
                              >
                                <span>{couponCode}</span>
                                <i className="fas fa-copy ml-1"></i>
                              </Button>
                            ) : (
                              <span className="text-muted-foreground text-xs">{t('labels.none')}</span>
                            )}
                          </div>
                          
                          {/* Get Challenge Button */}
                          <Button
                            className={`w-full font-medium transition-colors ${
                              firm.featured 
                                ? 'bg-accent hover:bg-accent/90' 
                                : 'bg-primary hover:bg-primary/90'
                            } text-primary-foreground`}
                            onClick={() => primaryAccount && handleGetChallenge(firm, primaryAccount)}
                            data-testid={`get-challenge-${firm.slug}`}
                          >
                            {t('actions.getChallenge')}
                            <i className="fas fa-external-link-alt ml-1 text-xs"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            <div className="px-6 py-8 text-center border-t border-border bg-muted/30">
              <Button
                variant="outline"
                disabled={loadingMore}
                className="inline-flex items-center"
                onClick={() => {
                  setLoadingMore(true);
                  // TODO: Implement pagination
                  setTimeout(() => setLoadingMore(false), 1000);
                }}
                data-testid="load-more-button"
              >
                {loadingMore ? (
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                ) : (
                  <i className="fas fa-plus mr-2"></i>
                )}
                {t('actions.loadMore')}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                {t('listing.showingCount', { count: firms.length })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile/Tablet Card Layout */}
      <div className="lg:hidden space-y-4">
        {firms.map((firm) => {
          const activePromotion = firm.promotions[0];
          const primaryAccount = firm.accounts[0];
          const hasDiscount = firm.currentDiscount && firm.currentDiscount > 0;
          const couponCode = activePromotion?.couponCode || firm.couponCode;

          return (
            <Card
              key={firm.id}
              className={`overflow-hidden ${
                firm.featured ? 'ring-2 ring-accent border-accent/50' : ''
              }`}
              data-testid={`firm-card-${firm.slug}`}
            >
              <CardContent className="p-4">
                {/* Header with logo and name */}
                <div className="flex items-start justify-between mb-4 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                      {firm.logoUrl ? (
                        <img src={firm.logoUrl} alt={firm.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        firm.name.substring(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <Link 
                        href={`/${locale}/firms/${firm.slug}`}
                        className="font-semibold text-lg text-foreground hover:text-primary transition-colors"
                        data-testid={`firm-name-mobile-${firm.slug}`}
                      >
                        {firm.name}
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>⭐ {firm.rating ? Number(firm.rating).toFixed(1) : 'N/A'}</span>
                        <span>{firm.platforms?.join('/') || 'MT4/MT5'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-col gap-1 items-end">
                    {firm.featured && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs whitespace-nowrap">
                        <i className="fas fa-star mr-1"></i>
                        {t('labels.featured')}
                      </Badge>
                    )}
                    {activePromotion && (
                      <Badge variant="destructive" className="text-xs whitespace-nowrap">
                        <i className="fas fa-clock mr-1"></i>
                        <CountdownTimer endTime={activePromotion.endsAt} />
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Main info grid - 2x2 layout */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Account Size */}
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">{t('table.accountSize')}</div>
                    <div className="text-lg font-bold text-foreground" data-testid={`account-size-mobile-${firm.slug}`}>
                      ${primaryAccount?.sizeUsd.toLocaleString() || 'N/A'}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">{t('table.price')}</div>
                    {hasDiscount && primaryAccount ? (
                      <>
                        <div className="text-xs text-muted-foreground line-through">
                          ${Number(primaryAccount.basePrice).toLocaleString()}
                        </div>
                        <div className="text-lg font-bold text-foreground" data-testid={`final-price-mobile-${firm.slug}`}>
                          ${Math.round(primaryAccount.currentPrice || Number(primaryAccount.basePrice)).toLocaleString()}
                        </div>
                      </>
                    ) : (
                      <div className="text-lg font-bold text-foreground">
                        ${primaryAccount ? Number(primaryAccount.basePrice).toLocaleString() : 'N/A'}
                      </div>
                    )}
                  </div>

                  {/* Discount */}
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">{t('table.discount')}</div>
                    {hasDiscount ? (
                      <div className="text-lg font-bold text-green-600 dark:text-green-400" data-testid={`discount-mobile-${firm.slug}`}>
                        {firm.currentDiscount}% OFF
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">{t('labels.noDiscount')}</div>
                    )}
                  </div>

                  {/* Coupon Code */}
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">{t('labels.code')}</div>
                    {couponCode ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 font-mono text-xs w-full"
                        onClick={() => handleCopyCoupon(couponCode)}
                        data-testid={`copy-coupon-mobile-${firm.slug}`}
                      >
                        <span>{couponCode}</span>
                        <i className="fas fa-copy ml-1"></i>
                      </Button>
                    ) : (
                      <div className="text-sm text-muted-foreground">{t('labels.none')}</div>
                    )}
                  </div>
                </div>

                {/* Get Challenge Button */}
                <Button
                  className={`w-full font-medium transition-colors ${
                    firm.featured 
                      ? 'bg-accent hover:bg-accent/90' 
                      : 'bg-primary hover:bg-primary/90'
                  } text-primary-foreground`}
                  onClick={() => primaryAccount && handleGetChallenge(firm, primaryAccount)}
                  data-testid={`get-challenge-mobile-${firm.slug}`}
                >
                  {t('actions.getChallenge')}
                  <i className="fas fa-external-link-alt ml-2 text-sm"></i>
                </Button>
              </CardContent>
            </Card>
          );
        })}

        {/* Load More Button Mobile */}
        <div className="text-center pt-4">
          <Button
            variant="outline"
            disabled={loadingMore}
            className="inline-flex items-center"
            onClick={() => {
              setLoadingMore(true);
              setTimeout(() => setLoadingMore(false), 1000);
            }}
            data-testid="load-more-mobile-button"
          >
            {loadingMore ? (
              <i className="fas fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fas fa-plus mr-2"></i>
            )}
            {t('actions.loadMore')}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            {t('listing.showingCount', { count: firms.length })}
          </p>
        </div>
      </div>
    </div>
  );
}
