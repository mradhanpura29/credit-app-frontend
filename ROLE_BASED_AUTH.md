# Role-Based Authentication System

## Overview
This application implements role-based route traversal with two user roles:
- **Approver** (Admin) - Can review and approve/reject credit applications
- **Applicant** (User) - Can submit and track credit applications

## How to Use

### Login
1. Navigate to the login page (default route `/`)
2. Select your role:
   - **Applicant**: For users who want to apply for credit
   - **Approver**: For administrators who review applications
3. Enter email and password
4. Click "Sign In Securely"

### Role-Based Dashboards

#### Approver Dashboard (`/dashboard/approver`)
- View all pending applications
- Approve or reject applications
- Access statistics and reports
- Monitor application status

#### Applicant Dashboard (`/dashboard/applicant`)
- Create new credit applications
- Track application status
- View application history
- Manage personal settings

## Route Protection

### Protected Routes
All dashboard routes require authentication. Unauthenticated users are redirected to the login page.

### Role-Based Access
- Approvers can only access `/dashboard/approver/*` routes
- Applicants can only access `/dashboard/applicant/*` routes
- Attempting to access unauthorized routes redirects to `/unauthorized`

## Technical Implementation

### Key Components
- **AuthContext**: Manages authentication state and user roles
- **ProtectedRoute**: Ensures user is authenticated
- **RoleBasedRoute**: Verifies user has required role
- **DashboardLayout**: Displays role-specific navigation

### File Structure
```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context and provider
├── components/
│   └── ProtectedRoute.tsx       # Route protection components
├── pages/
│   ├── LoginPage.tsx            # Login with role selection
│   ├── ApproverDashboard.tsx    # Admin dashboard
│   ├── ApplicantDashboard.tsx   # User dashboard
│   └── UnauthorizedPage.tsx     # Access denied page
├── layout/
│   ├── DashboardLayout.tsx      # Role-aware sidebar layout
│   ├── AuthLayout.tsx           # Login layout
│   └── MainLayout.tsx           # Public pages layout
└── routes/
    └── index.tsx                # Route definitions
```

## Demo Credentials
For development/testing, any email and password will work. The role selection determines which dashboard you'll access.
