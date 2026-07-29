import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
