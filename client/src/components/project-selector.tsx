import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

interface ProjectSelectorProps {
  projects: Project[];
  currentProjectId: string;
  onProjectChange: (projectId: string) => void;
  onRenameProject?: () => void;
}

export function ProjectSelector({ 
  projects, 
  currentProjectId, 
  onProjectChange,
  onRenameProject
}: ProjectSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={currentProjectId} onValueChange={onProjectChange}>
        <SelectTrigger className="flex-1" data-testid="select-project">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {onRenameProject && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onRenameProject}
          data-testid="button-rename-project"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
