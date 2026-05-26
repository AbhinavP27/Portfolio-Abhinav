import CrudManager from './CrudManager';

const fields = [
  { name: 'section_label', label: 'Section Label', defaultValue: 'About' },
  { name: 'heading', label: 'Heading', full: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 6, full: true },
];

function AboutManagement() {
  return <CrudManager endpoint="about" title="About Section Management" fields={fields} singleRecord />;
}

export default AboutManagement;
