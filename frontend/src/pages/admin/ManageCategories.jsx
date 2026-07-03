import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/common/Loader';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/categories', { params: { all: true } }).then((res) => setCategories(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category? This cannot be undone.')) return;
    try {
      await api.delete(`/categories/${id}`);
      toast.success('Category deleted');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'order', label: 'Order' },
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
          <Link to={`/admin/categories/${row._id}/edit`} className="text-cyan hover:underline">
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
        <p className="text-ash">{categories.length} categories</p>
        <Link to="/admin/categories/new" className="btn-primary !py-2.5 !px-5 text-sm">
          <Plus size={16} /> New Category
        </Link>
      </div>
      {loading ? <Loader label="Loading categories" /> : <DataTable columns={columns} rows={categories} />}
    </div>
  );
}
