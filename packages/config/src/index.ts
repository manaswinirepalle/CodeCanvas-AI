export const config = {
  app: {
    name: 'CodeCanvas AI',
    tagline: 'From Prompt to Production',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  },
  auth: {
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
    bcryptSaltRounds: 12,
  },
  limits: {
    maxFileSize: 10 * 1024 * 1024,
    maxProjectFiles: 500,
    maxDeploymentsPerDay: 50,
  },
  ai: {
    defaultModel: 'gpt-4-turbo',
    maxTokens: 4096,
    temperature: 0.7,
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
} as const;
