import CrudManager from './CrudManager';

const fields = [
  { name: 'headline', label: 'Title', full: true },
  { name: 'subheadline', label: 'Subtitle', full: true },
  { name: 'intro_text', label: 'Intro Text', type: 'textarea', rows: 4, full: true },
  { name: 'primary_button_label', label: 'Primary Button Label' },
  { name: 'primary_button_url', label: 'Primary Button URL' },
  { name: 'secondary_button_label', label: 'Secondary Button Label' },
  { name: 'secondary_button_url', label: 'Secondary Button URL' },
  { name: 'contact_email', label: 'Email', type: 'email', full: true },
  { name: 'contact_phone', label: 'Phone Number', full: true },
  { name: 'github_url', label: 'GitHub URL', type: 'url', full: true },
  { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url', full: true },
  { name: 'resume_file', label: 'Resume File', type: 'file' },
  { name: 'profile_image', label: 'Profile Image', type: 'file' },
  { name: 'alternate_profile_image', label: 'Reveal Image', type: 'file' },
];

function HeroManagement() {
  return <CrudManager endpoint="hero" title="Hero Section Management" fields={fields} singleRecord />;
}

export default HeroManagement;
