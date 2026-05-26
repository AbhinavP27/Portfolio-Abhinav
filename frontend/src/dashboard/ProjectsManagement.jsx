import CrudManager from './CrudManager';

const fields = [
  { name: 'title', label: 'Project Title', full: true },
  { name: 'slug', label: 'Slug' },
  {
    name: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { value: 'static', label: 'Static' },
      { value: 'dynamic', label: 'Dynamic' },
    ],
    defaultValue: 'dynamic',
  },
  { name: 'summary', label: 'Summary', full: true },
  { name: 'description', label: 'Description', type: 'textarea', rows: 4, full: true },
  { name: 'image', label: 'Project Image', type: 'file' },
  { name: 'tech_stack', label: 'Tech Stack (comma-separated)', type: 'array', full: true },
  { name: 'github_url', label: 'GitHub URL' },
  { name: 'live_url', label: 'Live URL' },
  { name: 'featured', label: 'Featured', type: 'boolean', defaultValue: false },
  { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
];

function ProjectsManagement() {
  return <CrudManager endpoint="projects" title="Projects Management" fields={fields} />;
}

export default ProjectsManagement;
