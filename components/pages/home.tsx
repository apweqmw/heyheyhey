'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/header';
import FilterSortBar from '@/components/filter-sort-bar';
import FirmListing from '@/components/firm-listing';
import { useI18n } from '@/lib/i18n';

interface Filters {
  accountSize?: number;
  platform?: string;
  maxPayoutDays?: number;
  sort: string;
}

export default function Home() {
  const { t } = useI18n();
  const [filters, setFilters] = useState<Filters>({
    sort: 'name'
  });

  const { data: firms = [], isLoading } = useQuery({
    queryKey: ['/api/firms', filters],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      if (filters.accountSize) searchParams.set('accountSize', filters.accountSize.toString());
      if (filters.platform) searchParams.set('platform', filters.platform);
      if (filters.maxPayoutDays) searchParams.set('maxPayoutDays', filters.maxPayoutDays.toString());
      if (filters.sort) searchParams.set('sort', filters.sort);

      const response = await fetch(`/api/firms?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch firms');
      return response.json();
    }
  });

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FilterSortBar
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {t('home.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
          </div>
          
          <FirmListing 
            firms={firms}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}