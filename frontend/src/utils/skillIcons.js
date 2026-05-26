import * as FaIcons from 'react-icons/fa6';
import * as SiIcons from 'react-icons/si';

const ICON_PACKS = [SiIcons, FaIcons];

export function resolveSkillIcon(icon) {
  const normalized = String(icon || '').trim();
  if (!normalized) return null;

  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return { type: 'image', value: normalized };
  }

  for (const pack of ICON_PACKS) {
    if (pack[normalized]) {
      return { type: 'component', value: pack[normalized] };
    }
  }

  return { type: 'text', value: normalized };
}
