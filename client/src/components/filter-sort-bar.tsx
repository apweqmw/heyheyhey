import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";

interface FilterSortBarProps {
  filters: {
    sort: string;
    accountSize?: number;
    platform?: string;
    maxPayoutDays?: number;
  };
  onFiltersChange: (filters: any) => void;
}

export default function FilterSortBar({ filters, onFiltersChange }: FilterSortBarProps) {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll-based show/hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const accountSizes = [10000, 25000, 50000, 100000, 200000];
  const platforms = ['MetaTrader4', 'MetaTrader5', 'cTrader', 'DXTrade', 'TradingView'];
  const payoutDaysOptions = [5, 7, 10, 14, 30];

  const sortOptions = [
    { value: 'discount_desc', label: t('sort.bestDiscount') },
    { value: 'price_asc', label: t('sort.lowestPrice') },
    { value: 'price_desc', label: t('sort.highestPrice') },
    { value: 'payout_asc', label: t('sort.fastestPayout') },
    { value: 'rating_desc', label: t('sort.highestRated') },
  ];

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const removeFilter = (key: string) => {
    const newFilters = { ...filters };
    delete newFilters[key as keyof typeof newFilters];
    onFiltersChange(newFilters);
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.accountSize) {
      active.push({
        key: 'accountSize',
        label: `$${(filters.accountSize / 1000)}K`,
        value: filters.accountSize,
      });
    }
    if (filters.platform) {
      active.push({
        key: 'platform',
        label: filters.platform,
        value: filters.platform,
      });
    }
    if (filters.maxPayoutDays) {
      active.push({
        key: 'maxPayoutDays',
        label: `≤${filters.maxPayoutDays}d payout`,
        value: filters.maxPayoutDays,
      });
    }
    return active;
  };

  return (
    <div className={`bg-background border-b border-border sticky top-16 z-30 backdrop-blur-sm bg-background/95 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-foreground">{t('filters.title')}:</span>
            
            {/* Account Size Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  data-testid="account-size-filter"
                >
                  <span>{t('filters.accountSize')}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">{t('filters.selectAccountSize')}</h4>
                  {accountSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={filters.accountSize === size}
                        onCheckedChange={(checked) => {
                          handleFilterChange('accountSize', checked ? size : undefined);
                        }}
                        data-testid={`account-size-${size}`}
                      />
                      <Label htmlFor={`size-${size}`} className="text-sm">
                        ${(size / 1000)}K
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Platform Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  data-testid="platform-filter"
                >
                  <span>{t('filters.platform')}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">{t('filters.selectPlatform')}</h4>
                  {platforms.map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={`platform-${platform}`}
                        checked={filters.platform === platform}
                        onCheckedChange={(checked) => {
                          handleFilterChange('platform', checked ? platform : undefined);
                        }}
                        data-testid={`platform-${platform}`}
                      />
                      <Label htmlFor={`platform-${platform}`} className="text-sm">
                        {platform}
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Payout Days Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                  data-testid="payout-filter"
                >
                  <span>{t('filters.payout')}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="start">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">{t('filters.maxPayoutDays')}</h4>
                  {payoutDaysOptions.map((days) => (
                    <div key={days} className="flex items-center space-x-2">
                      <Checkbox
                        id={`payout-${days}`}
                        checked={filters.maxPayoutDays === days}
                        onCheckedChange={(checked) => {
                          handleFilterChange('maxPayoutDays', checked ? days : undefined);
                        }}
                        data-testid={`payout-days-${days}`}
                      />
                      <Label htmlFor={`payout-${days}`} className="text-sm">
                        ≤{days} days
                      </Label>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Active Filters Display */}
            {getActiveFilters().map((filter) => (
              <Badge
                key={filter.key}
                variant="secondary"
                className="bg-primary-100 text-primary-700 flex items-center gap-1"
                data-testid={`active-filter-${filter.key}`}
              >
                {filter.label}
                <button
                  onClick={() => removeFilter(filter.key)}
                  className="hover:text-primary-900"
                  data-testid={`remove-filter-${filter.key}`}
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              </Badge>
            ))}
          </div>

          {/* Sort & View Options */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">{t('sort.sortBy')}:</span>
            <Select
              value={filters.sort}
              onValueChange={(value) => handleFilterChange('sort', value)}
            >
              <SelectTrigger className="w-48" data-testid="sort-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                className="px-3 py-2 rounded-none"
                onClick={() => setViewMode('table')}
                data-testid="table-view-button"
              >
                <i className="fas fa-list"></i>
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className="px-3 py-2 rounded-none"
                onClick={() => setViewMode('grid')}
                data-testid="grid-view-button"
              >
                <i className="fas fa-th-large"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
