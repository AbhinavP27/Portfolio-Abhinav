import { useEffect, useState } from 'react';
import DashboardCards from './DashboardCards';
import { apiClient } from '../services/api';

function DashboardOverview() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    apiClient
      .get('/dashboard/stats/')
      .then((response) => setStats(response.data))
      .catch(() => setStats({}));
  }, []);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-slate-300">Track your content health and engagement from one workspace.</p>
      </div>
      <DashboardCards stats={stats} />
    </section>
  );
}

export default DashboardOverview;
