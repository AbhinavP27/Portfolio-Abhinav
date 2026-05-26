import { useMemo } from 'react';
import CrudManager from './CrudManager';
import { useCollection } from '../hooks/useCollection';

function ProjectImagesManagement() {
  const { items: projects } = useCollection('projects');

  const fields = useMemo(
    () => [
      {
        name: 'project',
        label: 'Project',
        type: 'select',
        options: projects.map((project) => ({
          value: project.id,
          label: project.title,
        })),
      },
      { name: 'image', label: 'Image', type: 'file' },
      { name: 'caption', label: 'Caption (optional)', full: true },
      { name: 'order', label: 'Order', type: 'number', defaultValue: 0 },
    ],
    [projects],
  );

  return <CrudManager endpoint="project-images" title="Project Images Management" fields={fields} />;
}

export default ProjectImagesManagement;
