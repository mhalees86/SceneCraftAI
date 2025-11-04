import { Button } from "@/components/ui/button";
import { Plus, X, Copy } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Scene {
  id: string;
  name: string;
  mode: 'manual' | 'ai';
}

interface SceneTabsProps {
  scenes: Scene[];
  activeSceneId: string;
  onSceneSelect: (sceneId: string) => void;
  onAddScene: () => void;
  onDeleteScene: (sceneId: string) => void;
  onDuplicateScene: (sceneId: string) => void;
}

export function SceneTabs({ 
  scenes, 
  activeSceneId, 
  onSceneSelect, 
  onAddScene, 
  onDeleteScene,
  onDuplicateScene 
}: SceneTabsProps) {
  return (
    <div className="border-b border-border">
      <ScrollArea className="w-full">
        <div className="flex items-center gap-1 px-4 min-h-12">
          {scenes.map((scene) => (
            <div
              key={scene.id}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors group ${
                activeSceneId === scene.id
                  ? 'bg-card border-b-2 border-primary'
                  : 'hover-elevate'
              }`}
              data-testid={`tab-scene-${scene.id}`}
            >
              <button
                onClick={() => onSceneSelect(scene.id)}
                className="text-sm font-medium whitespace-nowrap"
              >
                {scene.name}
              </button>
              <Badge variant="secondary" className="text-xs no-default-hover-elevate no-default-active-elevate">
                {scene.mode === 'ai' ? 'AI' : 'Manual'}
              </Badge>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateScene(scene.id);
                  }}
                  data-testid={`button-duplicate-${scene.id}`}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                {scenes.length > 1 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteScene(scene.id);
                    }}
                    data-testid={`button-delete-${scene.id}`}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddScene}
            className="gap-2"
            data-testid="button-add-scene"
          >
            <Plus className="h-4 w-4" />
            Add Scene
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
