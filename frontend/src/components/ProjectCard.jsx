import { motion } from 'framer-motion';
import { cardHover } from '../animations/motionPresets';
import { mediaUrl } from '../services/api';

function ProjectCard({ project }) {
  return (
    <motion.article initial="rest" whileHover="hover" variants={cardHover} className="glass overflow-hidden rounded-3xl">
      <img
        src={project.image ? mediaUrl(project.image) : 'https://images.unsplash.com/photo-1551281044-8b2ee9b1c1bd?auto=format&fit=crop&w=900&q=80'}
        alt={project.title}
        className="h-52 w-full object-cover"
      />
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-cyan-300/30 px-3 py-1 text-xs text-cyan-200 capitalize">{project.category || 'dynamic'}</span>
            {project.featured && <span className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-200">Featured</span>}
          </div>
        </div>
        <p className="text-sm text-slate-300">{project.summary}</p>
        <div className="flex flex-wrap gap-2">
          {(project.tech_stack || []).map((tech) => (
            <span key={tech} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-200">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-2">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="rounded-full border border-white/20 px-4 py-2 text-sm">
              GitHub
            </a>
          )}
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="rounded-full bg-cyan-500/85 px-4 py-2 text-sm text-slate-950">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
