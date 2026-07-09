import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address').max(255);

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100);

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(1000).optional(),
  type: z.enum(['WEBSITE', 'DASHBOARD', 'LANDING_PAGE', 'COMPONENT', 'API', 'DATABASE', 'FULLSTACK']),
  framework: z.enum(['REACT', 'NEXT_JS', 'VUE', 'ANGULAR', 'SVELTE', 'STATIC']).optional(),
  templateId: z.string().uuid().optional(),
});

export const deploymentSchema = z.object({
  projectId: z.string().uuid(),
  branch: z.string().min(1).max(255).default('main'),
  commitMessage: z.string().max(500).optional(),
  environment: z.record(z.string()).optional(),
});

export const aiPromptSchema = z.object({
  projectId: z.string().uuid(),
  prompt: z.string().min(1, 'Prompt is required').max(10000),
  agentType: z.enum([
    'PLANNER',
    'UI_DESIGNER',
    'FRONTEND',
    'BACKEND',
    'DATABASE',
    'API',
    'TESTING',
    'SECURITY',
    'PERFORMANCE',
    'SEO',
    'DEPLOYMENT',
    'DOCUMENTATION',
  ]),
  model: z.string().optional(),
});

export const workspaceSchema = z.object({
  name: z.string().min(1, 'Workspace name is required').max(100),
  description: z.string().max(500).optional(),
});

export const inviteSchema = z.object({
  email: emailSchema,
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER']).default('MEMBER'),
});

export const updateProfileSchema = z.object({
  name: nameSchema.optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

export const apiKeySchema = z.object({
  name: z.string().min(1).max(100),
  expiresAt: z.string().datetime().optional(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  acceptTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
});

export const otpSchema = z.object({
  email: emailSchema,
  otp: z.string().length(6, 'OTP must be 6 digits'),
});
