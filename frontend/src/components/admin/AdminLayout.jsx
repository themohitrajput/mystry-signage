import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const titles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/projects': 'Manage Projects',
  '/admin/categories': 'Manage Categories',
  '/admin/content': 'Site Content',
  '/admin/messages': 'Messages',
  '/admin/change-password': 'Change Password',
};

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const title = titles[window.location.pathname] || 'Admin';

  return (
    <div className="flex min-h-screen bg-ink">
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <AdminSidebar />
          <button
            className="flex-1 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
        </div>
      )}

      <div className="flex-1">
        <AdminHeader title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
