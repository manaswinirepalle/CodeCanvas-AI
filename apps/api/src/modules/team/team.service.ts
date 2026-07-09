import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TeamService {
  private readonly logger = new Logger(TeamService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getMembers(workspaceId: string, userId: string) {
    await this.verifyMembership(workspaceId, userId);

    const members = await this.prisma.workspaceMember.findMany({
      where: { workspaceId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            lastLoginAt: true,
          },
        },
      },
    });

    return members.map((m) => ({
      id: m.id,
      role: m.role,
      joinedAt: m.joinedAt,
      user: m.user,
    }));
  }

  async invite(workspaceId: string, userId: string, email: string, role: string) {
    await this.verifyMembership(workspaceId, userId);

    const invitedUser = await this.prisma.user.findUnique({ where: { email } });

    if (!invitedUser) {
      const token = uuid();
      const invite = await this.prisma.invite.create({
        data: {
          workspaceId,
          email,
          role: role as any,
          token,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });

      return { invited: false, invite };
    }

    const existing = await this.prisma.workspaceMember.findUnique({
      where: { workspaceId_userId: { workspaceId, userId: invitedUser.id } },
    });

    if (existing) throw new Error('User is already a member');

    await this.prisma.workspaceMember.create({
      data: { workspaceId, userId: invitedUser.id, role: role as any },
    });

    return { invited: true, userId: invitedUser.id };
  }

  async updateMemberRole(workspaceId: string, userId: string, memberId: string, role: string) {
    await this.verifyOwnership(workspaceId, userId);

    const member = await this.prisma.workspaceMember.findFirst({
      where: { id: memberId, workspaceId },
    });

    if (!member) throw new NotFoundException('Member not found');

    return this.prisma.workspaceMember.update({
      where: { id: memberId },
      data: { role: role as any },
    });
  }

  async removeMember(workspaceId: string, userId: string, memberId: string) {
    await this.verifyOwnership(workspaceId, userId);

    await this.prisma.workspaceMember.delete({
      where: { id: memberId, workspaceId },
    });

    return { success: true };
  }

  private async verifyMembership(workspaceId: string, userId: string) {
    const member = await this.prisma.workspaceMember.findFirst({
      where: { workspaceId, userId },
    });

    if (!member) throw new NotFoundException('Not a workspace member');
  }

  private async verifyOwnership(workspaceId: string, userId: string) {
    const member = await this.prisma.workspaceMember.findFirst({
      where: { workspaceId, userId, role: 'OWNER' },
    });

    if (!member) throw new NotFoundException('Only workspace owner can perform this action');
  }
}
