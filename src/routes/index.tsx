import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import AuthLayout from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import ApproverDashboard from "@/pages/ApproverDashboard";
import ApplicantDashboard from "@/pages/ApplicantDashboard";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import { ProtectedRoute, RoleBasedRoute } from "@/components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      {/* Public Routes */}
      {/* <Route element={<MainLayout />}>
      add if any
      </Route> */}

      {/* Protected Dashboard Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Approver Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["approver"]} />}>
            <Route path="/dashboard/approver" element={<ApproverDashboard />} />
          </Route>

          {/* Applicant Routes */}
          <Route element={<RoleBasedRoute allowedRoles={["applicant"]} />}>
            <Route
              path="/dashboard/applicant"
              element={<ApplicantDashboard />}
            />
          </Route>
        </Route>
      </Route>

      {/* Unauthorized Page */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
