import { Helmet } from 'react-helmet-async';

// Drop-in SEO component used on every page for consistent,
// admin-editable-friendly meta tags (title/description/OG).
export default function SEO({ title, description, image }) {
  const fullTitle = title ? `${title} | Mystry Signage` : 'Mystry Signage | Custom Signs, Neon & Branding';
  const desc =
    description ||
    'Mystry Signage designs, fabricates and installs custom signboards, neon signs, LED displays, hoardings and vehicle branding for businesses.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
