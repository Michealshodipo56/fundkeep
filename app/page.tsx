import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoinCenterpiece from "@/components/CoinCenterpiece";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import EcosystemStrip from "@/components/EcosystemStrip";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <CoinCenterpiece />
      <HowItWorks />
      <TrustSection />
      <EcosystemStrip />
      <Footer />
    </main>
  );
}
