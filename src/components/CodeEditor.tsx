import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Code, FileText } from "lucide-react";

const mockCode = `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Lovable Clone</h1>
        <p>An AI-powered code sandbox for the web</p>
        <div className="counter">
          <button onClick={() => setCount(count - 1)}>-</button>
          <span>Count: {count}</span>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </header>
    </div>
  );
}

export default App;`;

const mockCSS = `.App {
  text-align: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.App-header {
  color: white;
  padding: 2rem;
}

.App-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.counter {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.counter button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.counter button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.counter span {
  font-size: 1.2rem;
  font-weight: bold;
}`;

interface Tab {
  id: string;
  name: string;
  content: string;
  icon: React.ReactNode;
}

const initialTabs: Tab[] = [
  {
    id: 'app-tsx',
    name: 'App.tsx',
    content: mockCode,
    icon: <Code className="w-4 h-4" />
  },
  {
    id: 'app-css',
    name: 'App.css',
    content: mockCSS,
    icon: <FileText className="w-4 h-4" />
  }
];

export const CodeEditor = () => {
  const [tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState('app-tsx');

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content || '';

  return (
    <div className="flex-1 flex flex-col bg-editor-bg">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-border">
          <TabsList className="h-10 bg-transparent border-0 rounded-none">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-secondary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 h-10 flex items-center gap-2"
              >
                {tab.icon}
                {tab.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="flex-1 m-0">
            <div className="h-full">
              <textarea
                value={tab.content}
                onChange={(e) => {
                  const newTabs = tabs.map(t => 
                    t.id === tab.id ? { ...t, content: e.target.value } : t
                  );
                  setTabs(newTabs);
                }}
                className="w-full h-full p-4 bg-editor-bg text-foreground font-mono text-sm resize-none outline-none border-0"
                style={{ 
                  lineHeight: '1.5',
                  tabSize: 2
                }}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};