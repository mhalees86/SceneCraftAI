import { Button } from "@/components/ui/button";
import { Wand2, Settings2 } from "lucide-react";

interface ModeToggleProps {
  mode: 'manual' | 'ai';
  onModeChange: (mode: 'manual' | 'ai') => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2 p-1 bg-muted rounded-lg" data-testid="mode-toggle">
      <Button
        variant={mode === 'manual' ? 'default' : 'ghost'}
        className="flex-1 gap-2"
        onClick={() => onModeChange('manual')}
        data-testid="button-mode-manual"
      >
        <Settings2 className="h-4 w-4" />
        Normal Mode
      </Button>
      <Button
        variant={mode === 'ai' ? 'default' : 'ghost'}
        className="flex-1 gap-2"
        onClick={() => onModeChange('ai')}
        data-testid="button-mode-ai"
      >
        <Wand2 className="h-4 w-4" />
        AI Mode
      </Button>
    </div>
  );
}
