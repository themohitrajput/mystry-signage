import { Menu } from 'lucide-react';

export default function AdminHeader({ title, onMenuClick }) {
  return (
    <header className="flex items-center justify-between border-b border-ash/15 bg-ink px-6 py-5">
      <div className="flex items-center gap-3">
        <button className="text-paper lg:hidden" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <h1 className="font-display text-xl text-paper">{title}</h1>
      </div>
    </header>
  );
}
