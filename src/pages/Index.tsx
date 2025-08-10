import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, BookOpen, FileText, Users, TrendingUp, Download, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ChatWindow from "@/components/ChatWindow";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const handleAsk = () => {
    const q = searchQuery.trim();
    if (!q) return;
    setChatOpen(true);
  };

  const trendingTopics = [
    { 
      title: "How to register a startup in India?", 
      category: "Legal", 
      responses: 156,
      url: "https://www.startupindia.gov.in/content/sih/en/startup-scheme/startup-registration.html"
    },
    { 
      title: "Setting up ESOP for employees", 
      category: "HR", 
      responses: 89,
      url: "https://economictimes.indiatimes.com/small-biz/startups/newsbuzz/how-to-set-up-an-esop-plan-for-your-startup/articleshow/72900123.cms"
    },
    { 
      title: "Understanding GST for startups", 
      category: "Finance", 
      responses: 203,
      url: "https://www.gst.gov.in/help/helpmodules/registration"
    },
    { 
      title: "Raising seed funding", 
      category: "Funding", 
      responses: 134,
      url: "https://yourstory.com/2019/02/startup-fundraising-guide-seed-funding"
    },
    { 
      title: "Co-founder equity split", 
      category: "Legal", 
      responses: 78,
      url: "https://inc42.com/resources/startup-equity-distribution-among-co-founders/"
    },
  ];

  const quickActions = [
    { 
      icon: BookOpen, 
      title: "Explore Courses", 
      description: "Learn from structured courses",
      href: "/courses",
      color: "bg-primary/10 text-primary"
    },
    { 
      icon: FileText, 
      title: "Templates", 
      description: "Ready-to-use templates",
      href: "/templates",
      color: "bg-accent/10 text-accent"
    },
    { 
      icon: Users, 
      title: "Dashboard", 
      description: "Track your progress",
      href: "/dashboard",
      color: "bg-success/10 text-success"
    },
  ];

  const recentAnswers = [
    {
      question: "What are the key legal documents needed for incorporation?",
      answer: "For incorporating a startup in India, you need: 1) Memorandum of Association (MoA), 2) Articles of Association (AoA), 3) Digital Signature Certificate (DSC), 4) Director Identification Number (DIN)...",
      category: "Legal",
      downloads: ["Company_Registration_Checklist.pdf", "MoA_Template.docx"]
    },
    {
      question: "How to calculate equity distribution among co-founders?",
      answer: "Equity distribution depends on: 1) Contribution (idea, execution, funding), 2) Risk taken, 3) Future commitment, 4) Skills and expertise brought to the table...",
      category: "Equity",
      downloads: ["Equity_Calculator.xlsx", "Founder_Agreement_Template.pdf"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle font-inter">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-poppins font-bold text-foreground">StartupSaathi</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button variant="default" size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-foreground mb-6 leading-tight">
            What's confusing you
            <span className="bg-gradient-primary bg-clip-text text-transparent"> today</span>?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ask any startup question and get detailed, step-by-step guidance from experts who understand the Indian ecosystem.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="e.g., How do I register my startup in India?"
                className="pl-12 pr-4 py-6 text-lg bg-background border-2 border-border hover:border-primary focus:border-primary transition-colors shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAsk(); }}
              />
              <Button 
                variant="default" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10"
                onClick={handleAsk}
              >
                Ask Now
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-background/80 backdrop-blur">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-poppins font-semibold text-foreground">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Trending Questions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what other entrepreneurs are asking about
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingTopics.map((topic, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-background cursor-pointer"
                onClick={() => window.open(topic.url, '_blank')}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {topic.category}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {topic.responses}
                    </div>
                  </div>
                  <CardTitle className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Answers */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-foreground mb-4">
              Recent Expert Answers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from detailed responses to common startup questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {recentAnswers.map((answer, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-background">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {answer.category}
                    </Badge>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg font-poppins font-semibold text-foreground leading-tight">
                    {answer.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {answer.answer}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      Download Templates:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {answer.downloads.map((download, idx) => (
                        <Button key={idx} variant="outline" size="sm" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          {download}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="default" size="lg" className="group">
              View All Answers
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <ChatWindow open={chatOpen} onOpenChange={setChatOpen} initialQuery={searchQuery} />

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-poppins font-bold text-foreground">StartupSaathi</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted companion for startup guidance in India
              </p>
            </div>
            
            <div>
              <h3 className="font-poppins font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</Link></li>
                <li><Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">Templates</Link></li>
                <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-poppins font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-poppins font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="text-muted-foreground hover:text-foreground transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 StartupSaathi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;