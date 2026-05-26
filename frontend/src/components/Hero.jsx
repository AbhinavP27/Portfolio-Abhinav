import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { fadeUp } from '../animations/motionPresets';
import CursorImageReveal from './CursorImageReveal';

function Hero({ heroData, theme }) {
  const accentStyle = useMemo(
    () => ({
      '--primary': theme?.accent_primary || '#7c3aed',
      '--secondary': theme?.accent_secondary || '#38bdf8',
    }),
    [theme],
  );
  const contactLinks = useMemo(() => {
    const links = [];

    if (heroData?.contact_email) {
      links.push({
        key: 'email',
        href: `mailto:${heroData.contact_email}`,
        label: 'Email',
        icon: FaEnvelope,
      });
    }

    if (heroData?.contact_phone) {
      const phone = String(heroData.contact_phone).replace(/\s+/g, '');
      links.push({
        key: 'phone',
        href: `tel:${phone}`,
        label: 'Phone',
        icon: FaPhoneAlt,
      });
    }

    if (heroData?.github_url) {
      links.push({
        key: 'github',
        href: heroData.github_url,
        label: 'GitHub',
        icon: FaGithub,
      });
    }

    if (heroData?.linkedin_url) {
      links.push({
        key: 'linkedin',
        href: heroData.linkedin_url,
        label: 'LinkedIn',
        icon: FaLinkedin,
      });
    }

    return links;
  }, [heroData]);

  return (
    <section id="home" className="relative isolate min-h-screen overflow-hidden" style={accentStyle}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[var(--primary)]/25 blur-3xl" />
        <div className="absolute right-4 top-36 h-64 w-64 rounded-full bg-[var(--secondary)]/20 blur-3xl" />
        <motion.div
          className="absolute bottom-14 left-1/2 h-40 w-40 rounded-full border border-white/15"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="section-wrap grid min-h-screen gap-10 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-300">Full Stack Developer</p>
          <h1 className="max-w-xl text-5xl font-bold leading-tight md:text-7xl">{heroData?.headline || 'Designing Systems That Feel Alive'}</h1>
          <p className="mt-6 max-w-lg text-base text-slate-300 md:text-lg">{heroData?.intro_text || 'I build cinematic web products with scalable backend architecture and expressive frontend motion.'}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={heroData?.primary_button_url || '#projects'}
              className="rounded-full bg-[var(--primary)] px-7 py-3 font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] transition hover:scale-[1.03]"
            >
              {heroData?.primary_button_label || 'View Work'}
            </a>
            <a
              href={heroData?.secondary_button_url || '#contact'}
              className="rounded-full border border-white/20 px-7 py-3 font-semibold text-slate-100 transition hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
            >
              {heroData?.secondary_button_label || 'Start a Project'}
            </a>
          </div>
          {contactLinks.length > 0 && (
            <div className="mt-6 flex items-center gap-4">
              {contactLinks.map((item) => {
                const Icon = item.icon;
                const isExternal = item.key === 'github' || item.key === 'linkedin';

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    aria-label={item.label}
                    title={item.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-slate-100 transition hover:border-[var(--secondary)] hover:text-[var(--secondary)]"
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto w-full max-w-md"
        >
          <CursorImageReveal
            baseImage={heroData?.profile_image}
            revealImage={heroData?.alternate_profile_image}
            size={400}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
