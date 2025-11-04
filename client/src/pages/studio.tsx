import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { SceneTabs } from "@/components/scene-tabs";
import { DescriptionInput } from "@/components/description-input";
import { ParameterSelect } from "@/components/parameter-select";
import { OutputDisplay } from "@/components/output-display";
import { ProjectSelector } from "@/components/project-selector";
import { AdvancedParameters } from "@/components/advanced-parameters";
import { CopySettingsModal } from "@/components/copy-settings-modal";
import { PlatformExportModal } from "@/components/platform-export-modal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2, Camera, Sun, Cloud, Mountain, Palette, Smile, Lightbulb, Frame, Video, Upload, Copy } from "lucide-react";
import type { Scene, Project, SceneParameters } from "@shared/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const parameterOptions = {
  tone: ['Professional', 'Casual', 'Dramatic', 'Upbeat', 'Serene', 'Energetic', 'Mysterious', 'Playful', 'Epic', 'Intimate', 'Whimsical', 'Dark'],
  timeOfDay: ['Dawn', 'Morning', 'Noon', 'Afternoon', 'Golden Hour', 'Dusk', 'Night', 'Blue Hour', 'Twilight', 'Midnight'],
  cameraAngle: ['Eye Level', 'Low Angle', 'High Angle', 'Bird\'s Eye', 'Dutch Angle', 'Over-the-Shoulder', 'POV', 'Worm\'s Eye', 'Aerial'],
  platform: ['YouTube', 'TikTok', 'Instagram Reels', 'Facebook', 'LinkedIn', 'Twitter', 'Veo 3', 'Sora 2', 'Runway', 'General'],
  weather: ['Clear', 'Cloudy', 'Rainy', 'Snowy', 'Foggy', 'Stormy', 'Overcast', 'Sunny', 'Misty', 'Windy', 'Humid'],
  genre: ['Documentary', 'Commercial', 'Cinematic', 'Vlog', 'Tutorial', 'Music Video', 'Short Film', 'Animation', 'Experimental'],
  mood: ['Happy', 'Sad', 'Tense', 'Calm', 'Exciting', 'Melancholic', 'Hopeful', 'Dark', 'Joyful', 'Mysterious', 'Romantic', 'Intense'],
  landscape: ['Urban', 'Rural', 'Mountain', 'Beach', 'Forest', 'Desert', 'Indoor', 'Studio', 'Cityscape', 'Countryside', 'Underwater', 'Space'],
  lighting: ['Natural', 'Studio', 'Low Key', 'High Key', 'Silhouette', 'Backlit', 'Soft', 'Hard', 'Dramatic', 'Ambient', 'Neon', 'Candlelit'],
  framing: ['Close-up', 'Medium Shot', 'Wide Shot', 'Extreme Close-up', 'Full Shot', 'Two Shot', 'Establishing', 'Cowboy Shot', 'Long Shot']
};

