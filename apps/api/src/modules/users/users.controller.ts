import { Controller, Get, Patch, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  async getProfile(@CurrentUser('id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update user profile' })
  async updateProfile(
    @Body() body: { name?: string; bio?: string; avatarUrl?: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.usersService.updateProfile(userId, body);
  }

  @Get('api-keys')
  @ApiOperation({ summary: 'Get user API keys' })
  async getApiKeys(@CurrentUser('id') userId: string) {
    return this.usersService.getApiKeys(userId);
  }

  @Post('api-keys')
  @ApiOperation({ summary: 'Create API key' })
  async createApiKey(@Body('name') name: string, @CurrentUser('id') userId: string) {
    return this.usersService.createApiKey(userId, name);
  }

  @Delete('api-keys/:keyId')
  @ApiOperation({ summary: 'Revoke API key' })
  async revokeApiKey(@Param('keyId') keyId: string, @CurrentUser('id') userId: string) {
    return this.usersService.revokeApiKey(userId, keyId);
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get user activity log' })
  async getActivity(@CurrentUser('id') userId: string) {
    return this.usersService.getActivityLog(userId);
  }
}
