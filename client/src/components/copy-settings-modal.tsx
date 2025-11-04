import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import type { Scene } from "@shared/schema";

interface CopySettingsModalProps {
  open: boolean;
  onClose: () => void;
  scenes: Scene[];
  currentSceneId: string;
  onCopySettings: (sourceSceneId: string, targetSceneId: string, includeDescription: boolean) => void;
}

export function CopySettingsModal({ 
  open, 
  onClose, 
  scenes, 
  currentSceneId,
  onCopySettings 
}: CopySettingsModalProps) {
  const [sourceSceneId, setSourceSceneId] = useState(currentSceneId);
  const [targetSceneId, setTargetSceneId] = useState('');
  const [includeDescription, setIncludeDescription] = useState(false);

  const handleCopy = () => {
    if (targetSceneId) {
      onCopySettings(sourceSceneId, targetSceneId, includeDescription);
      onClose();
      setTargetSceneId('');
      setIncludeDescription(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Copy Scene Settings</DialogTitle>
          <DialogDescription>
            Copy parameters from one scene to another
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Copy from</Label>
            <Select value={sourceSceneId} onValueChange={setSourceSceneId}>
              <SelectTrigger data-testid="select-source-scene">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {scenes.map((scene) => (
                  <SelectItem key={scene.id} value={scene.id}>
                    {scene.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Copy to</Label>
            <Select value={targetSceneId} onValueChange={setTargetSceneId}>
              <SelectTrigger data-testid="select-target-scene">
                <SelectValue placeholder="Select target scene" />
              </SelectTrigger>
              <SelectContent>
                {scenes
                  .filter((scene) => scene.id !== sourceSceneId)
                  .map((scene) => (
                    <SelectItem key={scene.id} value={scene.id}>
                      {scene.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="include-description"
              checked={includeDescription}
              onCheckedChange={(checked) => setIncludeDescription(checked as boolean)}
              data-testid="checkbox-include-description"
            />
            <label
              htmlFor="include-description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Include description
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} data-testid="button-cancel-copy">
            Cancel
          </Button>
          <Button 
            onClick={handleCopy} 
            disabled={!targetSceneId}
            data-testid="button-confirm-copy"
          >
            Copy Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
