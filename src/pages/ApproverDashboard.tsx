import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function ApproverDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Approver Dashboard</h2>
        <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Guest User'}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">245</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">56</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600 mt-2">189</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-3xl font-bold text-red-600 mt-2">24</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 'APP-001', name: 'John Doe', amount: '$50,000', date: '2026-01-30', status: 'pending' },
              { id: 'APP-002', name: 'Jane Smith', amount: '$75,000', date: '2026-01-30', status: 'pending' },
              { id: 'APP-003', name: 'Bob Johnson', amount: '$30,000', date: '2026-01-29', status: 'pending' },
            ].map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{app.name}</p>
                  <p className="text-sm text-gray-600">{app.id} • {app.date}</p>
                </div>
                <div className="text-right mr-6">
                  <p className="font-semibold text-gray-900">{app.amount}</p>
                  <span className="inline-block px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                    Pending Review
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                    Approve
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
