import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const links = [
  { to: '/admin/overview', label: 'Overview' },
  { to: '/admin/hero', label: 'Hero' },
  { to: '/admin/about', label: 'About' },
  { to: '/admin/skills', label: 'Skills' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/experience', label: 'Experience' },
  { to: '/admin/certifications', label: 'Certifications' },
  { to: '/admin/messages', label: 'Messages' },
  { to: '/admin/theme', label: 'Theme' },
  { to: '/admin/preview', label: 'Live Preview' },
];

function DashboardSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="glass h-full rounded-3xl p-5">
      <p className="mb-6 font-['Space_Grotesk'] text-xl font-bold">Portfolio Admin</p>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-2 text-sm transition ${isActive ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/10'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={logout} className="mt-8 w-full rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200">
        Logout
      </button>
    </aside>
  );
}

export default DashboardSidebar;
