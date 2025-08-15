'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/header';
import CountdownTimer from '@/components/countdown-timer';
import EvaluationSteps from '@/components/evaluation-steps';
import { useI18n } from '@/lib/i18n';
import { useClipboard } from '@/hooks/use-clipboard';

interface FirmDetailProps {
  firm: any;
}

export default function FirmDetail({ firm }: FirmDetailProps) {
  const { t } = useI18n();
  const { copyToClipboard } = useClipboard();
  
  if (!firm) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Firm not found</h1>
            <Link href="/">
              <Button className="mt-4">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activePromotion = firm.promotions?.find((p: any) => 
    new Date(p.validUntil) > new Date()
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Back Button */}
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('common.back')}
            </Button>
          </Link>

          {/* Firm Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold text-foreground">{firm.name}</h1>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                ⭐ {firm.rating}/5
              </Badge>
            </div>
            
            {activePromotion && (
              <Card className="border-primary bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-primary">
                        🎉 {activePromotion.discountPercentage}% {t('promotion.discount')}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t('promotion.validUntil')}: {new Date(activePromotion.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                    <CountdownTimer targetDate={new Date(activePromotion.validUntil)} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">{t('tabs.overview')}</TabsTrigger>
              <TabsTrigger value="accounts">{t('tabs.accounts')}</TabsTrigger>
              <TabsTrigger value="rules">{t('tabs.rules')}</TabsTrigger>
              <TabsTrigger value="evaluation">{t('tabs.evaluation')}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('overview.basicInfo')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium">{t('overview.platforms')}</h4>
                      <div className="flex gap-2 mt-1">
                        {firm.platforms?.map((platform: string) => (
                          <Badge key={platform} variant="outline">{platform}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{t('overview.payoutSchedule')}</h4>
                      <p className="text-muted-foreground">
                        {firm.payoutSchedule || t('overview.contactFirm')}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">{t('overview.maxPayoutDays')}</h4>
                      <p className="text-muted-foreground">
                        {firm.maxPayoutDays ? `${firm.maxPayoutDays} ${t('common.days')}` : t('overview.contactFirm')}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('overview.description')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {firm.description || t('overview.noDescription')}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="accounts" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {firm.accounts?.map((account: any) => (
                  <Card key={account.id} className="relative overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>${(account.size / 1000)}K {t('account.account')}</span>
                        {activePromotion && (
                          <Badge variant="destructive" className="text-xs">
                            -{activePromotion.discountPercentage}%
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t('account.originalPrice')}</span>
                          <span className={activePromotion ? "line-through text-muted-foreground" : "font-semibold"}>
                            ${account.basePrice}
                          </span>
                        </div>
                        
                        {activePromotion && (
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{t('account.currentPrice')}</span>
                            <span className="font-semibold text-green-600">
                              ${account.currentPrice || account.basePrice}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t('account.targetProfit')}</span>
                          <span>${account.targetProfit || 'N/A'}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t('account.maxDrawdown')}</span>
                          <span>${account.maxDrawdown || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          const url = activePromotion?.landingPageUrl || firm.affiliateUrl || '#';
                          window.open(url, '_blank');
                        }}
                      >
                        {t('account.getChallenge')}
                      </Button>
                      
                      {firm.couponCode && (
                        <div className="text-center space-y-2">
                          <p className="text-sm text-muted-foreground">{t('account.couponCode')}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(firm.couponCode)}
                            className="font-mono"
                          >
                            {firm.couponCode}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rules" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t('rules.tradingRules')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {firm.tradingRules ? (
                        <div dangerouslySetInnerHTML={{ __html: firm.tradingRules }} />
                      ) : (
                        <p className="text-muted-foreground">{t('rules.contactFirmForRules')}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="evaluation" className="space-y-6">
              <EvaluationSteps firm={firm} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}