import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Smartphone, Tablet, Monitor } from "lucide-react";
import { useState } from "react";

export const Preview = () => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getPreviewClasses = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[375px] h-[667px]';
      case 'tablet':
        return 'w-[768px] h-[1024px]';
      default:
        return 'w-full h-full';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-panel-bg">
      <div className="h-10 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Preview</span>
          <div className="flex items-center gap-1 ml-4">
            <Button
              variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setViewMode('desktop')}
            >
              <Monitor className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setViewMode('tablet')}
            >
              <Tablet className="w-3 h-3" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setViewMode('mobile')}
            >
              <Smartphone className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <RefreshCw className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto flex items-center justify-center">
        <div className={`${getPreviewClasses()} bg-background rounded-lg shadow-card overflow-hidden transition-all duration-300`}>
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
            <div className="text-center text-white p-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Welcome to Lovable Clone
              </h1>
              <p className="text-lg mb-8 opacity-90">
                An AI-powered code sandbox for the web
              </p>
              <div className="flex items-center justify-center gap-4">
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                  -
                </button>
                <span className="text-xl font-bold">Count: 0</span>
                <button className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};