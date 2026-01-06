import ChileFocusSection from "@/components/ChileFocusSection";
import FeaturesSection from "@/components/FeaturesSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ChileFocusSection/>
      <HowItWorks/>
      <FinalCtaSection/>
      <Footer/>
    </div>
  );
}
