import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import api from '../../api/axios';

const API_ORIGIN = (import.meta.env.VITE_API_URL || '/api').replace(/\/api\/?$/, '');
const resolveUrl = (url) => (url?.startsWith('http') ? url : `${API_ORIGIN}${url}`);

// Wraps every public page with a shared Navbar/Footer/WhatsApp button,
// hydrated from the admin-editable site_settings and contact_info sections.
export default function PublicLayout() {
  const [settings, setSettings] = useState({});
  const [contact, setContact] = useState({});

  useEffect(() => {
    api.get('/content').then((res) => {
      setSettings(res.data.data.site_settings || {});
      setContact(res.data.data.contact_info || {});
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar siteName={settings.siteName} logo={settings.logo ? resolveUrl(settings.logo) : undefined} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer content={settings} contact={contact} />
      <WhatsAppButton number={contact.whatsapp} />
    </div>
  );
}
