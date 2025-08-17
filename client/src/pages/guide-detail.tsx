import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { ArrowLeft, Clock, User, Star, BookOpen, Target, TrendingUp, Shield, Calendar, CheckCircle2 } from "lucide-react";

interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  author: string;
  readTime: number;
  rating: number;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
}

export default function GuideDetail() {
  const [, params] = useRoute("/:locale/guides/:slug");
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();

  // Mock guide data - in a real app this would come from an API
  const mockGuides: Record<string, Guide> = {
    "prop-trading-fundamentals": {
      id: "1",
      slug: "prop-trading-fundamentals",
      title: "Prop Trading Fundamentals: Complete Guide for Beginners",
      description: "Learn the essential concepts and strategies needed to succeed in proprietary trading with this comprehensive beginner's guide.",
      content: `# Introduction to Prop Trading

Proprietary trading, commonly known as "prop trading," is a form of trading where a firm trades financial instruments using its own capital rather than client funds. This guide will walk you through everything you need to know to get started.

## What is Prop Trading?

Prop trading involves trading securities, currencies, commodities, or other financial instruments using the firm's own money to generate profits. Unlike traditional investment management where firms manage client assets, prop traders use the company's capital to execute trades.

### Key Benefits:
- **Higher Profit Potential**: Keep a significant percentage of profits (typically 70-90%)
- **No Personal Risk**: Trade with the firm's capital, not your own money
- **Professional Support**: Access to advanced tools, mentorship, and resources
- **Scalability**: Successful traders can access larger capital amounts

## How Prop Trading Works

### 1. Evaluation Phase
Before receiving funded accounts, traders must pass evaluation challenges that test:
- **Profit Targets**: Typically 8-10% profit within specific timeframes
- **Risk Management**: Maximum daily loss limits (usually 5%) and total drawdown limits (10%)
- **Consistency**: Demonstrating steady performance over time
- **Trading Rules**: Following specific guidelines for position sizing, instruments, and timeframes

### 2. Live Trading Phase
After passing evaluation:
- Receive funded account with real capital
- Trade according to firm's rules and guidelines
- Earn profit splits ranging from 70-90%
- Potential for account scaling based on performance

## Essential Trading Strategies

### 1. Risk Management
- **Position Sizing**: Never risk more than 1-2% per trade
- **Stop Losses**: Always use protective stops
- **Daily Loss Limits**: Respect maximum daily loss rules
- **Drawdown Management**: Monitor total account drawdown

### 2. Market Analysis
- **Technical Analysis**: Chart patterns, indicators, support/resistance
- **Fundamental Analysis**: Economic news, earnings, market events
- **Market Structure**: Understanding trends, ranges, and volatility
- **Time Frame Analysis**: Multiple timeframe confirmation

### 3. Trading Psychology
- **Discipline**: Stick to your trading plan
- **Emotional Control**: Manage fear and greed
- **Patience**: Wait for high-probability setups
- **Continuous Learning**: Adapt and improve strategies

## Common Mistakes to Avoid

1. **Over-leveraging**: Using too much leverage relative to account size
2. **Revenge Trading**: Trying to recover losses quickly
3. **Ignoring Risk Rules**: Violating firm's risk management parameters
4. **Lack of Preparation**: Trading without proper market analysis
5. **Emotional Decisions**: Making trades based on fear or greed

## Getting Started Checklist

### Before You Begin:
- [ ] Learn basic trading concepts and terminology
- [ ] Practice with a demo account for at least 3-6 months
- [ ] Develop a written trading plan
- [ ] Understand the specific rules of your chosen prop firm
- [ ] Have realistic expectations about profits and timeline

### During Evaluation:
- [ ] Follow all trading rules strictly
- [ ] Focus on consistency over quick profits
- [ ] Keep detailed trading records
- [ ] Manage risk on every single trade
- [ ] Stay patient and disciplined

## Conclusion

Prop trading offers an excellent opportunity for skilled traders to earn significant income without risking personal capital. Success requires proper education, disciplined risk management, and consistent execution of a proven trading strategy.

Remember: the key to prop trading success is not just making profits, but making them consistently while following all risk management rules. Focus on the process, and the profits will follow.`,
      difficulty: "Beginner",
      author: "PropFirmMentor Team",
      readTime: 12,
      rating: 4.8,
      tags: ["Fundamentals", "Beginner", "Strategy", "Risk Management"],
      publishedAt: "2025-01-15T00:00:00Z"
    },
    "risk-management-strategies": {
      id: "2", 
      slug: "risk-management-strategies",
      title: "Advanced Risk Management Strategies for Prop Traders",
      description: "Master the art of risk management with proven strategies used by professional prop traders to protect capital and maximize returns.",
      content: `# Advanced Risk Management for Prop Traders

Risk management is the cornerstone of successful prop trading. This guide covers advanced techniques used by professional traders to protect capital while maximizing profit potential.

## The 1% Rule and Position Sizing

### Basic Position Sizing
Never risk more than 1% of your account on a single trade. This ensures that even with a series of losses, your account remains viable.

**Formula**: Position Size = (Account Balance × Risk %) ÷ (Entry Price - Stop Loss Price)

### Advanced Position Sizing Techniques

#### Kelly Criterion
The Kelly Criterion helps determine optimal position size based on win rate and risk-reward ratio:
**Formula**: f = (bp - q) / b
- f = fraction of capital to wager
- b = odds received (reward-to-risk ratio)  
- p = probability of winning
- q = probability of losing (1 - p)

#### Fixed Fractional Method
Risk a fixed percentage based on recent performance:
- Winning streak: Increase to 1.5%
- Losing streak: Decrease to 0.5%
- Normal conditions: Standard 1%

## Multi-Timeframe Risk Assessment

### Daily Risk Limits
- Maximum daily loss: 5% of account balance
- Maximum daily risk exposure: 3% across all open positions
- Maximum number of trades per day: Based on strategy and market conditions

### Weekly and Monthly Limits
- Weekly drawdown limit: 10% from weekly high
- Monthly profit target: 8-12% (varies by firm)
- Monthly maximum loss: 6% of starting balance

## Portfolio-Level Risk Management

### Correlation Risk
Avoid taking multiple positions in highly correlated instruments:
- EUR/USD and GBP/USD (currency correlation)
- Tech stocks during earnings season
- Commodity pairs (Gold/Silver, Oil/Gas)

### Sector Diversification
Spread risk across different:
- Market sectors (Tech, Finance, Healthcare)
- Asset classes (Forex, Indices, Commodities)  
- Geographic regions (US, European, Asian markets)

## Advanced Stop Loss Techniques

### Trailing Stops
- **Fixed Percentage**: Trail by fixed percentage (e.g., 2%)
- **ATR-Based**: Trail based on Average True Range
- **Support/Resistance**: Trail to key technical levels

### Smart Stop Placement
- Avoid placing stops at obvious levels
- Use volatility-adjusted stops
- Consider time-based stops for range-bound markets

## Psychological Risk Management

### Emotional Control Techniques
1. **Pre-Market Routine**: Consistent preparation reduces emotional trading
2. **Trade Journaling**: Record emotions and decisions for later analysis
3. **Break Protocols**: Mandatory breaks after losses or big wins
4. **Meditation/Mindfulness**: Improve focus and emotional regulation

### Dealing with Drawdowns
- Accept drawdowns as normal part of trading
- Review and analyze what went wrong
- Reduce position size during drawdown periods
- Focus on process, not just results

## Technology and Tools

### Risk Management Software
- **Position Size Calculators**: Automate position sizing calculations
- **Risk/Reward Analyzers**: Evaluate potential trades before entry
- **Drawdown Trackers**: Monitor account health in real-time

### Automated Risk Controls
- **Maximum Loss Orders**: Automatic account closure at loss limit
- **Position Limits**: Prevent over-leveraging
- **Time-Based Closures**: Close positions at specific times

## Conclusion

Effective risk management is what separates successful prop traders from those who blow accounts. Master these techniques and make them second nature - your trading career depends on it.`,
      difficulty: "Advanced",
      author: "Sarah Chen, CFA",
      readTime: 18,
      rating: 4.9,
      tags: ["Risk Management", "Advanced", "Psychology", "Portfolio Management"],
      publishedAt: "2025-01-10T00:00:00Z"
    }
  };

  const guide = mockGuides[params?.slug || ""];
  
  // Set SEO
  if (guide) {
    setSEO({
      title: `${guide.title} | PropFirmMentor`,
      description: guide.description
    });
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (!guide) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Guide Not Found</h1>
            <p className="text-muted-foreground mb-6">The guide you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href={`/${locale}/guides`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Guides
              </Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/guides`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Guides
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <Card className="mb-8">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={getDifficultyColor(guide.difficulty)}>
                {guide.difficulty}
              </Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{guide.rating}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{guide.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{guide.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(guide.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <CardTitle className="text-3xl font-bold leading-tight">
              {guide.title}
            </CardTitle>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {guide.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {guide.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Article Content */}
        <Card>
          <CardContent className="prose prose-lg dark:prose-invert max-w-none p-8">
            <div 
              className="space-y-6 text-foreground"
              dangerouslySetInnerHTML={{ 
                __html: guide.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) {
                      return `<h1 class="text-3xl font-bold mb-6 mt-8 text-foreground">${line.slice(2)}</h1>`;
                    } else if (line.startsWith('## ')) {
                      return `<h2 class="text-2xl font-semibold mb-4 mt-6 text-foreground">${line.slice(3)}</h2>`;
                    } else if (line.startsWith('### ')) {
                      return `<h3 class="text-xl font-medium mb-3 mt-4 text-foreground">${line.slice(4)}</h3>`;
                    } else if (line.startsWith('#### ')) {
                      return `<h4 class="text-lg font-medium mb-2 mt-3 text-foreground">${line.slice(5)}</h4>`;
                    } else if (line.startsWith('- [ ] ')) {
                      return `<div class="flex items-center gap-2 mb-2"><input type="checkbox" class="rounded" disabled /> <span class="text-muted-foreground">${line.slice(6)}</span></div>`;
                    } else if (line.startsWith('- ')) {
                      return `<li class="mb-1 text-foreground">${line.slice(2)}</li>`;
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return `<p class="font-semibold mb-2 text-foreground">${line.slice(2, -2)}</p>`;
                    } else if (line.trim() === '') {
                      return '<br />';
                    } else if (line.includes('**Formula**:')) {
                      return `<div class="bg-muted p-4 rounded-lg my-4"><code class="text-sm text-foreground">${line}</code></div>`;
                    } else {
                      return `<p class="mb-4 leading-relaxed text-foreground">${line}</p>`;
                    }
                  })
                  .join('')
              }}
            />
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to Start Prop Trading?</h3>
            <p className="text-muted-foreground mb-4">
              Apply what you've learned by exploring top-rated prop firms
            </p>
            <Button asChild size="lg">
              <Link href={`/${locale}`}>
                <TrendingUp className="h-4 w-4 mr-2" />
                View Prop Firms
              </Link>
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}