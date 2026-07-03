import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Layers, Inbox, Star } from 'lucide-react';
import api from '../../api/axios';
import StatsCard from '../../components/admin/StatsCard';
import Loader from '../../components/common/Loader';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [projectsRes, categoriesRes, messagesRes] = await Promise.all([
          api.get('/projects', { params: { all: true, limit: 1000 } }),
          api.get('/categories', { params: { all: true } }),
          api.get('/messages'),
        ]);
        const projects = projectsRes.data.data;
        setStats({
          totalProjects: projectsRes.data.total,
          featured: projects.filter((p) => p.isFeatured).length,
          categories: categoriesRes.data.count,
          unreadMessages: messagesRes.data.data.filter((m) => !m.isRead).length,
        });
        setRecentMessages(messagesRes.data.data.slice(0, 5));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader label="Loading dashboard" />;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Projects" value={stats.totalProjects} icon={Image} accent="amber" />
        <StatsCard label="Featured Projects" value={stats.featured} icon={Star} accent="cyan" />
        <StatsCard label="Categories" value={stats.categories} icon={Layers} accent="amber" />
        <StatsCard label="Unread Messages" value={stats.unreadMessages} icon={Inbox} accent="cyan" />
      </div>

      <div className="rounded-xl border border-ash/15 bg-panel p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-paper">Recent Enquiries</h2>
          <Link to="/admin/messages" className="text-sm text-cyan hover:underline">View all &rarr;</Link>
        </div>
        {recentMessages.length === 0 ? (
          <p className="mt-4 text-sm text-ash">No enquiries yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-ash/10">
            {recentMessages.map((m) => (
              <li key={m._id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-paper">{m.name} {!m.isRead && <span className="ml-2 rounded-full bg-amber px-2 py-0.5 text-[10px] text-ink">NEW</span>}</p>
                  <p className="text-ash">{m.email}</p>
                </div>
                <p className="text-ash">{new Date(m.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
