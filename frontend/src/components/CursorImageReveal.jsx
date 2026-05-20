import { useState } from 'react';
import { mediaUrl } from '../services/api';

function CursorImageReveal({ baseImage, revealImage, size = 360 }) {
  const [mask, setMask] = useState({ x: 50, y: 50, show: false });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMask({ x, y, show: true });
  };

  const base = baseImage ? mediaUrl(baseImage) : 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80';
  const reveal = revealImage ? mediaUrl(revealImage) : 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80';

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={() => setMask((prev) => ({ ...prev, show: false }))}
      className="relative mx-auto overflow-hidden rounded-full border border-white/20 shadow-[0_0_60px_rgba(56,189,248,0.35)]"
      style={{ width: size, height: size }}
    >
      <img src={base} alt="Profile" className="h-full w-full object-cover" />
      <div
        className="absolute inset-0 transition-all duration-200"
        style={{
          clipPath: mask.show ? `circle(24% at ${mask.x}% ${mask.y}%)` : 'circle(0% at 50% 50%)',
        }}
      >
        <img src={reveal} alt="Profile reveal" className="h-full w-full object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-full border border-white/25" />
    </div>
  );
}

export default CursorImageReveal;
