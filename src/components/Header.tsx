import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, BookOpen, Layers, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-foreground">StartupSaathi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link to="/courses" aria-label="Courses" className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-muted/10 transition-colors">
            <BookOpen className="h-5 w-5" />
            <span className="sr-only">Courses</span>
          </Link>
          <Link to="/templates" aria-label="Templates" className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-muted/10 transition-colors">
            <Layers className="h-5 w-5" />
            <span className="sr-only">Templates</span>
          </Link>
          {user && (
            <Link to="/dashboard" aria-label="Dashboard" className="p-2 rounded-md text-muted-foreground hover:text-accent hover:bg-muted/10 transition-colors">
              <LayoutDashboard className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button variant="premium" asChild>
                <Link to="/auth">Join Beta</Link>
              </Button>
            </>
          )}
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
            <Link to="/courses" className="block text-muted-foreground hover:text-foreground transition-colors">
              Courses
            </Link>
            <Link to="/templates" className="block text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            {user && (
              <Link to="/dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            )}
            <div className="pt-4 space-y-2">
              {user ? (
                <Button variant="destructive" className="w-full" onClick={signOut}>
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button variant="gradient" className="w-full" asChild>
                    <Link to="/auth">Join Beta</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;