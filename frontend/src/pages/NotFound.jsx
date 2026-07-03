import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" />
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-ink px-6 text-center">
        <p className="font-display text-6xl text-amber text-glow-amber tube-underline">404</p>
        <h1 className="mt-6 font-display text-2xl text-paper">Page Not Found</h1>
        <p className="mt-3 max-w-md text-ash">The page you're looking for has been switched off or moved.</p>
        <Link to="/" className="btn-primary mt-8">Back to Home</Link>
      </section>
    </>
  );
}
