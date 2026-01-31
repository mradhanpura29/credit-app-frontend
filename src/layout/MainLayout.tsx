import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Users, UserCheck, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const allNavItems = [
    { to: '/dashboard/applicant', icon: Users, label: 'Dashboard', role: 'applicant' as const },
    { to: '/dashboard/approver', icon: UserCheck, label: 'Dashboard', role: 'approver' as const },
  ];

  // Filter navigation items based on user role
  const navItems = user 
    ? allNavItems.filter(item => item.role === user.role)
    : allNavItems;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-indigo-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Credit App</h1>
              <p className="text-xs text-indigo-200">Management Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-lg'
                    : 'text-indigo-100 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-indigo-600">
          {user && (
            <div className="mb-3 px-4 py-2 bg-white/10 rounded-lg">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-indigo-200">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4">
          <div className="max-w-7xl mx-auto px-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 Credit App. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
