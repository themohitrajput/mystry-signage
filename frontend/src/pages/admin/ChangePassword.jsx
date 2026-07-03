import { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import api from '../../api/axios';

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.currentPassword) e.currentPassword = 'Required';
    if (!form.newPassword || form.newPassword.length < 6) e.newPassword = 'Must be at least 6 characters';
    if (form.newPassword !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await api.put('/auth/change-password', form);
      toast.success('Password updated');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-sm space-y-5">
      <div>
        <label className="label-field">Current Password</label>
        <input type="password" className="input-field" value={form.currentPassword} onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))} />
        {errors.currentPassword && <p className="mt-1 text-sm text-amber">{errors.currentPassword}</p>}
      </div>
      <div>
        <label className="label-field">New Password</label>
        <input type="password" className="input-field" value={form.newPassword} onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))} />
        {errors.newPassword && <p className="mt-1 text-sm text-amber">{errors.newPassword}</p>}
      </div>
      <div>
        <label className="label-field">Confirm New Password</label>
        <input type="password" className="input-field" value={form.confirmPassword} onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))} />
        {errors.confirmPassword && <p className="mt-1 text-sm text-amber">{errors.confirmPassword}</p>}
      </div>
      <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
        {submitting && <Loader2 size={16} className="animate-spin" />}
        Update Password
      </button>
    </form>
  );
}
