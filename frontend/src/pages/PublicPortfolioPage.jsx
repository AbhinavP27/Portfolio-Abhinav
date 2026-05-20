import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import SkillsGrid from '../components/SkillsGrid';
import Timeline from '../components/Timeline';
import { apiClient, mediaUrl } from '../services/api';

function PublicPortfolioPage() {
  const [hero, setHero] = useState(null);
  const [theme, setTheme] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [heroRes, themeRes, skillsRes, projectsRes, expRes, certRes] = await Promise.all([
          apiClient.get('/hero/'),
          apiClient.get('/theme/'),
          apiClient.get('/skills/'),
          apiClient.get('/projects/'),
          apiClient.get('/experience/'),
          apiClient.get('/certificates/'),
        ]);

        setHero(heroRes.data[0] || null);
        setTheme(themeRes.data[0] || null);
        setSkills(skillsRes.data);
        setProjects(projectsRes.data);
        setExperience(expRes.data);
        setCertificates(certRes.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAll();
    apiClient.post('/theme/track_visit/').catch(() => null);
  }, []);

  const onResumeDownload = () => {
    apiClient.post('/theme/track_resume_download/').catch(() => null);
  };

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
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">About</p>
            <h2 className="mt-4 text-4xl font-bold text-white">{hero?.subheadline || 'Engineering premium products from concept to scale.'}</h2>
            <p className="mt-6 max-w-3xl text-slate-300">
              I specialize in end-to-end product engineering across React frontends and Django APIs. My focus is reliability,
              refined visual systems, and maintainable architecture that supports fast iteration.
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
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
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
            <h2 className="mt-3 text-4xl font-bold text-white">Let’s build your next platform.</h2>
            <p className="mt-4 text-slate-300">Share your scope and I’ll reply with technical direction, estimates, and architecture recommendations.</p>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="section-wrap flex flex-col items-start justify-between gap-4 text-sm text-slate-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Abhinav Portfolio Platform</p>
          <div className="flex items-center gap-5">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#" onClick={onResumeDownload}>Download Resume</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicPortfolioPage;
