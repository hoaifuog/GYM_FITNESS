import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import LoginScreen from 'routes/LoginScreen'; // Đảm bảo đường dẫn đúng

const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const UserManagement = Loadable(lazy(() => import('views/User')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // Route cho trang Login
    {
      path: '/login',  // Đường dẫn tới trang login
      element: <LoginScreen />  // Trang login
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    {
      path: '/user-management',
      element: <UserManagement />,
    },
  ]
};

export default MainRoutes;
