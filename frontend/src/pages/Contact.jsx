import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import api from '../api/axios';
import SEO from '../components/common/SEO';
import ContactForm from '../components/contact/ContactForm';

export default function Contact() {
  const [contact, setContact] = useState({});

  useEffect(() => {
    api.get('/content/contact_info').then((res) => setContact(res.data.data || {}));
  }, []);

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with Mystry Signage for custom signage, neon signs, and branding solutions." />
      <section className="bg-ink py-16">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="eyebrow mb-3">Get In Touch</p>
            <h1 className="font-display text-3xl text-paper sm:text-4xl">
              <span className="tube-underline text-cyan text-glow-cyan">Let's Build</span> Your Sign
            </h1>
            <p className="mt-5 text-ash">
              Tell us about your project and we'll get back to you with ideas, pricing, and timelines.
            </p>

            <div className="mt-8 space-y-4">
              {contact.address && (
                <div className="flex items-start gap-3 text-sm text-ash">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-amber" /> {contact.address}
                </div>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-ash hover:text-paper">
                  <Phone size={18} className="shrink-0 text-amber" /> {contact.phone}
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-ash hover:text-paper">
                  <Mail size={18} className="shrink-0 text-amber" /> {contact.email}
                </a>
              )}
              {contact.businessHours && (
                <div className="flex items-center gap-3 text-sm text-ash">
                  <Clock size={18} className="shrink-0 text-amber" /> {contact.businessHours}
                </div>
              )}
            </div>

            {contact.mapEmbedUrl && (
              <div className="mt-8 aspect-video overflow-hidden rounded-xl border border-ash/15">
                <iframe title="Location map" src={contact.mapEmbedUrl} className="h-full w-full" loading="lazy" />
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-ash/15 bg-panel p-6 sm:p-8 lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
