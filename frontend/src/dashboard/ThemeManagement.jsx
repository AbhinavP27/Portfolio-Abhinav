import CrudManager from './CrudManager';

const fields = [
  { name: 'theme_name', label: 'Theme Name', full: true },
  { name: 'accent_primary', label: 'Primary Accent (hex)' },
  { name: 'accent_secondary', label: 'Secondary Accent (hex)' },
  { name: 'surface_tone', label: 'Surface Tone (hex)' },
  { name: 'glass_blur', label: 'Glass Blur', type: 'number', defaultValue: 18 },
  { name: 'enable_particles', label: 'Enable Particles', type: 'boolean', defaultValue: true },
];

function ThemeManagement() {
  return <CrudManager endpoint="theme" title="Theme Settings" fields={fields} singleRecord />;
}

export default ThemeManagement;
