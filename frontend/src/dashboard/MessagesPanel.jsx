import { useCollection } from '../hooks/useCollection';
import { apiClient } from '../services/api';

function MessagesPanel() {
  const { items, loading, refetch } = useCollection('messages');

  const markRead = async (id) => {
    await apiClient.post(`/messages/${id}/mark_read/`);
    await refetch();
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Messages Panel</h1>
        <p className="mt-2 text-sm text-slate-300">Review and manage contact submissions.</p>
      </div>

      <div className="space-y-4">
        {loading && <p>Loading...</p>}
        {!loading && items.length === 0 && <p className="text-slate-300">No messages available.</p>}
        {items.map((message) => (
          <article key={message.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{message.subject}</h3>
              <span className={`rounded-full px-3 py-1 text-xs ${message.is_read ? 'bg-emerald-500/20 text-emerald-200' : 'bg-amber-500/20 text-amber-200'}`}>
                {message.is_read ? 'Read' : 'Unread'}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">From: {message.name} ({message.email})</p>
            <p className="mt-3 text-sm text-slate-200">{message.message}</p>
            {!message.is_read && (
              <button onClick={() => markRead(message.id)} className="mt-4 rounded-lg border border-cyan-400/40 px-4 py-2 text-sm">
                Mark as Read
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default MessagesPanel;
