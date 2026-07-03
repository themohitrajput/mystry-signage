import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/common/SEO';
import Loader from '../components/common/Loader';
import ProjectGrid from '../components/projects/ProjectGrid';

export default function CategoryDetail() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/categories/${slug}`)
      .then((res) => setCategory(res.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader full label="Loading category" />;
  if (notFound || !category) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-ash">Category not found.</p>
        <Link to="/categories" className="btn-outline mt-6 inline-flex">Back to Categories</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={category.name} description={category.description} />
      <section className="bg-ink py-16">
        <div className="container-page">
          <Link to="/categories" className="inline-flex items-center gap-2 text-sm text-ash hover:text-cyan">
            <ArrowLeft size={16} /> Back to Categories
          </Link>
          <p className="eyebrow mb-3 mt-6">Category</p>
          <h1 className="font-display text-3xl text-paper sm:text-4xl">{category.name}</h1>
          {category.description && <p className="mt-4 max-w-2xl text-ash">{category.description}</p>}

          <div className="mt-10">
            <ProjectGrid projects={category.projects || []} emptyMessage="No projects in this category yet." />
          </div>
        </div>
      </section>
    </>
  );
}
