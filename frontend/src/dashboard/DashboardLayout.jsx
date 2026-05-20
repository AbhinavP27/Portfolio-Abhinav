import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

function DashboardLayout() {
  return (
    <div className="section-wrap grid min-h-screen gap-6 py-6 lg:grid-cols-[260px_1fr]">
      <DashboardSidebar />
      <main className="glass rounded-3xl p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
