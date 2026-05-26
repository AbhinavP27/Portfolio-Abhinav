import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { mediaUrl } from '../services/api';

function CursorImageReveal({ baseImage, revealImage, size = 360 }) {
  const [mask, setMask] = useState({
    x: 50,
    y: 50,
    show: false,
    rotateX: 0,
    rotateY: 0,
  });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((x - 50) / 50) * 7;
    const rotateX = ((50 - y) / 50) * 7;
    setMask({ x, y, show: true, rotateX, rotateY });
  };

  const base = baseImage ? mediaUrl(baseImage) : 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80';
  const reveal = revealImage ? mediaUrl(revealImage) : 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=600&q=80';
  const cardTransform = useMemo(
    () => `rotateX(${mask.rotateX.toFixed(2)}deg) rotateY(${mask.rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`,
    [mask.rotateX, mask.rotateY],
  );

  return (
    <div style={{ width: size, height: size, perspective: '1000px' }} className="mx-auto">
      <div
        onMouseEnter={() => setMask((prev) => ({ ...prev, show: true }))}
        onMouseMove={handleMove}
        onMouseLeave={() => setMask((prev) => ({ ...prev, show: false, rotateX: 0, rotateY: 0 }))}
        className="relative h-full w-full cursor-none overflow-hidden rounded-[2.2rem] border border-white/20 bg-slate-950/35 shadow-[0_22px_60px_rgba(2,8,23,0.7)] transition-transform duration-150 ease-out"
        style={{ transform: cardTransform }}
      >
        <img
          src={base}
          alt="Profile"
          className="h-full w-full object-cover transition duration-200"
          style={{ filter: mask.show ? 'contrast(1.08) saturate(1.1) brightness(1.03)' : 'none' }}
        />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-150"
          style={{
            backgroundImage: `url(${reveal})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'none',
            mixBlendMode: 'normal',
            opacity: mask.show ? 1 : 0,
            maskImage: `radial-gradient(circle 125px at ${mask.x}% ${mask.y}%, black 0, black 66%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 125px at ${mask.x}% ${mask.y}%, black 0, black 66%, transparent 100%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-150"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(125,211,252,0.28) 0px, rgba(125,211,252,0.28) 1px, transparent 2px, transparent 5px)',
            opacity: mask.show ? 0.32 : 0,
            maskImage: `radial-gradient(circle 120px at ${mask.x}% ${mask.y}%, black 0, black 62%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 120px at ${mask.x}% ${mask.y}%, black 0, black 62%, transparent 100%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(220px circle at ${mask.x}% ${mask.y}%, rgba(56,189,248,0.2), transparent 65%)`,
            opacity: mask.show ? 1 : 0,
            transition: 'opacity 180ms ease',
          }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          animate={mask.show ? { opacity: [0.12, 0.24, 0.14] } : { opacity: 0 }}
          transition={{ duration: 0.9, repeat: mask.show ? Infinity : 0, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(56,189,248,0.18), transparent 24%, transparent 76%, rgba(56,189,248,0.14)), repeating-linear-gradient(to bottom, rgba(148,163,184,0.1) 0px, rgba(148,163,184,0.1) 1px, transparent 2px, transparent 5px)',
          }}
        />
        <motion.div
          className="pointer-events-none absolute left-0 right-0 h-24 bg-[linear-gradient(to_bottom,rgba(125,211,252,0.04),rgba(125,211,252,0.45),rgba(125,211,252,0.04))] blur-[1px]"
          animate={mask.show ? { y: ['-22%', '118%'], opacity: [0, 0.85, 0] } : { y: '-22%', opacity: 0 }}
          transition={{ duration: 1.55, repeat: mask.show ? Infinity : 0, ease: 'linear' }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            left: `${mask.x}%`,
            top: `${mask.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: mask.show ? 1 : 0,
            transition: 'opacity 120ms ease',
          }}
        >
          <div className="relative h-[190px] w-[190px]">
            <div className="absolute inset-0 rounded-full border border-cyan-200/70 shadow-[0_0_20px_rgba(125,211,252,0.7)]" />
            <div className="absolute inset-[10px] rounded-full border border-cyan-100/40" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_8px_rgba(125,211,252,0.95)]" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-[5px] rounded-[1.9rem] border border-white/15" />
        <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.14),transparent_35%,transparent_70%,rgba(56,189,248,0.16)_100%)] mix-blend-screen" />
      </div>
    </div>
  );
}

export default CursorImageReveal;
