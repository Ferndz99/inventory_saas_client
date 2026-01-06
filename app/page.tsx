import Hero from "@/components/Hero";
import Navbar from "@/components/layout/Navbar";
import ProblemSection from "@/components/ProblemSection";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProblemSection />
    </div>
  );
}
