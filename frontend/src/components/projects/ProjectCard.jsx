import { Link } from 'react-router-dom';

const API_ORIGIN = (import.meta.env.VITE_API_URL || '/api').replace(/\/api\/?$/, '');
const resolveUrl = (url) => (url?.startsWith('http') ? url : `${API_ORIGIN}${url}`);

export default function ProjectCard({ project }) {
  const cover = project.coverImage?.url || project.images?.[0]?.url;

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-ash/15 bg-ink transition-shadow hover:shadow-neonCyan"
    >
      <div className="aspect-[4/3] overflow-hidden bg-panel">
        {cover ? (
          <img
            src={resolveUrl(cover)}
            alt={project.coverImage?.alt || project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ash">No image</div>
        )}
      </div>
      <div className="p-5">
        {project.category?.name && <p className="eyebrow mb-2">{project.category.name}</p>}
        <h3 className="font-display text-lg text-paper group-hover:text-amber">{project.title}</h3>
        {project.shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm text-ash">{project.shortDescription}</p>
        )}
      </div>
    </Link>
  );
}
