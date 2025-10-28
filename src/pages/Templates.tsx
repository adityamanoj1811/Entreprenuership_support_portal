import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, FileText, Eye, Star, Heart } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import TemplatePreviewModal from "@/components/TemplatePreviewModal";
import { useStorageTemplates } from "../hooks/useStorageTemplates";

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAccess, setSelectedAccess] = useState("all");
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);

  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { files: uploadedFiles, loading: storageLoading } = useStorageTemplates();

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "Legal and Compliance", label: "Legal & Compliance" },
    { id: "Finance and Accounting", label: "Finance & Accounting" },
    { id: "Business", label: "Business" },
  ];


  // Format uploaded files
const uploadedFormatted =
  uploadedFiles?.map((file: any) => {
    const isPremium =
      file.is_premium === true ||
      file.is_premium === "true" ||
      file.access === "premium";

    return {
      id: file.id,
      title: file.title || file.name || `Untitled-${file.id}`,
      description: file.description || "Admin uploaded document",
      file_url: file.url || file.file_url || file.file_url_public || file.fileUrl,
      access: isPremium ? "premium" : "free",
      is_premium: isPremium,
      file_type: file.type || file.file_type || file.mime_type || "application/pdf",
      size: file.size || file.byte_size || 0,
      rating: file.rating || 0,
      category: file.category || file.meta?.category || "Business",
      tags: file.tags || [isPremium ? "Premium" : "Free"],
      author: file.author || "Admin Upload",
      lastUpdated: file.created_at || file.updated_at || file.createdAt || "",
      downloads: file.downloads || 0,
      thumbnail: file.thumbnail || "bg-gradient-to-r from-green-400 to-blue-500",
    };
  }) || [];



  const templates = uploadedFormatted;

  const normalize = (s?: string) =>
    (s || "").toString().trim().toLowerCase().replace(/\s+/g, " ");

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (template.description || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      normalize(template.category) === normalize(selectedCategory);

    const matchesAccess =
      selectedAccess === "all" || (template.access || "free") === selectedAccess;

    return matchesSearch && matchesCategory && matchesAccess;
  });


  const getAccessBadge = (templateOrAccess: any) => {
    const access = typeof templateOrAccess === "string" ? templateOrAccess : (templateOrAccess?.access || (templateOrAccess?.is_premium ? "premium" : "free"));
    return access === "free" ? (
      <Badge className="bg-green-100 text-green-800">Free</Badge>
    ) : (
      <Badge className="bg-amber-100 text-amber-800">Premium</Badge>
    );
  };


  const getFileIcon = (type: string) => {
    return <FileText className="h-5 w-5 text-primary" />;
  };

  const handleDownload = async (template: any) => {
    try {
      const response = await fetch(template.file_url);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${template.title}.${template.file_type?.split("/")[1] || "pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handlePreview = (template: any) => {
    setPreviewTemplate(template);
  };

  const handleWishlist = (template: any) => {
    toggleWishlist(template.id);
  };

  if (storageLoading) {
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
                    {categories.map((category) => (
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
              <Card
                key={template.id}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-background"
              >
                <div className={`h-32 rounded-t-lg ${template.thumbnail} flex items-center justify-center`}>
                  {getFileIcon(template.type)}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    {getAccessBadge(template.access)}
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(template);
                        }}
                        className="p-1 h-auto"
                      >
                        <Heart
                          className={`h-4 w-4 ${isInWishlist(template.id)
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground hover:text-red-500"
                            }`}
                        />
                      </Button>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground">{template.rating}</span>
                      </div>
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
                    <span>
                      {template.file_type || "application/pdf"} • {(template.size / 1024 / 1024).toFixed(2)} MB
                    </span>

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
                    <span className="text-sm text-muted-foreground">by {template.author}</span>
                    <span className="text-xs text-muted-foreground">{template.lastUpdated}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handlePreview(template)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button variant="default" size="sm" className="flex-1" onClick={() => handleDownload(template)}>
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

      <TemplatePreviewModal
        template={previewTemplate}
        isOpen={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default Templates;
