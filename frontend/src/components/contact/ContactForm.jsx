import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, Loader2 } from 'lucide-react';
import api from '../../api/axios';

const initialState = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.phone && !/^[\d+\-\s()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.message.trim() || form.message.trim().length < 5) e.message = 'Message must be at least 5 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const { data } = await api.post('/messages', form);
      toast.success(data.message || 'Message sent successfully!');
      setForm(initialState);
      setErrors({});
    } catch (err) {
      if (err.response?.data?.errors) {
        const fieldErrors = {};
        err.response.data.errors.forEach((fe) => (fieldErrors[fe.field] = fe.message));
        setErrors(fieldErrors);
      }
      toast.error(err.message || 'Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label-field">Full Name *</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Your name" />
          {errors.name && <p className="mt-1 text-sm text-amber">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="label-field">Email *</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
          {errors.email && <p className="mt-1 text-sm text-amber">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="label-field">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+91 90000 00000" />
          {errors.phone && <p className="mt-1 text-sm text-amber">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="subject" className="label-field">Subject</label>
          <input id="subject" name="subject" value={form.subject} onChange={handleChange} className="input-field" placeholder="e.g. Neon sign for shop" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label-field">Message *</label>
        <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} className="input-field resize-none" placeholder="Tell us about your signage requirement..." />
        {errors.message && <p className="mt-1 text-sm text-amber">{errors.message}</p>}
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto disabled:opacity-60">
        {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
