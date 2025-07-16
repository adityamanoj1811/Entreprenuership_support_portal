import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, FileText, Eye, Users, Star, Filter } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAccess, setSelectedAccess] = useState("all");

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "legal", label: "Legal & Compliance" },
    { id: "finance", label: "Finance & Accounting" },
    { id: "hr", label: "HR & Hiring" },
    { id: "marketing", label: "Marketing & Sales" },
    { id: "operations", label: "Operations" },
    { id: "pitch", label: "Pitch & Presentation" },
  ];

  const templates = [
    {
      id: 1,
      title: "Startup Business Plan Template",
      description: "Comprehensive business plan template tailored for Indian startups",
      category: "finance",
      type: "PDF",
      size: "2.3 MB",
      downloads: 4247,
      rating: 4.8,
      access: "free",
      thumbnail: "bg-gradient-to-r from-blue-500 to-purple-600",
      tags: ["Business Plan", "Strategy", "Financial Projections"],
      author: "StartupSaathi Team",
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      title: "Pitch Deck Template",
      description: "Professional pitch deck template for investor presentations",
      category: "pitch",
      type: "PPT",
      size: "8.7 MB",
      downloads: 3156,
      rating: 4.9,
      access: "premium",
      thumbnail: "bg-gradient-to-r from-pink-500 to-red-600",
      tags: ["Pitch Deck", "Investor", "Presentation"],
      author: "Rajesh Kumar",
      lastUpdated: "1 week ago"
    },
    {
      id: 3,
      title: "Employee Handbook Template",
      description: "Complete employee handbook with policies and procedures",
      category: "hr",
      type: "DOCX",
      size: "1.8 MB",
      downloads: 2134,
      rating: 4.7,
      access: "free",
      thumbnail: "bg-gradient-to-r from-green-500 to-teal-600",
      tags: ["HR", "Policies", "Employee"],
      author: "Anita Desai",
      lastUpdated: "3 days ago"
    },
    {
      id: 4,
      title: "NDA Template",
      description: "Non-disclosure agreement template for startups",
      category: "legal",
      type: "PDF",
      size: "486 KB",
      downloads: 5632,
      rating: 4.6,
      access: "free",
      thumbnail: "bg-gradient-to-r from-yellow-500 to-orange-600",
      tags: ["NDA", "Legal", "Confidentiality"],
      author: "Priya Sharma",
      lastUpdated: "5 days ago"
    },
    {
      id: 5,
      title: "ESOP Policy Template",
      description: "Employee stock option plan template for startups",
      category: "hr",
      type: "DOCX",
      size: "1.2 MB",
      downloads: 1876,
      rating: 4.8,
      access: "premium",
      thumbnail: "bg-gradient-to-r from-purple-500 to-indigo-600",
      tags: ["ESOP", "Equity", "Stock Options"],
      author: "Kavya Menon",
      lastUpdated: "1 day ago"
    },
    {
      id: 6,
      title: "Financial Model Template",
      description: "3-year financial model template with projections",
      category: "finance",
      type: "XLSX",
      size: "3.4 MB",
      downloads: 2945,
      rating: 4.9,
      access: "premium",
      thumbnail: "bg-gradient-to-r from-cyan-500 to-blue-600",
      tags: ["Financial Model", "Projections", "Excel"],
      author: "Suresh Patel",
      lastUpdated: "4 days ago"
    },
    {
      id: 7,
      title: "Marketing Strategy Template",
      description: "Go-to-market strategy template for startup launches",
      category: "marketing",
      type: "PDF",
      size: "1.9 MB",
      downloads: 3421,
      rating: 4.7,
      access: "free",
      thumbnail: "bg-gradient-to-r from-emerald-500 to-green-600",
      tags: ["Marketing", "Strategy", "GTM"],
      author: "Arjun Singh",
      lastUpdated: "6 days ago"
    },
    {
      id: 8,
      title: "Co-founder Agreement Template",
      description: "Comprehensive co-founder agreement template",
      category: "legal",
      type: "DOCX",
      size: "892 KB",
      downloads: 1654,
      rating: 4.8,
      access: "premium",
      thumbnail: "bg-gradient-to-r from-rose-500 to-pink-600",
      tags: ["Co-founder", "Agreement", "Legal"],
      author: "Priya Sharma",
      lastUpdated: "2 weeks ago"
    },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesAccess = selectedAccess === "all" || template.access === selectedAccess;
    
    return matchesSearch && matchesCategory && matchesAccess;
  });

  const getAccessBadge = (access: string) => {
    return access === "free" ? (
      <Badge className="bg-green-100 text-green-800">Free</Badge>
    ) : (
      <Badge className="bg-amber-100 text-amber-800">Premium</Badge>
    );
  };

  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-primary" />;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle font-inter">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-poppins font-bold text-foreground">StartupSaathi</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/templates" className="text-primary font-medium">
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

      {/* Page Header */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-poppins font-bold text-foreground mb-4">
              Templates &
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Toolkits</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready-to-use templates, documents, and tools to accelerate your startup journey
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10 bg-background border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedAccess} onValueChange={setSelectedAccess}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Access" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Access</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredTemplates.length} of {templates.length} templates
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-background">
                <div className={`h-32 rounded-t-lg ${template.thumbnail} flex items-center justify-center`}>
                  {getFileIcon(template.type)}
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    {getAccessBadge(template.access)}
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground">
                        {template.rating}
                      </span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-poppins font-semibold text-foreground group-hover:text-primary transition-colors">
                    {template.title}
                  </CardTitle>
                  
                  <CardDescription className="text-muted-foreground line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{template.type} • {template.size}</span>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {template.downloads.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      by {template.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {template.lastUpdated}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button variant="default" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">
                No templates found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or browse all templates
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Templates;