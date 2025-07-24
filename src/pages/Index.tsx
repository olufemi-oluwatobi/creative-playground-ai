import { Header } from "@/components/Header";
import { FileExplorer } from "@/components/FileExplorer";
import { CodeEditor } from "@/components/CodeEditor";
import { Preview } from "@/components/Preview";
import { AIChat } from "@/components/AIChat";

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <FileExplorer />
        <div className="flex-1 flex">
          <CodeEditor />
          <Preview />
        </div>
        <AIChat />
      </div>
    </div>
  );
};

export default Index;