import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import ContactForm from '../components/ContactForm';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import SkillsGrid from '../components/SkillsGrid';
import Timeline from '../components/Timeline';
import { mediaUrl, publicApiClient } from '../services/api';

function PublicPortfolioPage() {
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [theme, setTheme] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const pickLatest = (records = []) =>
      [...records].sort((a, b) => {
        const updated = new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
        if (updated !== 0) return updated;
        const created = new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        if (created !== 0) return created;
        return Number(b.id || 0) - Number(a.id || 0);
      })[0] || null;

    const fetchAll = async () => {
      const requests = [
        publicApiClient.get('/hero/'),
        publicApiClient.get('/about/'),
        publicApiClient.get('/theme/'),
        publicApiClient.get('/skills/'),
        publicApiClient.get('/projects/'),
        publicApiClient.get('/experience/'),
        publicApiClient.get('/certificates/'),
      ];
      const [heroRes, aboutRes, themeRes, skillsRes, projectsRes, expRes, certRes] = await Promise.allSettled(requests);

      if (heroRes.status === 'fulfilled') setHero(pickLatest(heroRes.value.data));
      if (aboutRes.status === 'fulfilled') setAbout(pickLatest(aboutRes.value.data));
      if (themeRes.status === 'fulfilled') setTheme(pickLatest(themeRes.value.data));
      if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data);
      if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data);
      if (expRes.status === 'fulfilled') setExperience(expRes.value.data);
      if (certRes.status === 'fulfilled') setCertificates(certRes.value.data);
    };

    fetchAll();
    publicApiClient.post('/theme/track_visit/').catch(() => null);
  }, []);

  const onResumeDownload = () => {
    publicApiClient.post('/theme/track_resume_download/').catch(() => null);
  };

  const staticProjects = useMemo(() => projects.filter((project) => project.category === 'static'), [projects]);
  const dynamicProjects = useMemo(() => projects.filter((project) => project.category !== 'static'), [projects]);
  const resumeDownloadUrl = useMemo(() => (hero?.resume_file ? mediaUrl(hero.resume_file) : ''), [hero]);

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <Hero heroData={hero} theme={theme} />

      <main className="space-y-28 pb-20">
        <section id="about" className="section-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{about?.section_label || 'About'}</p>
            <h2 className="mt-4 text-4xl font-bold text-white">{about?.heading || 'Engineering premium products from concept to scale.'}</h2>
            <p className="mt-6 max-w-3xl text-slate-300">
              {about?.description ||
                'I specialize in end-to-end product engineering across React frontends and Django APIs. My focus is reliability, refined visual systems, and maintainable architecture that supports fast iteration.'}
            </p>
          </motion.div>
        </section>

        <section id="skills" className="section-wrap space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Core Skills</p>
            <h2 className="mt-3 text-4xl font-bold text-white">Specialized for full-stack execution</h2>
          </div>
          <SkillsGrid skills={skills} />
        </section>

        <section id="projects" className="section-wrap space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Projects</p>
            <h2 className="mt-3 text-4xl font-bold text-white">Selected product work</h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Static</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                {staticProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                {staticProjects.length === 0 && <p className="text-sm text-slate-400">No static projects added yet.</p>}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-white">Dynamic</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                {dynamicProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
                {dynamicProjects.length === 0 && <p className="text-sm text-slate-400">No dynamic projects added yet.</p>}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="section-wrap space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Experience</p>
            <h2 className="mt-3 text-4xl font-bold text-white">Timeline of impact</h2>
          </div>
          <Timeline experiences={experience} />
        </section>

        <section id="certifications" className="section-wrap space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Certifications</p>
            <h2 className="mt-3 text-4xl font-bold text-white">Verified credentials</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {certificates.map((certificate) => (
              <article key={certificate.id} className="glass rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-white">{certificate.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{certificate.issuer}</p>
                <p className="mt-1 text-xs text-slate-400">Issued: {certificate.issue_date}</p>
                <div className="mt-4 flex gap-3">
                  {certificate.verification_url && (
                    <a href={certificate.verification_url} target="_blank" rel="noreferrer" className="text-sm text-cyan-300">
                      Verify
                    </a>
                  )}
                  {certificate.certificate_file && (
                    <a href={mediaUrl(certificate.certificate_file)} target="_blank" rel="noreferrer" className="text-sm text-violet-300">
                      View Certificate
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-wrap grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Contact</p>
            <h2 className="mt-3 text-4xl font-bold text-white">Let's build your next platform.</h2>
            <p className="mt-4 text-slate-300">Share your scope and I'll reply with technical direction, estimates, and architecture recommendations.</p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="section-wrap flex flex-col items-start justify-between gap-4 text-sm text-slate-400 md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Abhinav Portfolio Platform</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            {resumeDownloadUrl ? (
              <a href={resumeDownloadUrl} target="_blank" rel="noreferrer" onClick={onResumeDownload}>
                Download Resume
              </a>
            ) : (
              <span className="text-slate-500">Resume Not Added</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicPortfolioPage;
