import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import api from '../../api/axios';
import ImageUploader from '../../components/common/ImageUploader';
import Loader from '../../components/common/Loader';

const emptyForm = {
  title: '',
  category: '',
  client: '',
  location: '',
  shortDescription: '',
  description: '',
  coverImage: { url: '', alt: '' },
  images: [],
  tags: '',
  isFeatured: false,
  isActive: true,
  completionDate: '',
};

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get('/categories', { params: { all: true } }).then((res) => setCategories(res.data.data));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/projects/id/${id}`).then((res) => {
      const p = res.data.data;
      setForm({
        ...emptyForm,
        ...p,
        category: p.category?._id || p.category,
        tags: (p.tags || []).join(', '),
        completionDate: p.completionDate ? p.completionDate.slice(0, 10) : '',
        coverImage: p.coverImage || { url: '', alt: '' },
        images: p.images || [],
      });
      setLoading(false);
    });
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        completionDate: form.completionDate || undefined,
      };
      if (isEdit) {
        await api.put(`/projects/${id}`, payload);
        toast.success('Project updated');
      } else {
        await api.post('/projects', payload);
        toast.success('Project created');
      }
      navigate('/admin/projects');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader label="Loading project" />;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="label-field">Title *</label>
          <input className="input-field" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required />
        </div>
        <div>
          <label className="label-field">Category *</label>
          <select
            className="input-field"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            required
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-field">Client</label>
          <input className="input-field" value={form.client} onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))} />
        </div>
        <div>
          <label className="label-field">Location</label>
          <input className="input-field" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
        </div>
        <div>
          <label className="label-field">Completion Date</label>
          <input type="date" className="input-field" value={form.completionDate} onChange={(e) => setForm((f) => ({ ...f, completionDate: e.target.value }))} />
        </div>
        <div>
          <label className="label-field">Tags (comma separated)</label>
          <input className="input-field" value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="neon, storefront" />
        </div>
      </div>

      <div>
        <label className="label-field">Short Description (max 200 chars)</label>
        <input
          className="input-field"
          maxLength={200}
          value={form.shortDescription}
          onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
        />
      </div>

      <div>
        <label className="label-field">Full Description</label>
        <textarea
          rows={5}
          className="input-field resize-none"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
      </div>

      <ImageUploader
        label="Cover Image"
        value={form.coverImage?.url}
        onChange={(url) => setForm((f) => ({ ...f, coverImage: { ...f.coverImage, url } }))}
      />

      <ImageUploader
        label="Gallery Images"
        multiple
        value={form.images}
        onChange={(images) => setForm((f) => ({ ...f, images }))}
      />

      <div className="flex gap-8">
        <label className="flex items-center gap-2 text-sm text-paper">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
            className="h-4 w-4"
          />
          Featured on homepage
        </label>
        <label className="flex items-center gap-2 text-sm text-paper">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
            className="h-4 w-4"
          />
          Visible on website
        </label>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {isEdit ? 'Update Project' : 'Create Project'}
        </button>
        <button type="button" onClick={() => navigate('/admin/projects')} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
