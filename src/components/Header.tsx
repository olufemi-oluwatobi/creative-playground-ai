import { Button } from "@/components/ui/button";
import { Play, Settings, Share, Download } from "lucide-react";

export const Header = () => {
  return (
    <header className="h-14 bg-panel-bg border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">LC</span>
          </div>
          <span className="font-semibold text-foreground">Lovable Clone</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Untitled Project
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Share className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Download className="w-4 h-4" />
        </Button>
        <Button variant="default" size="sm" className="bg-gradient-primary hover:opacity-90">
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>
      </div>
    </header>
  );
};