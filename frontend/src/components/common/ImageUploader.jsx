import { useRef, useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const API_ORIGIN = (import.meta.env.VITE_API_URL || '/api').replace(/\/api\/?$/, '');

const resolveUrl = (url) => (url?.startsWith('http') ? url : `${API_ORIGIN}${url}`);

/**
 * Reusable image uploader used across the admin CMS (projects, categories,
 * hero images, logo, etc). Supports single or multiple mode.
 *
 * Props:
 *  - value: string url (single) or array of {url, alt} (multiple)
 *  - onChange: (newValue) => void
 *  - multiple: boolean
 */
export default function ImageUploader({ value, onChange, multiple = false, label = 'Image' }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      if (multiple) {
        const formData = new FormData();
        Array.from(files).forEach((f) => formData.append('images', f));
        const { data } = await api.post('/upload/multiple', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const newImages = data.data.map((d) => ({ url: d.url, alt: '' }));
        onChange([...(value || []), ...newImages]);
      } else {
        const formData = new FormData();
        formData.append('image', files[0]);
        const { data } = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onChange(data.data.url);
      }
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const removeAt = (idx) => {
    const next = [...value];
    next.splice(idx, 1);
    onChange(next);
  };

  return (
    <div>
      <label className="label-field">{label}</label>

      {!multiple && value && (
        <div className="relative mb-3 inline-block">
          <img src={resolveUrl(value)} alt="" className="h-32 w-32 rounded-md object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -right-2 -top-2 rounded-full bg-ink p-1 text-paper shadow"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {multiple && value?.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {value.map((img, idx) => (
            <div key={idx} className="relative">
              <img src={resolveUrl(img.url)} alt="" className="h-24 w-24 rounded-md object-cover" />
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="absolute -right-2 -top-2 rounded-full bg-ink p-1 text-paper shadow"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 rounded-md border border-dashed border-ash/40 px-4 py-3 text-sm text-ash hover:border-amber hover:text-amber disabled:opacity-60"
      >
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? 'Uploading...' : multiple ? 'Upload image(s)' : 'Upload image'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        multiple={multiple}
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
