function Timeline({ experiences = [] }) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-2 h-full w-px bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent md:left-1/2" />
      <div className="space-y-8">
        {experiences.map((item, index) => (
          <div key={item.id || `${item.company}-${index}`} className="relative md:grid md:grid-cols-2 md:gap-10">
            <div className={`pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:col-start-2'}`}>
              <p className="text-xs uppercase tracking-widest text-cyan-300">
                {item.start_date} {item.is_current ? '- Present' : item.end_date ? `- ${item.end_date}` : ''}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{item.position}</h3>
              <p className="text-sm text-slate-300">{item.company}</p>
              <p className="mt-3 text-sm text-slate-400">{item.description}</p>
            </div>
            <span className="absolute left-2 top-3 h-4 w-4 rounded-full border border-white/40 bg-violet-500 md:left-1/2 md:-translate-x-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
