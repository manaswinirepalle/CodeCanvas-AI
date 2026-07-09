import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  async create(
    @Body() body: {
      name: string;
      description?: string;
      type: string;
      framework?: string;
      workspaceId?: string;
      templateId?: string;
    },
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.create({ ...body, type: body.type as any, framework: body.framework as any, ownerId: userId });
  }

  @Get()
  @ApiOperation({ summary: 'List user projects' })
  async findAll(
    @CurrentUser('id') userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.projectsService.findByUser(userId, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  async findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.projectsService.findById(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string; isPublic?: boolean; isArchived?: boolean },
    @CurrentUser('id') userId: string,
  ) {
    return this.projectsService.update(id, userId, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.projectsService.delete(id, userId);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate a project' })
  async duplicate(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.projectsService.duplicate(id, userId);
  }
}
