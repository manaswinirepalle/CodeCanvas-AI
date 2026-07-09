import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async getSubscription(userId: string) {
    let sub = await this.prisma.subscription.findUnique({
      where: { userId },
    });

    if (!sub) {
      sub = await this.prisma.subscription.create({
        data: { userId, tier: 'FREE', features: {} },
      });
    }

    return sub;
  }

  async changePlan(userId: string, tier: string) {
    return this.prisma.subscription.upsert({
      where: { userId },
      update: { tier: tier as any },
      create: { userId, tier: tier as any, features: {} },
    });
  }

  async cancelSubscription(userId: string) {
    return this.prisma.subscription.update({
      where: { userId },
      data: { status: 'cancelled', cancelAtPeriodEnd: true },
    });
  }

  async getInvoices(userId: string) {
    return [];
  }
}
