'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Key,
  LogOut,
  Save,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const sections = [
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: Shield, label: 'Security', id: 'security' },
  { icon: Palette, label: 'Appearance', id: 'appearance' },
  { icon: Key, label: 'API Keys', id: 'api-keys' },
  { icon: CreditCard, label: 'Billing', id: 'billing' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>

        <div className="flex gap-6">
          {/* Side Navigation */}
          <Card className="w-56 shrink-0 h-fit">
            <CardContent className="p-2">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    }`}
                  >
                    <section.icon className="h-4 w-4" />
                    {section.label}
                  </button>
                ))}
                <Separator className="my-2" />
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-all text-left">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </nav>
            </CardContent>
          </Card>

          {/* Content */}
          <div className="flex-1 space-y-6">
            {activeSection === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                      JD
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                      <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="john@example.com" type="email" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Bio</Label>
                      <textarea
                        className="flex min-h-[80px] w-full rounded-lg border border-border bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Tell us about yourself"
                        defaultValue="Building the future with AI."
                      />
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            )}

            {activeSection === 'api-keys' && (
              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage your API keys for programmatic access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button>Generate New Key</Button>
                  <div className="space-y-2">
                    {['Production Key', 'Development Key', 'Staging Key'].map((key) => (
                      <div key={key} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                        <div>
                          <p className="text-sm font-medium">{key}</p>
                          <p className="text-xs font-mono text-muted-foreground">cc_{'•'.repeat(40)}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive">Revoke</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize your interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Toggle between dark and light themes</p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-primary cursor-pointer relative">
                      <div className="h-5 w-5 rounded-full bg-white absolute top-0.5 right-0.5 shadow" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Reduce Motion</p>
                      <p className="text-xs text-muted-foreground">Minimize animations throughout the interface</p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-muted cursor-pointer relative">
                      <div className="h-5 w-5 rounded-full bg-white absolute top-0.5 left-0.5 shadow" />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <div className="flex gap-2">
                      {['Small', 'Medium', 'Large'].map((size) => (
                        <Button key={size} variant={size === 'Medium' ? 'default' : 'outline'} size="sm">
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection !== 'profile' && activeSection !== 'api-keys' && activeSection !== 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{activeSection.replace('-', ' ')}</CardTitle>
                  <CardDescription>Manage your {activeSection} settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Settings panel coming soon.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
