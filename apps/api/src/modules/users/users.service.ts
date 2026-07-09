import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        bio: true,
        role: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        accounts: { select: { provider: true } },
        subscriptions: true,
      },
    });

    return user;
  }

  async updateProfile(userId: string, data: { name?: string; bio?: string; avatarUrl?: string }) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        bio: true,
      },
    });

    return user;
  }

  async getApiKeys(userId: string) {
    return this.prisma.apiKey.findMany({
      where: { userId, revokedAt: null },
      select: { id: true, name: true, key: true, lastUsedAt: true, createdAt: true },
    });
  }

  async createApiKey(userId: string, name: string) {
    const key = `cc_${Array.from({ length: 48 }, () =>
      'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 36)),
    ).join('')}`;

    return this.prisma.apiKey.create({
      data: { userId, name, key },
      select: { id: true, name: true, key: true, createdAt: true },
    });
  }

  async revokeApiKey(userId: string, keyId: string) {
    await this.prisma.apiKey.updateMany({
      where: { id: keyId, userId },
      data: { revokedAt: new Date() },
    });

    return { success: true };
  }

  async getActivityLog(userId: string, limit = 50) {
    return this.prisma.activityLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { project: { select: { id: true, name: true } } },
    });
  }
}
