import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Team')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(':workspaceId')
  @ApiOperation({ summary: 'Get workspace members' })
  async getMembers(@Param('workspaceId') workspaceId: string, @CurrentUser('id') userId: string) {
    return this.teamService.getMembers(workspaceId, userId);
  }

  @Post(':workspaceId/invite')
  @ApiOperation({ summary: 'Invite member to workspace' })
  async invite(
    @Param('workspaceId') workspaceId: string,
    @Body('email') email: string,
    @Body('role') role: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.teamService.invite(workspaceId, userId, email, role);
  }

  @Patch(':workspaceId/members/:memberId')
  @ApiOperation({ summary: 'Update member role' })
  async updateRole(
    @Param('workspaceId') workspaceId: string,
    @Param('memberId') memberId: string,
    @Body('role') role: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.teamService.updateMemberRole(workspaceId, userId, memberId, role);
  }

  @Delete(':workspaceId/members/:memberId')
  @ApiOperation({ summary: 'Remove member from workspace' })
  async remove(
    @Param('workspaceId') workspaceId: string,
    @Param('memberId') memberId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.teamService.removeMember(workspaceId, userId, memberId);
  }
}
