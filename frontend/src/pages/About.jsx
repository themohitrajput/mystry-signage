import { useEffect, useState } from "react";
import api from "../api/axios";
import SEO from "../components/common/SEO";
import Loader from "../components/common/Loader";

const API_ORIGIN = (import.meta.env.VITE_API_URL || "/api").replace(
  /\/api\/?$/,
  "",
);
const resolveUrl = (url) =>
  url?.startsWith("http") ? url : `${API_ORIGIN}${url}`;

export default function About() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/content/about_page");
        setData(res.data.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader full label="Loading about page" />;

  const { heading = "About Mistry Signage", body, mission, image } = data || {};

  return (
    <>
      <SEO title="About Us" description={mission || body} />
      <section className="bg-ink py-20">
        <div className="container-page grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Our Story</p>
            <h1 className="font-display text-3xl text-paper sm:text-4xl">
              <span className="tube-underline text-amber text-glow-amber">
                {heading}
              </span>
            </h1>
            {body && (
              <p className="mt-6 whitespace-pre-line leading-relaxed text-ash">
                {body}
              </p>
            )}
            {mission && (
              <div className="mt-8 rounded-xl border border-ash/15 bg-panel p-6">
                <p className="eyebrow mb-2">Our Mission</p>
                <p className="text-paper">{mission}</p>
              </div>
            )}
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-ash/15 bg-panel">
            {image ? (
              <img
                src={resolveUrl(image)}
                alt="Mistry Signage team at work"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-ash">
                Add a photo from the admin dashboard
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
