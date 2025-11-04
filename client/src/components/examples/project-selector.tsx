import { useState } from 'react';
import { ProjectSelector } from '../project-selector';

export default function ProjectSelectorExample() {
  const [currentId, setCurrentId] = useState('1');
  const projects = [
    { id: '1', name: 'Travel Campaign' },
    { id: '2', name: 'Product Launch' },
    { id: '3', name: 'Documentary Series' },
  ];

  return (
    <div className="p-4 max-w-md">
      <ProjectSelector
        projects={projects}
        currentProjectId={currentId}
        onProjectChange={setCurrentId}
        onRenameProject={() => console.log('Rename project')}
      />
    </div>
  );
}
