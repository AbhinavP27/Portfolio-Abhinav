import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { cardHover } from '../animations/motionPresets';
import { mediaUrl } from '../services/api';

function ProjectCard({ project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = useMemo(() => {
    const fromGallery = (project.images || []).map((item) => item.image).filter(Boolean);
    const all = [project.image, ...fromGallery].filter(Boolean);
    if (all.length > 0) return all;
    return ['https://images.unsplash.com/photo-1551281044-8b2ee9b1c1bd?auto=format&fit=crop&w=900&q=80'];
  }, [project.image, project.images]);
  const currentImage = images[activeIndex] || images[0];
  const hasCarousel = images.length > 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [project.id, project.title, images.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.article initial="rest" whileHover="hover" variants={cardHover} className="glass overflow-hidden rounded-3xl">
      <div className="relative">
        <img
          src={currentImage.startsWith('http') ? currentImage : mediaUrl(currentImage)}
          alt={project.title}
          className="h-52 w-full object-cover"
        />
        {hasCarousel && (
          <>
            <button
              type="button"
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-slate-900/60 px-2 py-1 text-white"
              aria-label={`Previous image for ${project.title}`}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/35 bg-slate-900/60 px-2 py-1 text-white"
              aria-label={`Next image for ${project.title}`}
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {images.map((image, index) => (
                <button
                  key={`${project.id || project.title}-${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full ${index === activeIndex ? 'bg-cyan-300' : 'bg-white/45'}`}
                  aria-label={`Go to image ${index + 1} for ${project.title}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
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
