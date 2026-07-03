import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import api from '../../api/axios';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/common/Loader';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/projects', { params: { all: true, limit: 1000 } }).then((res) => setProjects(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category', render: (row) => row.category?.name || '—' },
    {
      key: 'isFeatured',
      label: 'Featured',
      render: (row) => (row.isFeatured ? <Star size={16} className="text-amber" fill="currentColor" /> : '—'),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (
        <span className={`rounded-full px-2 py-0.5 text-xs ${row.isActive ? 'bg-cyan/20 text-cyan' : 'bg-ash/20 text-ash'}`}>
          {row.isActive ? 'Active' : 'Hidden'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-3">
          <Link to={`/admin/projects/${row._id}/edit`} className="text-cyan hover:underline">
            <Pencil size={16} />
          </Link>
          <button onClick={() => handleDelete(row._id)} className="text-amber hover:underline">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-ash">{projects.length} projects</p>
        <Link to="/admin/projects/new" className="btn-primary !py-2.5 !px-5 text-sm">
          <Plus size={16} /> New Project
        </Link>
      </div>
      {loading ? <Loader label="Loading projects" /> : <DataTable columns={columns} rows={projects} />}
    </div>
  );
}
