import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer({ content = {}, contact = {} }) {
  const year = new Date().getFullYear();
  const {
    siteName = "Mistry Signage",
    tagline,
    facebook,
    instagram,
    linkedin,
  } = content;

  return (
    <footer className="border-t border-ash/10 bg-panel">
      <div className="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-lg tube-underline text-amber text-glow-amber">
            {siteName.toUpperCase()}
          </p>
          {tagline && <p className="mt-3 text-sm text-ash">{tagline}</p>}
          <div className="mt-4 flex gap-4">
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-ash hover:text-cyan"
              >
                <Facebook size={18} />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-ash hover:text-cyan"
              >
                <Instagram size={18} />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-ash hover:text-cyan"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-ash">
            <li>
              <Link to="/about" className="hover:text-paper">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:text-paper">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-paper">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-paper">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Contact</p>
          <ul className="space-y-3 text-sm text-ash">
            {contact.address && (
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {contact.address}
              </li>
            )}
            {contact.phone && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0" />
                {contact.phone}
              </li>
            )}
            {contact.email && (
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0" />
                {contact.email}
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">Hours</p>
          <p className="text-sm text-ash">
            {contact.businessHours || "Mon - Sat: 10:00 AM - 7:00 PM"}
          </p>
          <Link
            to="/contact"
            className="btn-outline mt-4 !py-2.5 !px-5 text-sm"
          >
            Get a Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-ash/10 py-5 text-center text-xs text-ash">
        &copy; {year} {siteName}. All rights reserved.
      </div>
    </footer>
  );
}
