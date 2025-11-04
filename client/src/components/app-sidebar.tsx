import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Film, Settings, HelpCircle, Plus, FileDown, Star, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

interface AppSidebarProps {
  onNewProject?: () => void;
  onExportAll?: () => void;
}

export function AppSidebar({ onNewProject, onExportAll }: AppSidebarProps) {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <Film className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold" data-testid="text-app-title">PromptStudio</h1>
            <p className="text-xs text-muted-foreground">AI Video Creator</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <div className="space-y-2 mb-6">
          <Link href="/">
            <SidebarMenuButton 
              className={location === '/' ? 'bg-sidebar-accent' : ''}
              data-testid="link-studio"
            >
              <Video className="h-4 w-4" />
              <span>Studio</span>
            </SidebarMenuButton>
          </Link>
          <Link href="/favorites">
            <SidebarMenuButton 
              className={location === '/favorites' ? 'bg-sidebar-accent' : ''}
              data-testid="link-favorites"
            >
              <Star className="h-4 w-4" />
              <span>Favorites</span>
            </SidebarMenuButton>
          </Link>
        </div>

        <div className="space-y-4">
          <Button 
            variant="default" 
            className="w-full justify-start gap-2" 
            onClick={onNewProject}
            data-testid="button-new-project"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2"
            onClick={onExportAll}
            data-testid="button-export-all"
          >
            <FileDown className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-4 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton data-testid="button-settings">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton data-testid="button-help">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
