import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-accent fill-current" />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                Trusted by 10,000+ entrepreneurs
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Ready to Build Your
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Dream Startup</span>?
            </h2>
          </div>
          
          <div className="animate-fade-in delay-200">
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who started their journey with StartupSaathi. 
              Get instant access to all tools, templates, and guidance.
            </p>
          </div>

          <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="gradient" size="lg" className="group">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>

          <div className="animate-fade-in delay-600 text-sm text-muted-foreground">
            ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;