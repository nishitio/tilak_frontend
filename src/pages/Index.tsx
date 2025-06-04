
import Hero from "@/components/Hero";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Heritage from "@/components/Heritage";
import Products from "@/components/Products";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Benefits />
      <Heritage />
      <Products />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
