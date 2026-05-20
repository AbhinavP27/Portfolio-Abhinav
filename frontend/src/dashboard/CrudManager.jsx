import { useMemo, useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { apiClient } from '../services/api';

function CrudManager({ endpoint, title, fields, singleRecord = false }) {
  const { items, loading, error, refetch } = useCollection(endpoint);
  const initialState = useMemo(
    () =>
      fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue ?? '';
        return acc;
      }, {}),
    [fields],
  );

  const [form, setForm] = useState(initialState);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState('');

  const prepareData = () => {
    const hasFile = fields.some((field) => field.type === 'file');
    if (!hasFile) {
      const payload = { ...form };
      fields.forEach((field) => {
        if (field.type === 'array') {
          payload[field.name] = String(form[field.name] || '')
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);
        }
        if (field.type === 'boolean') payload[field.name] = Boolean(form[field.name]);
        if (field.type === 'number') payload[field.name] = Number(form[field.name] || 0);
      });
      return payload;
    }

    const data = new FormData();
    fields.forEach((field) => {
      const value = form[field.name];
      if (field.type === 'file') {
        if (value instanceof File) data.append(field.name, value);
      } else if (field.type === 'array') {
        data.append(field.name, JSON.stringify(String(value || '').split(',').map((v) => v.trim()).filter(Boolean)));
      } else {
        data.append(field.name, value ?? '');
      }
    });
    return data;
  };

  const onChange = (event, type) => {
    const { name, value, checked, files } = event.target;
    if (type === 'boolean') setForm((prev) => ({ ...prev, [name]: checked }));
    else if (type === 'file') setForm((prev) => ({ ...prev, [name]: files?.[0] || '' }));
    else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onEdit = (item) => {
    const next = { ...initialState };
    fields.forEach((field) => {
      const value = item[field.name];
      next[field.name] = field.type === 'array' ? (value || []).join(', ') : value ?? '';
    });
    setForm(next);
    setEditingId(item.id);
  };

  const onDelete = async (id) => {
    await apiClient.delete(`/${endpoint}/${id}/`);
    await refetch();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('Saving...');
    try {
      const payload = prepareData();
      if (singleRecord && items.length > 0 && !editingId) {
        await apiClient.put(`/${endpoint}/${items[0].id}/`, payload);
      } else if (editingId) {
        await apiClient.put(`/${endpoint}/${editingId}/`, payload);
      } else {
        await apiClient.post(`/${endpoint}/`, payload);
      }
      setForm(initialState);
      setEditingId(null);
      setStatus('Saved successfully.');
      await refetch();
    } catch {
      setStatus('Save failed.');
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-300">Manage content dynamically without code edits.</p>
      </div>

      <form onSubmit={onSubmit} className="glass grid gap-4 rounded-2xl p-5 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className={field.full ? 'md:col-span-2' : ''}>
            <span className="mb-2 block text-xs uppercase tracking-widest text-slate-400">{field.label}</span>
            {field.type === 'textarea' && (
              <textarea
                name={field.name}
                value={form[field.name] ?? ''}
                onChange={(e) => onChange(e, 'text')}
                rows={field.rows || 4}
                className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm"
              />
            )}
            {field.type === 'select' && (
              <select
                name={field.name}
                value={form[field.name] ?? ''}
                onChange={(e) => onChange(e, 'text')}
                className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm"
              >
                <option value="">Select</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
            {field.type === 'boolean' && (
              <input
                name={field.name}
                type="checkbox"
                checked={Boolean(form[field.name])}
                onChange={(e) => onChange(e, 'boolean')}
                className="h-5 w-5"
              />
            )}
            {field.type === 'file' && (
              <input name={field.name} type="file" onChange={(e) => onChange(e, 'file')} className="w-full text-sm" />
            )}
            {!['textarea', 'select', 'boolean', 'file'].includes(field.type) && (
              <input
                name={field.name}
                type={field.type || 'text'}
                value={form[field.name] ?? ''}
                onChange={(e) => onChange(e, field.type)}
                className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm"
              />
            )}
          </label>
        ))}
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white">{editingId ? 'Update' : 'Create'}</button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(initialState);
              }}
              className="rounded-xl border border-white/15 px-5 py-2 text-sm text-slate-200"
            >
              Cancel
            </button>
          )}
          <p className="text-sm text-slate-300">{status}</p>
        </div>
      </form>

      <div className="glass overflow-hidden rounded-2xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-slate-300">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td className="px-4 py-4" colSpan={3}>Loading...</td>
              </tr>
            )}
            {!loading && items.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-slate-400" colSpan={3}>No records found.</td>
              </tr>
            )}
            {!loading &&
              items.map((item) => (
                <tr key={item.id} className="border-t border-white/10">
                  <td className="px-4 py-3">{item.id}</td>
                  <td className="px-4 py-3">{item.title || item.name || item.headline || item.company || item.theme_name}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => onEdit(item)} className="rounded-lg border border-cyan-400/40 px-3 py-1">Edit</button>
                      {!singleRecord && (
                        <button onClick={() => onDelete(item.id)} className="rounded-lg border border-rose-400/40 px-3 py-1">Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {error && <p className="text-sm text-rose-300">{error}</p>}
    </section>
  );
}

export default CrudManager;
