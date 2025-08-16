import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, ExternalLink, TrendingUp, Users, Calendar, Filter } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";

interface Review {
  id: string;
  title: string;
  text: string;
  stars: number;
  createdAt: string;
  consumer: {
    displayName: string;
    countryCode?: string;
  };
  businessReply?: {
    text: string;
    createdAt: string;
  };
}

interface ReviewStats {
  averageStars: number;
  totalReviews: number;
  distribution: {
    [key: string]: number;
  };
  trustScore: number;
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

function ReviewCard({ review }: { review: Review }) {
  const { t } = useI18n();
  
  return (
    <Card className="mb-4" data-testid={`review-card-${review.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {review.consumer.displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-sm">{review.consumer.displayName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <StarRating rating={review.stars} size="sm" />
        </div>
        {review.title && (
          <h3 className="font-semibold text-base mt-2" data-testid={`review-title-${review.id}`}>
            {review.title}
          </h3>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4" data-testid={`review-text-${review.id}`}>
          {review.text}
        </p>
        
        {review.businessReply && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {t("reviews.businessReply")}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(review.businessReply.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm" data-testid={`business-reply-${review.id}`}>
              {review.businessReply.text}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ReviewStats({ stats }: { stats: ReviewStats }) {
  const { t } = useI18n();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold" data-testid="average-rating">
                {stats.averageStars.toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">{t("reviews.averageRating")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold" data-testid="total-reviews">
                {stats.totalReviews.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">{t("reviews.totalReviews")}</p>
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
              <p className="text-2xl font-bold" data-testid="trust-score">
                {stats.trustScore}
              </p>
              <p className="text-sm text-muted-foreground">{t("reviews.trustScore")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RatingDistribution({ distribution, totalReviews }: { distribution: { [key: string]: number }; totalReviews: number }) {
  const { t } = useI18n();
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{t("reviews.ratingDistribution")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = distribution[stars] || 0;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm font-medium">{stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Reviews() {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const { t, locale } = useI18n();
  const { setSEO } = useSEO();
  
  const [filterStars, setFilterStars] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Get firm details
  const { data: firm, isLoading: firmLoading } = useQuery({
    queryKey: ["/api/firms/" + slug, { locale }],
    enabled: !!slug,
  });

  // Get reviews data
  const { data: reviewsData, isLoading: reviewsLoading } = useQuery({
    queryKey: ["/api/reviews/" + slug, { stars: filterStars, sort: sortBy }],
    enabled: !!slug,
  });

  // Set SEO data
  if (firm && !firmLoading) {
    setSEO({
      title: `${firm.name} Reviews - ${t("reviews.seoTitle")}`,
      description: t("reviews.seoDescription", { firmName: firm.name }),
      canonical: `/${locale}/reviews/${slug}`,
    });
  }

  if (firmLoading || reviewsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("common.notFound")}</h1>
          <Button onClick={() => setLocation("/")}>
            {t("common.backToHome")}
          </Button>
        </div>
      </div>
    );
  }

  const reviews = reviewsData?.reviews || [];
  const stats = reviewsData?.stats || {
    averageStars: 0,
    totalReviews: 0,
    distribution: {},
    trustScore: 0
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation(`/${locale}/firms/${slug}`)}
              data-testid="back-to-firm"
            >
              ← {t("common.back")}
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            {firm.logoUrl && (
              <img
                src={firm.logoUrl}
                alt={`${firm.name} logo`}
                className="h-16 w-16 rounded-lg object-cover"
                data-testid="firm-logo"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="firm-name">
                {firm.name} {t("reviews.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("reviews.subtitle", { firmName: firm.name })}
              </p>
            </div>
          </div>

          {firm.trustpilotUrl && (
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                {t("reviews.verifiedByTrustpilot")}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                asChild
                data-testid="view-on-trustpilot"
              >
                <a href={firm.trustpilotUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t("reviews.viewOnTrustpilot")}
                </a>
              </Button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <ReviewStats stats={stats} />

        {/* Content Tabs */}
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="reviews" data-testid="reviews-tab">
              {t("reviews.allReviews")} ({stats.totalReviews})
            </TabsTrigger>
            <TabsTrigger value="distribution" data-testid="distribution-tab">
              {t("reviews.ratingBreakdown")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">{t("reviews.filters")}</span>
              </div>
              
              <Select value={filterStars} onValueChange={setFilterStars}>
                <SelectTrigger className="w-40" data-testid="filter-stars">
                  <SelectValue placeholder={t("reviews.filterByStars")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("reviews.allStars")}</SelectItem>
                  <SelectItem value="5">5 {t("reviews.stars")}</SelectItem>
                  <SelectItem value="4">4 {t("reviews.stars")}</SelectItem>
                  <SelectItem value="3">3 {t("reviews.stars")}</SelectItem>
                  <SelectItem value="2">2 {t("reviews.stars")}</SelectItem>
                  <SelectItem value="1">1 {t("reviews.star")}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40" data-testid="sort-reviews">
                  <SelectValue placeholder={t("reviews.sortBy")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t("reviews.newest")}</SelectItem>
                  <SelectItem value="oldest">{t("reviews.oldest")}</SelectItem>
                  <SelectItem value="highest">{t("reviews.highestRated")}</SelectItem>
                  <SelectItem value="lowest">{t("reviews.lowestRated")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reviews List */}
            <div data-testid="reviews-list">
              {reviews.length > 0 ? (
                reviews.map((review: Review) => (
                  <ReviewCard key={review.id} review={review} />
                ))
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {t("reviews.noReviews")}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t("reviews.noReviewsDescription")}
                    </p>
                    {firm.trustpilotUrl && (
                      <Button asChild variant="outline">
                        <a href={firm.trustpilotUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t("reviews.checkTrustpilot")}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="distribution">
            <RatingDistribution distribution={stats.distribution} totalReviews={stats.totalReviews} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}