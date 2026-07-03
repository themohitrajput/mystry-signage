export default function StatsCard({ label, value, icon: Icon, accent = 'amber' }) {
  const glow = accent === 'amber' ? 'text-amber' : 'text-cyan';
  return (
    <div className="rounded-xl border border-ash/15 bg-panel p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ash">{label}</p>
        {Icon && <Icon size={20} className={glow} />}
      </div>
      <p className="mt-3 font-display text-3xl text-paper">{value}</p>
    </div>
  );
}
