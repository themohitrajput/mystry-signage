import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import api from '../../api/axios';
import Loader from '../../components/common/Loader';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/messages').then((res) => setMessages(res.data.data)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleRead = async (m) => {
    try {
      await api.put(`/messages/${m._id}`, { isRead: !m.isRead });
      setMessages((prev) => prev.map((x) => (x._id === m._id ? { ...x, isRead: !x.isRead } : x)));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/messages/${id}`);
      toast.success('Message deleted');
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Loader label="Loading messages" />;
  if (messages.length === 0) return <p className="py-16 text-center text-ash">No enquiries yet.</p>;

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div
          key={m._id}
          className={`rounded-xl border p-5 ${m.isRead ? 'border-ash/15 bg-panel' : 'border-amber/40 bg-panel'}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-display text-base text-paper">
                {m.name} {!m.isRead && <span className="ml-2 rounded-full bg-amber px-2 py-0.5 text-[10px] text-ink">NEW</span>}
              </p>
              <p className="mt-1 text-sm text-ash">{m.email} {m.phone && `· ${m.phone}`}</p>
              {m.subject && <p className="mt-1 text-sm font-medium text-cyan">{m.subject}</p>}
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => toggleRead(m)} className="text-ash hover:text-cyan" title={m.isRead ? 'Mark unread' : 'Mark read'}>
                {m.isRead ? <MailOpen size={18} /> : <Mail size={18} />}
              </button>
              <button onClick={() => handleDelete(m._id)} className="text-ash hover:text-amber" title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          <p className="mt-3 whitespace-pre-line text-sm text-paper">{m.message}</p>
          <p className="mt-3 text-xs text-ash">{new Date(m.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
