import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, DollarSign, Shield, Info, ExternalLink } from "lucide-react";

export default function Disclaimer() {
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();

  useEffect(() => {
    setSEO({
      title: "Disclaimer - PropFirmMentor",
      description: "Important disclaimers and risk warnings for using PropFirmMentor. Understand the risks associated with prop trading and our service limitations.",
      keywords: ["disclaimer", "risk warning", "prop trading risks", "financial disclaimer", "PropFirmMentor", "trading risks"]
    });
  }, [setSEO]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-4">
            <AlertTriangle className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Disclaimer</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Important information and risk warnings
          </p>
        </div>

        <div className="space-y-8">
          {/* Risk Warning */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="bg-red-50 dark:bg-red-900/20">
              <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <AlertTriangle className="h-6 w-6" />
                High Risk Investment Warning
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-6">
              <div className="space-y-4">
                <p className="font-semibold text-red-700 dark:text-red-300">
                  Trading financial instruments carries a high level of risk and may not be suitable for all investors.
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-red-600 dark:text-red-400">
                  <li>You may lose some or all of your invested capital</li>
                  <li>Past performance is not indicative of future results</li>
                  <li>Prop trading involves additional risks and requirements</li>
                  <li>Most traders lose money - success is not guaranteed</li>
                  <li>Leverage can amplify both profits and losses</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* No Financial Advice */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Not Financial Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PropFirmMentor is an informational platform and does not provide financial, investment, or trading advice. We:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Are not licensed financial advisors</strong> - We do not provide personalized investment advice</li>
                <li><strong>Do not recommend specific investments</strong> - All information is for comparison purposes only</li>
                <li><strong>Are not responsible for trading decisions</strong> - You are solely responsible for your investment choices</li>
                <li><strong>Encourage independent research</strong> - Always verify information and seek professional advice</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Accuracy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Information Accuracy and Limitations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                While we strive for accuracy, we cannot guarantee that all information is current, complete, or error-free:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Pricing changes frequently</strong> - Firm prices and offers may change without notice</li>
                <li><strong>Terms may vary</strong> - Always check directly with the prop firm for current terms</li>
                <li><strong>Reviews are third-party</strong> - Trustpilot reviews reflect individual experiences</li>
                <li><strong>Regional differences</strong> - Services may vary by location and regulation</li>
                <li><strong>Updates may be delayed</strong> - Information is updated regularly but may not be real-time</li>
              </ul>
            </CardContent>
          </Card>

          {/* Affiliate Disclosure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Affiliate Relationships
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Transparency Notice</p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  PropFirmMentor earns commissions from affiliate partnerships with prop trading firms.
                </p>
              </div>

              <p className="text-muted-foreground">
                This means we may receive compensation when you:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Click on affiliate links to prop firms</li>
                <li>Sign up for trading challenges through our platform</li>
                <li>Use promotional codes we provide</li>
                <li>Make purchases through our referral links</li>
              </ul>

              <p className="text-muted-foreground">
                <strong>Important:</strong> Affiliate relationships do not influence our rankings or recommendations. We maintain editorial independence and strive for objective comparisons.
              </p>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Third-Party Services and Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our platform integrates with and links to third-party services:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Trustpilot Reviews:</strong> We display authentic reviews but are not responsible for their content or accuracy</li>
                <li><strong>Prop Firm Websites:</strong> External links lead to third-party sites with their own terms and policies</li>
                <li><strong>Analytics Services:</strong> We use third-party analytics that may collect user data</li>
                <li><strong>Payment Processors:</strong> Transactions with prop firms are processed by third parties</li>
              </ul>

              <p className="text-muted-foreground">
                We are not responsible for the practices, policies, or content of third-party services.
              </p>
            </CardContent>
          </Card>

          {/* Regulatory Considerations */}
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Prop trading regulations vary significantly by jurisdiction:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Geographic restrictions</strong> - Some prop firms may not accept traders from certain countries</li>
                <li><strong>Regulatory compliance</strong> - Ensure prop firms comply with your local regulations</li>
                <li><strong>Tax implications</strong> - Trading profits may be subject to taxation in your jurisdiction</li>
                <li><strong>Legal requirements</strong> - Some locations may require licenses for certain trading activities</li>
              </ul>

              <p className="text-muted-foreground">
                <strong>Always verify</strong> that prop trading is legal in your jurisdiction and consult with local tax and legal professionals.
              </p>
            </CardContent>
          </Card>

          {/* Performance Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Performance and Success Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Reality Check</p>
                <p className="text-amber-700 dark:text-amber-300 text-sm">
                  The majority of traders, including those in prop firms, lose money. Success requires significant skill, discipline, and often luck.
                </p>
              </div>

              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Success stories are not typical results</li>
                <li>Pass rates for prop firm challenges are generally low</li>
                <li>Maintaining profitability over time is challenging</li>
                <li>Market conditions can change rapidly</li>
                <li>Individual results will vary significantly</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                PropFirmMentor, its owners, employees, and affiliates shall not be held liable for any losses, damages, or adverse consequences arising from the use of our platform or reliance on the information provided. This includes, but is not limited to, trading losses, missed opportunities, or decisions based on our content.
              </p>
            </CardContent>
          </Card>

          {/* User Responsibility */}
          <Card>
            <CardHeader>
              <CardTitle>Your Responsibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                By using PropFirmMentor, you acknowledge and agree that:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You will conduct your own research and due diligence</li>
                <li>You understand the risks involved in trading</li>
                <li>You will not rely solely on our information for trading decisions</li>
                <li>You will verify all information independently</li>
                <li>You accept full responsibility for your trading outcomes</li>
                <li>You will seek professional advice when appropriate</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Questions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this disclaimer or our services, please contact us:
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">PropFirmMentor Support</p>
                <p className="text-muted-foreground">Email: support@propfirmmentor.com</p>
                <p className="text-muted-foreground text-sm mt-2">
                  This disclaimer was last updated in January 2025
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}