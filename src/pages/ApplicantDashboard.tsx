import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Clock, CheckCircle, XCircle, Calendar, DollarSign, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Application {
  id: string;
  amount: string;
  date: string;
  status: string;
  statusColor: string;
  applicantName?: string;
  email?: string;
  phone?: string;
  address?: string;
  creditScore?: number;
  income?: string;
  purpose?: string;
}

export default function ApplicantDashboard() {
  const { user } = useAuth();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const applications: Application[] = [
    { 
      id: 'APP-045', 
      amount: '$25,000', 
      date: '2026-01-28', 
      status: 'approved', 
      statusColor: 'green',
      applicantName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      creditScore: 720,
      income: '$85,000',
      purpose: 'Home Renovation'
    },
    { 
      id: 'APP-046', 
      amount: '$35,000', 
      date: '2026-01-29', 
      status: 'pending', 
      statusColor: 'yellow',
      applicantName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      creditScore: 720,
      income: '$85,000',
      purpose: 'Debt Consolidation'
    },
    { 
      id: 'APP-047', 
      amount: '$50,000', 
      date: '2026-01-30', 
      status: 'under review', 
      statusColor: 'blue',
      applicantName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      creditScore: 720,
      income: '$85,000',
      purpose: 'Business Expansion'
    },
    { 
      id: 'APP-048', 
      amount: '$15,000', 
      date: '2026-01-30', 
      status: 'approved', 
      statusColor: 'green',
      applicantName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      creditScore: 720,
      income: '$85,000',
      purpose: 'Medical Expenses'
    },
  ];

  const handleViewDetails = (app: Application) => {
    setSelectedApp(app);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Applicant Dashboard</h2>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name || 'Guest User'}</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-700">
          <PlusCircle className="w-4 h-4 mr-2" />
          New Credit Card Application
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600 mt-2">3</p>
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
                <p className="text-3xl font-bold text-green-600 mt-2">4</p>
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
                <p className="text-3xl font-bold text-red-600 mt-2">1</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Applications */}
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Credit Card Application</p>
                  <p className="text-sm text-gray-600">{app.id} • Applied on {app.date}</p>
                </div>
                <div className="text-right mr-6">
                  <p className="font-semibold text-gray-900">{app.amount}</p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium text-${app.statusColor}-700 bg-${app.statusColor}-100 rounded-full capitalize`}>
                    {app.status}
                  </span>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleViewDetails(app)}>
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Credit Card Application Details</DialogTitle>
            <DialogDescription>
              Complete information for credit card application {selectedApp?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedApp && (
            <div className="space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg bg-${selectedApp.statusColor}-50 border border-${selectedApp.statusColor}-200`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Application Status</p>
                    <p className={`text-lg font-bold text-${selectedApp.statusColor}-700 capitalize mt-1`}>
                      {selectedApp.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">Amount Requested</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{selectedApp.amount}</p>
                  </div>
                </div>
              </div>

              {/* Application Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Application ID</span>
                  </div>
                  <p className="text-gray-900 font-semibold pl-6">{selectedApp.id}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Application Date</span>
                  </div>
                  <p className="text-gray-900 font-semibold pl-6">{selectedApp.date}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Applicant Name</span>
                  </div>
                  <p className="text-gray-900 font-semibold pl-6">{selectedApp.applicantName}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-medium">Annual Income</span>
                  </div>
                  <p className="text-gray-900 font-semibold pl-6">{selectedApp.income}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="text-gray-900 font-medium">{selectedApp.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="text-gray-900 font-medium">{selectedApp.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Address:</span>
                    <span className="text-gray-900 font-medium text-right">{selectedApp.address}</span>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Financial Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credit Score:</span>
                    <span className="text-gray-900 font-medium">{selectedApp.creditScore}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
