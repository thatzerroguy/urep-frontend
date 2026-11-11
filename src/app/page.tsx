import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ActivePrograms from "@/components/ActivePrograms";
import Hero3 from "@/components/Hero3";
import FooterBar from "@/components/FooterBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ActivePrograms />
      <Hero3 />
      <FooterBar />
    </main>
  );
}
