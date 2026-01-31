import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import MainLayout from "@/layout/MainLayout";
import LoginPage from "@/pages/LoginPage";
import ApproverDashboard from "@/pages/ApproverDashboard";
import ApplicantDashboard from "@/pages/ApplicantDashboard";
// import UnauthorizedPage from "@/pages/UnauthorizedPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      {/* Dashboard Routes */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard/approver" element={<ApproverDashboard />} />
        <Route path="/dashboard/applicant" element={<ApplicantDashboard />} />
        {/* <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
