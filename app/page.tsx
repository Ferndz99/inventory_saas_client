import FeaturesSection from "@/components/FeaturesSection";
import Hero from "@/components/Hero";
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
    </div>
  );
}
