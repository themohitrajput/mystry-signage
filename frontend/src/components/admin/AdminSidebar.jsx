import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Image, Layers, Inbox, FileText, KeyRound, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/projects', label: 'Projects', icon: Image },
  { to: '/admin/categories', label: 'Categories', icon: Layers },
  { to: '/admin/content', label: 'Site Content', icon: FileText },
  { to: '/admin/messages', label: 'Messages', icon: Inbox },
  { to: '/admin/change-password', label: 'Change Password', icon: KeyRound },
];

export default function AdminSidebar() {
  const { logout, admin } = useAuth();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-ash/15 bg-panel">
      <div className="border-b border-ash/15 px-6 py-6">
        <p className="font-display text-lg tube-underline text-amber text-glow-amber">MYSTRY</p>
        <p className="mt-1 text-xs text-ash">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-ink text-amber' : 'text-ash hover:bg-ink hover:text-paper'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-ash/15 px-4 py-4">
        <p className="truncate px-2 text-xs text-ash">{admin?.email}</p>
        <button
          onClick={logout}
          className="mt-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-ash hover:text-amber"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
