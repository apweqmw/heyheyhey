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
import { ArrowLeft, Clock, User, Calendar, Eye, ExternalLink, TrendingUp, AlertCircle, Building2 } from "lucide-react";

interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: 'Market News' | 'Firm Updates' | 'Regulation' | 'Technology' | 'Analysis' | 'Education';
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  urgent: boolean;
  externalUrl?: string;
  source?: string;
}

export default function NewsDetail() {
  const [, params] = useRoute("/:locale/news/:slug");
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();

  // Mock news data - in a real app this would come from an API
  const mockNews: Record<string, NewsArticle> = {
    "ftmo-scaling-update": {
      id: "1",
      slug: "ftmo-scaling-update",
      title: "FTMO Introduces New Account Scaling Program for 2025",
      summary: "FTMO has announced major changes to their account scaling program, offering faster progression and higher profit splits for consistent traders.",
      content: `# FTMO Launches Enhanced Scaling Program

FTMO, one of the leading proprietary trading firms, has announced significant updates to their account scaling program, effective January 2025. These changes are designed to reward consistent performance and provide faster paths to larger trading accounts.

## Key Changes

### Faster Scaling Timeline
- **Previous**: 3-month minimum between scaling opportunities
- **New**: 2-month minimum for consistent performers
- **Exceptional performers** can now scale monthly with special criteria

### Improved Profit Splits
The new tiered profit split system offers:
- **Standard accounts**: 80% profit split (unchanged)
- **Scaled accounts (200K+)**: 85% profit split
- **Premium accounts (500K+)**: 90% profit split
- **Elite accounts (1M+)**: 95% profit split

### Enhanced Scaling Criteria

#### Standard Scaling Requirements:
- Minimum 8% profit over the scaling period
- Maximum 3% daily loss on any single day
- Consistent trading activity (minimum 10 trading days per month)
- Risk/reward ratio above 1:1.5

#### Fast-Track Scaling:
For exceptional performers, FTMO introduces expedited scaling:
- 12% profit in 4 weeks
- Maximum daily loss under 2%
- Risk/reward ratio above 1:2
- Zero rule violations

## Impact on Traders

### Immediate Benefits
1. **Higher earning potential** through improved profit splits
2. **Faster capital growth** with reduced scaling timeframes  
3. **Better risk-adjusted returns** with optimized position sizing
4. **Increased motivation** through clearer progression paths

### Long-term Advantages
- Access to institutional-level capital (up to $2M)
- Professional trader status and recognition
- Potential recruitment for FTMO's proprietary desk
- Advanced trading tools and analytics

## Industry Implications

This move by FTMO signals a broader trend in the prop trading industry toward:
- **Competitive scaling programs** as firms compete for top talent
- **Performance-based incentives** rather than time-based restrictions
- **Technology-driven evaluation** using advanced analytics
- **Retention strategies** to keep successful traders

### Competitive Response
Other major prop firms are expected to announce similar enhancements:
- **The Funded Trader** is rumored to be developing a new scaling system
- **TopStep** has hinted at upcoming program improvements
- **MyForexFunds** recently increased their maximum account sizes

## Analysis

### Why This Matters
The prop trading industry has become increasingly competitive, with firms recognizing that their most valuable asset is talented, consistent traders. By improving scaling opportunities, FTMO is:

1. **Attracting new talent** from competing firms
2. **Retaining successful traders** who might otherwise leave for better terms
3. **Improving overall profitability** through higher-performing accounts
4. **Setting industry standards** that others will need to match

### Potential Challenges
While the changes are generally positive, traders should be aware of:
- **Increased pressure** to maintain consistent performance
- **Higher stakes** as account sizes grow larger
- **More stringent risk management** requirements
- **Psychological challenges** of trading larger amounts

## What This Means for Traders

### For Current FTMO Traders
- Review your performance to see if you qualify for fast-track scaling
- Focus on consistency rather than just profitability
- Prepare mentally for larger position sizes and responsibility
- Take advantage of educational resources to improve skills

### For Prospective Traders
- FTMO becomes more attractive compared to other firms
- Higher potential returns justify the evaluation costs
- Consider FTMO's track record and support systems
- Evaluate if the increased performance pressure aligns with your goals

## Expert Commentary

"This is a game-changing move by FTMO," says prop trading expert Dr. Michael Rodriguez. "By aligning their incentives more closely with trader success, they're creating a win-win scenario that should drive better performance across their entire trader base."

Industry analyst Sarah Kim notes: "The timing is strategic. With market volatility expected to increase in 2025, having highly motivated, well-capitalized traders will give FTMO a significant competitive advantage."

## Implementation Timeline

The new scaling program will be implemented in phases:
- **January 15, 2025**: New profit split structure takes effect
- **February 1, 2025**: Fast-track scaling becomes available
- **March 1, 2025**: Full program rollout complete

Current traders will be automatically enrolled in the new system, with their existing performance history considered for immediate scaling opportunities.

## Conclusion

FTMO's enhanced scaling program represents a significant shift in the prop trading landscape. By offering faster progression and better profit splits, they're setting a new standard that prioritizes trader success and retention.

For traders considering prop firms, these changes make FTMO's value proposition even more compelling. However, success will still depend on disciplined risk management, consistent performance, and continuous skill development.

The prop trading industry continues to evolve rapidly, and this latest development from FTMO suggests that 2025 will be an exciting year for proprietary trading opportunities.`,
      category: "Firm Updates",
      author: "PropFirmMentor Team",
      publishedAt: "2025-01-16T08:00:00Z",
      readTime: 8,
      views: 15420,
      urgent: false
    },
    "cftc-regulations-2025": {
      id: "2",
      slug: "cftc-regulations-2025", 
      title: "CFTC Announces New Regulations for Prop Trading Firms",
      summary: "The Commodity Futures Trading Commission has released new regulatory guidelines that will impact how prop trading firms operate in 2025.",
      content: `# CFTC Issues New Prop Trading Regulations for 2025

The Commodity Futures Trading Commission (CFTC) has announced comprehensive new regulations for proprietary trading firms, set to take effect in Q2 2025. These regulations aim to increase transparency, protect traders, and ensure fair market practices.

## Key Regulatory Changes

### Enhanced Disclosure Requirements
All prop trading firms must now provide:
- **Detailed risk disclosures** including maximum loss scenarios
- **Clear fee structures** with no hidden charges  
- **Performance statistics** including average trader success rates
- **Complaint resolution procedures** with third-party arbitration

### Capital Requirements
New minimum capital requirements include:
- **Tier 1 firms** (>1000 traders): $10M minimum capital
- **Tier 2 firms** (100-1000 traders): $5M minimum capital  
- **Tier 3 firms** (<100 traders): $2M minimum capital
- **Segregated client funds** must be held in qualified institutions

### Trader Protection Measures

#### Fair Evaluation Standards
- Evaluation criteria must be "commercially reasonable"
- No retroactive rule changes during evaluation periods
- Clear appeals process for rule violations
- Independent review of trader complaints

#### Payout Guarantees
- Firms must honor all legitimate payout requests within 30 days
- Escrow accounts for trader profits above $10,000
- Insurance requirements for trader fund protection
- Regular audits of payout procedures

## Industry Impact

### Compliance Costs
Smaller firms may face significant compliance burdens:
- Legal and regulatory consulting fees
- Technology upgrades for reporting requirements
- Additional staff for compliance monitoring
- Regular third-party audits

### Market Consolidation
The new regulations may accelerate industry consolidation:
- Smaller firms may exit the market
- Larger firms may acquire struggling competitors
- New barriers to entry for startup prop firms
- Increased focus on institutional-quality operations

## Firm Responses

### Major Firms Adapting
Leading prop trading firms have announced their compliance strategies:

**FTMO** has allocated $2M for regulatory compliance and hired former CFTC staff to lead their regulatory affairs department.

**TopStep** is implementing new technology systems to meet reporting requirements and has increased their legal team by 40%.

**The Funded Trader** is working with regulatory consultants to ensure full compliance and has begun quarterly third-party audits.

### Smaller Firms Struggling
Many smaller firms are considering their options:
- Some are seeking acquisition by larger competitors
- Others are exploring offshore jurisdictions
- Several have announced plans to exit the US market
- A few are transitioning to education-only business models

## Timeline and Implementation

### Phase 1 (March 2025): Disclosure Requirements
- All firms must update their trader agreements
- New risk disclosure documents required
- Performance statistics must be published monthly
- Complaint procedures must be established

### Phase 2 (June 2025): Capital and Operational Requirements
- Minimum capital requirements take effect
- Segregated fund requirements begin
- Technology and reporting systems must be operational
- Third-party audit programs commence

### Phase 3 (September 2025): Full Compliance
- All regulations fully implemented
- Regular CFTC examinations begin
- Enforcement actions for non-compliance
- Industry review and potential adjustments

## Trader Implications

### Positive Changes for Traders
- **Greater transparency** in firm operations and statistics
- **Improved protection** of funds and profits
- **Fair evaluation** processes with clear standards
- **Better recourse** for disputes and complaints

### Potential Challenges
- **Reduced options** as smaller firms exit the market
- **Higher costs** potentially passed to traders
- **More complex** onboarding and documentation requirements
- **Possible delays** in payouts during transition periods

## Expert Analysis

Regulatory expert Jane Thompson notes: "While these regulations will increase costs for firms, they should ultimately benefit traders by ensuring fair treatment and fund protection. The industry has grown rapidly with limited oversight, so this regulatory framework is overdue."

Former CFTC Commissioner Robert Chen comments: "The regulations strike a reasonable balance between protecting traders and allowing innovation. Firms that have operated ethically will find compliance straightforward, while bad actors will be forced out of the market."

## International Implications

The CFTC regulations may influence global standards:
- **European regulators** are reviewing similar measures
- **UK authorities** have expressed interest in comparable rules
- **Australian regulators** are conducting industry consultations
- **Offshore jurisdictions** may see increased firm migration

## Preparing for Changes

### For Traders
- Research your firm's compliance status
- Understand new protections available to you
- Keep detailed records of all transactions
- Know your rights under the new regulations

### For Firms
- Begin compliance planning immediately
- Consult with regulatory attorneys
- Upgrade technology and operational systems
- Communicate changes clearly to traders

## Conclusion

The CFTC's new regulations represent the most significant regulatory development in the prop trading industry's history. While implementation will present challenges, the long-term benefits include improved trader protection, market stability, and industry legitimacy.

Firms that embrace these changes and view them as an opportunity to demonstrate their commitment to fair practices will likely emerge stronger. Traders can expect a more professional, transparent industry that better protects their interests while maintaining the profit opportunities that make prop trading attractive.

The next few months will be critical as firms prepare for compliance and traders evaluate their options in this evolving regulatory landscape.`,
      category: "Regulation",
      author: "Legal Team",
      publishedAt: "2025-01-14T14:30:00Z",
      readTime: 12,
      views: 28650,
      urgent: true
    }
  };

  const article = mockNews[params?.slug || ""];
  
  // Set SEO
  if (article) {
    setSEO({
      title: `${article.title} | PropFirmMentor News`,
      description: article.summary
    });
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Market News':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Firm Updates':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Regulation':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Technology':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Analysis':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Education':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href={`/${locale}/news`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
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
            <Link href={`/${locale}/news`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <Card className="mb-8">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              {article.urgent && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Urgent
                </Badge>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
              </div>
            </div>

            <CardTitle className="text-3xl font-bold leading-tight">
              {article.title}
            </CardTitle>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {article.summary}
            </p>
          </CardHeader>
        </Card>

        {/* Article Content */}
        <Card>
          <CardContent className="prose prose-lg dark:prose-invert max-w-none p-8">
            <div 
              className="space-y-6 text-foreground"
              dangerouslySetInnerHTML={{ 
                __html: article.content
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
                    } else if (line.startsWith('- **')) {
                      const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
                      if (match) {
                        return `<li class="mb-2"><strong class="text-foreground">${match[1]}</strong>: <span class="text-foreground">${match[2]}</span></li>`;
                      }
                      return `<li class="mb-1 text-foreground">${line.slice(2)}</li>`;
                    } else if (line.startsWith('- ')) {
                      return `<li class="mb-1 text-foreground">${line.slice(2)}</li>`;
                    } else if (line.startsWith('**') && line.endsWith('**')) {
                      return `<p class="font-semibold mb-2 text-foreground">${line.slice(2, -2)}</p>`;
                    } else if (line.trim() === '') {
                      return '<br />';
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
            <h3 className="text-xl font-semibold mb-2">Stay Updated with Prop Trading News</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest industry updates and analysis
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href={`/${locale}/news`}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  More News
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/${locale}`}>
                  <Building2 className="h-4 w-4 mr-2" />
                  View Prop Firms
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}