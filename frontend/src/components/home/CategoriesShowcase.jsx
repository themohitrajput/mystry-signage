import { Link } from 'react-router-dom';
import CategoryCard from '../categories/CategoryCard';

export default function CategoriesShowcase({ categories = [] }) {
  if (!categories.length) return null;

  return (
    <section className="bg-ink py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">What We Make</p>
            <h2 className="font-display text-3xl text-paper sm:text-4xl">Signage Categories</h2>
          </div>
          <Link to="/categories" className="text-sm font-semibold text-cyan hover:underline">
            View all categories &rarr;
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
