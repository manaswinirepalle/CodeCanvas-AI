import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DeploymentStatus } from '@codecanvas/database';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DeploymentsService {
  private readonly logger = new Logger(DeploymentsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(projectId: string, userId: string, data: { branch?: string; commitMessage?: string; environment?: any }) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, ownerId: userId },
    });

    if (!project) throw new NotFoundException('Project not found');

    const version = `${new Date().getFullYear()}.${new Date().getMonth() + 1}.${uuid().slice(0, 8)}`;

    const deployment = await this.prisma.deployment.create({
      data: {
        projectId,
        userId,
        version,
        branch: data.branch || 'main',
        commitMessage: data.commitMessage,
        environment: data.environment || {},
        status: 'PENDING',
      },
    });

    this.simulateBuild(deployment.id).catch((err) =>
      this.logger.error(`Build failed for deployment ${deployment.id}`, err),
    );

    return deployment;
  }

  async findByProject(projectId: string, userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [deployments, total] = await Promise.all([
      this.prisma.deployment.findMany({
        where: { project: { ownerId: userId }, projectId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.deployment.count({
        where: { project: { ownerId: userId }, projectId },
      }),
    ]);

    return { deployments, total, page, limit, hasMore: skip + deployments.length < total };
  }

  async findById(id: string, userId: string) {
    const deployment = await this.prisma.deployment.findFirst({
      where: { id, project: { ownerId: userId } },
    });

    if (!deployment) throw new NotFoundException('Deployment not found');

    return deployment;
  }

  async rollback(id: string, userId: string) {
    const deployment = await this.findById(id, userId);

    const rollbackVersion = `${deployment.version}-rollback-${uuid().slice(0, 4)}`;

    const rollback = await this.prisma.deployment.create({
      data: {
        projectId: deployment.projectId,
        userId,
        version: rollbackVersion,
        branch: deployment.branch,
        status: 'ROLLING_BACK',
        rollbackToId: deployment.id,
      },
    });

    return rollback;
  }

  async getDeploymentStats(userId: string) {
    const stats = await this.prisma.deployment.groupBy({
      by: ['status'],
      where: { userId },
      _count: true,
    });

    const total = stats.reduce((acc, s) => acc + s._count, 0);
    const live = stats.find((s) => s.status === 'LIVE')?._count || 0;
    const failed = stats.find((s) => s.status === 'FAILED')?._count || 0;

    return { total, live, failed, byStatus: stats };
  }

  private async simulateBuild(deploymentId: string) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await this.prisma.deployment.update({
      where: { id: deploymentId },
      data: {
        status: 'BUILDING',
        buildLogs: 'Building project...\nInstalling dependencies...\nCompiling...',
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const success = Math.random() > 0.2;

    if (success) {
      await this.prisma.deployment.update({
        where: { id: deploymentId },
        data: {
          status: 'LIVE',
          url: `https://${deploymentId.slice(0, 8)}.codecanvas.app`,
          buildLogs: 'Build complete!\nDeploying...\nDeployment live!',
          completedAt: new Date(),
          duration: 5000 + Math.floor(Math.random() * 10000),
          size: 1024 * 1024 * (1 + Math.random() * 10),
        },
      });
    } else {
      await this.prisma.deployment.update({
        where: { id: deploymentId },
        data: {
          status: 'FAILED',
          errorLogs: 'Build failed: Unexpected error during compilation\n  at build.ts:42:18',
          completedAt: new Date(),
          duration: 3000 + Math.floor(Math.random() * 5000),
        },
      });
    }
  }
}
