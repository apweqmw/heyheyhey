import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, Shield, Users, Gavel } from "lucide-react";

export default function Terms() {
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();

  useEffect(() => {
    setSEO({
      title: "Terms of Service - PropFirmMentor",
      description: "Read PropFirmMentor's Terms of Service. Understand your rights and responsibilities when using our prop trading firm comparison platform.",
      keywords: ["terms of service", "user agreement", "prop trading", "legal terms", "PropFirmMentor", "terms and conditions"]
    });
  }, [setSEO]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Scale className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using PropFirmMentor ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms of Service, please do not use this service.
              </p>
            </CardContent>
          </Card>

          {/* Description of Service */}
          <Card>
            <CardHeader>
              <CardTitle>Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                PropFirmMentor provides a platform for comparing proprietary trading firms, including:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Comprehensive comparison tools for prop trading firms</li>
                <li>Real-time pricing and promotional information</li>
                <li>Authentic reviews and ratings from Trustpilot</li>
                <li>Educational guides and trading resources</li>
                <li>Industry news and updates</li>
                <li>Affiliate links to trading firms</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                As a user of our service, you agree to:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the service for lawful purposes only</li>
                <li>Provide accurate information when required</li>
                <li>Respect intellectual property rights</li>
                <li>Not attempt to harm or disrupt the service</li>
                <li>Not engage in fraudulent activities</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Take responsibility for your trading decisions</li>
              </ul>
            </CardContent>
          </Card>

          {/* Affiliate Relationships */}
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Relationships & Compensation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-800 dark:text-amber-200 mb-2">Important Disclosure</p>
                    <p className="text-amber-700 dark:text-amber-300 text-sm">
                      PropFirmMentor may receive compensation when you click on certain links or sign up for services through our platform.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">
                We maintain affiliate relationships with various prop trading firms. This means we may earn a commission when you:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Sign up for a prop firm account through our links</li>
                <li>Purchase a trading challenge</li>
                <li>Use promotional codes provided on our platform</li>
              </ul>

              <p className="text-muted-foreground">
                These relationships do not affect our editorial independence. We strive to provide objective and accurate information regardless of affiliate status.
              </p>
            </CardContent>
          </Card>

          {/* Information Accuracy */}
          <Card>
            <CardHeader>
              <CardTitle>Information Accuracy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We make every effort to ensure the accuracy of information on our platform, including:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Real-time pricing data from prop firms</li>
                <li>Current promotional offers and discounts</li>
                <li>Authentic reviews from Trustpilot</li>
                <li>Trading rules and requirements</li>
              </ul>

              <p className="text-muted-foreground">
                However, information may change without notice. We recommend verifying all details directly with the prop firm before making any financial commitments.
              </p>
            </CardContent>
          </Card>

          {/* Investment Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Investment and Trading Risks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <p className="font-semibold text-red-800 dark:text-red-200 mb-2">Risk Warning</p>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  Trading carries substantial risk and may not be suitable for all investors. You may lose some or all of your invested capital.
                </p>
              </div>

              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>PropFirmMentor is not a financial advisor or investment service</li>
                <li>We do not provide investment advice or recommendations</li>
                <li>All trading decisions are your own responsibility</li>
                <li>Past performance does not guarantee future results</li>
                <li>Consider your financial situation before trading</li>
                <li>Seek independent financial advice if needed</li>
              </ul>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                PropFirmMentor and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use of the service, including but not limited to trading losses, lost profits, or business interruption. Our maximum liability is limited to the amount you paid for using our service (if any).
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle>Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                All content on PropFirmMentor, including but not limited to text, graphics, logos, images, and software, is owned by us or our licensors and is protected by copyright and other intellectual property laws.
              </p>
              
              <p className="text-muted-foreground">
                You may not reproduce, distribute, or create derivative works from our content without express written permission.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your personal information.
              </p>
            </CardContent>
          </Card>

          {/* Modifications */}
          <Card>
            <CardHeader>
              <CardTitle>Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of the service after changes are posted constitutes acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason, including if you breach the Terms of Service.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-primary" />
                Governing Law
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                These Terms of Service shall be governed and construed in accordance with the laws of the jurisdiction where PropFirmMentor operates, without regard to its conflict of law provisions.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">PropFirmMentor Legal Team</p>
                <p className="text-muted-foreground">Email: legal@propfirmmentor.com</p>
                <p className="text-muted-foreground">Response time: Within 7 business days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}