import { motion } from 'framer-motion';

function Navbar() {
  const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-wrap pt-4">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="glass flex items-center justify-between rounded-full px-5 py-3"
        >
          <a href="#home" className="font-['Space_Grotesk'] text-lg font-bold tracking-widest text-white">
            ABHINAV.dev
          </a>
          <ul className="hidden gap-5 text-sm text-slate-200 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-cyan-300">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/admin/login" className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-slate-100">
            Admin
          </a>
        </motion.nav>
      </div>
    </header>
  );
}

export default Navbar;
