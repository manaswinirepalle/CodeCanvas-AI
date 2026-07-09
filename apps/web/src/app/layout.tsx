import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from 'sonner';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | CodeCanvas AI',
    default: 'CodeCanvas AI — From Prompt to Production',
  },
  description: 'AI-powered software development platform. Build, deploy, and manage applications from natural language descriptions.',
  keywords: ['AI', 'development', 'website builder', 'no-code', 'deployment', 'SaaS'],
  authors: [{ name: 'CodeCanvas AI' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CodeCanvas AI',
    title: 'CodeCanvas AI — From Prompt to Production',
    description: 'Build applications from natural language descriptions with AI.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodeCanvas AI — From Prompt to Production',
    description: 'Build applications from natural language descriptions with AI.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
