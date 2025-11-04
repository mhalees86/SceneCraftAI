import { AppSidebar } from '../app-sidebar';

export default function AppSidebarExample() {
  return (
    <AppSidebar 
      onNewProject={() => console.log('New project clicked')}
      onExportAll={() => console.log('Export all clicked')}
    />
  );
}
