import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, ExternalLink, Smartphone, Tablet, Monitor, Video } from "lucide-react";
import { useState } from "react";
import { RemotionPlayer } from "./RemotionPlayer";

export const Preview = () => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'remotion'>('preview');

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
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'preview' | 'remotion')} className="flex-1 flex flex-col">
        <div className="h-10 border-b border-border flex items-center justify-between px-4">
          <TabsList className="bg-transparent border-0 h-full">
            <TabsTrigger value="preview" className="data-[state=active]:bg-secondary rounded-md h-8 px-3">
              <Monitor className="w-4 h-4 mr-2" />
              App Preview
            </TabsTrigger>
            <TabsTrigger value="remotion" className="data-[state=active]:bg-secondary rounded-md h-8 px-3">
              <Video className="w-4 h-4 mr-2" />
              Remotion
            </TabsTrigger>
          </TabsList>
          
          {activeTab === 'preview' && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
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
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <RefreshCw className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
        
        <TabsContent value="preview" className="flex-1 m-0">
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
        </TabsContent>
        
        <TabsContent value="remotion" className="flex-1 m-0 overflow-auto">
          <RemotionPlayer />
        </TabsContent>
      </Tabs>
    </div>
  );
};