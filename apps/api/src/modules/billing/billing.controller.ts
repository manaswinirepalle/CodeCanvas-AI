import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Billing')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('subscription')
  @ApiOperation({ summary: 'Get current subscription' })
  async getSubscription(@CurrentUser('id') userId: string) {
    return this.billingService.getSubscription(userId);
  }

  @Post('subscription')
  @ApiOperation({ summary: 'Change subscription plan' })
  async changePlan(@Body('tier') tier: string, @CurrentUser('id') userId: string) {
    return this.billingService.changePlan(userId, tier);
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel subscription' })
  async cancel(@CurrentUser('id') userId: string) {
    return this.billingService.cancelSubscription(userId);
  }

  @Get('invoices')
  @ApiOperation({ summary: 'Get invoices' })
  async getInvoices(@CurrentUser('id') userId: string) {
    return this.billingService.getInvoices(userId);
  }
}
