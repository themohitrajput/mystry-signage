import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/common/SEO';
import Loader from '../components/common/Loader';
import ProjectGrid from '../components/projects/ProjectGrid';

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const activeCategory = searchParams.get('category') || '';

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (searchParams.get('search')) params.search = searchParams.get('search');
    api
      .get('/projects', { params })
      .then((res) => setProjects(res.data.data))
      .finally(() => setLoading(false));
  }, [activeCategory, searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    if (search) next.set('search', search);
    else next.delete('search');
    setSearchParams(next);
  };

  const setCategory = (slugOrId) => {
    const next = new URLSearchParams(searchParams);
    if (slugOrId) next.set('category', slugOrId);
    else next.delete('category');
    setSearchParams(next);
  };

  return (
    <>
      <SEO title="Portfolio" description="Explore our portfolio of custom signage, neon, LED and branding projects." />
      <section className="bg-ink py-16">
        <div className="container-page">
          <p className="eyebrow mb-3">Our Work</p>
          <h1 className="font-display text-3xl text-paper sm:text-4xl">Project Portfolio</h1>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory('')}
                className={`rounded-full border px-4 py-1.5 text-sm ${
                  !activeCategory ? 'border-amber text-amber' : 'border-ash/30 text-ash hover:text-paper'
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c._id}
                  onClick={() => setCategory(c._id)}
                  className={`rounded-full border px-4 py-1.5 text-sm ${
                    activeCategory === c._id ? 'border-amber text-amber' : 'border-ash/30 text-ash hover:text-paper'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="input-field !py-2 !w-56"
              />
              <button type="submit" className="rounded-md border border-ash/30 p-2.5 text-ash hover:border-cyan hover:text-cyan" aria-label="Search">
                <Search size={18} />
              </button>
            </form>
          </div>

          <div className="mt-10">
            {loading ? <Loader label="Loading projects" /> : <ProjectGrid projects={projects} />}
          </div>
        </div>
      </section>
    </>
  );
}
