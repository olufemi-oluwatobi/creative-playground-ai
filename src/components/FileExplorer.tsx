import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, File, Folder, Plus, MoreHorizontal } from "lucide-react";

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  isOpen?: boolean;
}

const initialFiles: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        name: 'components',
        type: 'folder',
        isOpen: true,
        children: [
          { name: 'App.tsx', type: 'file' },
          { name: 'Header.tsx', type: 'file' },
        ]
      },
      { name: 'App.tsx', type: 'file' },
      { name: 'index.css', type: 'file' },
      { name: 'main.tsx', type: 'file' },
    ]
  },
  { name: 'package.json', type: 'file' },
  { name: 'vite.config.ts', type: 'file' },
];

const FileTreeNode = ({ node, level = 0 }: { node: FileNode; level?: number }) => {
  const [isOpen, setIsOpen] = useState(node.isOpen || false);

  const handleToggle = () => {
    if (node.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div 
        className={`flex items-center gap-1 py-1 px-2 hover:bg-secondary/50 cursor-pointer text-sm rounded-md mx-1`}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleToggle}
      >
        {node.type === 'folder' ? (
          <>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            <Folder className="w-4 h-4 text-primary" />
          </>
        ) : (
          <>
            <div className="w-4" />
            <File className="w-4 h-4 text-muted-foreground" />
          </>
        )}
        <span className="text-foreground">{node.name}</span>
      </div>
      
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileExplorer = () => {
  return (
    <div className="w-64 bg-sidebar-bg border-r border-border flex flex-col">
      <div className="h-10 border-b border-border flex items-center justify-between px-3">
        <span className="text-sm font-medium text-foreground">Explorer</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Plus className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        {initialFiles.map((file, index) => (
          <FileTreeNode key={index} node={file} />
        ))}
      </div>
    </div>
  );
};