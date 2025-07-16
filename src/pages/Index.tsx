import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Tools from "@/components/Tools";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Tools />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
