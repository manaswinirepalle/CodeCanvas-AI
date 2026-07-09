'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, Cloud, Zap, Users, Globe, Shield, ChevronRight, Star, Box, Layers, Palette, Cpu, GitBranch, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return position;
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn('glass-card rounded-2xl p-6', className)}
    >
      {children}
    </motion.div>
  );
}

const features = [
  { icon: Sparkles, title: 'AI-Powered Generation', description: 'Describe your idea in natural language and watch AI transform it into production-ready code.' },
  { icon: Palette, title: 'Visual Website Builder', description: 'Drag-and-drop interface with real-time editing. No coding required for stunning results.' },
  { icon: Code2, title: 'Smart Code Editor', description: 'AI autocomplete, refactoring, and debugging. Built for developers who love to code.' },
  { icon: Cloud, title: 'One-Click Deployment', description: 'Deploy to the edge with automatic SSL, custom domains, and global CDN.' },
  { icon: Users, title: 'Team Collaboration', description: 'Real-time collaboration with comments, mentions, and shared workspaces.' },
  { icon: GitBranch, title: 'Git Integration', description: 'Version control built-in. Branch, merge, and rollback with confidence.' },
  { icon: Cpu, title: 'Multi-Agent System', description: '12 specialized AI agents working together: planner, designer, frontend, backend, and more.' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 compliant. End-to-end encryption. Role-based access control.' },
  { icon: BarChart3, title: 'Analytics Dashboard', description: 'Track traffic, performance, SEO, and user engagement in real-time.' },
];

const stats = [
  { value: '50K+', label: 'Projects Created' },
  { value: '10K+', label: 'Developers Active' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '150+', label: 'Countries Reached' },
];

const testimonials = [
  { name: 'Sarah Chen', role: 'Founder, TechFlow', content: 'CodeCanvas reduced our development time by 80%. From idea to production in hours instead of weeks.' },
  { name: 'Marcus Rivera', role: 'CTO, DataPulse', content: 'The AI agents are incredible. We built an entire dashboard platform just by describing what we needed.' },
  { name: 'Emily Watson', role: 'Lead Developer, SaaSGrid', content: 'Finally, a platform that understands both developers and designers. This is the future of development.' },
];

function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 100], ['rgba(9,9,11,0)', 'rgba(9,9,11,0.8)']);

  return (
    <motion.nav
      style={{ background: bg }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-purple-500 to-cyan-500 flex items-center justify-center">
            <Code2 className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg">CodeCanvas AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {['Features', 'Agents', 'Pricing', 'Docs'].map((item) => (
            <Link key={item} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="gap-1">
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default function LandingPage() {
  const mousePos = useMousePosition();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Particles />
        <div className="absolute inset-0 aurora" />
        <div className="absolute inset-0 noise" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm text-primary mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              <span>From Prompt to Production</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            Build Software with
            <br />
            <span className="text-gradient">the Power of AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Describe your idea in natural language. Our multi-agent AI system designs, builds, tests, and deploys production-ready applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4"
          >
            <Link href="/register">
              <Button size="xl" className="gap-2 text-base">
                Start Building Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="xl" variant="outline" className="text-base">
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative mt-20"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary/5 via-purple-500/5 to-cyan-500/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <Code2 className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                  <p className="text-xl text-muted-foreground">Your AI Development Platform</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything you need to
              <br />
              <span className="text-gradient">build and ship</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From idea to deployment, CodeCanvas AI provides every tool your team needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FloatingCard key={feature.title} delay={i * 0.05}>
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </FloatingCard>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Agent Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              12 Specialized AI Agents
              <br />
              <span className="text-gradient">Working in Harmony</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each agent is an expert in its domain. They collaborate automatically to build production-quality software.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Planner', 'UI Designer', 'Frontend', 'Backend', 'Database', 'API', 'Testing', 'Security', 'Performance', 'SEO', 'Deployment', 'Documentation'].map((agent, i) => (
              <motion.div
                key={agent}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-xl p-4 text-center hover-lift cursor-pointer"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-medium">{agent}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted by
              <br />
              <span className="text-gradient">Innovative Teams</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t.content}</p>
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-6">
              Ready to build?
              <br />
              <span className="text-gradient">Start for free today.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              No credit card required. Full access to all features. Deploy your first project in minutes.
            </p>
            <Link href="/register">
              <Button size="xl" className="gap-2 text-base">
                Get Started Free <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-6 rounded bg-gradient-to-br from-primary via-purple-500 to-cyan-500 flex items-center justify-center">
                  <Code2 className="h-3 w-3 text-white" />
                </div>
                <span className="font-bold">CodeCanvas AI</span>
              </div>
              <p className="text-xs text-muted-foreground">From Prompt to Production.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Agents', 'Integrations'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-medium mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} CodeCanvas AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function BarChart3({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}
