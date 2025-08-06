import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle font-inter">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-poppins font-bold text-foreground">StartupSaathi</span>
          </Link>
          
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  By accessing and using StartupSaathi ("the Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  StartupSaathi is an online platform providing:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Educational courses for entrepreneurs and startup founders</li>
                  <li>Business templates and resources</li>
                  <li>Expert guidance and consultation services</li>
                  <li>Community forums and networking opportunities</li>
                  <li>Tools and resources for startup development</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Registration and Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Account Creation</h4>
                  <p className="text-muted-foreground">
                    You must create an account to access certain features of our service. You are responsible for 
                    maintaining the confidentiality of your account credentials.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Eligibility</h4>
                  <p className="text-muted-foreground">
                    You must be at least 18 years old to create an account and use our services. By creating an account, 
                    you represent that you meet this age requirement.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Account Responsibility</h4>
                  <p className="text-muted-foreground">
                    You are solely responsible for all activities that occur under your account. You must notify us 
                    immediately of any unauthorized use of your account.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Acceptable Use Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Use the service for any unlawful purpose or to solicit unlawful activity</li>
                  <li>Attempt to gain unauthorized access to other computer systems</li>
                  <li>Impersonate another person or entity</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Post spam, chain letters, or other unsolicited communications</li>
                  <li>Upload viruses or other malicious code</li>
                  <li>Collect or harvest any personal data from other users</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Intellectual Property Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Our Content</h4>
                  <p className="text-muted-foreground">
                    All content, features, and functionality of the service are owned by StartupSaathi and are protected 
                    by international copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">User Content</h4>
                  <p className="text-muted-foreground">
                    You retain ownership of content you submit to the service. However, by submitting content, you grant 
                    us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute such content.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Payment and Refund Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Payment Terms</h4>
                  <p className="text-muted-foreground">
                    Some features of our service require payment. All fees are in Indian Rupees (INR) unless otherwise specified. 
                    Payment is due immediately upon purchase.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Refund Policy</h4>
                  <p className="text-muted-foreground">
                    We offer a 30-day money-back guarantee for our courses. Refund requests must be submitted within 30 days 
                    of purchase and meet our refund criteria.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  In no event shall StartupSaathi be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
                  resulting from your use of the service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We reserve the right to terminate or suspend your account and access to the service at our sole discretion, 
                  without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, 
                  us, or third parties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes 
                  via email or through the service. Your continued use of the service after such modifications constitutes 
                  acceptance of the updated terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <div className="mt-4 space-y-1">
                  <p className="font-semibold">Email: legal@startupsaathi.com</p>
                  <p className="font-semibold">Address: Bangalore, Karnataka, India</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;