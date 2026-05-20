function LivePreview() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Live Preview</h1>
        <p className="mt-2 text-sm text-slate-300">Instantly preview your public portfolio updates.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/15">
        <iframe title="Portfolio Preview" src="/" className="h-[75vh] w-full bg-slate-950" />
      </div>
    </section>
  );
}

export default LivePreview;
