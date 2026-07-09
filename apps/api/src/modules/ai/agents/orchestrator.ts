import { Injectable, Logger } from '@nestjs/common';
import { OpenAiService } from '../providers/openai.service';

interface AgentResponse {
  content: string;
  tokensUsed: number;
  tokensIn: number;
  tokensOut: number;
  duration: number;
  cost: number;
}

@Injectable()
export class AgentOrchestrator {
  private readonly logger = new Logger(AgentOrchestrator.name);

  constructor(private readonly openai: OpenAiService) {}

  async execute(
    agentType: string,
    prompt: string,
    context: { projectId: string; sessionId: string; existingCode?: string },
  ): Promise<AgentResponse> {
    const startTime = Date.now();
    this.logger.log(`Executing agent: ${agentType} for session: ${context.sessionId}`);

    const systemPrompts: Record<string, string> = {
      PLANNER: `You are a senior software architect. Analyze requirements and create a detailed plan including: architecture, tech stack, component tree, data flow, routes, and database schema. Output structured markdown.`,
      UI_DESIGNER: `You are a senior UI/UX designer. Generate beautiful, modern UI designs. Output Tailwind CSS React components. Use glassmorphism, gradients, smooth animations, and premium styling. Focus on pixel-perfect design.`,
      FRONTEND: `You are a senior frontend engineer. Generate production-ready React/Next.js code. Use TypeScript, Tailwind CSS, and modern React patterns. Ensure type safety, accessibility, and performance.`,
      BACKEND: `You are a senior backend engineer. Generate production-ready NestJS code. Include proper validation, error handling, logging, and security best practices.`,
      DATABASE: `You are a senior database architect. Design normalized PostgreSQL schemas with Prisma. Include proper indexing, relationships, and data validation.`,
      API: `You are a senior API designer. Design RESTful APIs with proper request/response types, validation, error codes, pagination, and documentation.`,
      TESTING: `You are a senior QA engineer. Generate comprehensive tests including unit, integration, and e2e tests. Cover edge cases and error scenarios.`,
      SECURITY: `You are a senior security engineer. Review code for vulnerabilities: XSS, CSRF, SQL injection, authentication flaws, data exposure. Provide fixes.`,
      PERFORMANCE: `You are a senior performance engineer. Optimize code for speed and efficiency. Focus on caching, lazy loading, bundle size, and rendering strategies.`,
      SEO: `You are an SEO specialist. Generate optimized metadata, structured data, sitemaps, and ensure best practices for search engine visibility.`,
      DEPLOYMENT: `You are a DevOps engineer. Generate Dockerfiles, CI/CD pipelines, and deployment configurations. Focus on scalability and reliability.`,
      DOCUMENTATION: `You are a technical writer. Generate clear, comprehensive documentation including setup guides, API docs, and usage examples.`,
    };

    const systemPrompt = systemPrompts[agentType] || `You are a helpful AI assistant for CodeCanvas AI platform. Help the user with their request.`;

    const result = await this.openai.generate(prompt, systemPrompt);
    const duration = Date.now() - startTime;

    const costPerToken = 0.00001;
    const totalTokens = result.usage.prompt + result.usage.completion;

    return {
      content: result.content,
      tokensUsed: totalTokens,
      tokensIn: result.usage.prompt,
      tokensOut: result.usage.completion,
      duration,
      cost: totalTokens * costPerToken,
    };
  }
}
