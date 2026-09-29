import About from "@/components/About";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import FeaturedProject from "@/components/FeaturedProject";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Impact from "@/components/Impact";
import CommercialOptions from "@/components/Partnerships";
import Problem from "@/components/Problem";
import Process from "@/components/Process";
import Solutions from "@/components/Solutions";
import TrustBar from "@/components/TrustBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#conteudo"
        className="sr-only z-[100] rounded-lg bg-brand-blue px-4 py-3 font-bold text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Problem />
        <TrustBar />
        <Solutions />
        <FeaturedProject />
        <Impact />
        <Process />
        <CommercialOptions />
        <Faq />
        <Contact />
      </main>
    </div>
  );
}
