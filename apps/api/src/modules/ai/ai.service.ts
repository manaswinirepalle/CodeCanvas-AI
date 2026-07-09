import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OpenAiService } from './providers/openai.service';
import { AgentOrchestrator } from './agents/orchestrator';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly openai: OpenAiService,
    private readonly orchestrator: AgentOrchestrator,
  ) {}

  async generatePrompt(
    userId: string,
    projectId: string,
    prompt: string,
    agentType: string,
    model?: string,
  ) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, ownerId: userId },
    });

    if (!project) throw new Error('Project not found');

    const session = await this.prisma.aiSession.create({
      data: {
        projectId,
        agentType: agentType as any,
        prompt,
        model: model || 'gpt-4-turbo',
      },
    });

    const response = await this.orchestrator.execute(agentType, prompt, {
      projectId,
      sessionId: session.id,
      existingCode: project.framework,
    });

    await this.prisma.aiSession.update({
      where: { id: session.id },
      data: {
        response: response.content,
        tokensUsed: response.tokensUsed,
        duration: response.duration,
        completedAt: new Date(),
      },
    });

    await this.prisma.aiUsage.create({
      data: {
        userId,
        agentType: agentType as any,
        model: model || 'gpt-4-turbo',
        tokensIn: response.tokensIn || 0,
        tokensOut: response.tokensOut || 0,
        duration: response.duration || 0,
        cost: response.cost || 0,
      },
    });

    return {
      sessionId: session.id,
      response: response.content,
      tokensUsed: response.tokensUsed,
      duration: response.duration,
    };
  }

  async getSessionHistory(sessionId: string, userId: string) {
    const session = await this.prisma.aiSession.findFirst({
      where: { id: sessionId, project: { ownerId: userId } },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (!session) throw new Error('Session not found');

    return session;
  }

  async getProjectSessions(projectId: string, userId: string) {
    return this.prisma.aiSession.findMany({
      where: { projectId, project: { ownerId: userId } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async chat(userId: string, sessionId: string, message: string) {
    const session = await this.prisma.aiSession.findFirst({
      where: { id: sessionId, project: { ownerId: userId } },
      include: { messages: { orderBy: { createdAt: 'asc' }, take: 20 } },
    });

    if (!session) throw new Error('Session not found');

    await this.prisma.aiMessage.create({
      data: { sessionId, role: 'user', content: message },
    });

    const context = session.messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    context.push({ role: 'user', content: message });

    const response = await this.openai.chat(context, session.model);

    const saved = await this.prisma.aiMessage.create({
      data: { sessionId, role: 'assistant', content: response },
    });

    return { message: saved };
  }

  async getUsage(userId: string) {
    const usage = await this.prisma.aiUsage.groupBy({
      by: ['date', 'agentType'],
      where: { userId },
      _sum: { tokensIn: true, tokensOut: true, cost: true },
      orderBy: { date: 'desc' },
      take: 30,
    });

    return usage;
  }
}
