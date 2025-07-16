import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your Complete
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Startup </span>
                Guidance Platform
              </h1>
            </div>
            
            <div className="animate-fade-in delay-200">
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl lg:max-w-none">
                Get reliable startup guidance, learn business fundamentals, and access essential tools 
                and templates — all designed specifically for Indian entrepreneurs.
              </p>
            </div>

            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="gradient" size="lg" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="animate-fade-in delay-600 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl lg:max-w-none">
              <div className="flex items-center justify-center lg:justify-start text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-accent mr-2" />
                Expert Guidance
              </div>
              <div className="flex items-center justify-center lg:justify-start text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-accent mr-2" />
                Ready Templates
              </div>
              <div className="flex items-center justify-center lg:justify-start text-muted-foreground">
                <CheckCircle className="h-5 w-5 text-accent mr-2" />
                Business Tools
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in delay-800">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Indian entrepreneurs working on startups"
                className="rounded-2xl shadow-elegant w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;