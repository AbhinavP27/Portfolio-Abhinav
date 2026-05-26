import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

function DashboardLayout() {
  return (
    <div className="section-wrap grid gap-6 py-6 lg:h-[calc(100vh-3rem)] lg:grid-cols-[260px_1fr] lg:overflow-hidden">
      <DashboardSidebar />
      <main className="glass rounded-3xl p-6 lg:overflow-y-auto lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
