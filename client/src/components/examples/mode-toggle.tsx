import { useState } from 'react';
import { ModeToggle } from '../mode-toggle';

export default function ModeToggleExample() {
  const [mode, setMode] = useState<'manual' | 'ai'>('manual');
  
  return (
    <div className="p-4">
      <ModeToggle mode={mode} onModeChange={setMode} />
    </div>
  );
}
