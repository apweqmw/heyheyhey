import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ExternalLink, TrendingUp, Users, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";

interface FirmReviewSummary {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  trustpilotUrl?: string;
  averageRating: number;
  totalReviews: number;
  trustScore: number;
  recentReview?: {
    text: string;
    stars: number;
    consumer: string;
    createdAt: string;
  };
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : i < rating
              ? "fill-yellow-200 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

function FirmReviewCard({ firm }: { firm: FirmReviewSummary }) {
  const { locale, t } = useI18n();
  
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200" data-testid={`firm-review-card-${firm.slug}`}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {firm.logoUrl ? (
                <img
                  src={firm.logoUrl}
                  alt={`${firm.name} logo`}
                  className="h-12 w-12 rounded-lg object-cover"
                />
              ) : (
                firm.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/${locale}/firms/${firm.slug}`}>
                <h3 className="font-semibold text-lg hover:text-primary transition-colors truncate" data-testid={`firm-name-${firm.slug}`}>
                  {firm.name}
                </h3>
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                <StarRating rating={firm.averageRating} size="sm" />
                <span className="text-sm text-muted-foreground">
                  {firm.totalReviews.toLocaleString()} {t('reviews.totalReviews')}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
            <Badge 
              variant={firm.trustScore >= 80 ? "default" : firm.trustScore >= 60 ? "secondary" : "destructive"}
              data-testid={`trust-score-${firm.slug}`}
              className="whitespace-nowrap"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {firm.trustScore}/100
            </Badge>
            {firm.trustpilotUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                data-testid={`trustpilot-link-${firm.slug}`}
                className="whitespace-nowrap"
              >
                <a href={firm.trustpilotUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Trustpilot
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      {firm.recentReview && (
        <CardContent className="pt-0">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={firm.recentReview.stars} size="sm" />
              <span className="text-sm font-medium">{firm.recentReview.consumer}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(firm.recentReview.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2" data-testid={`recent-review-${firm.slug}`}>
              "{firm.recentReview.text}"
            </p>
            {firm.trustpilotUrl ? (
              <a href={firm.trustpilotUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {t('reviews.readMore')} on Trustpilot
                </Button>
              </a>
            ) : (
              <Link href={`/${locale}/firms/${firm.slug}`}>
                <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                  {t('reviews.readMore')}
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default function ReviewsOverview() {
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  // Set SEO data
  setSEO({
    title: t('reviews.overviewTitle'),
    description: t('reviews.overviewDescription'),
    canonical: `/${locale}/reviews`,
  });

  // Get all firms with review summaries
  const { data: firmsData, isLoading } = useQuery({
    queryKey: ["/api/reviews/overview", { sort: sortBy }],
    queryFn: async () => {
      const params = new URLSearchParams({
        sort: sortBy
      });
      const response = await fetch(`/api/reviews/overview?${params}`);
      if (!response.ok) throw new Error('Failed to fetch reviews overview');
      return response.json();
    },
  });

  const firms: FirmReviewSummary[] = firmsData?.firms || [];

  // Client-side filtering for real-time search
  const filteredFirms = firms.filter(firm =>
    searchQuery === "" || firm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFirms = [...filteredFirms].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.averageRating - a.averageRating;
      case "reviews":
        return b.totalReviews - a.totalReviews;
      case "trust":
        return b.trustScore - a.trustScore;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="reviews-title">
            {t('reviews.overviewTitle')}
          </h1>
          <p className="text-muted-foreground mb-6">
            {t('reviews.overviewDescription')}
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('reviews.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-firms"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48" data-testid="sort-reviews">
                <SelectValue placeholder={t('reviews.sortBy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">{t('reviews.sortByRating')}</SelectItem>
                <SelectItem value="reviews">{t('reviews.sortByReviews')}</SelectItem>
                <SelectItem value="trust">{t('reviews.sortByTrust')}</SelectItem>
                <SelectItem value="name">{t('reviews.sortByName')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="total-firms">
                    {firms.length}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('reviews.totalFirms')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="average-rating">
                    {firms.length > 0 ? (firms.reduce((acc, firm) => acc + firm.averageRating, 0) / firms.length).toFixed(1) : '0.0'}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('reviews.averageRating')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="total-reviews">
                    {firms.reduce((acc, firm) => acc + firm.totalReviews, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('reviews.totalReviews')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Firms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="firms-grid">
          {sortedFirms.length > 0 ? (
            sortedFirms.map((firm) => (
              <FirmReviewCard key={firm.id} firm={firm} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {t('reviews.noFirmsFound')}
              </h3>
              <p className="text-muted-foreground">
                {t('reviews.noFirmsFoundDescription')}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}