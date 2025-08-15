import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Firm, Account, Promotion } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const [selectedFirm, setSelectedFirm] = useState<string>('');

  // Fetch firms
  const { data: firms = [], isLoading: firmsLoading } = useQuery<Firm[]>({
    queryKey: ['/api/admin/firms'],
  });

  // Fetch accounts for selected firm
  const { data: accounts = [] } = useQuery<Account[]>({
    queryKey: ['/api/admin/accounts', selectedFirm],
    enabled: !!selectedFirm,
  });

  // Fetch promotions
  const { data: promotions = [] } = useQuery<Promotion[]>({
    queryKey: ['/api/admin/promotions'],
  });

  // Firm form state
  const [firmForm, setFirmForm] = useState({
    name: '',
    slug: '',
    websiteUrl: '',
    logoUrl: '',
    earliestPayoutDays: '',
    payoutSplit: '',
    platforms: [] as string[],
    descriptionEn: '',
    referralLink: '',
    couponCode: '',
    featured: false,
  });

  // Account form state
  const [accountForm, setAccountForm] = useState({
    firmId: '',
    sizeUsd: '',
    basePrice: '',
    currency: 'USD',
  });

  // Promotion form state
  const [promotionForm, setPromotionForm] = useState({
    firmId: '',
    title: '',
    discountPct: '',
    endsAt: '',
    couponCode: '',
    landingUrl: '',
  });

  // Create firm mutation
  const createFirmMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest('POST', '/api/admin/firms', {
        ...data,
        earliestPayoutDays: parseInt(data.earliestPayoutDays) || null,
        platforms: data.platforms.split(',').map((p: string) => p.trim()).filter(Boolean),
      });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Firm created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/firms'] });
      setFirmForm({
        name: '', slug: '', websiteUrl: '', logoUrl: '', earliestPayoutDays: '',
        payoutSplit: '', platforms: [], descriptionEn: '', referralLink: '', couponCode: '', featured: false
      });
    },
    onError: (error) => {
      toast({ title: "Error", description: `Failed to create firm: ${error.message}`, variant: "destructive" });
    },
  });

  // Create account mutation
  const createAccountMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest('POST', '/api/admin/accounts', {
        ...data,
        sizeUsd: parseInt(data.sizeUsd),
        basePrice: parseFloat(data.basePrice),
      });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Account created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/accounts'] });
      setAccountForm({ firmId: '', sizeUsd: '', basePrice: '', currency: 'USD' });
    },
    onError: (error) => {
      toast({ title: "Error", description: `Failed to create account: ${error.message}`, variant: "destructive" });
    },
  });

  // Create promotion mutation
  const createPromotionMutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest('POST', '/api/admin/promotions', {
        ...data,
        discountPct: parseFloat(data.discountPct),
        endsAt: new Date(data.endsAt).toISOString(),
      });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Promotion created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/promotions'] });
      setPromotionForm({ firmId: '', title: '', discountPct: '', endsAt: '', couponCode: '', landingUrl: '' });
    },
    onError: (error) => {
      toast({ title: "Error", description: `Failed to create promotion: ${error.message}`, variant: "destructive" });
    },
  });

  const handleFirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createFirmMutation.mutate(firmForm);
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAccountMutation.mutate(accountForm);
  };

  const handlePromotionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPromotionMutation.mutate(promotionForm);
  };

  if (firmsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="h-96 bg-gray-300 rounded"></div>
              <div className="h-96 bg-gray-300 rounded"></div>
              <div className="h-96 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">PropRank Admin</h1>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">System Online</span>
          </div>
        </div>

        <Tabs defaultValue="firms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="firms" data-testid="firms-tab">Firms</TabsTrigger>
            <TabsTrigger value="accounts" data-testid="accounts-tab">Accounts</TabsTrigger>
            <TabsTrigger value="promotions" data-testid="promotions-tab">Promotions</TabsTrigger>
            <TabsTrigger value="analytics" data-testid="analytics-tab">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="firms">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Firm Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Firm</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleFirmSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Firm Name</Label>
                      <Input
                        id="name"
                        value={firmForm.name}
                        onChange={(e) => setFirmForm({ ...firmForm, name: e.target.value })}
                        required
                        data-testid="firm-name-input"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={firmForm.slug}
                        onChange={(e) => setFirmForm({ ...firmForm, slug: e.target.value })}
                        required
                        data-testid="firm-slug-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="websiteUrl">Website URL</Label>
                      <Input
                        id="websiteUrl"
                        type="url"
                        value={firmForm.websiteUrl}
                        onChange={(e) => setFirmForm({ ...firmForm, websiteUrl: e.target.value })}
                        required
                        data-testid="firm-website-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="payoutSplit">Payout Split</Label>
                        <Input
                          id="payoutSplit"
                          value={firmForm.payoutSplit}
                          onChange={(e) => setFirmForm({ ...firmForm, payoutSplit: e.target.value })}
                          placeholder="80/20"
                          data-testid="firm-payout-input"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="earliestPayoutDays">Payout Days</Label>
                        <Input
                          id="earliestPayoutDays"
                          type="number"
                          value={firmForm.earliestPayoutDays}
                          onChange={(e) => setFirmForm({ ...firmForm, earliestPayoutDays: e.target.value })}
                          data-testid="firm-payout-days-input"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="platforms">Platforms (comma-separated)</Label>
                      <Input
                        id="platforms"
                        value={firmForm.platforms.join(', ')}
                        onChange={(e) => setFirmForm({ ...firmForm, platforms: e.target.value.split(',').map(p => p.trim()) })}
                        placeholder="MetaTrader5, cTrader"
                        data-testid="firm-platforms-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="descriptionEn">Description (English)</Label>
                      <Textarea
                        id="descriptionEn"
                        value={firmForm.descriptionEn}
                        onChange={(e) => setFirmForm({ ...firmForm, descriptionEn: e.target.value })}
                        rows={3}
                        data-testid="firm-description-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="referralLink">Referral Link</Label>
                      <Input
                        id="referralLink"
                        type="url"
                        value={firmForm.referralLink}
                        onChange={(e) => setFirmForm({ ...firmForm, referralLink: e.target.value })}
                        data-testid="firm-referral-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="couponCode">Coupon Code</Label>
                      <Input
                        id="couponCode"
                        value={firmForm.couponCode}
                        onChange={(e) => setFirmForm({ ...firmForm, couponCode: e.target.value })}
                        data-testid="firm-coupon-input"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={createFirmMutation.isPending}
                      className="w-full"
                      data-testid="create-firm-button"
                    >
                      {createFirmMutation.isPending ? 'Creating...' : 'Create Firm'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Existing Firms List */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Firms ({firms.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {firms.map((firm) => (
                      <div
                        key={firm.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedFirm === firm.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedFirm(firm.id)}
                        data-testid={`firm-${firm.slug}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{firm.name}</h3>
                          <div className="flex gap-2">
                            {firm.featured && <Badge variant="secondary">Featured</Badge>}
                            {firm.active && <Badge variant="outline" className="text-green-600">Active</Badge>}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{firm.descriptionEn}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Slug: {firm.slug}</span>
                          <span>Payout: {firm.payoutSplit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="accounts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Account Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAccountSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="accountFirmId">Select Firm</Label>
                      <Select
                        value={accountForm.firmId}
                        onValueChange={(value) => setAccountForm({ ...accountForm, firmId: value })}
                      >
                        <SelectTrigger data-testid="account-firm-select">
                          <SelectValue placeholder="Choose a firm" />
                        </SelectTrigger>
                        <SelectContent>
                          {firms.map((firm) => (
                            <SelectItem key={firm.id} value={firm.id}>
                              {firm.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="sizeUsd">Account Size (USD)</Label>
                      <Input
                        id="sizeUsd"
                        type="number"
                        value={accountForm.sizeUsd}
                        onChange={(e) => setAccountForm({ ...accountForm, sizeUsd: e.target.value })}
                        placeholder="50000"
                        required
                        data-testid="account-size-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="basePrice">Base Price</Label>
                      <Input
                        id="basePrice"
                        type="number"
                        step="0.01"
                        value={accountForm.basePrice}
                        onChange={(e) => setAccountForm({ ...accountForm, basePrice: e.target.value })}
                        placeholder="299.00"
                        required
                        data-testid="account-price-input"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={createAccountMutation.isPending}
                      className="w-full"
                      data-testid="create-account-button"
                    >
                      {createAccountMutation.isPending ? 'Creating...' : 'Create Account'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Accounts for Selected Firm */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    Accounts {selectedFirm && `for ${firms.find(f => f.id === selectedFirm)?.name}`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedFirm ? (
                    <div className="space-y-4">
                      {accounts.map((account) => (
                        <div key={account.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">${account.sizeUsd.toLocaleString()}</h4>
                              <p className="text-sm text-gray-600">Base Price: ${Number(account.basePrice).toFixed(2)}</p>
                            </div>
                            <Badge variant="outline">{account.currency}</Badge>
                          </div>
                        </div>
                      ))}
                      {accounts.length === 0 && (
                        <p className="text-gray-500 text-center py-8">No accounts found for this firm.</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Select a firm to view its accounts.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="promotions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Promotion Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Create New Promotion</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePromotionSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="promotionFirmId">Select Firm</Label>
                      <Select
                        value={promotionForm.firmId}
                        onValueChange={(value) => setPromotionForm({ ...promotionForm, firmId: value })}
                      >
                        <SelectTrigger data-testid="promotion-firm-select">
                          <SelectValue placeholder="Choose a firm" />
                        </SelectTrigger>
                        <SelectContent>
                          {firms.map((firm) => (
                            <SelectItem key={firm.id} value={firm.id}>
                              {firm.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="promotionTitle">Title</Label>
                      <Input
                        id="promotionTitle"
                        value={promotionForm.title}
                        onChange={(e) => setPromotionForm({ ...promotionForm, title: e.target.value })}
                        placeholder="Flash Sale"
                        required
                        data-testid="promotion-title-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="discountPct">Discount Percentage</Label>
                      <Input
                        id="discountPct"
                        type="number"
                        step="0.01"
                        value={promotionForm.discountPct}
                        onChange={(e) => setPromotionForm({ ...promotionForm, discountPct: e.target.value })}
                        placeholder="20.00"
                        required
                        data-testid="promotion-discount-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="endsAt">End Date & Time</Label>
                      <Input
                        id="endsAt"
                        type="datetime-local"
                        value={promotionForm.endsAt}
                        onChange={(e) => setPromotionForm({ ...promotionForm, endsAt: e.target.value })}
                        required
                        data-testid="promotion-end-date-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="promotionCouponCode">Coupon Code</Label>
                      <Input
                        id="promotionCouponCode"
                        value={promotionForm.couponCode}
                        onChange={(e) => setPromotionForm({ ...promotionForm, couponCode: e.target.value })}
                        placeholder="FLASH20"
                        data-testid="promotion-coupon-input"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={createPromotionMutation.isPending}
                      className="w-full"
                      data-testid="create-promotion-button"
                    >
                      {createPromotionMutation.isPending ? 'Creating...' : 'Create Promotion'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Active Promotions */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Promotions ({promotions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {promotions.map((promotion) => {
                      const firm = firms.find(f => f.id === promotion.firmId);
                      const isExpired = new Date(promotion.endsAt) < new Date();
                      
                      return (
                        <div key={promotion.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-900">{promotion.title}</h4>
                            <div className="flex gap-2">
                              <Badge variant={isExpired ? "destructive" : "default"}>
                                {Number(promotion.discountPct)}% OFF
                              </Badge>
                              {isExpired && <Badge variant="outline">Expired</Badge>}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Firm: {firm?.name}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Code: {promotion.couponCode}</span>
                            <span>Ends: {new Date(promotion.endsAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      );
                    })}
                    {promotions.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No active promotions.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-building mr-2 text-primary-500"></i>
                    Total Firms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900" data-testid="total-firms-stat">
                    {firms.length}
                  </div>
                  <p className="text-sm text-gray-600">Active prop firms</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-percentage mr-2 text-success-500"></i>
                    Active Promotions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900" data-testid="active-promotions-stat">
                    {promotions.filter(p => new Date(p.endsAt) > new Date()).length}
                  </div>
                  <p className="text-sm text-gray-600">Current discounts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-wallet mr-2 text-warning-500"></i>
                    Account Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900" data-testid="account-types-stat">
                    {[...new Set(accounts.map(a => a.sizeUsd))].length}
                  </div>
                  <p className="text-sm text-gray-600">Unique sizes</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
