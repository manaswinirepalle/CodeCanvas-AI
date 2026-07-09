import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WorkspaceService {
  private readonly logger = new Logger(WorkspaceService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, userId: string, description?: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + userId.slice(0, 8);

    const workspace = await this.prisma.workspace.create({
      data: { name, slug, description },
    });

    await this.prisma.workspaceMember.create({
      data: { workspaceId: workspace.id, userId, role: 'OWNER' },
    });

    return workspace;
  }

  async findByUser(userId: string) {
    const memberships = await this.prisma.workspaceMember.findMany({
      where: { userId },
      include: {
        workspace: {
          include: {
            _count: { select: { members: true, projects: true } },
          },
        },
      },
    });

    return memberships.map((m) => ({
      ...m.workspace,
      role: m.role,
      memberCount: m.workspace._count.members,
      projectCount: m.workspace._count.projects,
    }));
  }

  async findById(id: string, userId: string) {
    const member = await this.prisma.workspaceMember.findFirst({
      where: { workspaceId: id, userId },
      include: {
        workspace: {
          include: {
            members: { include: { user: { select: { id: true, name: true, avatarUrl: true, email: true } } } },
            projects: { where: { deletedAt: null }, take: 20, orderBy: { updatedAt: 'desc' } },
            _count: { select: { projects: true } },
          },
        },
      },
    });

    if (!member) throw new NotFoundException('Workspace not found');

    return { ...member.workspace, role: member.role };
  }

  async update(id: string, userId: string, data: { name?: string; description?: string }) {
    await this.findById(id, userId);

    return this.prisma.workspace.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const member = await this.prisma.workspaceMember.findFirst({
      where: { workspaceId: id, userId, role: 'OWNER' },
    });

    if (!member) throw new NotFoundException('Only workspace owner can delete');

    await this.prisma.workspace.delete({ where: { id } });

    return { success: true };
  }
}
