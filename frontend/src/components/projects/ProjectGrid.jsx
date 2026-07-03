import ProjectCard from './ProjectCard';

export default function ProjectGrid({ projects = [], emptyMessage = 'No projects found.' }) {
  if (!projects.length) {
    return <p className="py-16 text-center text-ash">{emptyMessage}</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
}
