// Simple, reusable loading spinner with an accessible label.
export default function Loader({ full = false, label = 'Loading' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={full ? 'flex min-h-[50vh] items-center justify-center' : 'flex items-center justify-center py-10'}
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-ash/30 border-t-amber" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
