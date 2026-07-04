import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "/api").replace(
  /\/api\/?$/,
  "",
);
const resolveUrl = (url) =>
  url?.startsWith("http") ? url : `${API_ORIGIN}${url}`;

export default function Hero({ data = {} }) {
  const {
    heading = "Signage That Gets You Noticed",
    subheading = "Mistry Signage designs, fabricates, and installs custom signs, neon, and branding solutions that make your business impossible to miss.",
    buttonText = "View Our Work",
    buttonLink = "/portfolio",
    image,
  } = data;

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Ambient neon-glow blobs behind the hero content, the page's signature motif */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber/20 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyan/10 blur-[110px]" />

      <div className="container-page relative grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="eyebrow mb-5">Custom Signage Studio</p>
          <h1 className="font-display text-4xl leading-tight text-paper sm:text-5xl lg:text-6xl">
            {heading.split(" ").map((word, i) =>
              i === 0 ? (
                <span
                  key={i}
                  className="tube-underline text-amber text-glow-amber"
                >
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              ),
            )}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ash sm:text-lg">
            {subheading}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to={buttonLink} className="btn-primary">
              {buttonText} <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-outline">
              Talk to Us
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ash/15 bg-panel shadow-neonAmber">
            {image ? (
              <img
                src={resolveUrl(image)}
                alt="Featured signage project"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-display text-3xl text-amber/70 text-glow-amber">
                  Mistry SIGNAGE
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
