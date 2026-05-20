import CrudManager from './CrudManager';

const fields = [
  { name: 'company', label: 'Company' },
  { name: 'position', label: 'Position' },
  { name: 'start_date', label: 'Start Date', type: 'date' },
  { name: 'end_date', label: 'End Date', type: 'date' },
  { name: 'is_current', label: 'Current Role', type: 'boolean', defaultValue: false },
  { name: 'description', label: 'Description', type: 'textarea', full: true },
  { name: 'achievements', label: 'Achievements (comma-separated)', type: 'array', full: true },
  { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
];

function ExperienceManagement() {
  return <CrudManager endpoint="experience" title="Experience Management" fields={fields} />;
}

export default ExperienceManagement;
