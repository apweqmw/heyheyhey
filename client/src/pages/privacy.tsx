import { useI18n } from "@/lib/i18n";
import { useSEO } from "@/lib/seo";
import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Lock, FileText, Mail, Calendar } from "lucide-react";

export default function Privacy() {
  const { locale, t } = useI18n();
  const { setSEO } = useSEO();

  useEffect(() => {
    setSEO({
      title: "Privacy Policy - PropFirmMentor",
      description: "Learn how PropFirmMentor collects, uses, and protects your personal information. Our comprehensive privacy policy ensures transparency and data protection.",
      keywords: ["privacy policy", "data protection", "prop trading", "personal information", "cookies", "PropFirmMentor"]
    });
  }, [setSEO]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Shield className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                At PropFirmMentor, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Email address (when subscribing to newsletters)</li>
                  <li>Name and contact information (when provided voluntarily)</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Usage Information</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Referral sources</li>
                  <li>Device information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Cookies and Tracking</h3>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to enhance your experience, analyze site usage, and provide personalized content. You can control cookie settings through your browser preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To provide and maintain our services</li>
                <li>To send newsletters and updates (with your consent)</li>
                <li>To analyze website usage and improve our platform</li>
                <li>To communicate with you about our services</li>
                <li>To detect and prevent fraud or abuse</li>
                <li>To comply with legal obligations</li>
                <li>To provide customer support</li>
              </ul>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card>
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Service Providers:</strong> With trusted third-party services that help us operate our website (analytics, email services, hosting)</li>
                <li><strong>Legal Compliance:</strong> When required by law or to protect our rights and safety</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Analytics</h3>
                <p className="text-muted-foreground">
                  We use Google Analytics to understand how visitors use our site. Google Analytics collects information anonymously and reports website trends.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Trustpilot Integration</h3>
                <p className="text-muted-foreground">
                  We display authentic reviews from Trustpilot. When you click on Trustpilot links, you're subject to Trustpilot's privacy policy.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Affiliate Links</h3>
                <p className="text-muted-foreground">
                  Our site contains affiliate links to prop trading firms. When you click these links, the destination site may collect your information according to their privacy policies.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.
              </p>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card>
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your personal data</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
                <li>Right to opt-out of marketing communications</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">PropFirmMentor Privacy Team</p>
                <p className="text-muted-foreground">Email: privacy@propfirmmentor.com</p>
                <p className="text-muted-foreground">Response time: Within 30 days</p>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}