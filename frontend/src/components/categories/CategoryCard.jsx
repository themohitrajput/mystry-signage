import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const API_ORIGIN = (import.meta.env.VITE_API_URL || '/api').replace(/\/api\/?$/, '');
const resolveUrl = (url) => (url?.startsWith('http') ? url : `${API_ORIGIN}${url}`);

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-ash/15 bg-panel"
    >
      {category.image?.url ? (
        <img
          src={resolveUrl(category.image.url)}
          alt={category.image.alt || category.name}
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-90"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-panel to-ink" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-lg text-paper group-hover:text-cyan">{category.name}</h3>
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-ash group-hover:text-cyan">
          Explore <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