export default function Studio() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Travel Campaign',
      scenes: [
        {
          id: '1',
          name: 'Scene 1',
          description: '',
          parameters: {},
          mode: 'manual',
          generatedPrompt: ''
        }
      ]
    }
  ]);

  const [currentProjectId, setCurrentProjectId] = useState('1');
  const [activeSceneId, setActiveSceneId] = useState('1');
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const currentProject = projects.find(p => p.id === currentProjectId)!;
  const activeScene = currentProject.scenes.find(s => s.id === activeSceneId)!;

  const updateScene = (updates: Partial<Scene>) => {
    setProjects(projects.map(project => {
      if (project.id !== currentProjectId) return project;
      return {
        ...project,
        scenes: project.scenes.map(scene => 
          scene.id === activeSceneId ? { ...scene, ...updates } : scene
        )
      };
    }));
  };

  const updateParameter = (key: keyof SceneParameters, value: string) => {
    updateScene({
      parameters: { ...activeScene.parameters, [key]: value }
    });
  };

  const generateManualPrompt = () => {
    const { description, parameters } = activeScene;
    const parts = [description];
    
    if (parameters.genre) parts.push(`Genre: ${parameters.genre}`);
    if (parameters.landscape) parts.push(`Setting: ${parameters.landscape}`);
    if (parameters.timeOfDay) parts.push(`Time: ${parameters.timeOfDay}`);
    if (parameters.weather) parts.push(`Weather: ${parameters.weather}`);
    if (parameters.lighting) parts.push(`Lighting: ${parameters.lighting}`);
    if (parameters.cameraAngle) parts.push(`Camera: ${parameters.cameraAngle}`);
    if (parameters.framing) parts.push(`Framing: ${parameters.framing}`);
    if (parameters.mood) parts.push(`Mood: ${parameters.mood}`);
    if (parameters.tone) parts.push(`Tone: ${parameters.tone}`);
    if (parameters.cameraMovement) parts.push(`Movement: ${parameters.cameraMovement}`);
    if (parameters.motionStyle) parts.push(`Motion: ${parameters.motionStyle}`);
    if (parameters.aspectRatio) parts.push(`Aspect Ratio: ${parameters.aspectRatio}`);
    if (parameters.duration) parts.push(`Duration: ${parameters.duration}`);
    if (parameters.colorGrading) parts.push(`Color: ${parameters.colorGrading}`);
    if (parameters.filmStock) parts.push(`Film Stock: ${parameters.filmStock}`);
    if (parameters.lens) parts.push(`Lens: ${parameters.lens}`);
    if (parameters.depth) parts.push(`Depth: ${parameters.depth}`);
    
    const prompt = parts.filter(p => p).join('. ');
    updateScene({ generatedPrompt: prompt });
  };

  const generateAiPrompt = async () => {
    const { description, parameters } = activeScene;
    
    if (!description && Object.keys(parameters).length === 0) {
      toast({
        title: "Missing information",
        description: "Please add a description or select some parameters first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await apiRequest('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          parameters,
          mode: 'ai'
        }),
      });

      const data = await response.json();
      updateScene({ generatedPrompt: data.prompt });
      
      toast({
        title: "Prompt generated!",
        description: "AI-enhanced prompt is ready to use.",
      });
    } catch (error: any) {
      console.error('Error generating AI prompt:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate AI prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddScene = () => {
    const newSceneId = String(Date.now());
    setProjects(projects.map(project => {
      if (project.id !== currentProjectId) return project;
      return {
        ...project,
        scenes: [...project.scenes, {
          id: newSceneId,
          name: `Scene ${project.scenes.length + 1}`,
          description: '',
          parameters: {},
          mode: 'manual' as const,
          generatedPrompt: ''
        }]
      };
    }));
    setActiveSceneId(newSceneId);
  };

  const handleDeleteScene = (sceneId: string) => {
    setProjects(projects.map(project => {
      if (project.id !== currentProjectId) return project;
      const newScenes = project.scenes.filter(s => s.id !== sceneId);
      if (activeSceneId === sceneId && newScenes.length > 0) {
        setActiveSceneId(newScenes[0].id);
      }
      return { ...project, scenes: newScenes };
    }));
  };

  const handleDuplicateScene = (sceneId: string) => {
    const sceneToDuplicate = currentProject.scenes.find(s => s.id === sceneId);
    if (!sceneToDuplicate) return;
    
    const newSceneId = String(Date.now());
    setProjects(projects.map(project => {
      if (project.id !== currentProjectId) return project;
      return {
        ...project,
        scenes: [...project.scenes, {
          ...sceneToDuplicate,
          id: newSceneId,
          name: `${sceneToDuplicate.name} (Copy)`
        }]
      };
    }));
    setActiveSceneId(newSceneId);
  };

  const handleCopySettings = (sourceSceneId: string, targetSceneId: string, includeDescription: boolean) => {
    const sourceScene = currentProject.scenes.find(s => s.id === sourceSceneId);
    if (!sourceScene) return;

    setProjects(projects.map(project => {
      if (project.id !== currentProjectId) return project;
      return {
        ...project,
        scenes: project.scenes.map(scene => {
          if (scene.id !== targetSceneId) return scene;
          return {
            ...scene,
            parameters: { ...sourceScene.parameters },
            ...(includeDescription && { description: sourceScene.description })
          };
        })
      };
    }));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md">
            <ProjectSelector
              projects={projects}
              currentProjectId={currentProjectId}
              onProjectChange={setCurrentProjectId}
              onRenameProject={() => console.log('Rename project')}
            />
          </div>
          <ModeToggle 
            mode={activeScene.mode} 
            onModeChange={(mode) => updateScene({ mode })} 
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-border">
        <SceneTabs
          scenes={currentProject.scenes}
          activeSceneId={activeSceneId}
          onSceneSelect={setActiveSceneId}
          onAddScene={handleAddScene}
          onDeleteScene={handleDeleteScene}
          onDuplicateScene={handleDuplicateScene}
        />
        
        <div className="px-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" data-testid="button-scene-options">
                <Copy className="h-4 w-4 mr-2" />
                Scene Options
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowCopyModal(true)} data-testid="menu-copy-settings">
                <Copy className="h-4 w-4 mr-2" />
                Copy Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full p-6">
          <div className="flex flex-col gap-6 overflow-auto">
            <DescriptionInput
              value={activeScene.description}
              onChange={(value) => updateScene({ description: value })}
            />

            <Tabs defaultValue="basic" className="flex-1">
              <TabsList className="w-full">
                <TabsTrigger value="basic" className="flex-1">Basic Settings</TabsTrigger>
                <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
                <TabsTrigger value="location" className="flex-1">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <ParameterSelect
                    label="Tone"
                    value={activeScene.parameters.tone || ''}
                    options={parameterOptions.tone}
                    onChange={(value) => updateParameter('tone', value)}
                    icon={Palette}
                  />
                  <ParameterSelect
                    label="Platform"
                    value={activeScene.parameters.platform || ''}
                    options={parameterOptions.platform}
                    onChange={(value) => updateParameter('platform', value)}
                    icon={Video}
                  />
                  <ParameterSelect
                    label="Landscape"
                    value={activeScene.parameters.landscape || ''}
                    options={parameterOptions.landscape}
                    onChange={(value) => updateParameter('landscape', value)}
                    icon={Mountain}
                  />
                  <ParameterSelect
                    label="Weather"
                    value={activeScene.parameters.weather || ''}
                    options={parameterOptions.weather}
                    onChange={(value) => updateParameter('weather', value)}
                    icon={Cloud}
                  />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <ParameterSelect
                    label="Camera Angle"
                    value={activeScene.parameters.cameraAngle || ''}
                    options={parameterOptions.cameraAngle}
                    onChange={(value) => updateParameter('cameraAngle', value)}
                    icon={Camera}
                  />
                  <ParameterSelect
                    label="Genre"
                    value={activeScene.parameters.genre || ''}
                    options={parameterOptions.genre}
                    onChange={(value) => updateParameter('genre', value)}
                  />
                  <ParameterSelect
                    label="Mood"
                    value={activeScene.parameters.mood || ''}
                    options={parameterOptions.mood}
                    onChange={(value) => updateParameter('mood', value)}
                    icon={Smile}
                  />
                  <ParameterSelect
                    label="Framing"
                    value={activeScene.parameters.framing || ''}
                    options={parameterOptions.framing}
                    onChange={(value) => updateParameter('framing', value)}
                    icon={Frame}
                  />
                </div>
                
                <AdvancedParameters
                  parameters={activeScene.parameters}
                  onParameterChange={updateParameter}
                />
              </TabsContent>

              <TabsContent value="location" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <ParameterSelect
                    label="Time of Day"
                    value={activeScene.parameters.timeOfDay || ''}
                    options={parameterOptions.timeOfDay}
                    onChange={(value) => updateParameter('timeOfDay', value)}
                    icon={Sun}
                  />
                  <ParameterSelect
                    label="Lighting"
                    value={activeScene.parameters.lighting || ''}
                    options={parameterOptions.lighting}
                    onChange={(value) => updateParameter('lighting', value)}
                    icon={Lightbulb}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-3">
              <Button 
                variant="default" 
                size="lg" 
                className="flex-1 gap-2 text-base font-semibold"
                onClick={activeScene.mode === 'ai' ? generateAiPrompt : generateManualPrompt}
                disabled={isGenerating}
                data-testid="button-generate"
              >
                <Wand2 className="h-5 w-5" />
                {isGenerating ? 'Generating...' : (activeScene.mode === 'ai' ? 'Generate AI Prompt' : 'Generate Prompt')}
              </Button>
              
              {activeScene.generatedPrompt && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowPlatformModal(true)}
                  data-testid="button-send-platform"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Send to Platform
                </Button>
              )}
            </div>
          </div>

          <div className="overflow-auto">
            <OutputDisplay
              prompt={activeScene.generatedPrompt || ''}
              onRegenerate={activeScene.mode === 'ai' ? generateAiPrompt : undefined}
              onPromptChange={(value) => updateScene({ generatedPrompt: value })}
              isAiMode={activeScene.mode === 'ai'}
            />
          </div>
        </div>
      </div>

      <CopySettingsModal
        open={showCopyModal}
        onClose={() => setShowCopyModal(false)}
        scenes={currentProject.scenes}
        currentSceneId={activeSceneId}
        onCopySettings={handleCopySettings}
      />

      <PlatformExportModal
        open={showPlatformModal}
        onClose={() => setShowPlatformModal(false)}
        prompt={activeScene.generatedPrompt || ''}
      />
    </div>
  );
}
