import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/common/SEO';
import Loader from '../components/common/Loader';

const API_ORIGIN = (import.meta.env.VITE_API_URL || '/api').replace(/\/api\/?$/, '');
const resolveUrl = (url) => (url?.startsWith('http') ? url : `${API_ORIGIN}${url}`);

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api
      .get(`/projects/${slug}`)
      .then((res) => setProject(res.data.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader full label="Loading project" />;
  if (notFound || !project) {
    return (
      <div className="container-page py-24 text-center">
        <p className="text-ash">Project not found.</p>
        <Link to="/portfolio" className="btn-outline mt-6 inline-flex">Back to Portfolio</Link>
      </div>
    );
  }

  const gallery = project.images?.length ? project.images : project.coverImage?.url ? [project.coverImage] : [];

  return (
    <>
      <SEO title={project.title} description={project.shortDescription} image={gallery[0] ? resolveUrl(gallery[0].url) : undefined} />
      <section className="bg-ink py-16">
        <div className="container-page">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-ash hover:text-cyan">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-ash/15 bg-panel">
                {gallery[activeImg] ? (
                  <img src={resolveUrl(gallery[activeImg].url)} alt={gallery[activeImg].alt || project.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-ash">No image</div>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 ${
                        idx === activeImg ? 'border-amber' : 'border-transparent'
                      }`}
                    >
                      <img src={resolveUrl(img.url)} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              {project.category?.name && <p className="eyebrow mb-3">{project.category.name}</p>}
              <h1 className="font-display text-3xl text-paper">{project.title}</h1>
              <div className="mt-6 space-y-3 text-sm text-ash">
                {project.client && (
                  <div className="flex items-center gap-2"><User size={16} /> {project.client}</div>
                )}
                {project.location && (
                  <div className="flex items-center gap-2"><MapPin size={16} /> {project.location}</div>
                )}
                {project.completionDate && (
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> {new Date(project.completionDate).toLocaleDateString()}
                  </div>
                )}
              </div>
              {project.description && (
                <p className="mt-6 whitespace-pre-line leading-relaxed text-ash">{project.description}</p>
              )}
              {project.tags?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="rounded-full border border-ash/30 px-3 py-1 font-mono text-xs text-ash">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
              <Link to="/contact" className="btn-primary mt-8 w-full">Enquire About a Similar Project</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
