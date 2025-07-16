import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileText, BarChart3, CheckSquare, Download, ArrowRight } from "lucide-react";

const Tools = () => {
  const tools = [
    {
      icon: Calculator,
      title: "Financial Calculator",
      description: "Calculate startup costs, funding requirements, and financial projections.",
      downloadCount: "2.5K",
      category: "Finance"
    },
    {
      icon: FileText,
      title: "Business Plan Template",
      description: "Comprehensive business plan template tailored for Indian startups.",
      downloadCount: "4.2K",
      category: "Planning"
    },
    {
      icon: BarChart3,
      title: "Market Research Kit",
      description: "Tools and templates for conducting market research and analysis.",
      downloadCount: "1.8K",
      category: "Research"
    },
    {
      icon: CheckSquare,
      title: "Compliance Checklist",
      description: "Step-by-step compliance checklist for Indian business registration.",
      downloadCount: "3.1K",
      category: "Legal"
    }
  ];

  return (
    <section id="tools" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Essential
            <span className="bg-gradient-accent bg-clip-text text-transparent"> Tools & Templates</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready-to-use tools and templates that save you time and ensure you don't miss critical steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {tools.map((tool, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-card border-border/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {tool.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {tool.downloadCount} downloads
                  </span>
                  <Button variant="outline" size="sm" className="group">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="accent" size="lg" className="group">
            View All Tools
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Tools;