import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, ProjectType, ProjectFramework } from '@codecanvas/database';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    name: string;
    description?: string;
    type: ProjectType;
    framework?: ProjectFramework;
    ownerId: string;
    workspaceId?: string;
    templateId?: string;
  }) {
    const project = await this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
        framework: data.framework || 'NEXT_JS',
        ownerId: data.ownerId,
        workspaceId: data.workspaceId,
        templateId: data.templateId,
        slug: data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      },
      include: {
        deployments: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    await this.logActivity(data.ownerId, project.id, 'PROJECT_CREATED', {
      name: project.name,
      type: project.type,
    });

    return project;
  }

  async findByUser(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where: { ownerId: userId, deletedAt: null },
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          deployments: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            select: { status: true, url: true },
          },
          _count: { select: { deployments: true } },
        },
      }),
      this.prisma.project.count({ where: { ownerId: userId, deletedAt: null } }),
    ]);

    return { projects, total, page, limit, hasMore: skip + projects.length < total };
  }

  async findById(id: string, userId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id, ownerId: userId, deletedAt: null },
      include: {
        deployments: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        files: {
          where: { deletedAt: null },
          select: { id: true, path: true, language: true, size: true, updatedAt: true },
        },
      },
    });

    if (!project) throw new NotFoundException('Project not found');

    return project;
  }

  async update(
    id: string,
    userId: string,
    data: { name?: string; description?: string; isPublic?: boolean; isArchived?: boolean },
  ) {
    const project = await this.findById(id, userId);

    const updated = await this.prisma.project.update({
      where: { id },
      data,
    });

    await this.logActivity(userId, id, 'PROJECT_UPDATED', data);

    return updated;
  }

  async delete(id: string, userId: string) {
    await this.findById(id, userId);

    await this.prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await this.logActivity(userId, id, 'PROJECT_DELETED', {});

    return { success: true };
  }

  async duplicate(id: string, userId: string) {
    const original = await this.findById(id, userId);

    const duplicate = await this.prisma.project.create({
      data: {
        name: `${original.name} (Copy)`,
        description: original.description,
        type: original.type,
        framework: original.framework,
        ownerId: userId,
      },
    });

    const files = await this.prisma.projectFile.findMany({
      where: { projectId: id, deletedAt: null },
    });

    if (files.length > 0) {
      await this.prisma.projectFile.createMany({
        data: files.map((f) => ({
          projectId: duplicate.id,
          path: f.path,
          content: f.content,
          language: f.language,
          size: f.size,
        })),
      });
    }

    return duplicate;
  }

  private async logActivity(userId: string, projectId: string, action: string, metadata: any) {
    await this.prisma.activityLog.create({
      data: { userId, projectId, action, metadata },
    });
  }
}
