import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AdminLoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/admin/overview';

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login(form.username, form.password);
      if (!user.is_staff) {
        logout();
        setError('Account does not have admin access.');
        return;
      }
      navigate(from, { replace: true });
    } catch {
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-content-center px-4">
      <form onSubmit={onSubmit} className="glass w-full max-w-md space-y-4 rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-white">Admin Login</h1>
        <p className="text-sm text-slate-300">Authenticate with your Django admin credentials.</p>
        <input
          name="username"
          value={form.username}
          onChange={onChange}
          placeholder="Username"
          className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="Password"
          className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm"
          required
        />
        {error && <p className="text-sm text-rose-300">{error}</p>}
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

export default AdminLoginPage;
