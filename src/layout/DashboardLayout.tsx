import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  UserCog,
  User,
  PlusCircle
} from 'lucide-react';

export default function DashboardLayout() {
  const { user, logout, isApprover } = useAuth();
  const location = useLocation();

  const approverLinks = [
    { path: '/dashboard/approver', label: 'Overview', icon: LayoutDashboard },
    { path: '/dashboard/approver/applications', label: 'All Applications', icon: FileText },
    { path: '/dashboard/approver/reports', label: 'Reports', icon: BarChart3 },
    { path: '/dashboard/approver/settings', label: 'Settings', icon: Settings },
  ];

  const applicantLinks = [
    { path: '/dashboard/applicant', label: 'My Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/applicant/applications', label: 'My Applications', icon: FileText },
    { path: '/dashboard/applicant/new', label: 'New Application', icon: PlusCircle },
    { path: '/dashboard/applicant/settings', label: 'Settings', icon: Settings },
  ];

  const links = isApprover ? approverLinks : applicantLinks;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex w-full">
      {/* Sidebar */}
      <aside className="bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            {isApprover ? (
              <UserCog className="w-6 h-6 text-blue-400" />
            ) : (
              <User className="w-6 h-6 text-blue-400" />
            )}
            <div>
              <h2 className="text-xl font-bold">
                {isApprover ? 'Approver' : 'Applicant'}
              </h2>
              <p className="text-xs text-gray-400">{user?.name}</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-800">
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {isApprover ? 'Admin Dashboard' : 'User Dashboard'}
              </h1>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                isApprover 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {isApprover ? 'Approver' : 'Applicant'}
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
