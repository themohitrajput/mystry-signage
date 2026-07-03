import { Link } from 'react-router-dom';
import ProjectCard from '../projects/ProjectCard';

export default function FeaturedProjects({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section className="bg-panel py-20">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Recent Work</p>
            <h2 className="font-display text-3xl text-paper sm:text-4xl">Featured Projects</h2>
          </div>
          <Link to="/portfolio" className="text-sm font-semibold text-cyan hover:underline">
            View full portfolio &rarr;
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
