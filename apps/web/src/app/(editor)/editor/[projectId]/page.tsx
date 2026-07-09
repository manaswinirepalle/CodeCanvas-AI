'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  File,
  Folder,
  Plus,
  ChevronRight,
  ChevronDown,
  Terminal,
  Play,
  Cloud,
  Save,
  Undo2,
  Redo2,
  Settings2,
  PanelRightOpen,
  MoreHorizontal,
  GitBranch,
  Search,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const fileTree = [
  { name: 'src', type: 'folder', children: [
    { name: 'app', type: 'folder', children: [
      { name: 'page.tsx', type: 'file' },
      { name: 'layout.tsx', type: 'file' },
      { name: 'globals.css', type: 'file' },
    ]},
    { name: 'components', type: 'folder', children: [
      { name: 'Header.tsx', type: 'file' },
      { name: 'Footer.tsx', type: 'file' },
      { name: 'Sidebar.tsx', type: 'file' },
    ]},
    { name: 'lib', type: 'folder', children: [
      { name: 'utils.ts', type: 'file' },
      { name: 'api.ts', type: 'file' },
    ]},
  ]},
  { name: 'public', type: 'folder', children: [
    { name: 'images', type: 'folder', children: [] },
  ]},
  { name: 'package.json', type: 'file' },
  { name: 'tsconfig.json', type: 'file' },
  { name: 'tailwind.config.ts', type: 'file' },
  { name: 'next.config.js', type: 'file' },
];

const tabs = [
  { id: '1', name: 'page.tsx', active: true },
  { id: '2', name: 'layout.tsx', active: false },
  { id: '3', name: 'Header.tsx', active: false },
];

const codeContent = `import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Welcome to CodeCanvas AI
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered development environment
        </p>
        <Button onClick={() => setCount(count + 1)}>
          Count: {count}
        </Button>
      </div>
    </motion.div>
  );
}`;

function FileTreeNode({ node, depth = 0 }: { node: { name: string; type: string; children?: any[] }; depth?: number }) {
  const [expanded, setExpanded] = useState(true);

  if (node.type === 'file') {
    return (
      <button className={cn(
        'w-full flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-accent transition-colors text-left',
        'text-muted-foreground hover:text-foreground',
      )} style={{ paddingLeft: `${12 + depth * 16}px` }}>
        <File className="h-3.5 w-3.5 text-primary/60 shrink-0" />
        <span className="truncate">{node.name}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-accent transition-colors text-left text-muted-foreground hover:text-foreground"
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {expanded ? <ChevronDown className="h-3.5 w-3.5 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
        <Folder className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        <span className="font-medium">{node.name}</span>
      </button>
      {expanded && node.children?.map((child) => (
        <FileTreeNode key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function EditorPage({ params }: { params: { projectId: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between h-12 px-4 border-b border-border/50 bg-card/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-primary via-purple-500 to-cyan-500 flex items-center justify-center">
              <Code2 className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium">Marketing Landing Page</span>
          </div>
          <Separator orientation="vertical" className="h-5" />
          <Badge variant="outline" className="gap-1 text-[10px]">
            <GitBranch className="h-3 w-3" />
            main
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Undo2 className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Redo2 className="h-3.5 w-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-5 mx-1" />
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Save className="h-3.5 w-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-5 mx-1" />
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Search className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings2 className="h-3.5 w-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-5 mx-1" />
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <PanelRightOpen className="h-3.5 w-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-5 mx-1" />
          <Button size="sm" className="h-7 gap-1 text-xs">
            <Play className="h-3 w-3" />
            Run
          </Button>
          <Button size="sm" variant="gradient" className="h-7 gap-1 text-xs">
            <Cloud className="h-3 w-3" />
            Deploy
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* File Explorer */}
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-r border-border/50 bg-card/30 overflow-hidden shrink-0"
          >
            <div className="flex items-center justify-between h-10 px-4 border-b border-border/50">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Files</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <ScrollArea className="h-full pb-12">
              <div className="py-2">
                <FileTreeNode node={{ name: 'project', type: 'folder', children: fileTree }} depth={0} />
              </div>
            </ScrollArea>
          </motion.aside>
        )}

        {/* Code Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex items-center h-10 border-b border-border/50 bg-card/20 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 h-full text-xs border-r border-border/50 whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-background text-foreground border-t-2 border-t-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <Code2 className="h-3 w-3 text-primary/60" />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Code Editor */}
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 overflow-auto p-4">
              <pre className="text-sm font-mono leading-relaxed text-foreground/90">
                <code>{codeContent}</code>
              </pre>
            </div>
          </div>

          {/* Terminal */}
          {terminalOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 180 }}
              exit={{ height: 0 }}
              className="border-t border-border/50 bg-card/30"
            >
              <div className="flex items-center justify-between h-8 px-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Terminal</span>
                </div>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setTerminalOpen(false)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="p-4 font-mono text-xs text-muted-foreground space-y-1">
                <p className="text-green-500">$ npm run dev</p>
                <p>&gt; codecanvas@1.0.0 dev</p>
                <p>&gt; next dev</p>
                <p className="text-cyan-500">  ✓ Ready in 2.3s</p>
                <p className="text-cyan-500">  ✓ Local: http://localhost:3000</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <footer className="flex items-center justify-between h-7 px-4 border-t border-border/50 bg-card/50 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Ln 12, Col 24</span>
          <span>TypeScript</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setTerminalOpen(!terminalOpen)} className="hover:text-foreground transition-colors flex items-center gap-1">
            <Terminal className="h-3 w-3" />
            Terminal
          </button>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Connected
          </span>
        </div>
      </footer>
    </div>
  );
}
