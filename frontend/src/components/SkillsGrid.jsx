import { motion } from 'framer-motion';
import { cardHover } from '../animations/motionPresets';
import { resolveSkillIcon } from '../utils/skillIcons';
import { mediaUrl } from '../services/api';

function SkillsGrid({ skills = [] }) {
  const groups = ['frontend', 'backend', 'tools', 'ai'];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {groups.map((category) => {
        const categorySkills = skills.filter((skill) => skill.category === category);
        return (
          <motion.div key={category} initial="rest" whileHover="hover" variants={cardHover} className="glass rounded-3xl p-6">
            <h3 className="text-xl font-semibold capitalize text-white">{category}</h3>
            <div className="mt-5 space-y-4">
              {categorySkills.map((skill) => (
                <div key={skill.id || skill.name}>
                  <div className="mb-1 flex items-center justify-between text-sm text-slate-200">
                    <span className="flex items-center gap-2">
                      {(() => {
                        const icon = resolveSkillIcon(skill);
                        if (!icon) return null;

                        if (icon.type === 'image') {
                          const src = icon.value.startsWith('http://') || icon.value.startsWith('https://') ? icon.value : mediaUrl(icon.value);
                          return <img src={src} alt="" className="h-4 w-4 rounded-sm object-contain" />;
                        }

                        if (icon.type === 'component') {
                          const Icon = icon.value;
                          return <Icon className="h-4 w-4 text-cyan-300" />;
                        }

                        return <span className="text-xs text-cyan-300">{icon.value}</span>;
                      })()}
                      {skill.name}
                    </span>
                    <span>{skill.proficiency}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${skill.proficiency}%` }} />
                  </div>
                </div>
              ))}
              {categorySkills.length === 0 && <p className="text-sm text-slate-400">No skills added yet.</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default SkillsGrid;
