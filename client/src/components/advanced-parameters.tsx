import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ParameterSelect } from "./parameter-select";
import { Film, Move, Maximize2, Clock, Palette as PaletteIcon, Camera, Layers } from "lucide-react";
import type { SceneParameters } from "@shared/schema";
import { useState } from "react";

interface AdvancedParametersProps {
  parameters: SceneParameters;
  onParameterChange: (key: keyof SceneParameters, value: string) => void;
}

const advancedOptions = {
  cameraMovement: ['Static', 'Pan Left', 'Pan Right', 'Tilt Up', 'Tilt Down', 'Dolly In', 'Dolly Out', 'Tracking Shot', 'Crane Up', 'Crane Down', 'Handheld', 'Steadicam'],
  motionStyle: ['Slow Motion', 'Normal Speed', 'Time Lapse', 'Hyperlapse', 'Stop Motion', 'Smooth', 'Dynamic', 'Fast Paced'],
  aspectRatio: ['16:9', '9:16', '4:3', '1:1', '21:9', '2.39:1', 'Vertical', 'Square'],
  duration: ['5 seconds', '10 seconds', '15 seconds', '30 seconds', '1 minute', '2 minutes', '5 minutes'],
  colorGrading: ['Natural', 'Warm', 'Cool', 'Desaturated', 'High Contrast', 'Vintage', 'Cinematic', 'Noir', 'Pastel', 'Vibrant'],
  filmStock: ['Digital', '35mm', '16mm', '8mm', 'IMAX', 'Anamorphic', 'Super 8', 'VHS'],
  lens: ['Wide Angle', 'Standard', 'Telephoto', 'Fisheye', 'Macro', 'Tilt-Shift', 'Anamorphic'],
  depth: ['Shallow Depth of Field', 'Deep Focus', 'Rack Focus', 'Split Focus', 'Bokeh'],
  transition: ['Cut', 'Fade', 'Dissolve', 'Wipe', 'Match Cut', 'J-Cut', 'L-Cut', 'Crossfade'],
  pacing: ['Slow', 'Medium', 'Fast', 'Rhythmic', 'Contemplative', 'Energetic', 'Urgent'],
  visualStyle: ['Realistic', 'Stylized', 'Abstract', 'Minimalist', 'Maximalist', 'Surreal', 'Photorealistic', 'Artistic'],
  soundscape: ['Ambient', 'Silent', 'Dialogue Heavy', 'Music Driven', 'Sound Effects', 'Voiceover', 'Diegetic', 'Non-Diegetic']
};

export function AdvancedParameters({ parameters, onParameterChange }: AdvancedParametersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
          data-testid="button-toggle-advanced"
        >
          <span className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Advanced Parameters
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <ParameterSelect
            label="Camera Movement"
            value={parameters.cameraMovement || ''}
            options={advancedOptions.cameraMovement}
            onChange={(value) => onParameterChange('cameraMovement', value)}
            icon={Move}
          />
          <ParameterSelect
            label="Motion Style"
            value={parameters.motionStyle || ''}
            options={advancedOptions.motionStyle}
            onChange={(value) => onParameterChange('motionStyle', value)}
            icon={Film}
          />
          <ParameterSelect
            label="Aspect Ratio"
            value={parameters.aspectRatio || ''}
            options={advancedOptions.aspectRatio}
            onChange={(value) => onParameterChange('aspectRatio', value)}
            icon={Maximize2}
          />
          <ParameterSelect
            label="Duration"
            value={parameters.duration || ''}
            options={advancedOptions.duration}
            onChange={(value) => onParameterChange('duration', value)}
            icon={Clock}
          />
          <ParameterSelect
            label="Color Grading"
            value={parameters.colorGrading || ''}
            options={advancedOptions.colorGrading}
            onChange={(value) => onParameterChange('colorGrading', value)}
            icon={PaletteIcon}
          />
          <ParameterSelect
            label="Film Stock"
            value={parameters.filmStock || ''}
            options={advancedOptions.filmStock}
            onChange={(value) => onParameterChange('filmStock', value)}
            icon={Film}
          />
          <ParameterSelect
            label="Lens"
            value={parameters.lens || ''}
            options={advancedOptions.lens}
            onChange={(value) => onParameterChange('lens', value)}
            icon={Camera}
          />
          <ParameterSelect
            label="Depth of Field"
            value={parameters.depth || ''}
            options={advancedOptions.depth}
            onChange={(value) => onParameterChange('depth', value)}
          />
          <ParameterSelect
            label="Transition"
            value={parameters.transition || ''}
            options={advancedOptions.transition}
            onChange={(value) => onParameterChange('transition', value)}
          />
          <ParameterSelect
            label="Pacing"
            value={parameters.pacing || ''}
            options={advancedOptions.pacing}
            onChange={(value) => onParameterChange('pacing', value)}
          />
          <ParameterSelect
            label="Visual Style"
            value={parameters.visualStyle || ''}
            options={advancedOptions.visualStyle}
            onChange={(value) => onParameterChange('visualStyle', value)}
          />
          <ParameterSelect
            label="Soundscape"
            value={parameters.soundscape || ''}
            options={advancedOptions.soundscape}
            onChange={(value) => onParameterChange('soundscape', value)}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
