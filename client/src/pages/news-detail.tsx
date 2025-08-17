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
    "ftmo-new-profit-split-program-2025": {
      id: "1",
      slug: "ftmo-new-profit-split-program-2025",
      title: "FTMO Announces New Profit Split Program for 2025",
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
    "new-regulatory-guidelines-prop-trading": {
      id: "2",
      slug: "new-regulatory-guidelines-prop-trading", 
      title: "New Regulatory Guidelines for Prop Trading Firms",
      summary: "Financial regulators release updated guidelines for proprietary trading firms, impacting evaluation processes and trader requirements.",
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
      author: "Regulatory Expert",
      publishedAt: "2025-08-13T09:15:00Z",
      readTime: 6,
      views: 3456,
      urgent: true
    },
    "topstep-expands-european-markets": {
      id: "3",
      slug: "topstep-expands-european-markets",
      title: "Topstep Expands to European Markets",
      summary: "Leading futures prop firm Topstep announces expansion into European markets with new EU-regulated entity.",
      content: `# Topstep Announces Major European Expansion

Topstep, one of the world's leading futures proprietary trading firms, has announced its official expansion into European markets through the establishment of a new EU-regulated entity, Topstep Europe Ltd.

## Strategic Expansion Details

### New European Entity
- **Regulatory Status**: Fully authorized by EU financial authorities
- **Base of Operations**: London and Frankfurt offices
- **Target Markets**: UK, Germany, France, Netherlands, and Nordic countries
- **Local Currency Support**: EUR, GBP trading alongside USD

### Enhanced Product Offerings
**European-Focused Instruments**:
- FTSE 100 and DAX index futures
- European bond futures (Bund, BTP)
- Energy futures (ICE Brent, TTF Gas)
- FX futures with EUR pairs

**Localized Services**:
- European market hours optimization
- Local customer support in multiple languages
- Compliance with MiFID II and GDPR requirements
- Regional payment methods integration

## Market Impact and Opportunities

### For European Traders
The expansion provides European traders with:
- **Reduced Latency**: Local servers and infrastructure
- **Regulatory Protection**: EU investor protection frameworks
- **Currency Efficiency**: Native EUR trading reduces conversion costs
- **Local Support**: Business hours aligned with European markets

### Competitive Landscape
This move intensifies competition in the European prop trading space:
- Direct competition with established European firms
- Pressure on other US firms to expand internationally
- Innovation in evaluation processes and trader support
- Enhanced standards across the industry

## Implementation Timeline

### Phase 1 (Q3 2025): Soft Launch
- Limited beta program for selected European traders
- Core futures instruments availability
- Basic support infrastructure establishment

### Phase 2 (Q4 2025): Full Launch
- Complete product suite rollout
- Marketing and customer acquisition campaigns
- Partnership establishment with European brokers
- Educational content localization

### Phase 3 (Q1 2026): Optimization
- Advanced features and tools deployment
- Mobile application European optimization
- Institutional partnerships development
- Market maker relationships establishment

## Executive Commentary

"Europe represents a massive opportunity for growth," said CEO Michael Patak. "European traders have been underserved by proper prop trading opportunities, and we're excited to bring our proven evaluation model and trader development programs to this market."

Head of International Expansion Sarah Williams added: "Our research shows strong demand for legitimate prop trading opportunities in Europe. We've invested significantly in ensuring full regulatory compliance while maintaining the trader-friendly approach that made us successful in the US."

## Regulatory Considerations

### Compliance Framework
- **License Type**: Investment services license under MiFID II
- **Capital Requirements**: €5M initial regulatory capital
- **Audit Requirements**: Annual third-party compliance reviews
- **Reporting Standards**: Enhanced transaction reporting to regulators

### Trader Protections
- Client money segregation in Tier 1 European banks
- Investor compensation scheme participation
- Clear complaint handling procedures
- Transparent fee and evaluation criteria disclosure

## Industry Analysis

Market analysts view this expansion positively:

"Topstep's European expansion validates the global demand for prop trading services," notes fintech analyst Dr. Emma Richardson. "Their proven track record and substantial regulatory investment should position them well against local competitors."

European trading education expert Marco Villareal commented: "This brings much-needed legitimacy and professional standards to the European prop trading space. Traders will benefit from increased competition and improved service standards."

## Future Implications

### For the Industry
- Accelerated globalization of prop trading services
- Increased regulatory scrutiny and standardization
- Enhanced trader mobility between regions
- Technology and service innovation pressure

### For Traders
- More opportunities and firm choices
- Better terms and conditions through competition
- Improved educational and support resources
- Enhanced career development pathways

## Conclusion

Topstep's European expansion marks a significant milestone in the globalization of prop trading. By establishing a fully regulated European presence, they're not only accessing new markets but also raising industry standards.

For European traders, this expansion means access to proven evaluation systems, professional development programs, and the opportunity to trade with substantial capital backing. The move is expected to catalyze further international expansion by other major prop trading firms.

The success of this expansion will likely determine the pace of similar moves by competitors and shape the future landscape of global prop trading.`,
      category: "Market Expansion",
      author: "Market Reporter",
      publishedAt: "2025-08-14T15:30:00Z",
      readTime: 4,
      views: 1823,
      urgent: false
    },
    "prop-trading-market-growth-q2-2025": {
      id: "4",
      slug: "prop-trading-market-growth-q2-2025",
      title: "Prop Trading Market Grows 25% in Q2 2025",
      summary: "Industry report shows significant growth in prop trading sector with increased trader participation and firm profitability.",
      content: `# Prop Trading Market Shows Record Growth in Q2 2025

The proprietary trading industry has reported exceptional growth in Q2 2025, with market expansion reaching 25% compared to the same period last year, according to the latest industry report from PropTech Analytics.

## Key Growth Metrics

### Market Size and Participation
- **Total Market Value**: $8.2 billion (up from $6.6 billion in Q2 2024)
- **Active Traders**: 485,000 (25% increase year-over-year)
- **Funded Accounts**: 125,000 (40% increase)
- **Average Account Size**: $165,000 (up 15%)

### Firm Performance
- **Number of Active Firms**: 180+ worldwide
- **New Firm Launches**: 25 in Q2 2025 alone
- **Average Firm Revenue Growth**: 22%
- **Trader Success Rate**: 18% (up from 14% in 2024)

## Driving Factors Behind Growth

### Technology Advancement
**Trading Infrastructure**:
- Cloud-based trading platforms reducing latency
- AI-powered risk management systems
- Mobile trading application proliferation
- Real-time analytics and reporting tools

**Evaluation Innovation**:
- Shorter evaluation periods (average 30 days vs 45 days)
- More flexible trading rules and schedules
- Instant funding for exceptional performers
- Improved educational and mentoring programs

### Market Accessibility
**Reduced Barriers to Entry**:
- Lower evaluation fees (average 15% reduction)
- More payment plan options and flexibility
- Multiple account size options starting from $10K
- Beginner-friendly evaluation criteria

**Global Expansion**:
- European market penetration increasing rapidly
- Asian market presence growing (particularly Singapore, Hong Kong)
- Latin American firm launches accelerating
- Regulatory frameworks becoming more favorable

## Sector Analysis by Region

### North America (60% of global market)
- **Growth Rate**: 20% year-over-year
- **Leading Firms**: FTMO, Topstep, The Funded Trader
- **Key Trend**: Increased institutional backing and legitimacy

### Europe (25% of global market)
- **Growth Rate**: 35% year-over-year
- **Regulatory Environment**: Increasingly supportive with MiFID II adaptations
- **Key Trend**: Local firm establishment and US firm expansion

### Asia-Pacific (12% of global market)
- **Growth Rate**: 45% year-over-year
- **Emerging Markets**: Singapore, Australia, Hong Kong leading
- **Key Trend**: Technology-first approach and mobile-native platforms

### Other Regions (3% of global market)
- **Growth Rate**: 30% year-over-year
- **Focus Areas**: Latin America and Middle East
- **Key Trend**: Localized service offerings and currency support

## Trader Success Trends

### Improved Performance Metrics
- **Average Profitability**: Successful traders earning 12% monthly returns
- **Risk Management**: Better adherence to drawdown limits
- **Consistency**: 65% of funded traders maintaining profitability for 6+ months
- **Scaling Success**: 35% of traders successfully scaling to larger accounts

### Demographics and Behavior
**Age Distribution**:
- 18-25 years: 28% (highest growth segment)
- 26-35 years: 45% (largest segment)
- 36-45 years: 20%
- 45+ years: 7%

**Educational Background**:
- Finance/Economics: 35%
- Technology/Engineering: 25%
- Self-taught traders: 40%

## Industry Challenges and Solutions

### Ongoing Challenges
- **Regulatory Uncertainty**: Varying rules across jurisdictions
- **Market Saturation**: Increased competition among firms
- **Trader Education**: Need for better preparation and realistic expectations
- **Risk Management**: Balancing opportunity with prudent risk controls

### Industry Solutions
- **Self-Regulation**: Industry associations developing standards
- **Technology Investment**: Advanced risk management and trader analytics
- **Education Initiatives**: Comprehensive training programs and resources
- **Transparency**: Clear communication of rules, fees, and expectations

## Future Outlook

### 2025 Projections
- **Market Size**: Expected to reach $10 billion by year-end
- **Trader Population**: Projected 600,000 active traders
- **Geographic Expansion**: Continued growth in emerging markets
- **Technology Integration**: AI and machine learning advancement

### Long-term Trends (2026-2028)
- **Institutional Integration**: Prop firms becoming part of larger financial ecosystems
- **Regulatory Harmonization**: More consistent international standards
- **Professional Development**: Career pathways from prop trading to institutional roles
- **Technology Evolution**: VR trading environments and advanced simulation

## Expert Commentary

Dr. James Mitchell, Director of Financial Markets Research at TradeTech Institute, notes: "The 25% growth rate reflects the maturation of prop trading from a niche activity to a legitimate career path. Improved technology, better risk management, and professional standards are driving this expansion."

Maria Santos, former hedge fund manager and now prop trading consultant, comments: "What we're seeing is the democratization of professional trading. Prop firms are providing opportunities that were previously only available to institutional traders."

## Investment and Funding

### Firm Capitalization
- **Total Industry Capital**: $15.2 billion under management
- **Average Firm Capital**: $85 million
- **New Investment**: $2.1 billion in external funding raised in Q2
- **Valuation Growth**: Average firm valuations up 30%

### Technology Investment
- **R&D Spending**: 15% of revenue (industry average)
- **Focus Areas**: Risk management, trader analytics, platform development
- **Partnerships**: Increased collaboration with fintech companies
- **Innovation Labs**: 40% of major firms establishing dedicated innovation teams

## Conclusion

The prop trading industry's 25% growth in Q2 2025 demonstrates its evolution from a niche market to a significant sector within financial services. This growth is driven by technological advancement, improved accessibility, and growing global recognition of prop trading as a legitimate career path.

As the industry continues to mature, we can expect further professionalization, technological innovation, and geographic expansion. The challenge will be maintaining this growth while ensuring proper risk management and trader protection standards.

For aspiring traders, these trends indicate expanding opportunities, better tools and support, and clearer pathways to success in proprietary trading careers.`,
      category: "Market Analysis",
      author: "Market Analyst",
      publishedAt: "2025-08-12T14:20:00Z",
      readTime: 5,
      views: 1967,
      urgent: false
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
      <Footer />
    </div>
  );
}