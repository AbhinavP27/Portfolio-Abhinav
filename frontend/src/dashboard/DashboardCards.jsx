function DashboardCards({ stats }) {
  const cards = [
    { label: 'Projects', value: stats.projects },
    { label: 'Unread Messages', value: stats.messages_unread },
    { label: 'Visitors', value: stats.visitor_statistics },
    { label: 'Resume Downloads', value: stats.resume_downloads },
    { label: 'Skills', value: stats.skills },
    { label: 'Certificates', value: stats.certificates },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <article key={card.label} className="glass rounded-2xl p-5">
          <p className="text-sm text-slate-400">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold text-white">{card.value ?? 0}</p>
        </article>
      ))}
    </div>
  );
}

export default DashboardCards;
