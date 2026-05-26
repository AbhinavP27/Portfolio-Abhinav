import CrudManager from './CrudManager';

const fields = [
  { name: 'name', label: 'Skill Name' },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { value: 'frontend', label: 'Frontend' },
      { value: 'backend', label: 'Backend' },
      { value: 'tools', label: 'Tools' },
      { value: 'ai', label: 'AI' },
    ],
  },
  { name: 'icon', label: 'Icon Name (optional, e.g. SiReact)' },
  { name: 'icon_file', label: 'Icon File (optional)', type: 'file' },
  { name: 'proficiency', label: 'Proficiency', type: 'number', defaultValue: 80 },
  { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
];

function SkillsManagement() {
  return <CrudManager endpoint="skills" title="Skills Management" fields={fields} />;
}

export default SkillsManagement;
