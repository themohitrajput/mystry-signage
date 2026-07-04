import { useEffect, useState } from "react";
import api from "../api/axios";
import SEO from "../components/common/SEO";
import Loader from "../components/common/Loader";
import Hero from "../components/home/Hero";
import WhyUs from "../components/home/WhyUs";
import CategoriesShowcase from "../components/home/CategoriesShowcase";
import FeaturedProjects from "../components/home/FeaturedProjects";

export default function Home() {
  const [content, setContent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [contentRes, catRes, projRes] = await Promise.all([
          api.get("/content"),
          api.get("/categories"),
          api.get("/projects", { params: { featured: true, limit: 6 } }),
        ]);
        setContent(contentRes.data.data);
        setCategories(catRes.data.data);
        setProjects(projRes.data.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader full label="Loading homepage" />;

  return (
    <>
      <SEO
        title="Custom Signage, Neon Signs & Branding"
        description="Mistry Signage designs, fabricates and installs custom signboards, neon signs, LED displays, hoardings and vehicle branding."
      />
      <Hero data={content?.home_hero} />
      <FeaturedProjects projects={projects} />
      <CategoriesShowcase categories={categories} />
      <WhyUs data={content?.home_why_us} />
    </>
  );
}
