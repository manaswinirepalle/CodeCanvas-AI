'use client';

import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  MoreHorizontal,
  Mail,
  Clock,
  Shield,
  Crown,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const teamMembers = [
  { name: 'John Doe', email: 'john@codecanvas.app', role: 'Owner', avatar: null, status: 'online', lastActive: 'Now' },
  { name: 'Sarah Smith', email: 'sarah@codecanvas.app', role: 'Admin', avatar: null, status: 'online', lastActive: '5m ago' },
  { name: 'Mike Johnson', email: 'mike@codecanvas.app', role: 'Member', avatar: null, status: 'away', lastActive: '1h ago' },
  { name: 'Emily Brown', email: 'emily@codecanvas.app', role: 'Member', avatar: null, status: 'offline', lastActive: '1d ago' },
  { name: 'Alex Wilson', email: 'alex@codecanvas.app', role: 'Viewer', avatar: null, status: 'offline', lastActive: '3d ago' },
];

export default function TeamPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team</h1>
            <p className="text-muted-foreground mt-1">Manage your workspace members</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Member List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Members (5)</CardTitle>
                <CardDescription>Manage who has access to this workspace</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {teamMembers.map((member) => (
                    <div key={member.email} className="flex items-center justify-between p-4 hover:bg-accent/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar || undefined} />
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${
                            member.status === 'online' ? 'bg-emerald-500' :
                            member.status === 'away' ? 'bg-orange-500' : 'bg-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{member.name}</p>
                            {member.role === 'Owner' && <Crown className="h-3.5 w-3.5 text-amber-500" />}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                            <span>{member.email}</span>
                            <span>·</span>
                            <span>Active {member.lastActive}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          member.role === 'Owner' ? 'default' :
                          member.role === 'Admin' ? 'info' :
                          member.role === 'Member' ? 'secondary' : 'outline'
                        } className="text-[10px]">
                          {member.role}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem>Transfer Ownership</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Invite */}
            <Card>
              <CardHeader>
                <CardTitle>Invite People</CardTitle>
                <CardDescription>Send an invitation to join your workspace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input placeholder="Email address" className="flex-1" />
                  <Button>Send</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Admin', 'Member', 'Viewer'].map((role) => (
                    <Badge key={role} variant={role === 'Member' ? 'default' : 'outline'} className="cursor-pointer">
                      {role}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Roles */}
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { role: 'Owner', icon: Crown, description: 'Full access to all settings and billing' },
                  { role: 'Admin', icon: Shield, description: 'Can manage members and projects' },
                  { role: 'Member', icon: Users, description: 'Can create and edit projects' },
                  { role: 'Viewer', icon: Mail, description: 'Read-only access to projects' },
                ].map((r) => (
                  <div key={r.role} className="flex items-start gap-3">
                    <r.icon className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{r.role}</p>
                      <p className="text-xs text-muted-foreground">{r.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
