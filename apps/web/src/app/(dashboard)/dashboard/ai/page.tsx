'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Cpu,
  Loader2,
  Wand2,
  Code2,
  Palette,
  Database,
  Shield,
  Zap,
  Globe,
  BookOpen,
  TestTube,
  Search,
  ArrowRight,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const agents = [
  { icon: Bot, name: 'Planner', description: 'Architecture & planning', color: 'from-blue-500 to-blue-600' },
  { icon: Palette, name: 'UI Designer', description: 'Visual design & UX', color: 'from-purple-500 to-pink-500' },
  { icon: Code2, name: 'Frontend', description: 'React & Next.js code', color: 'from-cyan-500 to-blue-500' },
  { icon: Cpu, name: 'Backend', description: 'APIs & services', color: 'from-emerald-500 to-teal-500' },
  { icon: Database, name: 'Database', description: 'Schema & queries', color: 'from-orange-500 to-red-500' },
  { icon: Shield, name: 'Security', description: 'Audit & protect', color: 'from-red-500 to-pink-500' },
  { icon: Zap, name: 'Performance', description: 'Optimize & scale', color: 'from-yellow-500 to-orange-500' },
  { icon: Globe, name: 'SEO', description: 'Search optimization', color: 'from-green-500 to-emerald-500' },
  { icon: BookOpen, name: 'Documentation', description: 'Docs & guides', color: 'from-indigo-500 to-purple-500' },
  { icon: TestTube, name: 'Testing', description: 'Tests & QA', color: 'from-pink-500 to-rose-500' },
];

const suggestions = [
  'Create a landing page for a SaaS product with pricing, features, and testimonials',
  'Build a dashboard with charts, tables, and user management',
  'Design a REST API with authentication, CRUD, and rate limiting',
  'Generate a database schema for an e-commerce platform',
  'Create a portfolio website with dark mode and animations',
];

type Message = {
  role: 'user' | 'assistant';
  content: string;
  agent?: string;
};

export default function AiStudioPage() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('PLANNER');
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: `I'll help you build that! Here's my analysis and recommendations based on your request.\n\n## Architecture Overview\n\nBased on your requirements, I recommend the following architecture:\n\n1. **Frontend**: Next.js with TypeScript and Tailwind CSS\n2. **Backend**: NestJS with REST API\n3. **Database**: PostgreSQL with Prisma ORM\n4. **Deployment**: Docker + Vercel\n\n## Key Components\n\n- Authentication module with JWT\n- Responsive layout with glassmorphism design\n- API integration layer\n- State management with Zustand\n\n## Next Steps\n\nWould you like me to generate the code for any specific part?`,
        agent: selectedAgent,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const agentsList = [
    { value: 'PLANNER', label: 'Planner Agent' },
    { value: 'UI_DESIGNER', label: 'UI Designer' },
    { value: 'FRONTEND', label: 'Frontend Developer' },
    { value: 'BACKEND', label: 'Backend Developer' },
    { value: 'DATABASE', label: 'Database Architect' },
    { value: 'SECURITY', label: 'Security Engineer' },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[calc(100vh-8rem)] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Studio</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Describe what you want to build and let AI create it
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="info" className="gap-1">
              <Sparkles className="h-3 w-3" />
              147 generations left today
            </Badge>
          </div>
        </div>

        <div className="flex gap-4 flex-1 min-h-0">
          {/* Agent Selection Sidebar */}
          <Card className="w-56 shrink-0 hidden lg:block">
            <CardContent className="p-3">
              <p className="text-xs font-medium text-muted-foreground mb-3 px-2">SELECT AGENT</p>
              <div className="space-y-1">
                {agents.map((agent) => (
                  <button
                    key={agent.name}
                    onClick={() => setSelectedAgent(agent.name.toUpperCase().replace(' ', '_'))}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left',
                      selectedAgent === agent.name.toUpperCase().replace(' ', '_')
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <div className={cn('h-6 w-6 rounded-md bg-gradient-to-br flex items-center justify-center', agent.color)}>
                      <agent.icon className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{agent.name}</p>
                      <p className="text-[10px] text-muted-foreground">{agent.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="flex-1 flex flex-col min-h-0">
            <CardContent className="flex-1 flex flex-col p-0">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-lg"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/25">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">What are you building today?</h2>
                    <p className="text-sm text-muted-foreground mb-8">
                      Describe your project in natural language. Our AI agents will design, code, and help you deploy it.
                    </p>

                    <div className="space-y-2 text-left">
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => setPrompt(s)}
                          className="w-full text-left p-3 rounded-lg border border-border/50 hover:bg-accent transition-colors text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                        >
                          <Wand2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                          {s}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4" ref={scrollRef}>
                    <AnimatePresence>
                      {messages.map((message, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn(
                            'flex gap-3',
                            message.role === 'user' ? 'justify-end' : 'justify-start',
                          )}
                        >
                          {message.role === 'assistant' && (
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <div
                            className={cn(
                              'max-w-[80%] rounded-2xl px-4 py-3',
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted/50',
                            )}
                          >
                            {message.agent && message.role === 'assistant' && (
                              <Badge variant="info" className="mb-2 text-[10px]">
                                {message.agent}
                              </Badge>
                            )}
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                            </div>
                          </div>
                          {message.role === 'user' && (
                            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <User className="h-4 w-4" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                      >
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                          <Loader2 className="h-4 w-4 text-white animate-spin" />
                        </div>
                        <div className="bg-muted/50 rounded-2xl px-4 py-3">
                          <div className="flex gap-1">
                            <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
              )}

              {/* Input Area */}
              <div className="border-t border-border/50 p-4">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <div className="relative flex-1">
                    <Input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe what you want to build..."
                      className="pr-24 h-12 text-sm"
                      disabled={isLoading}
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <select
                        value={selectedAgent}
                        onChange={(e) => setSelectedAgent(e.target.value)}
                        className="text-[10px] bg-transparent border border-border rounded px-1.5 py-1 text-muted-foreground outline-none mr-1"
                      >
                        {agentsList.map((a) => (
                          <option key={a.value} value={a.value}>{a.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Button type="submit" size="icon" className="h-12 w-12 shrink-0" disabled={isLoading || !prompt.trim()}>
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
