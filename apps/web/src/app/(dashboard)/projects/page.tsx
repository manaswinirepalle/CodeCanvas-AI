'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Plus,
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Globe,
  Code2,
  ExternalLink,
  Clock,
  Star,
  Filter,
} from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const projects = [
  {
    id: '1',
    name: 'Marketing Landing Page',
    type: 'Landing Page',
    framework: 'Next.js',
    status: 'Live',
    updated: '2 hours ago',
    deployments: 12,
    thumbnail: null,
    starred: true,
  },
  {
    id: '2',
    name: 'Admin Dashboard',
    type: 'Dashboard',
    framework: 'React',
    status: 'Building',
    updated: '5 hours ago',
    deployments: 8,
    thumbnail: null,
    starred: false,
  },
  {
    id: '3',
    name: 'E-commerce API',
    type: 'API',
    framework: 'NestJS',
    status: 'Live',
    updated: '1 day ago',
    deployments: 24,
    thumbnail: null,
    starred: true,
  },
  {
    id: '4',
    name: 'Portfolio Website',
    type: 'Website',
    framework: 'Next.js',
    status: 'Draft',
    updated: '2 days ago',
    deployments: 3,
    thumbnail: null,
    starred: false,
  },
  {
    id: '5',
    name: 'SaaS Dashboard',
    type: 'Dashboard',
    framework: 'Next.js',
    status: 'Live',
    updated: '3 days ago',
    deployments: 15,
    thumbnail: null,
    starred: false,
  },
  {
    id: '6',
    name: 'Mobile App API',
    type: 'API',
    framework: 'NestJS',
    status: 'Draft',
    updated: '1 week ago',
    deployments: 0,
    thumbnail: null,
    starred: false,
  },
];

export default function ProjectsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground mt-1">
              {projects.length} total projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('grid')}
              className={view === 'grid' ? 'bg-accent' : ''}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView('list')}
              className={view === 'list' ? 'bg-accent' : ''}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsNewProjectOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Projects */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/editor/${project.id}`}>
                  <Card className="group hover-lift cursor-pointer overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5 flex items-center justify-center relative">
                      <Code2 className="h-10 w-10 text-primary/30 group-hover:scale-110 transition-transform" />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-background/50 transition-colors"
                      >
                        <Star
                          className={`h-4 w-4 ${project.starred ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                        />
                      </button>
                      <Badge
                        variant={
                          project.status === 'Live' ? 'success' :
                          project.status === 'Building' ? 'warning' : 'secondary'
                        }
                        className="absolute bottom-3 left-3 text-[10px]"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{project.type}</span>
                        <span>·</span>
                        <span>{project.framework}</span>
                        <span>·</span>
                        <span>{project.deployments} deploys</span>
                      </div>
                      <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{project.updated}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <div className="divide-y divide-border/50">
              {filtered.map((project) => (
                <Link
                  key={project.id}
                  href={`/editor/${project.id}`}
                  className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Code2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{project.name}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span>{project.type}</span>
                        <span>·</span>
                        <span>{project.framework}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        project.status === 'Live' ? 'success' :
                        project.status === 'Building' ? 'warning' : 'secondary'
                      }
                      className="text-[10px]"
                    >
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{project.updated}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Deploy</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        )}
      </motion.div>

      {/* New Project Dialog */}
      <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Choose a name and type for your project. You can also generate one with AI.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input placeholder="My Amazing App" />
            </div>

            <div className="space-y-2">
              <Label>Project Type</Label>
              <Tabs defaultValue="website" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  <TabsTrigger value="website">Website</TabsTrigger>
                  <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>
                <TabsContent value="website" className="text-sm text-muted-foreground pt-2">
                  Create a landing page, portfolio, or full website with AI.
                </TabsContent>
                <TabsContent value="dashboard" className="text-sm text-muted-foreground pt-2">
                  Generate analytics dashboards, admin panels, and data visualizations.
                </TabsContent>
                <TabsContent value="api" className="text-sm text-muted-foreground pt-2">
                  Build REST or GraphQL APIs with full CRUD and authentication.
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>
              Cancel
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
