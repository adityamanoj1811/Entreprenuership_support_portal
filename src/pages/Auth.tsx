import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash.includes('type=recovery')) {
      setRecoveryMode(true);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("user_id", user.id)
        .single();

      if (!error && data) setIsAdmin(data.is_admin);
    };
    fetchProfile();
  }, [user]);

  // Redirect if already authenticated
  if (user && !loading) {
    if (isAdmin === null) return null;
    return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(formData.email, formData.password);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(formData.email, formData.password, formData.fullName);
  };
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      // Handle authentication errors more precisely
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Login Failed",
            description: "Incorrect email or password. Please check your credentials.",
            variant: "destructive",
          });
        } else if (error.message.toLowerCase().includes("email")) {
          toast({
            title: "Invalid Email",
            description: "The provided email address is not registered.",
            variant: "destructive",
          });
        } else if (error.message.toLowerCase().includes("password")) {
          toast({
            title: "Wrong Password",
            description: "The password you entered is incorrect.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Error",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      // If sign-in succeeds, check admin status
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("user_id", data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.is_admin) {
        toast({ title: "Welcome, Admin!", description: "Redirecting to admin dashboard..." });
        setTimeout(() => {
          window.location.href = "/admin";
        }, 800);
      } else {
        await supabase.auth.signOut();
        toast({
          title: "Access Denied",
          description: "You are not authorized as an admin.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Admin login error:", err);
      toast({
        title: "Login Failed",
        description: err?.message || "Unexpected error. Please try again.",
        variant: "destructive",
      });
    }
  };


  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const email = resetEmail.trim();
      if (!email) {
        toast({ title: "Enter your email", variant: "destructive" });
        return;
      }
      const redirectTo = `${window.location.origin}/auth`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      toast({ title: "Reset link sent", description: "Check your email to continue." });
      setForgotOpen(false);
    } catch (err: any) {
      toast({ title: "Reset failed", description: err?.message || "Please try again.", variant: "destructive" });
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (newPassword.length < 6) {
        toast({ title: "Password too short", description: "Use at least 6 characters.", variant: "destructive" });
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast({ title: "Passwords do not match", variant: "destructive" });
        return;
      }
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: "Password updated", description: "You can now sign in with your new password." });
      setRecoveryMode(false);
      setNewPassword("");
      setConfirmNewPassword("");
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch (err: any) {
      toast({ title: "Update failed", description: err?.message || "Please try again.", variant: "destructive" });
    }
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    try {
      const redirectTo = `${window.location.origin}/`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo }
      });
      if (error) throw error;
    } catch (err: any) {
      toast({ title: "Sign-in failed", description: err?.message || "Please try again.", variant: "destructive" });
    }
  };

  const newsFeed = [
    { title: "RBI eases norms for startup foreign funding", tag: "Policy", url: "https://www.rbi.org.in/" },
    { title: "How Indian SaaS is scaling globally in 2025", tag: "SaaS", url: "https://saasboomi.com/" },
    { title: "ESOP trends: retention in lean times", tag: "HR", url: "https://inc42.com/" },
  ];

  const spotlight = [
    { title: "Pitch Deck Template", desc: "Investor-ready slides.", cta: "Explore", href: "/templates" },
    { title: "Financial Model", desc: "5-year projections.", cta: "Try Now", href: "/templates" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Auth Forms */}
        <div className="w-full max-w-lg mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Startup Saathi</h1>
            <p className="text-white/80">Your friendly startup mentor</p>
          </div>

          {recoveryMode && (
            <Card className="mb-6 backdrop-blur-lg bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-lg">Set a new password</CardTitle>
                <CardDescription className="text-white/70">Enter and confirm your new password below.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-white">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword" className="text-white">Confirm Password</Label>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button type="submit" className="w-full" variant="secondary">
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <Card className="backdrop-blur-lg bg-white/10 border-white/20">
            <CardHeader>
              <CardTitle className="text-center text-white">Get Started</CardTitle>
              <CardDescription className="text-center text-white/70">
                Join thousands of entrepreneurs building the future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <Button type="button" variant="outline" className="w-full" onClick={() => handleOAuth('google')}>
                  Continue with Google
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => handleOAuth('apple')}>
                  Continue with Apple
                </Button>
                <div className="text-center text-sm text-muted-foreground">or continue with email</div>
              </div>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>


                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setForgotOpen(true)}
                          className="text-xs text-white/80 hover:text-white underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" variant="secondary">
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                          required
                          minLength={6}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" variant="secondary">
                      Sign Up
                    </Button>
                  </form>
                </TabsContent>
                {/* Admin Login Tab */}
                <TabsContent value="admin">
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail" className="text-white">Admin Email</Label>
                      <Input
                        id="adminEmail"
                        name="email"
                        type="email"
                        placeholder="admin@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminPassword" className="text-white">Password</Label>
                      <div className="relative">
                        <Input
                          id="adminPassword"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 text-white/70 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" variant="secondary">
                      Admin Login
                    </Button>
                  </form>
                </TabsContent>

              </Tabs>
            </CardContent>
          </Card>

          <p className="text-center text-white/60 text-sm mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Right: Newsfeed & Ads */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="grid gap-6">
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-white">Latest for Founders</CardTitle>
                <CardDescription className="text-white/70">Stay inspired while you log in</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[260px] pr-2">
                  <div className="space-y-4">
                    {newsFeed.map((item, idx) => (
                      <a key={idx} href={item.url} target="_blank" rel="noreferrer" className="block group">
                        <div className="flex items-start gap-3 p-3 rounded-lg border border-white/10 group-hover:border-primary transition-colors">
                          <Badge variant="outline" className="shrink-0">{item.tag}</Badge>
                          <p className="text-white/90 group-hover:text-white">{item.title}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-lg bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Templates Spotlight</CardTitle>
                <CardDescription className="text-white/70">Accelerate your next milestone</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {spotlight.map((ad, i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5">
                      <h4 className="text-white font-semibold mb-1">{ad.title}</h4>
                      <p className="text-white/70 text-sm mb-3">{ad.desc}</p>
                      <Button asChild variant="secondary" size="sm" className="group">
                        <a href={ad.href}>
                          {ad.cta}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="backdrop-blur-lg bg-background/95">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter the email associated with your account. We'll send you a secure link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetRequest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resetEmail">Email</Label>
              <Input
                id="resetEmail"
                type="email"
                placeholder="you@example.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setForgotOpen(false)}>Cancel</Button>
              <Button type="submit">Send reset link</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;