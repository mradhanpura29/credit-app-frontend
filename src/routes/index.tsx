import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import AuthLayout from '@/layout/AuthLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';

export const router = createBrowserRouter([
  {
    // Routes with AuthLayout (Default)
    element: <AuthLayout />,
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
    ],
  },
  {
    // Routes with MainLayout
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
    ],
  },
  {
    // Routes with DashboardLayout
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      // Add more dashboard routes here
    ],
  },
]);
