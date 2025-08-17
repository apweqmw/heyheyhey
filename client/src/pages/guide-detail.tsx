import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
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
    "trading-rules-complete-guide": {
      id: "trading-rules-complete-guide",
      slug: "trading-rules-complete-guide",
      title: "Complete Trading Rules Guide for Prop Firms",
      description: "Master the essential trading rules that prop firms use to evaluate traders. Learn about drawdown limits, profit targets, risk management requirements, and prohibited strategies.",
      content: `# Complete Trading Rules Guide for Prop Firms

Understanding prop firm trading rules is crucial for success in the proprietary trading world. This comprehensive guide covers all the essential rules, requirements, and strategies you need to know.

## Key Trading Rules Overview

### 1. Drawdown Limits
**Daily Loss Limit**: Most prop firms set a daily loss limit between 5-10% of your account balance. This limit resets at midnight server time.

**Maximum Drawdown**: The maximum allowable loss from your starting balance, typically ranging from 8-12% depending on the firm.

**Trailing Drawdown**: Some firms use trailing drawdown that moves up with your profits but never decreases.

### 2. Profit Targets
**Phase 1**: Usually requires 8-10% profit to advance to the next phase
**Phase 2**: Often requires 5-8% additional profit to get funded
**Consistency Requirements**: Some firms require a minimum number of trading days

### 3. Position Sizing Rules
- Maximum position size per trade (typically 1-2% risk per trade)
- Maximum correlation between positions
- Overnight position holding requirements
- Weekend holding restrictions

## Risk Management Requirements

### Essential Risk Controls
1. **Stop Loss Orders**: Mandatory for all positions
2. **Maximum Risk per Trade**: Usually 1-2% of account balance
3. **News Trading Restrictions**: Prohibited during high-impact news
4. **Hedging Rules**: Many firms prohibit hedging strategies

### Time-Based Restrictions
- **Minimum Trading Days**: 4-10 days minimum before requesting payout
- **Maximum Trading Days**: Some challenges have time limits
- **Consistency Requirements**: Profit must be spread across multiple days

## Prohibited Strategies

### Banned Trading Methods
- **Scalping**: Holding positions for less than 10 seconds
- **Grid Trading**: Opening multiple positions in same direction
- **Martingale**: Doubling position size after losses
- **News Trading**: Trading during high-impact economic news
- **Copy Trading**: Using external signals or copying other traders

### Platform-Specific Rules
Different trading platforms may have specific requirements:
- MetaTrader 4/5 specific rules
- cTrader platform requirements
- DXTrade restrictions
- Proprietary platform rules

## Advanced Strategy Guidelines

### Approved Trading Styles
1. **Swing Trading**: Holding positions for days to weeks
2. **Day Trading**: Opening and closing within same day
3. **Position Trading**: Longer-term fundamental analysis
4. **Technical Analysis**: Chart-based decision making

### Currency Pair Restrictions
- Major pairs: Usually unrestricted
- Minor pairs: May have spread requirements
- Exotic pairs: Often limited or prohibited
- Cryptocurrency: Varies by firm

## Evaluation Process

### Phase Structure
**Challenge Phase**: Demonstrate profitability under controlled risk
**Verification Phase**: Confirm consistent performance
**Funded Phase**: Trade with firm capital under ongoing rules

### Performance Metrics
- Profit consistency across trading days
- Maximum drawdown adherence
- Risk-adjusted returns
- Sharpe ratio requirements

## Common Rule Violations

### Most Frequent Mistakes
1. **Exceeding Daily Loss Limit**: Trading beyond allowed daily loss
2. **News Trading**: Trading during prohibited news times
3. **Insufficient Trading Days**: Not meeting minimum day requirements
4. **Position Size Violations**: Exceeding maximum position limits
5. **Weekend Gaps**: Holding positions over weekends when prohibited

### How to Avoid Violations
- Set alerts for daily loss limits
- Use economic calendars for news avoidance
- Track trading days carefully
- Calculate position sizes before entering trades
- Close positions before weekends if required

## Firm-Specific Variations

### FTMO Rules
- 10% profit target (Phase 1)
- 5% profit target (Phase 2)  
- 10% maximum loss limit
- 5% daily loss limit

### TopStep Rules
- Combine Step progression system
- $2,000 daily loss limit for $50K account
- Consistency requirements
- Minimum 10 trading days

### Other Major Firms
Each firm has unique variations:
- MyForexFunds: Specific drawdown calculations
- The5ers: Aggressive scaling plans
- City Traders Imperium: Instant funding options

## Best Practices for Success

### Daily Routine
1. Review account status before trading
2. Calculate maximum allowable risk
3. Check economic calendar for news
4. Set daily stop loss orders
5. Track progress toward targets

### Risk Management Tips
- Never risk more than 1% per trade
- Use proper position sizing calculations  
- Set stop losses before entering trades
- Monitor correlation between positions
- Keep detailed trading journal

### Mental Preparation
- Understand rules completely before starting
- Practice on demo accounts first
- Develop consistent trading routine
- Focus on process over profits
- Maintain emotional discipline

## Technology and Tools

### Required Trading Platforms
- MetaTrader 4/5 proficiency
- Understanding of platform-specific features
- Risk management tools usage
- Order execution best practices

### Helpful Tools
- Position size calculators
- Economic calendars
- Risk management indicators
- Trading journals and analytics
- Performance tracking software

## Conclusion

Success in prop firm trading requires strict adherence to rules while maintaining profitable trading strategies. Focus on risk management, understand each firm's specific requirements, and practice consistently before attempting challenges.

Remember: Rules exist to protect both you and the firm. Master them, and you'll be well on your way to funded trading success.

---

*This guide is updated regularly to reflect the latest prop firm requirements. Always verify current rules directly with your chosen prop firm before starting any challenge.*`,
      difficulty: 'Intermediate' as const,
      author: 'PropFirmMentor Team',
      readTime: 12,
      rating: 4.8,
      tags: ['Trading Rules', 'Risk Management', 'Prop Firms', 'Regulations'],
      publishedAt: '2025-01-15',
      updatedAt: '2025-01-15'
    },
    "platform-guide-comparison": {
      id: "platform-guide-comparison",
      slug: "platform-guide-comparison", 
      title: "Trading Platform Guide: MT4, MT5, cTrader & More",
      description: "Compare major trading platforms used by prop firms. Learn the features, advantages, and limitations of MetaTrader 4, MetaTrader 5, cTrader, DXTrade, and other popular platforms.",
      content: `# Trading Platform Guide: MT4, MT5, cTrader & More

Choosing the right trading platform is crucial for prop firm success. This comprehensive guide compares all major platforms used by proprietary trading firms.

## Platform Overview

### Why Platform Choice Matters
- **Order Execution Speed**: Critical for scalping and day trading
- **Chart Analysis Tools**: Essential for technical analysis
- **Risk Management Features**: Built-in stop loss and position sizing
- **Stability and Reliability**: Minimize technical issues during trading
- **Mobile Trading**: Access markets anywhere, anytime

## MetaTrader 4 (MT4)

### Key Features
- **Industry Standard**: Most widely used forex platform
- **Expert Advisors**: Automated trading capabilities
- **Custom Indicators**: Thousands of free and paid indicators
- **Simple Interface**: User-friendly for beginners
- **Market Depth**: Level 2 pricing information

### Advantages
- Extensive community support and resources
- Vast library of custom indicators and EAs
- Lightweight and fast execution
- Compatible with most prop firms
- Strong mobile app functionality

### Limitations
- Limited market access (primarily forex and CFDs)
- No built-in economic calendar
- Basic charting compared to newer platforms
- Limited order types
- No integrated risk management tools

### Best For
- Forex traders
- Beginners to prop trading
- EA and automated trading
- Firms: FTMO, MyForexFunds, TopStep

## MetaTrader 5 (MT5)

### Key Features
- **Multi-Asset Trading**: Forex, stocks, commodities, crypto
- **Advanced Charting**: 21 timeframes vs MT4's 9
- **Market Depth**: Enhanced Level 2 data
- **Built-in Calendar**: Economic news integration
- **MQL5 Programming**: More powerful than MQL4

### Advantages
- More markets and instruments
- Superior charting and analysis tools
- Better risk management features
- Integrated news and market sentiment
- More order types (6 pending orders)

### Limitations
- Steeper learning curve than MT4
- Higher system requirements
- Less third-party indicator support
- More complex interface
- Overkill for forex-only trading

### Best For
- Multi-market traders
- Advanced technical analysts
- Professional traders
- Firms: TopStep, The5ers, Apex Trader Funding

## cTrader

### Key Features
- **ECN Execution**: True market pricing
- **Advanced Charting**: Professional-grade analysis tools
- **Level 2 Pricing**: Full market depth
- **cAlgo Support**: C# automated trading
- **Risk Management**: Built-in position sizing tools

### Advantages
- Superior execution speeds
- Transparent ECN pricing
- Advanced charting capabilities
- Professional risk management
- Clean, modern interface

### Limitations
- Smaller broker network
- Fewer custom indicators
- Limited mobile functionality
- Higher learning curve
- Less community support

### Best For
- Professional traders
- ECN trading enthusiasts
- Advanced technical analysis
- Firms: IC Markets, Pepperstone partners

## DXTrade

### Key Features
- **Multi-Asset Platform**: Comprehensive market access
- **Web-Based**: No download required
- **Advanced Orders**: Sophisticated order management
- **Risk Controls**: Built-in risk management
- **Institutional Features**: Professional-grade tools

### Advantages
- Web-based accessibility
- Multi-asset trading capability
- Professional risk management
- Fast order execution
- Comprehensive reporting

### Limitations
- Limited customization options
- Smaller user community
- Platform-specific learning required
- Less mobile optimization
- Fewer educational resources

### Best For
- Multi-asset traders
- Web-based trading preference
- Professional risk management needs
- Firms: Various prop firms using institutional platforms

## TradingView Integration

### Key Features
- **Advanced Charting**: Industry-leading chart analysis
- **Social Trading**: Community insights and ideas
- **Multi-Broker Support**: Connect to various brokers
- **Custom Indicators**: Pine Script programming
- **Market Scanner**: Find trading opportunities

### Advantages
- Best-in-class charting tools
- Strong community and social features
- Regular updates and improvements
- Multi-timeframe analysis
- Excellent mobile experience

### Limitations
- Requires separate broker connection
- Subscription costs for advanced features
- Limited backtesting capabilities
- No native automated trading
- Platform dependency for execution

### Best For
- Chart analysis enthusiasts
- Social traders
- Multi-broker users
- Educational content consumption

## Platform Comparison Matrix

### Execution Speed
1. **cTrader**: Fastest ECN execution
2. **MT4**: Reliable and consistent
3. **MT5**: Good but heavier than MT4
4. **DXTrade**: Professional-grade speed
5. **TradingView**: Depends on broker connection

### Charting Capabilities
1. **TradingView**: Industry-leading charts
2. **cTrader**: Professional analysis tools
3. **MT5**: Advanced compared to MT4
4. **DXTrade**: Good institutional charting
5. **MT4**: Basic but functional

### User-Friendliness
1. **MT4**: Simplest learning curve
2. **TradingView**: Intuitive interface
3. **MT5**: Moderate complexity
4. **cTrader**: Professional but clean
5. **DXTrade**: Steeper learning curve

### Risk Management
1. **cTrader**: Built-in professional tools
2. **DXTrade**: Institutional risk controls
3. **MT5**: Enhanced from MT4
4. **TradingView**: Limited built-in tools
5. **MT4**: Basic risk management

## Prop Firm Platform Preferences

### FTMO
- **Primary**: MetaTrader 4 and 5
- **Mobile**: MT4/5 mobile apps
- **Features**: Standard MT functionality
- **Restrictions**: No EAs during evaluation

### TopStep
- **Primary**: Proprietary platform (Rithmic-based)
- **Features**: Futures-focused tools
- **Risk Management**: Built-in daily loss limits
- **Mobile**: Native mobile app

### MyForexFunds
- **Primary**: MetaTrader 4 and 5
- **Features**: Standard forex trading
- **Mobile**: Full mobile support
- **EAs**: Allowed with restrictions

### The5ers
- **Primary**: MetaTrader 4 and 5
- **Special**: TradingView integration
- **Features**: Social trading elements
- **Scaling**: Built-in account scaling

## Platform Selection Guide

### For Beginners
**Recommendation**: MetaTrader 4
- Easiest to learn
- Extensive educational resources
- Large community support
- Compatible with most prop firms

### For Advanced Traders
**Recommendation**: cTrader or MT5
- Professional-grade tools
- Advanced risk management
- Superior execution quality
- Enhanced charting capabilities

### For Multi-Asset Trading
**Recommendation**: MetaTrader 5 or DXTrade
- Multiple market access
- Comprehensive instrument coverage
- Professional order management
- Institutional-grade features

### For Mobile Trading
**Recommendation**: MetaTrader 4/5 or TradingView
- Excellent mobile apps
- Full feature accessibility
- Push notifications
- Cross-device synchronization

## Setup and Optimization Tips

### Initial Setup
1. **Download from Official Sources**: Avoid third-party downloads
2. **Verify Broker Connection**: Test connectivity and spreads
3. **Configure Charts**: Set up preferred timeframes and indicators
4. **Risk Settings**: Configure default stop losses and position sizes
5. **Backup Settings**: Export and save custom configurations

### Performance Optimization
- **Close Unnecessary Charts**: Reduce CPU usage
- **Limit Indicators**: Too many slow down platform
- **Regular Updates**: Keep platform current
- **Stable Internet**: Use wired connection when possible
- **System Resources**: Ensure adequate RAM and CPU

### Security Considerations
- **Strong Passwords**: Use unique, complex passwords
- **Two-Factor Authentication**: Enable when available
- **Regular Logout**: Don't stay logged in indefinitely
- **Secure Networks**: Avoid public WiFi for trading
- **Platform Updates**: Install security patches promptly

## Common Platform Issues

### Connectivity Problems
- **Solution**: Check internet connection and broker server status
- **Prevention**: Have backup internet connection
- **Recovery**: Know how to reconnect quickly

### Execution Delays
- **Causes**: High market volatility, poor connection, overloaded servers
- **Solutions**: Switch servers, close unnecessary applications
- **Prevention**: Trade during optimal server hours

### Platform Crashes
- **Immediate Action**: Restart platform, check open positions
- **Prevention**: Regular platform updates, system maintenance
- **Backup Plan**: Have mobile app ready for emergencies

## Future Platform Trends

### Emerging Technologies
- **AI Integration**: Automated analysis and suggestions
- **Cloud Computing**: Web-based platforms becoming standard
- **Mobile-First**: Enhanced mobile trading capabilities
- **Social Integration**: Community features and copy trading
- **Blockchain**: Decentralized trading platforms

### Regulatory Changes
- **Increased Oversight**: More platform regulation expected
- **Transparency**: Better price and execution reporting
- **Risk Controls**: Enhanced built-in risk management
- **Compliance**: Automated compliance monitoring

## Conclusion

Platform choice significantly impacts your prop trading success. Consider your trading style, experience level, and firm requirements when selecting. Most successful traders become proficient in multiple platforms to adapt to different prop firm requirements.

### Key Takeaways
- **MT4**: Best for beginners and forex-focused trading
- **MT5**: Ideal for multi-asset and advanced analysis  
- **cTrader**: Superior for professional ECN trading
- **DXTrade**: Good for institutional-grade multi-asset trading
- **TradingView**: Excellent for analysis, limited execution

Start with your prop firm's recommended platform, then explore others as you advance in your trading career.

---

*Platform features and capabilities evolve rapidly. Always verify current functionality with your chosen prop firm before starting any challenge.*`,
      difficulty: 'Beginner' as const,
      author: 'PropFirmMentor Team', 
      readTime: 15,
      rating: 4.7,
      tags: ['Trading Platforms', 'MetaTrader', 'cTrader', 'Technology'],
      publishedAt: '2025-01-14',
      updatedAt: '2025-01-14'
    },
    "complete-guide-prop-trading-firms": {
      id: "1",
      slug: "complete-guide-prop-trading-firms",
      title: "Complete Guide to Prop Trading Firms",
      description: "Everything you need to know about prop trading firms, how they work, and how to choose the right one for your trading style.",
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
    "risk-management-prop-traders": {
      id: "2", 
      slug: "risk-management-prop-traders",
      title: "Risk Management for Prop Traders",
      description: "Essential risk management techniques to protect your funded account and maintain consistent profitability.",
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
      difficulty: "Intermediate",
      author: "Risk Management Pro",
      readTime: 18,
      rating: 4.7,
      tags: ["risk-management", "psychology", "money-management"],
      publishedAt: "2025-08-10T00:00:00Z"
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
      <Footer />
    </div>
  );
}