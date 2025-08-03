import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, FileText, Eye, Star } from "lucide-react";
import { useState } from "react";
import { useTemplates, useDownloadTemplate } from "@/hooks/useTemplates";
import Header from "@/components/Header";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAccess, setSelectedAccess] = useState("all");
  
  const { data: dbTemplates, isLoading } = useTemplates();
  const downloadTemplate = useDownloadTemplate();

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "legal", label: "Legal & Compliance" },
    { id: "finance", label: "Finance & Accounting" },
    { id: "business", label: "Business" },
  ];

  // Use real templates from database with proper formatting
  const templates = dbTemplates?.map(template => ({
    ...template,
    access: template.is_premium ? "premium" : "free",
    type: template.file_type || "PDF",
    size: "1.2 MB",
    rating: 4.7,
    thumbnail: "bg-gradient-to-r from-blue-500 to-purple-600",
    tags: [template.category || "General"],
    author: "StartupSaathi Team",
    lastUpdated: new Date(template.updated_at).toLocaleDateString(),
    downloads: template.download_count
  })) || [];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category?.toLowerCase() === selectedCategory;
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

  const handleDownload = (template: any) => {
    downloadTemplate.mutate(template);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle font-geist">
      <Header />

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
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(template)}
                      disabled={downloadTemplate.isPending}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      {downloadTemplate.isPending ? 'Downloading...' : 'Download'}
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