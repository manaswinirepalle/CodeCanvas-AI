'use client';

import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useAuth } from '@/providers/auth-provider';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Sidebar
        userName={user?.name || undefined}
        userEmail={user?.email || undefined}
        avatarUrl={user?.avatarUrl || undefined}
      />
      <div className="lg:pl-[260px] transition-all duration-300">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
