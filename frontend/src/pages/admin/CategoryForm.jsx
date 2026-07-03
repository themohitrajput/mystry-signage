import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import api from '../../api/axios';
import ImageUploader from '../../components/common/ImageUploader';
import Loader from '../../components/common/Loader';

const emptyForm = { name: '', description: '', image: { url: '', alt: '' }, order: 0, isActive: true };

export default function CategoryForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api.get('/categories', { params: { all: true } }).then((res) => {
      const cat = res.data.data.find((c) => c._id === id);
      if (cat) setForm({ ...emptyForm, ...cat, image: cat.image || { url: '', alt: '' } });
      setLoading(false);
    });
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEdit) {
        await api.put(`/categories/${id}`, form);
        toast.success('Category updated');
      } else {
        await api.post('/categories', form);
        toast.success('Category created');
      }
      navigate('/admin/categories');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader label="Loading category" />;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="label-field">Category Name *</label>
        <input
          className="input-field"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="label-field">Description</label>
        <textarea
          rows={4}
          className="input-field resize-none"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
      </div>

      <ImageUploader
        label="Category Image"
        value={form.image?.url}
        onChange={(url) => setForm((f) => ({ ...f, image: { ...f.image, url } }))}
      />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="label-field">Display Order</label>
          <input
            type="number"
            className="input-field"
            value={form.order}
            onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
          />
        </div>
        <div className="flex items-end gap-2 pb-3">
          <input
            id="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
            className="h-4 w-4"
          />
          <label htmlFor="isActive" className="text-sm text-paper">Visible on website</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {isEdit ? 'Update Category' : 'Create Category'}
        </button>
        <button type="button" onClick={() => navigate('/admin/categories')} className="btn-outline">
          Cancel
        </button>
      </div>
    </form>
  );
}
