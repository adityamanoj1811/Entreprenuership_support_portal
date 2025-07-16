import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-foreground">StartupSaathi</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#tools" className="text-muted-foreground hover:text-foreground transition-colors">
            Tools
          </a>
          <a href="#guidance" className="text-muted-foreground hover:text-foreground transition-colors">
            Guidance
          </a>
          <a href="#resources" className="text-muted-foreground hover:text-foreground transition-colors">
            Resources
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost">Sign In</Button>
          <Button variant="gradient">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container py-4 space-y-4">
            <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#tools" className="block text-muted-foreground hover:text-foreground transition-colors">
              Tools
            </a>
            <a href="#guidance" className="block text-muted-foreground hover:text-foreground transition-colors">
              Guidance
            </a>
            <a href="#resources" className="block text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full">Sign In</Button>
              <Button variant="gradient" className="w-full">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;