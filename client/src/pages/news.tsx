import { useState, useEffect } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Eye, Search, TrendingUp, AlertCircle, Newspaper, ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  slug: string;
  tags: string[];
  urgent: boolean;
  imageUrl?: string;
  externalUrl?: string;
}

const newsArticles: NewsArticle[] = [
  {
    id: "1",
    title: "FTMO Announces New Profit Split Program for 2025",
    summary: "FTMO introduces enhanced profit-sharing structure with up to 90% splits for top-performing traders, effective Q1 2025.",
    category: "Company Updates",
    author: "PropRank News",
    publishedAt: "2025-08-15T10:00:00Z",
    readTime: 3,
    views: 2145,
    slug: "ftmo-new-profit-split-program-2025",
    tags: ["FTMO", "profit-split", "updates"],
    urgent: true
  },
  {
    id: "2",
    title: "Topstep Expands to European Markets",
    summary: "Leading futures prop firm Topstep announces expansion into European markets with new EU-regulated entity.",
    category: "Market Expansion",
    author: "Market Reporter",
    publishedAt: "2025-08-14T15:30:00Z",
    readTime: 4,
    views: 1823,
    slug: "topstep-expands-european-markets",
    tags: ["Topstep", "Europe", "expansion"],
    urgent: false
  },
  {
    id: "3",
    title: "New Regulatory Guidelines for Prop Trading Firms",
    summary: "Financial regulators release updated guidelines for proprietary trading firms, impacting evaluation processes and trader requirements.",
    category: "Regulation",
    author: "Regulatory Expert",
    publishedAt: "2025-08-13T09:15:00Z",
    readTime: 6,
    views: 3456,
    slug: "new-regulatory-guidelines-prop-trading",
    tags: ["regulation", "compliance", "guidelines"],
    urgent: true
  },
  {
    id: "4",
    title: "Prop Trading Market Grows 25% in Q2 2025",
    summary: "Industry report shows significant growth in prop trading sector with increased trader participation and firm profitability.",
    category: "Market Analysis",
    author: "Market Analyst",
    publishedAt: "2025-08-12T14:20:00Z",
    readTime: 5,
    views: 1967,
    slug: "prop-trading-market-growth-q2-2025",
    tags: ["market-analysis", "growth", "statistics"],
    urgent: false
  },
  {
    id: "5",
    title: "The Funded Trader Launches Mobile Trading App",
    summary: "The Funded Trader releases dedicated mobile application for iOS and Android, enhancing trader accessibility and functionality.",
    category: "Technology",
    author: "Tech Reporter",
    publishedAt: "2025-08-11T11:45:00Z",
    readTime: 3,
    views: 1234,
    slug: "funded-trader-mobile-app-launch",
    tags: ["technology", "mobile", "The Funded Trader"],
    urgent: false
  },
  {
    id: "6",
    title: "Risk Management Best Practices Update for Prop Traders",
    summary: "Industry experts share updated risk management strategies following recent market volatility and prop firm policy changes.",
    category: "Education",
    author: "Risk Management Pro",
    publishedAt: "2025-08-10T16:00:00Z",
    readTime: 7,
    views: 2891,
    slug: "risk-management-best-practices-update",
    tags: ["risk-management", "education", "best-practices"],
    urgent: false
  }
];

const categories = ["All", "Company Updates", "Market Expansion", "Regulation", "Market Analysis", "Technology", "Education"];

function getCategoryColor(category: string) {
  switch (category) {
    case "Company Updates": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Market Expansion": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Regulation": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    case "Market Analysis": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "Technology": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "Education": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function NewsCard({ article }: { article: NewsArticle }) {
  const { locale } = useI18n();
  
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200" data-testid={`news-card-${article.slug}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge className={getCategoryColor(article.category)}>
              {article.category}
            </Badge>
            {article.urgent && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Urgent
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{article.views.toLocaleString()}</span>
          </div>
        </div>
        
        <CardTitle className="text-lg leading-tight mb-2">
          {article.externalUrl ? (
            <a 
              href={article.externalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors cursor-pointer flex items-center gap-2" 
              data-testid={`news-title-${article.slug}`}
            >
              {article.title}
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <Link href={`/${locale}/news/${article.slug}`}>
              <span className="hover:text-primary transition-colors cursor-pointer" data-testid={`news-title-${article.slug}`}>
                {article.title}
              </span>
            </Link>
          )}
        </CardTitle>
        
        <p className="text-muted-foreground text-sm line-clamp-3" data-testid={`news-summary-${article.slug}`}>
          {article.summary}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          asChild 
          className="w-full"
          data-testid={`read-news-${article.slug}`}
        >
          {article.externalUrl ? (
            <a href={article.externalUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Read Article
            </a>
          ) : (
            <Link href={`/${locale}/news/${article.slug}`}>
              <Newspaper className="h-4 w-4 mr-2" />
              Read More
            </Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function News() {
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Set SEO data
  useEffect(() => {
    setSEO({
      title: t('news.title') || 'Prop Trading News & Updates',
      description: t('news.description') || 'Stay updated with the latest prop trading news, company updates, and market developments.',
      canonical: `/${locale}/news`,
    });
  }, [locale, setSEO, t]);

  // Filter articles based on search and category
  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort by date (newest first) and priority (urgent first)
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (a.urgent && !b.urgent) return -1;
    if (!a.urgent && b.urgent) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const urgentCount = newsArticles.filter(article => article.urgent).length;
  const totalViews = newsArticles.reduce((sum, article) => sum + article.views, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="news-title">
            Prop Trading News & Updates
          </h1>
          <p className="text-muted-foreground mb-6">
            Stay informed with the latest developments in the prop trading industry.
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-news"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48" data-testid="filter-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Newspaper className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="total-articles">
                    {filteredArticles.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Articles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {urgentCount}
                  </p>
                  <p className="text-sm text-muted-foreground">Urgent Updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {totalViews.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {categories.length - 1}
                  </p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="news-grid">
          {sortedArticles.length > 0 ? (
            sortedArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Newspaper className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No articles found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}