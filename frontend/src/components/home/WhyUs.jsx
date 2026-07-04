import { Sparkles, ShieldCheck, Clock } from "lucide-react";

const icons = [Sparkles, ShieldCheck, Clock];

export default function WhyUs({ data = {} }) {
  const { heading = "Why Businesses Choose Mistry Signage", points = [] } =
    data;

  return (
    <section className="bg-panel py-20">
      <div className="container-page">
        <p className="eyebrow mb-3">The Mistry Difference</p>
        <h2 className="font-display text-3xl text-paper sm:text-4xl max-w-xl">
          {heading}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {points.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={i}
                className="rounded-xl border border-ash/15 bg-ink p-7"
              >
                <Icon size={28} className="text-cyan" />
                <h3 className="mt-4 font-display text-lg text-paper">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {p.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
