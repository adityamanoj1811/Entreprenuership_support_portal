import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Users, FileText, TrendingUp, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Expert Guidance",
      description: "Access comprehensive startup guides written by successful Indian entrepreneurs and industry experts.",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Business Planning",
      description: "Create detailed business plans with our step-by-step templates and planning tools.",
      color: "text-accent"
    },
    {
      icon: Users,
      title: "Mentor Network",
      description: "Connect with experienced mentors who understand the Indian startup ecosystem.",
      color: "text-primary"
    },
    {
      icon: FileText,
      title: "Legal Templates",
      description: "Access legally compliant templates for contracts, agreements, and compliance documents.",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      title: "Market Analysis",
      description: "Get insights into market trends, customer behavior, and competitive analysis tools.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Compliance Support",
      description: "Navigate Indian regulations with our comprehensive compliance guides and checklists.",
      color: "text-accent"
    }
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From ideation to execution, we provide all the tools and guidance you need to build a successful startup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-background to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;