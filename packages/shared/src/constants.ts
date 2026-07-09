export const PROJECT_TYPES = ['WEBSITE', 'DASHBOARD', 'LANDING_PAGE', 'COMPONENT', 'API', 'DATABASE', 'FULLSTACK'] as const;

export const PROJECT_FRAMEWORKS = ['REACT', 'NEXT_JS', 'VUE', 'ANGULAR', 'SVELTE', 'STATIC'] as const;

export const DEPLOYMENT_STATUSES = ['PENDING', 'BUILDING', 'DEPLOYING', 'LIVE', 'FAILED', 'ROLLING_BACK', 'ROLLED_BACK'] as const;

export const AI_AGENT_TYPES = [
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
] as const;

export const SUBSCRIPTION_TIERS = ['FREE', 'STARTER', 'PRO', 'ENTERPRISE'] as const;

export const USER_ROLES = ['OWNER', 'ADMIN', 'MEMBER', 'VIEWER'] as const;

export const PERMISSIONS = ['READ', 'WRITE', 'DELETE', 'ADMIN', 'DEPLOY', 'MANAGE_TEAM', 'MANAGE_BILLING'] as const;

export const AI_MODELS = {
  GPT_4_TURBO: 'gpt-4-turbo',
  GPT_4O: 'gpt-4o',
  CLAUDE_3_OPUS: 'claude-3-opus-20240229',
  CLAUDE_3_SONNET: 'claude-3-sonnet-20240229',
} as const;

export const RATE_LIMITS = {
  FREE: { requests: 20, window: 60 },
  STARTER: { requests: 100, window: 60 },
  PRO: { requests: 500, window: 60 },
  ENTERPRISE: { requests: 2000, window: 60 },
} as const;

export const FILE_SIZE_LIMITS = {
  PROJECT: 50 * 1024 * 1024,
  ASSET: 10 * 1024 * 1024,
  AVATAR: 2 * 1024 * 1024,
} as const;

export const PLANS = {
  FREE: {
    name: 'Free',
    projects: 3,
    collaborators: 0,
    deployments: 5,
    aiGenerations: 20,
    storage: 100 * 1024 * 1024,
    customDomains: false,
    team: false,
    support: 'Community',
  },
  STARTER: {
    name: 'Starter',
    projects: 15,
    collaborators: 3,
    deployments: 50,
    aiGenerations: 200,
    storage: 1 * 1024 * 1024 * 1024,
    customDomains: true,
    team: false,
    support: 'Email',
  },
  PRO: {
    name: 'Pro',
    projects: 50,
    collaborators: 10,
    deployments: 500,
    aiGenerations: 2000,
    storage: 10 * 1024 * 1024 * 1024,
    customDomains: true,
    team: true,
    support: 'Priority',
  },
  ENTERPRISE: {
    name: 'Enterprise',
    projects: -1,
    collaborators: -1,
    deployments: -1,
    aiGenerations: -1,
    storage: -1,
    customDomains: true,
    team: true,
    support: 'Dedicated',
  },
} as const;
