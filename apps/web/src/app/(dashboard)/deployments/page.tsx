'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cloud,
  Globe,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Copy,
  RefreshCw,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const deployments = [
  {
    id: '1',
    version: 'v2.1.0',
    status: 'LIVE',
    url: 'https://marketing-site.codecanvas.app',
    branch: 'main',
    commit: 'a3f8d2c',
    message: 'Add pricing section and testimonials',
    createdAt: '2 hours ago',
    duration: '45s',
    size: '4.2 MB',
  },
  {
    id: '2',
    version: 'v2.0.0',
    status: 'LIVE',
    url: 'https://v2-marketing-site.codecanvas.app',
    branch: 'main',
    commit: 'b7e1f9a',
    message: 'Rebuild with new design system',
    createdAt: '1 day ago',
    duration: '52s',
    size: '3.8 MB',
  },
  {
    id: '3',
    version: 'v1.3.0',
    status: 'FAILED',
    url: null,
    branch: 'feature/new-hero',
    commit: 'c4d5e6f',
    message: 'Update hero section animation',
    createdAt: '3 hours ago',
    duration: '23s',
    size: null,
  },
  {
    id: '4',
    version: 'v1.2.0',
    status: 'LIVE',
    url: 'https://marketing-site.codecanvas.app',
    branch: 'main',
    commit: 'd1e2f3a',
    message: 'Fix responsive layout issues',
    createdAt: '3 days ago',
    duration: '38s',
    size: '3.5 MB',
  },
];

const stats = [
  { label: 'Total Deployments', value: '47' },
  { label: 'Live Sites', value: '3' },
  { label: 'Failed', value: '5' },
  { label: 'Avg. Duration', value: '42s' },
];

const domains = [
  { domain: 'marketing-site.codecanvas.app', status: 'Active', ssl: true },
  { domain: 'admin-dashboard.codecanvas.app', status: 'Active', ssl: true },
  { domain: 'api.codecanvas.app', status: 'Building', ssl: true },
];

export default function DeploymentsPage() {
  const [selectedProject, setSelectedProject] = useState('Marketing Landing Page');

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
            <p className="text-muted-foreground mt-1">Manage your deployments and domains</p>
          </div>
          <Button className="gap-2">
            <Cloud className="h-4 w-4" />
            New Deployment
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deployment List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Deployments</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {deployments.map((dep) => (
                    <div key={dep.id} className="p-4 hover:bg-accent/30 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'h-8 w-8 rounded-lg flex items-center justify-center',
                            dep.status === 'LIVE' ? 'bg-emerald-500/10 text-emerald-500' :
                            dep.status === 'FAILED' ? 'bg-destructive/10 text-destructive' :
                            'bg-muted text-muted-foreground',
                          )}>
                            {dep.status === 'LIVE' ? <CheckCircle2 className="h-4 w-4" /> :
                             dep.status === 'FAILED' ? <XCircle className="h-4 w-4" /> :
                             <Loader2 className="h-4 w-4 animate-spin" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{dep.version}</span>
                              <Badge variant={dep.status === 'LIVE' ? 'success' : dep.status === 'FAILED' ? 'destructive' : 'warning'} className="text-[10px]">
                                {dep.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{dep.message}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{dep.createdAt}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <RotateCcw className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="font-mono">{dep.branch}</span>
                        <span className="font-mono">{dep.commit}</span>
                        <span>{dep.duration}</span>
                        {dep.size && <span>{dep.size}</span>}
                      </div>
                      {dep.url && (
                        <div className="mt-2 flex items-center gap-1 text-xs">
                          <Globe className="h-3 w-3 text-emerald-500" />
                          <a href={`https://${dep.url}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {dep.url}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Domains */}
            <Card>
              <CardHeader>
                <CardTitle>Custom Domains</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {domains.map((d) => (
                  <div key={d.domain} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-medium">{d.domain}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={d.status === 'Active' ? 'success' : 'warning'} className="text-[10px]">
                        {d.status}
                      </Badge>
                      {d.ssl && <span className="text-[10px] text-emerald-500">SSL</span>}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2 text-xs">
                  Add Domain
                </Button>
              </CardContent>
            </Card>

            {/* Quick Deploy */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Deploy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="default" className="w-full gap-2">
                  <Cloud className="h-4 w-4" />
                  Deploy Current Branch
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Redeploy Latest
                </Button>
                <Separator />
                <div className="text-xs text-muted-foreground">
                  <p>Last deployed 2 hours ago from main</p>
                  <p className="mt-1">Auto-deploy: Enabled</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
