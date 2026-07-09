export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
  createdAt: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  description: string | null;
  type: string;
  framework: string;
  thumbnailUrl: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  deploymentCount: number;
  latestDeployment?: {
    status: string;
    url: string | null;
  };
}

export interface DeploymentData {
  id: string;
  version: string;
  status: string;
  url: string | null;
  domain: string | null;
  branch: string;
  commitMessage: string | null;
  duration: number | null;
  createdAt: string;
}

export interface AiSessionData {
  id: string;
  agentType: string;
  prompt: string;
  response: string | null;
  model: string;
  tokensUsed: number | null;
  createdAt: string;
  messages: AiMessageData[];
}

export interface AiMessageData {
  id: string;
  role: string;
  content: string;
  createdAt: string;
}

export interface WorkspaceData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  memberCount: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface AnalyticsSummary {
  totalVisitors: number;
  totalPageViews: number;
  averageSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  topPages: { path: string; views: number }[];
  trafficSources: { source: string; count: number }[];
  dailyStats: { date: string; visitors: number; pageViews: number }[];
}
