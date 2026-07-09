'use client';

import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const stats = [
  { icon: Eye, label: 'Total Visitors', value: '24,532', change: '+12.5%', positive: true },
  { icon: MousePointerClick, label: 'Page Views', value: '89,201', change: '+8.2%', positive: true },
  { icon: Users, label: 'Unique Users', value: '12,847', change: '-2.4%', positive: false },
  { icon: TrendingUp, label: 'Avg. Session', value: '4m 32s', change: '+5.7%', positive: true },
];

const topPages = [
  { path: '/', views: 12450, bounce: '32%', avgTime: '3m 45s' },
  { path: '/pricing', views: 8920, bounce: '28%', avgTime: '4m 12s' },
  { path: '/features', views: 7650, bounce: '25%', avgTime: '5m 30s' },
  { path: '/docs', views: 5430, bounce: '18%', avgTime: '6m 15s' },
  { path: '/blog', views: 3210, bounce: '45%', avgTime: '2m 50s' },
];

const dailyData = [
  { day: 'Mon', visitors: 1200, pageViews: 4500 },
  { day: 'Tue', visitors: 1350, pageViews: 5100 },
  { day: 'Wed', visitors: 1420, pageViews: 5300 },
  { day: 'Thu', visitors: 1380, pageViews: 4900 },
  { day: 'Fri', visitors: 1500, pageViews: 5600 },
  { day: 'Sat', visitors: 1100, pageViews: 3800 },
  { day: 'Sun', visitors: 980, pageViews: 3500 },
];

export default function AnalyticsPage() {
  const maxViews = Math.max(...dailyData.map((d) => d.pageViews));

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
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-1">Track your project performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              Last 7 Days
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.positive ? 'text-emerald-500' : 'text-destructive'}`}>
                    {stat.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Traffic Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-48">
                {dailyData.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center gap-0.5">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-primary/60 to-primary/30 transition-all hover:from-primary/80"
                        style={{ height: `${(day.pageViews / maxViews) * 100}%` }}
                      />
                      <div
                        className="w-full rounded-t-md bg-purple-500/40 transition-all hover:bg-purple-500/60"
                        style={{ height: `${(day.visitors / maxViews) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded bg-primary/60" />
                  Page Views
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2.5 w-2.5 rounded bg-purple-500/40" />
                  Visitors
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {topPages.map((page) => (
                  <div key={page.path} className="flex items-center justify-between p-3">
                    <div>
                      <p className="text-sm font-medium font-mono">{page.path}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                        <span>{page.views.toLocaleString()} views</span>
                        <span>·</span>
                        <span>{page.bounce} bounce</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{page.avgTime}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Real-Time Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Now', value: '24' },
                { label: 'Page Views/Min', value: '12' },
                { label: 'Top Source', value: 'Direct' },
                { label: 'Top Page', value: '/' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-xl font-bold mt-1">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
}
