import { trustSignals } from "@/lib/site-content";
import WaveEdges from "@/components/WaveEdges";

export default function TrustBar() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-brand-navy via-brand-blue to-brand-navy text-background"
      aria-label="Compromissos da empresa"
    >
      <WaveEdges />
      <div className="relative z-10 mx-auto grid max-w-7xl py-8 sm:grid-cols-[1.18fr_0.82fr_1.05fr] sm:py-14">
        {trustSignals.map((signal, index) => (
          <div
            key={signal.title}
            className="water-row water-row--dark group relative grid min-h-32 grid-cols-[auto_1fr] items-center gap-5 border-b border-background/20 px-6 py-8 last:border-b-0 sm:min-h-40 sm:border-b-0 sm:border-r sm:px-8 sm:py-10 sm:last:border-r-0 lg:px-10"
          >
            <span className="text-4xl font-bold tracking-[-0.06em] text-brand-orange/80">0{index + 1}</span>
            <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-background/70">
              {signal.eyebrow}
            </p>
            <p className="mt-3 text-lg font-bold leading-7 text-background lg:text-xl">
              {signal.title}
            </p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
