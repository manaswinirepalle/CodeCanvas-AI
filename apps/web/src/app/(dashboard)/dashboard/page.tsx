'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  FolderKanban,
  Cloud,
  Code2,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const stats = [
  { icon: FolderKanban, label: 'Total Projects', value: '12', change: '+3 this week', color: 'text-primary' },
  { icon: Cloud, label: 'Live Deployments', value: '8', change: '2 pending', color: 'text-emerald-500' },
  { icon: Sparkles, label: 'AI Generations', value: '147', change: '24 today', color: 'text-purple-500' },
  { icon: TrendingUp, label: 'Analytics', value: '2.4K', change: '+18% vs last week', color: 'text-cyan-500' },
];

const recentProjects = [
  { name: 'Marketing Landing Page', type: 'Landing Page', status: 'Live', updated: '2 hours ago', deployment: 'v2.1.0' },
  { name: 'Admin Dashboard', type: 'Dashboard', status: 'Building', updated: '5 hours ago', deployment: 'v1.3.0' },
  { name: 'E-commerce API', type: 'API', status: 'Live', updated: '1 day ago', deployment: 'v3.0.1' },
  { name: 'Portfolio Website', type: 'Website', status: 'Draft', updated: '2 days ago', deployment: '-' },
];

const aiUsage = [
  { agent: 'Frontend Agent', tokens: 12450, time: '2m 34s', status: 'completed' },
  { agent: 'Backend Agent', tokens: 8900, time: '1m 52s', status: 'completed' },
  { agent: 'Planner Agent', tokens: 5600, time: '45s', status: 'completed' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s your project overview.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              Activity Log
            </Button>
            <Link href="/projects/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <Badge variant="secondary" className="text-[10px]">{stat.change}</Badge>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Projects</CardTitle>
                <Link href="/projects">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.name}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                          <Code2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{project.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-muted-foreground">{project.type}</span>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-muted-foreground">{project.updated}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            project.status === 'Live' ? 'success' :
                            project.status === 'Building' ? 'warning' : 'secondary'
                          }
                          className="text-[10px]"
                        >
                          {project.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">{project.deployment}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Activity */}
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiUsage.map((item) => (
                    <div key={item.agent} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.agent}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                          {item.status === 'completed' && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          )}
                        </div>
                      </div>
                      <Progress value={75} className="h-1.5" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{item.tokens.toLocaleString()} tokens</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4 gap-2">
                  <Sparkles className="h-4 w-4" />
                  Open AI Studio
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { icon: Sparkles, label: 'Generate with AI', href: '/dashboard/ai' },
                  { icon: Code2, label: 'Open Editor', href: '/editor' },
                  { icon: Cloud, label: 'Deploy Project', href: '/deployments' },
                  { icon: Users, label: 'Invite Team', href: '/team' },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-10">
                      <action.icon className="h-4 w-4 text-muted-foreground" />
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
