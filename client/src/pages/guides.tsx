import { useState } from "react";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Clock, User, Star, Search, TrendingUp, Target, Shield, DollarSign } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: number;
  author: string;
  rating: number;
  slug: string;
  tags: string[];
  publishedAt: string;
}

const guides: Guide[] = [
  {
    id: "1",
    title: "Complete Guide to Prop Trading Firms",
    description: "Everything you need to know about prop trading firms, how they work, and how to choose the right one for your trading style.",
    category: "Getting Started",
    difficulty: "Beginner",
    readTime: 15,
    author: "PropRank Team",
    rating: 4.8,
    slug: "complete-guide-prop-trading-firms",
    tags: ["prop-trading", "beginner", "fundamentals"],
    publishedAt: "2024-08-15"
  },
  {
    id: "2",
    title: "How to Pass Prop Firm Evaluations",
    description: "Proven strategies and tips to successfully pass prop firm evaluation challenges and get funded.",
    category: "Strategy",
    difficulty: "Intermediate",
    readTime: 12,
    author: "Trading Expert",
    rating: 4.9,
    slug: "pass-prop-firm-evaluations",
    tags: ["evaluation", "strategy", "funded-account"],
    publishedAt: "2024-08-12"
  },
  {
    id: "3",
    title: "Risk Management for Prop Traders",
    description: "Essential risk management techniques to protect your funded account and maintain consistent profitability.",
    category: "Risk Management",
    difficulty: "Intermediate",
    readTime: 18,
    author: "Risk Management Pro",
    rating: 4.7,
    slug: "risk-management-prop-traders",
    tags: ["risk-management", "psychology", "money-management"],
    publishedAt: "2024-08-10"
  },
  {
    id: "4",
    title: "Best Trading Platforms for Prop Firms",
    description: "Comprehensive comparison of trading platforms used by major prop firms including MetaTrader, cTrader, and more.",
    category: "Platforms",
    difficulty: "Beginner",
    readTime: 10,
    author: "Tech Analyst",
    rating: 4.6,
    slug: "best-trading-platforms-prop-firms",
    tags: ["platforms", "technology", "tools"],
    publishedAt: "2024-08-08"
  },
  {
    id: "5",
    title: "Advanced Forex Strategies for Funded Accounts",
    description: "Advanced trading strategies specifically designed for forex prop trading with funded accounts.",
    category: "Strategy",
    difficulty: "Advanced",
    readTime: 25,
    author: "Forex Master",
    rating: 4.9,
    slug: "advanced-forex-strategies-funded-accounts",
    tags: ["forex", "advanced", "strategies"],
    publishedAt: "2024-08-05"
  },
  {
    id: "6",
    title: "Prop Firm Rules: What You Need to Know",
    description: "Understanding common prop firm rules, restrictions, and how to avoid account violations.",
    category: "Rules & Compliance",
    difficulty: "Beginner",
    readTime: 8,
    author: "Compliance Expert",
    rating: 4.5,
    slug: "prop-firm-rules-guide",
    tags: ["rules", "compliance", "violations"],
    publishedAt: "2024-08-03"
  }
];

const categories = ["All", "Getting Started", "Strategy", "Risk Management", "Platforms", "Rules & Compliance"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
}

function GuideCard({ guide }: { guide: Guide }) {
  const { locale } = useI18n();
  
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200" data-testid={`guide-card-${guide.slug}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-2">
          <Badge className={getDifficultyColor(guide.difficulty)}>
            {guide.difficulty}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{guide.rating}</span>
          </div>
        </div>
        
        <CardTitle className="text-lg leading-tight mb-2">
          <Link href={`/${locale}/guides/${guide.slug}`}>
            <span className="hover:text-primary transition-colors cursor-pointer" data-testid={`guide-title-${guide.slug}`}>
              {guide.title}
            </span>
          </Link>
        </CardTitle>
        
        <p className="text-muted-foreground text-sm line-clamp-3" data-testid={`guide-description-${guide.slug}`}>
          {guide.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{guide.readTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{guide.author}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {guide.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          asChild 
          className="w-full"
          data-testid={`read-guide-${guide.slug}`}
        >
          <Link href={`/${locale}/guides/${guide.slug}`}>
            <BookOpen className="h-4 w-4 mr-2" />
            Read Guide
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Guides() {
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  // Set SEO data
  setSEO({
    title: t('guides.title', 'Trading Guides & Tutorials'),
    description: t('guides.description', 'Comprehensive guides and tutorials for prop trading success. Learn strategies, risk management, and platform tips.'),
    canonical: `/${locale}/guides`,
  });

  // Filter guides based on search and filters
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || guide.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="guides-title">
            Trading Guides & Tutorials
          </h1>
          <p className="text-muted-foreground mb-6">
            Master prop trading with our comprehensive guides, strategies, and expert insights.
          </p>

          {/* Search and Filter Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-guides"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
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
              
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-48" data-testid="filter-difficulty">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold" data-testid="total-guides">
                    {filteredGuides.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Guides Available</p>
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
                    {guides.filter(g => g.difficulty === "Beginner").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Beginner Friendly</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {guides.filter(g => g.category === "Strategy").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Strategy Guides</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {(guides.reduce((acc, guide) => acc + guide.rating, 0) / guides.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="guides-grid">
          {filteredGuides.length > 0 ? (
            filteredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                No guides found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}