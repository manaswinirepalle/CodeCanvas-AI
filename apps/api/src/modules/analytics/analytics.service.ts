import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getProjectAnalytics(projectId: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, ownerId: userId },
    });

    if (!project) throw new Error('Project not found');

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [deployments, aiUsage, events] = await Promise.all([
      this.prisma.deployment.findMany({
        where: { projectId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      this.prisma.aiSession.findMany({
        where: { projectId, createdAt: { gte: thirtyDaysAgo } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.analyticsEvent.findMany({
        where: { projectId, timestamp: { gte: thirtyDaysAgo } },
        orderBy: { timestamp: 'desc' },
      }),
    ]);

    return {
      totalDeployments: deployments.length,
      liveDeployments: deployments.filter((d) => d.status === 'LIVE').length,
      failedDeployments: deployments.filter((d) => d.status === 'FAILED').length,
      aiSessions: aiUsage.length,
      totalEvents: events.length,
      recentDeployments: deployments.slice(0, 5),
      eventsByDay: this.groupByDay(events),
    };
  }

  async getDashboardStats(userId: string) {
    const [projectCount, deploymentCount, aiSessionCount, recentActivity] = await Promise.all([
      this.prisma.project.count({ where: { ownerId: userId, deletedAt: null } }),
      this.prisma.deployment.count({ where: { userId } }),
      this.prisma.aiSession.count({
        where: { project: { ownerId: userId } },
      }),
      this.prisma.activityLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { project: { select: { id: true, name: true } } },
      }),
    ]);

    return {
      projectCount,
      deploymentCount,
      aiSessionCount,
      recentActivity,
    };
  }

  private groupByDay(events: any[]) {
    const groups: Record<string, number> = {};
    for (const event of events) {
      const day = event.timestamp.toISOString().slice(0, 10);
      groups[day] = (groups[day] || 0) + 1;
    }
    return Object.entries(groups).map(([date, count]) => ({ date, count }));
  }
}
