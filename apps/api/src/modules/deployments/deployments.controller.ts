import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DeploymentsService } from './deployments.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Deployments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('deployments')
export class DeploymentsController {
  constructor(private readonly deploymentsService: DeploymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new deployment' })
  async create(
    @Body() body: { projectId: string; branch?: string; commitMessage?: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.deploymentsService.create(body.projectId, userId, body);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Get deployments for a project' })
  async findByProject(
    @Param('projectId') projectId: string,
    @CurrentUser('id') userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.deploymentsService.findByProject(projectId, userId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get deployment details' })
  async findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.deploymentsService.findById(id, userId);
  }

  @Post(':id/rollback')
  @ApiOperation({ summary: 'Rollback to a deployment' })
  async rollback(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.deploymentsService.rollback(id, userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get deployment stats' })
  async getStats(@CurrentUser('id') userId: string) {
    return this.deploymentsService.getDeploymentStats(userId);
  }
}
