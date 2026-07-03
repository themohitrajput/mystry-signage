import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Plus, X } from 'lucide-react';
import api from '../../api/axios';
import ImageUploader from '../../components/common/ImageUploader';
import Loader from '../../components/common/Loader';

// Generic CMS editor: lets the admin edit every text/image field for each
// site section (hero, why-us, about, contact, settings) without touching code.
const sections = [
  { key: 'home_hero', label: 'Home - Hero Section' },
  { key: 'home_why_us', label: 'Home - Why Choose Us' },
  { key: 'about_page', label: 'About Page' },
  { key: 'contact_info', label: 'Contact Details' },
  { key: 'site_settings', label: 'Site Settings (name, logo, social links)' },
];

export default function ManageContent() {
  const [active, setActive] = useState(sections[0].key);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/content/${active}`).then((res) => setData(res.data.data || {})).finally(() => setLoading(false));
  }, [active]);

  const update = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const handleSave = async () => {
    setSubmitting(true);
    try {
      await api.put(`/content/${active}`, data);
      toast.success('Content saved');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="lg:w-64 shrink-0">
        <div className="flex flex-col gap-1 rounded-xl border border-ash/15 bg-panel p-2">
          {sections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActive(s.key)}
              className={`rounded-md px-3 py-2.5 text-left text-sm ${
                active === s.key ? 'bg-ink text-amber' : 'text-ash hover:text-paper'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 rounded-xl border border-ash/15 bg-panel p-6">
        {loading ? (
          <Loader label="Loading section" />
        ) : (
          <>
            {active === 'home_hero' && <HeroEditor data={data} update={update} />}
            {active === 'home_why_us' && <WhyUsEditor data={data} setData={setData} />}
            {active === 'about_page' && <AboutEditor data={data} update={update} />}
            {active === 'contact_info' && <ContactEditor data={data} update={update} />}
            {active === 'site_settings' && <SettingsEditor data={data} update={update} />}

            <button onClick={handleSave} disabled={submitting} className="btn-primary mt-8 disabled:opacity-60">
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-5">
      <label className="label-field">{label}</label>
      {children}
    </div>
  );
}

function HeroEditor({ data, update }) {
  return (
    <div>
      <Field label="Heading">
        <input className="input-field" value={data.heading || ''} onChange={(e) => update('heading', e.target.value)} />
      </Field>
      <Field label="Subheading">
        <textarea rows={3} className="input-field resize-none" value={data.subheading || ''} onChange={(e) => update('subheading', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Button Text">
          <input className="input-field" value={data.buttonText || ''} onChange={(e) => update('buttonText', e.target.value)} />
        </Field>
        <Field label="Button Link">
          <input className="input-field" value={data.buttonLink || ''} onChange={(e) => update('buttonLink', e.target.value)} />
        </Field>
      </div>
      <ImageUploader label="Hero Image" value={data.image} onChange={(url) => update('image', url)} />
    </div>
  );
}

function WhyUsEditor({ data, setData }) {
  const points = data.points || [];
  const updatePoint = (idx, key, value) => {
    const next = [...points];
    next[idx] = { ...next[idx], [key]: value };
    setData((d) => ({ ...d, points: next }));
  };
  const addPoint = () => setData((d) => ({ ...d, points: [...(d.points || []), { title: '', text: '' }] }));
  const removePoint = (idx) => setData((d) => ({ ...d, points: points.filter((_, i) => i !== idx) }));

  return (
    <div>
      <Field label="Heading">
        <input className="input-field" value={data.heading || ''} onChange={(e) => setData((d) => ({ ...d, heading: e.target.value }))} />
      </Field>
      <p className="label-field">Points</p>
      {points.map((p, idx) => (
        <div key={idx} className="mb-3 rounded-md border border-ash/20 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-ash">Point {idx + 1}</span>
            <button type="button" onClick={() => removePoint(idx)} className="text-amber"><X size={14} /></button>
          </div>
          <input className="input-field mb-2" placeholder="Title" value={p.title} onChange={(e) => updatePoint(idx, 'title', e.target.value)} />
          <textarea rows={2} className="input-field resize-none" placeholder="Text" value={p.text} onChange={(e) => updatePoint(idx, 'text', e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addPoint} className="btn-outline !py-2 !px-4 text-sm">
        <Plus size={14} /> Add Point
      </button>
    </div>
  );
}

function AboutEditor({ data, update }) {
  return (
    <div>
      <Field label="Heading">
        <input className="input-field" value={data.heading || ''} onChange={(e) => update('heading', e.target.value)} />
      </Field>
      <Field label="Body">
        <textarea rows={5} className="input-field resize-none" value={data.body || ''} onChange={(e) => update('body', e.target.value)} />
      </Field>
      <Field label="Mission Statement">
        <textarea rows={2} className="input-field resize-none" value={data.mission || ''} onChange={(e) => update('mission', e.target.value)} />
      </Field>
      <ImageUploader label="About Image" value={data.image} onChange={(url) => update('image', url)} />
    </div>
  );
}

function ContactEditor({ data, update }) {
  return (
    <div>
      <Field label="Address">
        <input className="input-field" value={data.address || ''} onChange={(e) => update('address', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone">
          <input className="input-field" value={data.phone || ''} onChange={(e) => update('phone', e.target.value)} />
        </Field>
        <Field label="WhatsApp Number (digits only, with country code)">
          <input className="input-field" value={data.whatsapp || ''} onChange={(e) => update('whatsapp', e.target.value)} placeholder="919000000000" />
        </Field>
      </div>
      <Field label="Email">
        <input className="input-field" value={data.email || ''} onChange={(e) => update('email', e.target.value)} />
      </Field>
      <Field label="Business Hours">
        <input className="input-field" value={data.businessHours || ''} onChange={(e) => update('businessHours', e.target.value)} />
      </Field>
      <Field label="Google Maps Embed URL (optional)">
        <input className="input-field" value={data.mapEmbedUrl || ''} onChange={(e) => update('mapEmbedUrl', e.target.value)} />
      </Field>
    </div>
  );
}

function SettingsEditor({ data, update }) {
  return (
    <div>
      <Field label="Site Name">
        <input className="input-field" value={data.siteName || ''} onChange={(e) => update('siteName', e.target.value)} />
      </Field>
      <Field label="Tagline">
        <input className="input-field" value={data.tagline || ''} onChange={(e) => update('tagline', e.target.value)} />
      </Field>
      <ImageUploader label="Logo" value={data.logo} onChange={(url) => update('logo', url)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Facebook URL">
          <input className="input-field" value={data.facebook || ''} onChange={(e) => update('facebook', e.target.value)} />
        </Field>
        <Field label="Instagram URL">
          <input className="input-field" value={data.instagram || ''} onChange={(e) => update('instagram', e.target.value)} />
        </Field>
        <Field label="LinkedIn URL">
          <input className="input-field" value={data.linkedin || ''} onChange={(e) => update('linkedin', e.target.value)} />
        </Field>
      </div>
    </div>
  );
}
