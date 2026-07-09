import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':projectId')
  @ApiOperation({ summary: 'List project files' })
  async list(@Param('projectId') projectId: string, @CurrentUser('id') userId: string) {
    return this.filesService.list(projectId, userId);
  }

  @Get('detail/:fileId')
  @ApiOperation({ summary: 'Get file details' })
  async get(@Param('fileId') fileId: string, @CurrentUser('id') userId: string) {
    return this.filesService.get(fileId, userId);
  }

  @Post(':projectId')
  @ApiOperation({ summary: 'Create a file' })
  async create(
    @Param('projectId') projectId: string,
    @Body() body: { path: string; content?: string; language?: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.filesService.create(projectId, userId, body);
  }

  @Patch(':fileId')
  @ApiOperation({ summary: 'Update a file' })
  async update(
    @Param('fileId') fileId: string,
    @Body() body: { content?: string; path?: string },
    @CurrentUser('id') userId: string,
  ) {
    return this.filesService.update(fileId, userId, body);
  }

  @Delete(':fileId')
  @ApiOperation({ summary: 'Delete a file' })
  async delete(@Param('fileId') fileId: string, @CurrentUser('id') userId: string) {
    return this.filesService.delete(fileId, userId);
  }
}
