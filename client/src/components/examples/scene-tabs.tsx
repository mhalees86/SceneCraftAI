import { useState } from 'react';
import { SceneTabs } from '../scene-tabs';

export default function SceneTabsExample() {
  const [scenes] = useState([
    { id: '1', name: 'Scene 1', mode: 'manual' as const },
    { id: '2', name: 'Scene 2', mode: 'ai' as const },
    { id: '3', name: 'Scene 3', mode: 'manual' as const },
  ]);
  const [activeId, setActiveId] = useState('1');

  return (
    <SceneTabs
      scenes={scenes}
      activeSceneId={activeId}
      onSceneSelect={setActiveId}
      onAddScene={() => console.log('Add scene')}
      onDeleteScene={(id) => console.log('Delete scene', id)}
      onDuplicateScene={(id) => console.log('Duplicate scene', id)}
    />
  );
}
