import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WorkspaceService } from './workspace.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Workspace')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiOperation({ summary: 'Create workspace' })
  async create(
    @Body('name') name: string,
    @Body('description') description: string | undefined,
    @CurrentUser('id') userId: string,
  ) {
    return this.workspaceService.create(name, userId, description);
  }

  @Get()
  @ApiOperation({ summary: 'List user workspaces' })
  async findAll(@CurrentUser('id') userId: string) {
    return this.workspaceService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workspace details' })
  async findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.workspaceService.findById(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update workspace' })
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.workspaceService.update(id, userId, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete workspace' })
  async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.workspaceService.delete(id, userId);
  }
}
