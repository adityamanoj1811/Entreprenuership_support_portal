import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
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
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">
              Last updated: January 2024
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What Are Cookies?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                  They help us provide you with a better experience by remembering your preferences and understanding how 
                  you use our platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">Essential Cookies</h4>
                      <Badge variant="secondary">Required</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      These cookies are necessary for the website to function properly. They enable basic functions like 
                      page navigation, access to secure areas, and authentication. The website cannot function properly 
                      without these cookies.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">Analytics Cookies</h4>
                      <Badge variant="outline">Optional</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      These cookies help us understand how visitors interact with our website by collecting and reporting 
                      information anonymously. We use this data to improve our platform and user experience.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">Functional Cookies</h4>
                      <Badge variant="outline">Optional</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences, 
                      language settings, and providing personalized content.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">Performance Cookies</h4>
                      <Badge variant="outline">Optional</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      These cookies collect information about how you use our website, such as which pages you visit most often 
                      and if you get error messages. This helps us improve the performance of our platform.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may use third-party services that set cookies on our website. These include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><strong>Google Analytics:</strong> For website analytics and user behavior tracking</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing (Stripe, Razorpay)</li>
                  <li><strong>Video Hosting:</strong> For course video delivery and streaming</li>
                  <li><strong>Authentication Services:</strong> For secure user login and session management</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">We use cookies to:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Keep you signed in to your account</li>
                  <li>Remember your preferences and settings</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Track your course progress and achievements</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Improve our platform performance and security</li>
                  <li>Prevent fraud and enhance security</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Managing Your Cookie Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Browser Settings</h4>
                  <p className="text-muted-foreground">
                    Most web browsers allow you to control cookies through their settings. You can choose to accept all cookies, 
                    reject all cookies, or be notified when a cookie is set.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cookie Consent</h4>
                  <p className="text-muted-foreground">
                    When you first visit our website, you will see a cookie consent banner. You can choose which types of 
                    cookies to accept. You can change your preferences at any time by clicking the "Cookie Settings" link 
                    in our website footer.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Disabling Cookies</h4>
                  <p className="text-muted-foreground">
                    Please note that disabling essential cookies may affect the functionality of our website. Some features 
                    may not work properly if you choose to reject all cookies.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookie Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Session Cookies</h4>
                  <p className="text-muted-foreground">
                    These cookies are temporary and are deleted when you close your browser.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Persistent Cookies</h4>
                  <p className="text-muted-foreground">
                    These cookies remain on your device for a specified period or until you delete them. Most of our 
                    persistent cookies expire within 1-2 years.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Updates to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our 
                  business practices. We will notify you of any significant changes by posting the updated policy on our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  If you have any questions about our use of cookies, please contact us at:
                </p>
                <div className="mt-4 space-y-1">
                  <p className="font-semibold">Email: cookies@startupsaathi.com</p>
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

export default CookiePolicy;