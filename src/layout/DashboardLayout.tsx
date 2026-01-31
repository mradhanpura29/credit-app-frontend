import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-800">Overview</a>
            <a href="/dashboard/applications" className="block px-4 py-2 rounded hover:bg-gray-800">Applications</a>
            <a href="/dashboard/reports" className="block px-4 py-2 rounded hover:bg-gray-800">Reports</a>
            <a href="/dashboard/settings" className="block px-4 py-2 rounded hover:bg-gray-800">Settings</a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <button className="text-gray-700 hover:text-indigo-600">Logout</button>
          </div>
        </header>
        <main className="flex-1 p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
