import ChileFocusSection from "@/components/landing/ChileFocusSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ChileFocusSection />
      <HowItWorks />
      <FinalCtaSection />
      <Footer />
    </div>
  );
}
