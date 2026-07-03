import { useEffect, useState } from 'react';
import api from '../api/axios';
import SEO from '../components/common/SEO';
import Loader from '../components/common/Loader';
import CategoryCard from '../components/categories/CategoryCard';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/categories')
      .then((res) => setCategories(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Project Categories" description="Browse Mystry Signage's project categories: neon signs, acrylic & LED boards, hoardings, vehicle branding and more." />
      <section className="bg-ink py-16">
        <div className="container-page">
          <p className="eyebrow mb-3">Browse by Type</p>
          <h1 className="font-display text-3xl text-paper sm:text-4xl">Project Categories</h1>

          <div className="mt-10">
            {loading ? (
              <Loader label="Loading categories" />
            ) : categories.length === 0 ? (
              <p className="py-16 text-center text-ash">No categories yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((c) => (
                  <CategoryCard key={c._id} category={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
