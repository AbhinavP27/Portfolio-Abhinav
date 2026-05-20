import { useState } from 'react';
import { apiClient } from '../services/api';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiClient.post('/messages/', form);
      setStatus('Message sent successfully.');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('Could not send message.');
    }
  };

  return (
    <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-6">
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Your name"
        className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm text-slate-100"
        required
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        placeholder="Email"
        className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm text-slate-100"
        required
      />
      <input
        name="subject"
        value={form.subject}
        onChange={onChange}
        placeholder="Subject"
        className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm text-slate-100"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={onChange}
        placeholder="Message"
        rows={5}
        className="w-full rounded-xl border border-white/15 bg-slate-950/30 p-3 text-sm text-slate-100"
        required
      />
      <button type="submit" className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500">
        Send Message
      </button>
      {status && <p className="text-sm text-slate-300">{status}</p>}
    </form>
  );
}

export default ContactForm;
