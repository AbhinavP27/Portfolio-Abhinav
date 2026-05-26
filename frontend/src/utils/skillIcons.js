import * as FaIcons from 'react-icons/fa6';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as VscIcons from 'react-icons/vsc';

const ICON_PACKS = [SiIcons, FaIcons, VscIcons, TbIcons];
const CATEGORY_DEFAULTS = {
  frontend: 'SiReact',
  backend: 'SiNodedotjs',
  tools: 'SiGit',
  ai: 'SiOpenai',
};

const AUTO_ICON_RULES = [
  { keywords: ['react'], icon: 'SiReact' },
  { keywords: ['nextjs', 'next.js', 'next'], icon: 'SiNextdotjs' },
  { keywords: ['javascript', 'js'], icon: 'SiJavascript' },
  { keywords: ['typescript', 'ts'], icon: 'SiTypescript' },
  { keywords: ['html'], icon: 'SiHtml5' },
  { keywords: ['css'], icon: 'SiCss3' },
  { keywords: ['tailwind'], icon: 'SiTailwindcss' },
  { keywords: ['bootstrap'], icon: 'SiBootstrap' },
  { keywords: ['redux'], icon: 'SiRedux' },
  { keywords: ['framer'], icon: 'SiFramer' },
  { keywords: ['django'], icon: 'SiDjango' },
  { keywords: ['python'], icon: 'SiPython' },
  { keywords: ['flask'], icon: 'SiFlask' },
  { keywords: ['fastapi'], icon: 'SiFastapi' },
  { keywords: ['node', 'nodejs'], icon: 'SiNodedotjs' },
  { keywords: ['express'], icon: 'SiExpress' },
  { keywords: ['postgres', 'postgresql'], icon: 'SiPostgresql' },
  { keywords: ['mysql'], icon: 'SiMysql' },
  { keywords: ['mongodb'], icon: 'SiMongodb' },
  { keywords: ['firebase'], icon: 'SiFirebase' },
  { keywords: ['docker'], icon: 'SiDocker' },
  { keywords: ['kubernetes', 'k8s'], icon: 'SiKubernetes' },
  { keywords: ['git'], icon: 'SiGit' },
  { keywords: ['github'], icon: 'SiGithub' },
  { keywords: ['vscode', 'vs code', 'visual studio code'], icon: 'VscVscode' },
  { keywords: ['cursor'], icon: 'TbCursor' },
  { keywords: ['windsurf'], icon: 'SiWindsurf' },
  { keywords: ['antigravity'], icon: 'FaRocket' },
  { keywords: ['aws'], icon: 'SiAmazonwebservices' },
  { keywords: ['azure'], icon: 'SiMicrosoftazure' },
  { keywords: ['gcp', 'google cloud'], icon: 'SiGooglecloud' },
  { keywords: ['figma'], icon: 'SiFigma' },
  { keywords: ['postman'], icon: 'SiPostman' },
  { keywords: ['linux'], icon: 'SiLinux' },
  { keywords: ['openai', 'chatgpt'], icon: 'SiOpenai' },
  { keywords: ['tensorflow'], icon: 'SiTensorflow' },
  { keywords: ['pytorch'], icon: 'SiPytorch' },
  { keywords: ['pandas'], icon: 'SiPandas' },
  { keywords: ['numpy'], icon: 'SiNumpy' },
  { keywords: ['vite'], icon: 'SiVite' },
];

function findComponentByName(name) {
  for (const pack of ICON_PACKS) {
    if (pack[name]) return pack[name];
  }
  return null;
}

function autoIconBySkill(name, category) {
  const normalizedName = String(name || '').toLowerCase().trim();
  const matchedRule = AUTO_ICON_RULES.find((rule) => rule.keywords.some((keyword) => normalizedName.includes(keyword)));
  const iconName = matchedRule?.icon || CATEGORY_DEFAULTS[String(category || '').toLowerCase()] || '';
  return findComponentByName(iconName);
}

export function resolveSkillIcon(input) {
  const skill = typeof input === 'string' ? { icon: input } : input || {};
  const manualIcon = String(skill.icon || '').trim();
  const iconFile = String(skill.icon_file || '').trim();

  if (iconFile) {
    return { type: 'image', value: iconFile };
  }

  if (!manualIcon) {
    const auto = autoIconBySkill(skill.name, skill.category);
    return auto ? { type: 'component', value: auto } : null;
  }

  if (manualIcon.startsWith('http://') || manualIcon.startsWith('https://') || manualIcon.startsWith('/')) {
    return { type: 'image', value: manualIcon };
  }

  const manualComponent = findComponentByName(manualIcon);
  if (manualComponent) {
    return { type: 'component', value: manualComponent };
  }

  const auto = autoIconBySkill(skill.name, skill.category);
  if (auto) {
    return { type: 'component', value: auto };
  }

  return { type: 'text', value: manualIcon };
}
